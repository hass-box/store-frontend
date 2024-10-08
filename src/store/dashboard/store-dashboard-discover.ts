import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";

import type { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";
import { haStyle } from "../../../homeassistant-frontend/src/resources/styles";

@customElement("store-dashboard-discover")
class StoreDashboardDiscover extends LitElement {
  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public route!: Route;

  @property({ attribute: false }) public hass!: HomeAssistant;

  protected render(): TemplateResult {
    return html` <div class="content">hassbox-store-dashboard-discover</div> `;
  }

  static get styles(): CSSResultGroup {
    return [
      haStyle,
      css`
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
    "store-dashboard-discover": StoreDashboardDiscover;
  }
}
