import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const Welcome: React.FC = () => {
    const appCtx = useSelector((state) => state.app); 
  
     

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Title */}
      <Text className="text-lg mb-20">FarmerEats</Text>
      <Text className="font-bold text-3xl mb-10">
        Hello {appCtx?.full_name} Welcome Home!
      </Text>
      <Text className="text-md text-gray-400 mb-14">
        <Text
          onPress={() => {
            router.push("/LoginScreen");
          }}
          className="text-[#e9663b]"
        >
          Logout
        </Text>
      </Text>

     
    </View>
  );
};

export default Welcome;
