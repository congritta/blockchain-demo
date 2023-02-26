/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

export default interface NotificationModel {
  id: string,
  title?: string,
  contents?: string,
  icon?: "info-lined"|"check-mark-circle-lined"|"error-lined"|string,
  expireDate: string; // important to be a string
}
