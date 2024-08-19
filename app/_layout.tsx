import { Stack, router } from "expo-router";

import { Provider, useSelector } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { StoreStateType } from "./misc/types";
import { useCallback, useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setAppIsReady(true);
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <StatusBar barStyle="light-content" /> */}
        <SafeAreaView
          className="flex-1 bg-white pt-[25px]"
          onLayout={onLayoutRootView}
        >
          <RootStack />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;

const RootStack = () => {
  // const isLoggedIn = useSelector(
  //   (state: StoreStateType) => state.app.isLoggedIn
  // );
  const appCtx = useSelector((state: StoreStateType) => state.app);
  // useEffect(() => {
  //   // router.replace("/");
  //   // router.replace("/Wallet");
  //   // router.replace("/(AuthorizedScreen)/HomeScreen/PortfolioScreen");
  //   // router.replace("/(AuthorizedScreen)/CryptoBasket/CryptoBasket");
  // }, [appCtx.isLoggedIn]);

  // console.log('====================================');
  console.log(appCtx);
  // console.log('====================================');
  return (
    <Stack
      screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(AuthorizedScreen)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(UnAuthorizedScreen)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export const unstable_settings = {
  initialRouteName: "index",
};

