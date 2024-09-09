import { fireEvent } from "../../../homeassistant-frontend/src/common/dom/fire_event";
import "./dialog-account-login";

export interface AccountLoginDialogParams {
  data?: any;
}

export const showAccountLoginDialog = (
  element: HTMLElement,
  dialogParams: AccountLoginDialogParams,
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dialog-account-login",
    dialogImport: () => import("./dialog-account-login"),
    dialogParams,
  });
};
