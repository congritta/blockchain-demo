/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import NotificationModel from "../../models/Notification";
import {RootState} from "../store";

// Define a type for the slice state
export interface InitialState {
  notifications: NotificationModel[];
}

// Define the initial state using that type
const initialState: InitialState = {
  notifications: []
};

// `createSlice` will infer the state type from the `initialState` argument
export const commonDataSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {

    setNotifications(state, action: PayloadAction<NotificationModel[]>) {
      state.notifications = action.payload;
    }
  }
});

export const actions = commonDataSlice.actions;
export const state = (state: RootState) => state.notifications;
export default commonDataSlice.reducer;
