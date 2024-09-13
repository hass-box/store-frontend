import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";

import "@material/mwc-list/mwc-list";
import "@material/web/divider/divider";
import {
  mdiHistory,
  mdiForum,
  mdiStarOutline,
  mdiStarCheck,
  mdiAlertCircle,
  mdiBookshelf,
  mdiBug,
  mdiBugPlay,
  mdiBugStop,
  mdiCloud,
  mdiCog,
  mdiDelete,
  mdiDevices,
  mdiDotsVertical,
  mdiDownload,
  mdiHandExtendedOutline,
  mdiOpenInNew,
  mdiPackageVariant,
  mdiPlayCircleOutline,
  mdiProgressHelper,
  mdiReload,
  mdiReloadAlert,
  mdiRenameBox,
  mdiShapeOutline,
  mdiStopCircleOutline,
  mdiWrench,
  mdiScanner,
  mdiQrcodeScan,
  mdiRoomService,
  mdiLink,
  mdiForward,
  mdiDownloadBox,
} from "@mdi/js";

import type { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";
import { haStyle } from "../../../homeassistant-frontend/src/resources/styles";

import "../../../homeassistant-frontend/src/layouts/hass-subpage";
import "../../../homeassistant-frontend/src/components/ha-card";
import "../../../homeassistant-frontend/src/components/ha-list-item";
import "../../../homeassistant-frontend/src/components/ha-list-item-new";
import "../../../homeassistant-frontend/src/components/ha-list-new";
import "../../../homeassistant-frontend/src/components/ha-menu-item";
import "../../../homeassistant-frontend/src/components/ha-icon-next";
import "../../../homeassistant-frontend/src/components/ha-alert";
import "../../../homeassistant-frontend/src/components/ha-button";
import "../../../homeassistant-frontend/src/components/ha-markdown";
import "../../../homeassistant-frontend/src/components/ha-switch";
import "../../../homeassistant-frontend/src/components/ha-faded";
import "../../../homeassistant-frontend/src/components/ha-checkbox";

import { navigate } from "../../../homeassistant-frontend/src/common/navigate";

import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { SubscribeMixin } from "../../../homeassistant-frontend/src/mixins/subscribe-mixin";

import {
  EntityRegistryEntry,
  subscribeEntityRegistry,
} from "../../../homeassistant-frontend/src/data/entity_registry";

import {
  showAlertDialog,
  showConfirmationDialog,
} from "../../../homeassistant-frontend/src/dialogs/generic/show-dialog-box";
import { showAddIntegrationDialog } from "../../../homeassistant-frontend/src/panels/config/integrations/show-add-integration-dialog";

import { showToast } from "../../../homeassistant-frontend/src/util/toast";

import {
  extractSearchParam,
  extractSearchParamsObject,
} from "../../../homeassistant-frontend/src/common/url/search-params";

import "../../components/story-viewer";
import "../../components/story-card";

import "medium-zoom-element";

import { getAppInfo, downloadApp } from "../../data/websocket";
import { AppInfo } from "../../data/store";

import {
  HassioHostInfo,
  fetchHassioHostInfo,
  rebootHost,
  shutdownHost,
} from "../../../homeassistant-frontend/src/data/hassio/host";
import { string } from "superstruct";

@customElement("store-detail-addon")
class StoreDetailAddon extends LitElement {
  @property({ type: Boolean, reflect: true }) public narrow = false;

  @property({ attribute: false }) public route!: Route;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _appInfo?: AppInfo;

  protected render(): TemplateResult {
    if (!this._appInfo) {
      return html``;
    }

    return html`
      <hass-subpage .hass=${this.hass} .narrow=${this.narrow} .header=${this._appInfo.appName}>
        <div class="container">
          <div class="column small">
            <ha-card class="overview">
              <div class="card-content">
                <div class="logo-container">
                  <img
                    alt=${"太阳"}
                    src=${"https://brands.home-assistant.io/sun/logo.png"}
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                    @load=${this._onImageLoad}
                    @error=${this._onImageError}
                  />
                </div>
                ${true
                  ? html` <ha-alert alert-type="info"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"来源于社区的加载项"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="info"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"由官方维护的加载项"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="info"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"由HassBox维护的加载项"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="warning"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"来源于社区的加载项"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="error"
                      ><ha-svg-icon slot="icon" path=${mdiDownloadBox}></ha-svg-icon>
                      ${"1231"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="warning"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"来源于社区"}</ha-alert
                    >`
                  : ""}
                ${true
                  ? html` <ha-alert alert-type="success"
                      ><ha-svg-icon slot="icon" path=${mdiPackageVariant}></ha-svg-icon>
                      ${"By HA社区"}</ha-alert
                    >`
                  : ""}
              </div>
              <div class="card-actions">
                ${html`<a href=${`/config/devices/device/`}>
                  <ha-list-item hasMeta graphic="icon">
                    <ha-svg-icon .path=${mdiHistory} slot="graphic"></ha-svg-icon>
                    ${"历史版本"}
                  </ha-list-item>
                </a>`}
                ${html`<a href=${`/config/devices/device/`}>
                  <ha-list-item hasMeta graphic="icon">
                    <ha-svg-icon .path=${mdiForum} slot="graphic"></ha-svg-icon>
                    ${"你问我答"}
                    <ha-icon-next slot="meta"></ha-icon-next>
                  </ha-list-item>
                </a>`}
                ${html`<a href=${`/config/devices/device/`}>
                  <ha-list-item hasMeta graphic="icon">
                    <ha-svg-icon .path=${mdiQrcodeScan} slot="graphic"></ha-svg-icon>
                    ${"入群交流"}
                    <ha-icon-next slot="meta"></ha-icon-next>
                  </ha-list-item>
                </a>`}
                ${html`<ha-list-item hasMeta graphic="icon">
                  <ha-svg-icon slot="graphic" .path=${mdiBookshelf}></ha-svg-icon>
                  ${"使用教程"}
                  <ha-icon-next slot="meta"></ha-icon-next>
                </ha-list-item>`}
              </div>
            </ha-card>
          </div>
          <div class="column">
            <ha-card>
              <div class="header">
                <h1 class="card-header">${this._appInfo?.appName}</h1>
                <div>
                  <ha-icon-button
                    .path=${mdiStarCheck}
                    @click=${this._show}
                    label="收藏"
                  ></ha-icon-button>
                  <ha-icon-button
                    .path=${mdiDotsVertical}
                    @click=${this._show}
                    label="收藏"
                  ></ha-icon-button>
                </div>
              </div>

              <div class="card-body">${this._appInfo?.appDesc}</div>

              <div class="card-actions">
                ${this._appInfo.installed == false
                  ? html`<ha-button @click=${this._download}>立即下载</ha-button>`
                  : html`${this._appInfo.loaded == false
                      ? html`<ha-button @click=${this._showRestartDialog}
                          >等待 Home Assistant 重启生效</ha-button
                        >`
                      : html`${this._appInfo.integrated == false
                          ? html`<ha-button @click=${this._addIntegration}>开始集成</ha-button>`
                          : html`<ha-button @click=${this._integrationDetail}
                              >查看集成详情<ha-svg-icon slot="icon" path=${mdiForward}></ha-svg-icon
                            ></ha-button>`}`}`}
              </div>
            </ha-card>
            <ha-card class="outer" style="overflow: hidden;position: relative;">
              <story-viewer class="inner">
                <story-card>
                  <medium-zoom
                    slot="media"
                    src="https://i.imgur.com/88RbRIc.jpg"
                    alt="Zoomable image"
                    background="rgba(0,0,0,.16)"
                    height="100%"
                    width="100%"
                    margin="48"
                  />
                  <!-- <img slot="media" src="https://i.imgur.com/88RbRIc.jpg" /> -->
                </story-card>
                <story-card>
                  <medium-zoom
                    slot="media"
                    src="https://i.imgur.com/88RbRIc.jpg"
                    alt="Zoomable image"
                    background="rgba(0,0,0,.16)"
                    height="100%"
                    width="100%"
                    margin="48"
                  />
                  <!-- <img slot="media" src="https://i.imgur.com/88RbRIc.jpg" /> -->
                </story-card>
              </story-viewer>
            </ha-card>
            <ha-card>
              <ha-faded>
                <ha-markdown .content=${this._getContent() || ""}></ha-markdown>
              </ha-faded>
            </ha-card>

            <ha-card>
              <div class="header">
                <div class="card-header" style="font-size:1.5rem;">相关推荐</div>
                <ha-icon-button
                  .path=${mdiStarCheck}
                  @click=${this._show}
                  label="收藏"
                ></ha-icon-button>
              </div>
            </ha-card>
          </div>
        </div>
      </hass-subpage>
    `;
  }

  protected updated(changedProperties) {
    console.log("-- updated");
    if (changedProperties.has("route") && !this._appInfo) {
      this._routeDataChanged();
    }
  }

  private async _routeDataChanged(): Promise<void> {
    console.log("-- _routeDataChanged");
    const appId = this.route.path.split("/")[2];
    console.log(appId);

    this._appInfo = await getAppInfo(this.hass, appId);
    console.log(this._appInfo);
  }

  protected async firstUpdated(): Promise<void> {
    console.log("-- firstUpdated");
    console.log("-- this.route.path: " + this.route.path);
    if (this.route.path === "") {
      const requestedApp = extractSearchParam("detail");
      console.log(requestedApp);
    }
    const requestedApp = extractSearchParam("detail");
    console.log(requestedApp);

    console.log(extractSearchParamsObject());

    const addon = this.route.path.substring(1);
    console.log(addon);

    subscribeEntityRegistry(this.hass.connection, (entries) => {
      console.log("--------------" + entries.length);
    });

    this.hass.connection.subscribeEvents(async () => {
      console.log("_________1");
    }, "entity_registry_updated");
  }

  private async _download(ev) {
    const result = await downloadApp(this.hass, this._appInfo!.appId);
    if (result instanceof string) {
      showToast(this, {
        message: "下载 " + this._appInfo!["appName"] + " 发生错误：" + result,
      });
    } else {
      this._appInfo = result;
      await this._showRestartDialog(ev, "下载成功，需要重启 Home Assistant 才能生效！");
    }
  }

  private async _showRestartDialog(ev, title) {
    const confirmed = await showConfirmationDialog(this, {
      title: title || this.hass.localize("ui.dialogs.restart.restart.confirm_title"),
      text: this.hass.localize("ui.dialogs.restart.restart.confirm_description"),
      confirmText: this.hass.localize("ui.dialogs.restart.restart.confirm_action"),
      destructive: true,
    });

    if (!confirmed) {
      return;
    }

    // this.closeDialog();

    try {
      await this.hass.callService("homeassistant", "restart");
    } catch (err: any) {
      showAlertDialog(this, {
        title: this.hass.localize("ui.dialogs.restart.restart.failed"),
        text: err.message,
      });
    }
  }

  private async _addIntegration(ev) {
    showAddIntegrationDialog(this, {
      domain: this._appInfo!["domain"] || undefined,
    });
  }

  private async _integrationDetail(ev) {
    navigate(`/config/integrations/integration/${this._appInfo!["domain"]}`);
  }

  private async _install() {
    // await rebootHost(this.hass);
    await this.hass.callService("homeassistant", "restart");
  }

  private _show() {
    console.log("show");
    showToast(this, {
      message: "已收藏！",
    });
  }

  private _getContent() {
    return `
# HassBox 集成商店

平替 HACS，无需 Github 账号，小白轻松安装 Home Assistant 集成、卡片和主题样式。

## 安装/更新

#### 方法 0: 联系客服安装

啥也不会的小白，可以至 HassBox 微信公众号联系客服，我们免费远程帮你安装！

#### 方法 1: 通过\`Samba\`或\`SFTP\`手动安装

下载\`hassbox_store.zip\`并解压，复制\`hassbox_store\`文件夹到 Home Assistant 根目录下的\`custom_components\`文件夹中。

#### 方法 2: 通过\`SSH\`或\`Terminal & SSH\`加载项执行一键安装命令

\`\`\`shell
curl -fsSL get.hassbox.cn\/hassbox-store | bash
\`\`\`

#### 方法 3: 通过\`shell_command\`服务

1. 复制下面的代码到 Home Assistant 配置文件\`configuration.yaml\`中

   \`\`\`yaml
   shell_command:
     update_hassbox_store: |-
       curl -fsSL get.hassbox.cn/hassbox-store | bash
   \`\`\`

2. 重启 Home Assistant

3. 在 Home Assistant 开发者工具中调用此服务[\`service: shell_command.update_hassbox_store\`](https://my.home-assistant.io/redirect/developer_call_service/?service=shell_command.update_hassbox_store)

## 使用教程

[HassBox 集成商店使用演示 -> ](https://hassbox.cn/service/integration/install-hassbox-store.html#%E4%BD%BF%E7%94%A8%E6%BC%94%E7%A4%BA)
    `;
  }

  private _onImageLoad(ev) {
    ev.target.style.display = "inline-block";
  }

  private _onImageError(ev) {
    ev.target.style.display = "none";
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
        .outer {
          width: 100%;
          /*padding-bottom: 50%;*/
          padding: 25% 0;
          position: relative;
        }
        .inner {
          position: absolute;
          color: #fff;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          margin: auto;
          max-width: 1000px;
          margin-top: 32px;
          margin-bottom: 32px;
        }
        .column {
          width: 33%;
          flex-grow: 1;
        }
        .column.small {
          max-width: 300px;
        }
        .column,
        .fullwidth {
          padding: 8px;
          box-sizing: border-box;
        }
        .column > *:not(:first-child) {
          margin-top: 16px;
        }

        :host([narrow]) .column {
          width: 100%;
          max-width: unset;
        }

        :host([narrow]) .container {
          margin-top: 0;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
        }
        .card-header {
          font-weight: bold;
          font-size: 2rem;
          padding-bottom: 0;
        }
        .card-body {
          padding: 0 16px 16px;
        }
        .no-entries {
          padding-top: 12px;
        }
        .logo-container {
          display: flex;
          justify-content: center;
        }
        .version {
          padding-top: 8px;
          display: flex;
          justify-content: center;
          color: var(--secondary-text-color);
        }
        .overview .card-actions {
          padding: 0;
        }

        .column .card-actions {
          padding: 8px 16px;
        }
        .logo-container img {
          max-width: 200px;
          max-height: 100px;
        }
        ha-alert {
          display: block;
          margin-top: 4px;
        }
        ha-alert:first-of-type {
          margin-top: 16px;
        }
        ha-list-item-new.discovered {
          height: 72px;
        }
        ha-list-item-new.config_entry::after {
          position: absolute;
          top: 8px;
          right: 0;
          bottom: 8px;
          left: 0;
          opacity: 0.12;
          pointer-events: none;
          content: "";
        }
        a {
          text-decoration: none;
        }
        .highlight::after {
          background-color: var(--info-color);
        }
        .attention {
          primary-color: var(--error-color);
        }
        .warning {
          color: var(--error-color);
        }
        .state-error {
          --state-message-color: var(--error-color);
          --text-on-state-color: var(--text-primary-color);
        }
        .state-error::after {
          background-color: var(--error-color);
        }
        .state-failed-unload {
          --state-message-color: var(--warning-color);
          --text-on-state-color: var(--primary-text-color);
        }
        .state-failed::after {
          background-color: var(--warning-color);
        }
        .state-not-loaded {
          --state-message-color: var(--primary-text-color);
        }
        .state-setup {
          --state-message-color: var(--secondary-text-color);
        }
        .message {
          font-weight: bold;
          display: flex;
          align-items: center;
        }
        .message ha-svg-icon {
          color: var(--state-message-color);
        }
        .message div {
          flex: 1;
          margin-left: 8px;
          margin-inline-start: 8px;
          margin-inline-end: initial;
          padding-top: 2px;
          padding-right: 2px;
          padding-inline-end: 2px;
          padding-inline-start: initial;
          overflow-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 7;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .state-disabled [slot="headline"],
        .state-disabled [slot="supporting-text"] {
          opacity: var(--md-list-item-disabled-opacity, 0.3);
        }
        ha-list-new {
          margin-top: 8px;
          margin-bottom: 8px;
        }

        /* Center the story component */
        story-viewer {
          width: 100%;
          max-width: 100%;
          height: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin: 0 auto;
        }

        .medium-zoom-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Styles for specific story cards */
        .bottom {
          position: absolute;
          width: 100%;
          bottom: 48px;
          left: 0;
        }
        .bottom > * {
          margin: 0;
          text-align: center;
        }

        ha-markdown {
          padding: 16px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "store-detail-addon": StoreDetailAddon;
  }
}
