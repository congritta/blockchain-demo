/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import classNames from "classnames";
import Icon from "../Icon";

import styles from "./index.module.css";

export default function Checkbox(props: {
  isActive: boolean,
  contents?: JSX.Element|string

  onTriggered?(): void
}) {

  // Render
  return (
    <div
      className={classNames(styles.checkbox, {[styles.isActive]: props.isActive})}
      onClick={() => props.onTriggered?.()}
    >
      <div className={styles.checkboxIcon}>
        <Icon icon={props.isActive ? "checkbox-9" : "shape-10"} />
      </div>

      {props.contents ? (
        <div className={styles.checkboxContents}>{props.contents}</div>
      ) : null}
    </div>
  );
}
