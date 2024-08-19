import {
  AppSliceInitialState,
  User,
  walletAddress,
} from "../../src/misc/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSliceInitialState: AppSliceInitialState = {
  userDetails: {},
 
};

const appSlice = createSlice({
  name: "app",
  initialState: appSliceInitialState,
  reducers: {
   
    updateUsersDetails(
      state: AppSliceInitialState,
      action: PayloadAction<string>
    ) {
      state.userDetails = action.payload;
    },
   
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
