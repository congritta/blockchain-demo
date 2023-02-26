/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {AxiosError} from "axios";
import consola from "consola";
import {DateTime} from "luxon";
import {createNotification} from "./notifications";

export default function onError(error: Error|AxiosError|unknown) {

  let errorMessage: string = `Unknown error (${error})`;
  let errorCode: number|null = null;

  if(error instanceof Error) {errorMessage = error.message ?? String(error);}

  if(error instanceof AxiosError) {

    if(error.response) {
      errorCode = error.response.status;

      // Here is getting error message from server
      errorMessage = error.response.data;
    }
    else {
      errorMessage = error.message;
    }
  }

  consola.error(error);
  createNotification({
    icon: "error-lined",
    expireDate: DateTime.now().plus({seconds: 5}).toISO(),
    title: `Error${errorCode ? ` #${errorCode}` : ""}`,
    contents: errorMessage
  });
}
