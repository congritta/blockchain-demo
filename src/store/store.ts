/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {load, save} from "redux-localstorage-simple";

import commonStateReducer from "./reducers/common";
import notificationsReducer from "./reducers/notifications";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",

  reducer: combineReducers({

    // Here are reducers
    common: commonStateReducer,
    notifications: notificationsReducer
  }),

  preloadedState: load(),
  enhancers: [
    applyMiddleware(save({
      ignoreStates: ["notifications"]
    }))
  ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
