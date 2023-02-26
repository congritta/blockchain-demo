/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import classNames from "classnames";
import React from "react";

import styles from "./index.module.css";

export default function Table(props: {
  headers: JSX.Element[]|string[],
  data: (JSX.Element|string|null|number)[][],

  onRowClick?(row: number): void,
}) {
  return (
    <div className={styles.table}>

      <div className={classNames(styles.row, styles.tableHeader)}>

        {props.headers.map((header, i) => (
          <div className={styles.cell} key={i}>
            {header}
          </div>
        ))}
      </div>

      {props.data.map((row, i) => (
        <div
          className={classNames(styles.row, {[styles.isHoverable]: props.onRowClick})}
          key={i}
          onClick={() => {props.onRowClick && props.onRowClick?.(i);}}
        >
          {row.map((data, _i) => (
            <div className={styles.cell} key={_i}>
              {data}
            </div>
          ))}
        </div>
      ))}

      {props.data.map((row, i) => (
        <div
          className={classNames("data-rows", styles.mobileCell)}
          key={i}
          onClick={() => {props.onRowClick?.(i);}}
        >
          {row.map((data, _i) => (
            <div className="row" key={_i}>
              <div>{props.headers[_i]}</div>
              <div>{data}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
