import type { LocalizeFunc } from "../../homeassistant-frontend/src/common/translations/localize";
import type { HacsLocalizeKeys } from "./localize";
import type { RepositoryBase, RepositoryType } from "./repository";

export type AppType = "integration" | "card" | "theme" | "addon";

export interface ResponseBase {
  errcode: number;
  errmsg: string;
}

export interface QRCodeInfo extends ResponseBase {
  expireSeconds: number;
  ticket: string;
  url: string;
  token: string;
}

export interface HassBoxStore {
  appList: AppInfo[];
}

export interface AppInfo {
  appId: string;
  appName: string;
  appDesc: string;
  appType: AppType;
  appOwner: string;
  star_count: number;
  appOwnerLogo: string;
  repoId: string;
  repoName: string;
  downloadCount: number;
  viewCount: number;
  repoForkCount: number;
  repoStarCount: number;
  domain: string | null;
  build_in: boolean;

  authors: string[];
  available_version: string;
  can_download: boolean;
  category: RepositoryType;
  config_flow: boolean;
  country: string[];
  custom: boolean;
  description: string;
  downloads: number;
  file_name: string;
  full_name: string;
  hide: boolean;
  homeassistant: string | null;
  installed_version: string;
  installed: boolean;
  last_updated: string;
  local_path: string;
  new: boolean;
  pending_upgrade: boolean;
  stars: number;
  state: string;
  status: "pending-restart" | "pending-upgrade" | "new" | "installed" | "default";
  topics: string[];
}
