/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import "animate.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {Provider as StoreProvider} from "react-redux";
import {HashRouter} from "react-router-dom";
import App from "./components/App";
import {IconsCollection} from "./components/Icon";
import NotificationsList from "./components/NotificationsList";
import {clearExpiredNotifications} from "./helpers/notifications";
import {store} from "./store/store";
import "./styles/classes.css";
import "./styles/index.css";
import "./styles/inputs.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root?.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <HashRouter>
        <IconsCollection />
        <App />
      </HashRouter>
      <NotificationsList />
    </StoreProvider>
  </React.StrictMode>
);

// Clear expired notifications
setInterval(clearExpiredNotifications, 1000);
