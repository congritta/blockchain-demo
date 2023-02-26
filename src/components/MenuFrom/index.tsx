/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import styles from "./index.module.css";

const itemHeight = 40;
const menuWidth = 180;
const maxMenuHeight = 200;
const gutter = 10;

export interface Option {
  value: string,
  element: JSX.Element|string;
}

export default function MenuFrom(props: {
  children: JSX.Element,
  options: Option[],
  onTriggered?(value: string): void;
}) {

  // State
  const [isMenuShown, setIsMenuShown] = useState(false);

  // Refs
  const childRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<[number, number]>([0, 0]);

  // Determine where to reveal menu items
  function makeItemsListDirection() {
    if(!childRef.current) {throw new Error("Element not found");}

    const rect = childRef.current.getBoundingClientRect();

    positionRef.current[0] = !((rect.bottom + Math.min(
      itemHeight * props.options.length,
      maxMenuHeight
    ) + gutter + 20) > window.innerHeight) ? (
      rect.bottom + gutter
    ) : (
      rect.top - Math.min(itemHeight * props.options.length, maxMenuHeight) - gutter
    );

    positionRef.current[1] = !((rect.left + menuWidth + gutter + 20) > window.innerWidth) ? (
      rect.left
    ) : (
      rect.right - menuWidth
    );
  }

  // Close menu function
  function closeMenu() {
    setIsMenuShown(false);
    window.removeEventListener("click", closeMenu);
  }

  // Set closer handler
  useEffect(() => {
    if(isMenuShown) {
      setTimeout(() => window.addEventListener("click", closeMenu), 0);
    }

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuShown]);

  // Render
  return (
    <div
      className={styles.menuFrom}
      style={{
        "--item-height": `${itemHeight}px`,
        "--menu-width": `${menuWidth}px`,
        "--max-menu-height": `${maxMenuHeight}px`,
        "--gutter": `${gutter}px`,
      } as any}
      onClick={() => {
        makeItemsListDirection();
        setIsMenuShown(!isMenuShown);
      }}
    >
      <div ref={childRef}>{props.children}</div>

      <div
        className={classNames(styles.menuList, {
          [styles.isActive]: isMenuShown,
        })}
        style={{
          top: positionRef.current[0],
          left: positionRef.current[1],
        }}
      >
        {props.options.map((option) => (
          <div
            key={option.value}
            className={styles.menuListItem}
            onClick={() => props.onTriggered?.(option.value)}
          >
            {option.element}
          </div>
        ))}
      </div>
    </div>
  );
}
