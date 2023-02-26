/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import Icon from "../Icon";

import styles from "./index.module.css";

export default function Radiobox(props: {
  isActive: boolean,
  contents?: JSX.Element|string

  onTriggered?(): void
}) {

  // Render
  return (
    <div className={styles.radiobox} onClick={() => props.onTriggered?.()}>
      <div className={styles.radioboxIcon}>
        <Icon icon={props.isActive ? "checkbox-28" : "circle-2"} />
      </div>

      {props.contents ? (
        <div className={styles.radioboxContents}>{props.contents}</div>
      ) : null}
    </div>
  );
}
