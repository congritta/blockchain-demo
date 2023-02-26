/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import React from "react";

import styles from "./index.module.css";

export default function Loader(props: {
  color: string,
  size: number,
  width: number,
  spinsPerSecond: number
}) {
  return (
    <div
      className={styles.loader}
      style={{
        width: props.size,
        height: props.size,
        borderColor: props.color,
        borderWidth: props.width,
        animationDuration: `${1 / props.spinsPerSecond}s`
      }}
    />
  );
}
