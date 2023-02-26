/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import React, {createRef, useEffect, useRef} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {deleteNotification} from "../../helpers/notifications";
import {useAppSelector} from "../../store/hooks";
import * as notificationsStore from "../../store/reducers/notifications";
import Icon from "../Icon";

import styles from "./index.module.css";

const revealDuration = 320;

export default function NotificationsList() {

  const notifications = useAppSelector(notificationsStore.state).notifications.map((notification) => ({
    ...notification,
    nodeRef: createRef<any>()
  }));
  const notificationsAmount = useRef<number>(0);

  // Scroll down on each notification
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(notificationsRef.current && notificationsAmount.current < notifications.length) {
      notificationsRef.current.scrollTo({top: notificationsRef.current.scrollHeight, behavior: "smooth"});
    }

    notificationsAmount.current = notifications.length;
  }, [notifications]);

  // Render
  return (
    <div
      ref={notificationsRef} className={styles.notificationsList} style={{
      "--animate-duration": `${revealDuration}ms`,
    } as any}
    >
      <TransitionGroup>

        {notifications.map((notification) => (
          <CSSTransition
            nodeRef={notification.nodeRef}
            key={notification.id}
            timeout={revealDuration}
            classNames={{
              enter: "animate__animated",
              enterActive: "animate__fadeInUp",
              exit: "animate__animated",
              exitActive: "animate__fadeOutDown"
            }}
            mountOnEnter={true}
          >
            <div
              key={notification.id}
              ref={notification.nodeRef}
              className={styles.notification}
              onMouseDown={() => deleteNotification(notification.id)}
            >

              {notification.icon ? (
                <div className={styles.notificationIcon}>
                  <Icon icon={notification.icon} />
                </div>
              ) : null}

              <div className={styles.notificationData}>

                {notification.title ? (
                  <div className={styles.title}>{notification.title}</div>
                ) : null}

                {notification.contents ? (
                  <div className={styles.contents}>
                    {notification.contents}
                  </div>
                ) : null}
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
