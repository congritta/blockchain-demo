/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {Range as MasterRange} from "react-range";

import styles from "./index.module.css";

export default function Range(props: {
  values: number[],

  onChange(values: number[]): void,

  min: number,
  max: number,
  step?: number
}) {

  return (
    <div className={styles.range}>
      <MasterRange
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange} values={props.values}
        renderTrack={
          ({props, children}) => (
            <div {...props}
              className={styles.track}
              style={{
                ...props.style,
              }}
            >
              {children}
            </div>
          )
        }
        renderThumb={
          ({props}) => (
            <div {...props}
              style={{
                ...props.style,
              }}
              className={styles.thumb}
            />
          )
        }
      />
    </div>
  );
}
