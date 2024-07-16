import { PropertyValues, ReactiveElement } from "lit";
import { customElement, property } from "lit/decorators";
import {
  HassRouterPage,
  RouterOptions,
} from "../../../homeassistant-frontend/src/layouts/hass-router-page";
import { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";

import "./tab/store";
import "./tab/discover";
import "./tab/mine";

@customElement("hassbox-store-dashboard-router")
class HassBoxStoreDashBoardRouter extends HassRouterPage {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public route!: Route;

  @property({ type: Boolean }) public narrow = false;

  protected routerOptions: RouterOptions = {
    defaultPage: "store",
    showLoading: true,
    routes: {
      store: {
        tag: "hassbox-store-dashboard-store",
      },
      discover: {
        tag: "hassbox-store-dashboard-discover",
      },
      mine: {
        tag: "hassbox-store-dashboard-mine",
      },
    },
  };

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
    console.log("hassbox-store-dashboard-router - firstUpdated");
    console.log(this.route);
  }

  protected updatePageEl(el) {
    console.log(el);
    el.hass = this.hass;
    el.route = this.route;
    el.narrow = this.narrow;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hassbox-store-dashboard-router": HassBoxStoreDashBoardRouter;
  }
}
