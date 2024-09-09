import { PropertyValues, ReactiveElement } from "lit";
import { customElement, property } from "lit/decorators";
import {
  HassRouterPage,
  RouterOptions,
} from "../../../homeassistant-frontend/src/layouts/hass-router-page";
import { HomeAssistant, Route } from "../../../homeassistant-frontend/src/types";

import "./store-dashboard-index";
import "./store-dashboard-discover";
import "./store-dashboard-mine";

import { HassBoxStore } from "../../data/store";

@customElement("store-dashboard-router")
class StoreDashBoardRouter extends HassRouterPage {
  @property({ attribute: false }) public store!: HassBoxStore;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public route!: Route;

  @property({ type: Boolean }) public narrow = false;

  protected routerOptions: RouterOptions = {
    defaultPage: "index",
    showLoading: true,
    routes: {
      index: {
        tag: "store-dashboard-index",
      },
      discover: {
        tag: "store-dashboard-discover",
      },
      mine: {
        tag: "store-dashboard-mine",
      },
    },
  };

  protected firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
  }

  protected updatePageEl(el) {
    el.hass = this.hass;
    el.store = this.store;
    el.route = this.route;
    el.narrow = this.narrow;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "store-dashboard-router": StoreDashBoardRouter;
  }
}
