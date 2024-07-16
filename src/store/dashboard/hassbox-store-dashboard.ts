import { mdiStorefront, mdiClover, mdiAccountCircle, mdiFlowerPoppy } from "@mdi/js";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import memoizeOne from "memoize-one";
import "../../../homeassistant-frontend/src/layouts/hass-error-screen";
import "../../../homeassistant-frontend/src/layouts/hass-loading-screen";
import "../../../homeassistant-frontend/src/layouts/hass-tabs-subpage";
import type { PageNavigation } from "../../../homeassistant-frontend/src/layouts/hass-tabs-subpage";
import { haStyle } from "../../../homeassistant-frontend/src/resources/styles";
import { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";
import "./hassbox-store-dashboard-router";

@customElement("hassbox-store-dashboard")
class HassBoxStoreDashboard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public route!: Route;

  @property({ type: Boolean }) public narrow = false;

  private _computeTail = memoizeOne((route: Route) => {
    const dividerPos = route.path.indexOf("/", 1);
    return dividerPos === -1
      ? {
          prefix: route.prefix + route.path,
          path: "",
        }
      : {
          prefix: route.prefix + route.path.substr(0, dividerPos),
          path: route.path.substr(dividerPos),
        };
  });

  protected render(): TemplateResult {
    const addonTabs: PageNavigation[] = [
      {
        name: "商店",
        path: "/ha-store/dashboard/store",
        iconPath: mdiStorefront,
      },
      {
        name: "发现",
        path: "/ha-store/dashboard/discover",
        iconPath: mdiFlowerPoppy,
      },
      {
        name: "我的",
        path: "/ha-store/dashboard/mine",
        iconPath: mdiAccountCircle,
      },
    ];

    console.log(this.route);
    let route = this._computeTail(this.route);
    console.log(route);

    return html`
      <hass-tabs-subpage
        .hass=${this.hass}
        .narrow=${this.narrow}
        .route=${route}
        .tabs=${addonTabs}
      >
        <span slot="header">HA商店</span>
        <hassbox-store-dashboard-router
          .route=${route}
          .narrow=${this.narrow}
          .hass=${this.hass}
        ></hassbox-store-dashboard-router>
      </hass-tabs-subpage>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
        :host {
          color: var(--primary-text-color);
        }
        .content {
          padding: 24px 0 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        hassio-addon-info,
        hassio-addon-network,
        hassio-addon-audio,
        hassio-addon-config {
          margin-bottom: 24px;
          width: 600px;
        }
        hassio-addon-logs {
          max-width: calc(100% - 8px);
          min-width: 600px;
        }
        @media only screen and (max-width: 600px) {
          hassio-addon-info,
          hassio-addon-network,
          hassio-addon-audio,
          hassio-addon-config,
          hassio-addon-logs {
            max-width: 100%;
            min-width: 100%;
          }
        }
      `,
    ];
  }

  protected async firstUpdated(): Promise<void> {}
}

declare global {
  interface HTMLElementTagNameMap {
    "hassbox-store-dashboard": HassBoxStoreDashboard;
  }
}
