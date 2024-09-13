import type { HomeAssistant } from "../../homeassistant-frontend/src/types";
import type { Hacs, HacsInfo } from "./hacs";
import type { HacsDispatchEvent } from "./common";
import type { RepositoryBase } from "./repository";

import type { ResponseBase, QRCodeInfo, AppInfo } from "./store";

export const fetchHacsInfo = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<HacsInfo>({
    type: "hacs/info",
  });

export const getRepositories = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<RepositoryBase[]>({
    type: "hacs/repositories/list",
  });

export const repositoryUninstall = async (hass: HomeAssistant, repository: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repository/remove",
    repository,
  });

export const repositoryAdd = async (hass: HomeAssistant, repository: string, category: string) =>
  hass.connection.sendMessagePromise<null | Record<string, string>>({
    type: "hacs/repositories/add",
    repository: repository,
    category,
  });

export const repositoryBeta = async (hass: HomeAssistant, repository: string, beta: boolean) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repository/beta",
    repository,
    show_beta: beta,
  });

export const repositoryUpdate = async (hass: HomeAssistant, repository: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repository/refresh",
    repository,
  });

export const repositoryDelete = async (hass: HomeAssistant, repository: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repositories/remove",
    repository,
  });

export const repositoriesClearNew = async (hass: HomeAssistant, hacs: Hacs) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repositories/clear_new",
    categories: hacs.info.categories,
  });

export const repositoriesClearNewRepository = async (hass: HomeAssistant, repository: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hacs/repositories/clear_new",
    repository,
  });

export const websocketSubscription = (
  hass: HomeAssistant,
  onChange: (result: Record<any, any> | null) => void,
  event: HacsDispatchEvent,
) =>
  hass.connection.subscribeMessage(onChange, {
    type: "hacs/subscribe",
    signal: event,
  });

export const storeTest = async (hass: HomeAssistant, repository: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/test",
    repository,
  });

export const checkAccountState = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/check_account_state",
  });

export const getLoginQRCode = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<QRCodeInfo>({
    type: "hassbox/store/get_login_qr_code",
  });

export const verifyAccount = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<ResponseBase>({
    type: "hassbox/store/verify_account",
  });

export const getAppList = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<AppInfo[]>({
    type: "hassbox/store/app_list",
  });

export const getAppInfo = async (hass: HomeAssistant, appId: string) =>
  hass.connection.sendMessagePromise<AppInfo>({
    type: "hassbox/store/getAppInfo",
    appId,
  });

export const downloadApp = async (hass: HomeAssistant, appId: string) =>
  hass.connection.sendMessagePromise<AppInfo>({
    type: "hassbox/store/downloadApp",
    appId,
  });

export const search = async (hass: HomeAssistant, search: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/search",
    search,
  });

export const getStoreDiscover = async (hass: HomeAssistant) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/discover",
  });

export const install = async (hass: HomeAssistant, source: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/install",
    source,
  });

export const update = async (hass: HomeAssistant, source: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/update/integration",
    source,
  });

export const uninstall = async (hass: HomeAssistant, source: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/uninstall",
    source,
  });

export const star = async (hass: HomeAssistant, source: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/star",
    source,
  });

export const unstar = async (hass: HomeAssistant, source: string) =>
  hass.connection.sendMessagePromise<void>({
    type: "hassbox/store/unstar",
    source,
  });
