/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import classNames from "classnames";
import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import ShadeGenerator, {Shade} from "shade-generator";
import config from "../../config";
import IndexPage from "../../pages/index";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import * as commonStateStore from "../../store/reducers/common";
import styles from "./index.module.css";

export default function App() {

  // Hooks
  const {language} = useAppSelector(commonStateStore.state);
  const dispatch = useAppDispatch();

  // Generate color shades to CSS properties
  useEffect(() => {
    const shades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    shades.forEach((shade) => (
      document.body.style.setProperty(
        `--accent-color-${shade}`,
        ShadeGenerator.hue(config.ACCENT_COLOR).shade(String(shade) as Shade).hex()
      )
    ));

    shades.forEach((shade) => (
      document.body.style.setProperty(
        `--black-color-${shade}`,
        ShadeGenerator.hue("#AAAAAA").shade(String(shade) as Shade).hex()
      )
    ));
  }, []);

  // Render
  return (
    <>

      {/* Header */}
      <header className={styles.header}>
        <h1>{config.SITE_NAME}</h1>

        <button
          className={classNames("isZeroed", styles.rightButton)}
          onClick={() => dispatch(commonStateStore.actions.setLanguage(language === "ru" ? "en" : "ru"))}
        >
          <span>{language === "ru" ? "In English" : "На русском"}</span>
        </button>
      </header>

      {/* Main */}
      <div className={styles.layoutContainer}>

        {/* Main element */}
        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
