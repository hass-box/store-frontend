import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";

import memoize from "memoize-one";

import {
  mdiAlertCircleOutline,
  mdiDownload,
  mdiFileDocument,
  mdiGit,
  mdiGithub,
  mdiInformation,
  mdiNewBox,
} from "@mdi/js";

import { HassConfig } from "home-assistant-js-websocket";

import { caseInsensitiveStringCompare } from "../../../homeassistant-frontend/src/common/string/compare";

import {
  domainToName,
  fetchIntegrationManifest,
} from "../../../homeassistant-frontend/src/data/integration";

import {
  Brand,
  Brands,
  Integration,
  Integrations,
  findIntegration,
  getIntegrationDescriptions,
} from "../../../homeassistant-frontend/src/data/integrations";

import { brandsUrl } from "../../../homeassistant-frontend/src/util/brands-url";

import type { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";
import { haStyle } from "../../../homeassistant-frontend/src/resources/styles";

import "../../../homeassistant-frontend/src/components/ha-card";

import "../../../homeassistant-frontend/src/components/search-input";

import { navigate } from "../../../homeassistant-frontend/src/common/navigate";

import "../../../homeassistant-frontend/src/components/data-table/ha-data-table";

import "../../../homeassistant-frontend/src/components/ha-icon-overflow-menu";
import { IconOverflowMenuItem } from "../../../homeassistant-frontend/src/components/ha-icon-overflow-menu";

import { storage } from "../../../homeassistant-frontend/src/common/decorators/storage";

import type {
  DataTableColumnContainer,
  SortingDirection,
} from "../../../homeassistant-frontend/src/components/data-table/ha-data-table";

import type { RepositoryBase, RepositoryType } from "../../data/repository";
import { HacsLocalizeKeys } from "../../data/localize";

import { repositoryMenuItems } from "../../components/hacs-repository-owerflow-menu";

import { typeStoreIcon } from "../../tools/type-icon";

import { HassBoxStore, AppInfo } from "../../data/store";

import "../../components/category-banner";

import "../../components/hassbox-data-table";

const defaultKeyData = {
  title: "",
  hidden: true,
  filterable: false,
};

const tableColumnDefaults = {
  name: true,
  type: true,
  downloadCount: true,
};

type tableColumnDefaultsType = keyof typeof tableColumnDefaults;

@customElement("store-dashboard-index")
class StoreDashboardIndex extends LitElement {
  @property({ attribute: false }) public store!: HassBoxStore;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public route!: Route;

  @property({ type: Boolean, reflect: true }) public narrow = false;

  @state() private _filter?: string;

  private appList?: AppInfo[];

  @storage({ key: "hacs-table-active-columns", state: true, subscribe: false })
  private _tableColumns: Record<tableColumnDefaultsType, boolean> = tableColumnDefaults;

  protected async firstUpdated(): Promise<void> {
    console.log("store-dashboard-index firstUpdated ");
  }

  protected render() {
    if (this.store.appList == undefined) {
      console.log("store-dashboard-index this.appList == undefined");
      return;
    }
    this.appList = this._filterAppList(this.store.appList);
    if (this.appList == undefined) {
      return;
    }

    return html`
      <div class="search">
        <search-input
          .hass=${this.hass}
          label="搜索集成、卡片、主题或加载项"
          .filter=${this._filter}
          @value-changed=${this._filterChanged}
        ></search-input>
      </div>

      ${this._filter != null && this._filter.length > 0
        ? html`<hassbox-data-table
            .hass=${this.hass}
            .filter=${this._filter}
            .columns=${this._columns(this.narrow, this._tableColumns)}
            .data=${this.appList}
            .id=${"appId"}
            .searchLabel=${"搜索集成、卡片、主题或加载项"}
            .noDataText=${this.hass.localize("ui.components.data-table.no-data")}
            @row-click=${this._handleRowClicked}
          >
            <div slot="header"></div>
          </hassbox-data-table>`
        : html`<category-banner></category-banner>`}
    `;
  }

  private _filterAppList = memoize((appList: AppInfo[]): AppInfo[] =>
    appList
      .filter((app) => {
        if (app.build_in && app.appName == undefined) {
          const domain = app.domain ? app.domain : "";
          console.log(domain + " - " + domainToName(this.hass.localize, domain));
        }
        return true;
      })
      .sort((a, b) => {
        if (a.star_count !== b.star_count) {
          return a.star_count > b.star_count ? -1 : 1;
        }
        return caseInsensitiveStringCompare(
          a.appName || "",
          b.appName || "",
          this.hass.locale.language,
        );
      })
      .map((app) => ({
        ...app,
        id: app["app_id"],
        name: app.appName || domainToName(this.hass.localize, app.domain ? app.domain : ""),
      })),
  );

  private _columns = memoize(
    (
      narrow: boolean,
      tableColumnsOptions: { [key: string]: boolean },
    ): DataTableColumnContainer<AppInfo> => ({
      name: {
        title: "搜索结果：",
        hidden: false,
        main: true,
        sortable: false,
        grows: true,
        filterable: true,
        template: (appInfo: AppInfo) => html`
          ${appInfo.appName}
          <div class="secondary">${narrow ? "---" : "+++"}</div>
        `,
      },
      domain: {
        ...defaultKeyData,
        filterable: true,
      },
      type: {
        title: "类型",
        hidden: false,
        width: "120px",
        template: (appInfo: AppInfo) => html`${appInfo.appType || "-"}`,
      },
      // stars: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.stars"),
      //   hidden: narrow || !tableColumnsOptions.stars,
      //   sortable: true,
      //   width: "10%",
      // },
      // last_updated: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.last_updated"),
      //   hidden: narrow || !tableColumnsOptions.last_updated,
      //   sortable: true,
      //   width: "15%",
      //   template: (repository: RepositoryBase) => {
      //     return "-";
      //   },
      // },
      // installed_version: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.installed_version"),
      //   hidden: narrow || !tableColumnsOptions.installed_version,
      //   sortable: true,
      //   width: "10%",
      //   template: (repository: RepositoryBase) =>
      //     repository.installed ? repository.installed_version : "-",
      // },
      // available_version: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.available_version"),
      //   hidden: narrow || !tableColumnsOptions.available_version,
      //   sortable: true,
      //   width: "10%",
      //   template: (repository: RepositoryBase) =>
      //     repository.installed ? repository.available_version : "-",
      // },
      // translated_status: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.status"),
      //   hidden: narrow || !tableColumnsOptions.status,
      //   sortable: true,
      //   groupable: true,
      //   width: "10%",
      // },
      // translated_category: {
      //   ...defaultKeyData,
      //   title: this.localizeFunc("column.type"),
      //   hidden: narrow || !tableColumnsOptions.type,
      //   sortable: true,
      //   groupable: true,
      //   width: "10%",
      // },
      // authors: defaultKeyData,
      // description: defaultKeyData,
      // domain: defaultKeyData,
      // full_name: defaultKeyData,
      // id: defaultKeyData,
      // topics: defaultKeyData,
      // actions: {
      //   title: "",
      //   width: this.narrow ? undefined : "10%",
      //   type: "overflow-menu",
      //   template: (appInfo: AppInfo) => html`
      //     <ha-icon-overflow-menu .hass=${this.hass} .items=${[]} narrow> </ha-icon-overflow-menu>
      //   `,
      // },
    }),
  );

  public localizeFunc(name) {
    return name;
  }

  private async _filterChanged(e) {
    this._filter = e.detail.value;
    console.log("_filter: " + this._filter);
  }

  private _handleRowClicked(ev: CustomEvent) {
    console.log(ev);
    const appId = ev.detail.id;
    navigate(`/ha-store/detail/${appId}`);
  }

  _handleClick(e) {
    console.log("-----------");
    console.log(e);
    navigate(`/ha-store/detail`);
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
        .search {
          position: sticky;
          top: 0;
          z-index: 2;
        }
        search-input {
          display: block;
          --mdc-text-field-fill-color: var(--sidebar-background-color);
          --mdc-text-field-idle-line-color: var(--divider-color);
        }
        .content {
          margin: auto;
          padding: 8px;
          max-width: 1024px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "store-dashboard-index": StoreDashboardIndex;
  }
}
