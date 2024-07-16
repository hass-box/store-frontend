import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";

import type { HomeAssistant, Route } from "../../../../homeassistant-frontend/src/types";
import { haStyle } from "../../../../homeassistant-frontend/src/resources/styles";

import "../../../../homeassistant-frontend/src/components/ha-card";

import "../../../../homeassistant-frontend/src/components/search-input";

@customElement("hassbox-store-dashboard-store")
class HassBoxStoreDashboardIndex extends LitElement {
  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public route!: Route;

  @property({ attribute: false }) public hass!: HomeAssistant;

  protected render(): TemplateResult {
    return html`
      <div class="search">
        <search-input .hass=${this.hass}></search-input>
      </div>
      <h1>HassBox推荐</h1>
      <div class="scroll">
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="item" outlined>
          <div class="card-content">
            <button class="link">dscsdc</button>
          </div>
        </ha-card>
      </div>
      <h1>热门推荐</h1>
      <div class="content">hassbox-store-dashboard-index</div>
    `;
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
        h1 {
          margin-top: 8px;
          margin-left: 16px;
          margin-inline-start: 16px;
          margin-inline-end: initial;
        }
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-gap: 8px 8px;
          padding: 8px 16px 16px;
        }
        .container:last-of-type {
          margin-bottom: 64px;
        }

        .scroll {
          text-align: center;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          padding: 8px 16px 16px;
        }

        .item {
          width: 340px;
          height: 110px;
          white-space: nowrap;
          display: inline-block;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hassbox-store-dashboard-store": HassBoxStoreDashboardIndex;
  }
}
