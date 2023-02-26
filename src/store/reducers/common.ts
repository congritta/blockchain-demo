/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

// Define a type for the slice state
export interface InitialState {
  language: "en"|"ru";
}

// Define the initial state using that type
const initialState: InitialState = {
  language: "en"
};

// `createSlice` will infer the state type from the `initialState` argument
export const commonDataSlice = createSlice({
  name: "common",
  initialState,
  reducers: {

    setLanguage(state, action: PayloadAction<InitialState["language"]>) {
      state.language = action.payload;
    }
  }
});

export const actions = commonDataSlice.actions;
export const state = (state: RootState) => state.common;
export default commonDataSlice.reducer;
