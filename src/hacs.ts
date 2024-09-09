import { LitElement, PropertyValues } from "lit";
import { property, state } from "lit/decorators";
import type { Hacs } from "./data/hacs";
import type { HassBoxStore } from "./data/store";
import { HacsLogger } from "./tools/hacs-logger";
import type { HacsLocalizeKeys } from "./data/localize";
import { ProvideHassLitMixin } from "../homeassistant-frontend/src/mixins/provide-hass-lit-mixin";
import type { HomeAssistant } from "../homeassistant-frontend/src/types";
import { computeLocalize } from "../homeassistant-frontend/src/common/translations/localize";
import { getTranslation } from "../homeassistant-frontend/src/util/common-translation";
import { fetchHacsInfo, getRepositories, websocketSubscription } from "./data/websocket";
import { getAppList } from "./data/websocket";
import { HacsDispatchEvent } from "./data/common";

import { getIntegrationDescriptions } from "../homeassistant-frontend/src/data/integrations";

import {
  makeDialogManager,
  showDialog,
} from "../homeassistant-frontend/src/dialogs/make-dialog-manager";
import { HASSDomEvent } from "../homeassistant-frontend/src/common/dom/fire_event";

export class HacsElement extends ProvideHassLitMixin(LitElement) {
  @property({ attribute: false }) public hacs: Partial<Hacs> = { localize: () => "" };

  @property({ attribute: false }) public store: Partial<HassBoxStore> = {};

  @state() private _language = "en";

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasUpdated) {
      return;
    }
    this._initHacs();
    this._initStore();
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    // deprecated
    this.addEventListener("register-dialog", (e) => this.registerDialog(e.detail));
    // @ts-ignore
    this.registerDialog({
      dialogShowEvent: "hass-notification",
      dialogTag: "notification-manager",
      dialogImport: () => import("../homeassistant-frontend/src/managers/notification-manager"),
      addHistory: false,
    });
  }

  private registerDialog({ dialogShowEvent, dialogTag, dialogImport, addHistory = true }) {
    this.addEventListener(dialogShowEvent, (showEv) => {
      showDialog(
        this,
        this.shadowRoot!,
        dialogTag,
        (showEv as HASSDomEvent<unknown>).detail,
        dialogImport,
        addHistory,
      );
    });
  }

  protected willUpdate(changedProperties: PropertyValues) {
    console.log("-- willUpdate");
    if (!this.hasUpdated) {
      this._initHacs();
      this._initStore();
    }
    if (changedProperties.has("hass")) {
      const oldHass = changedProperties.get("hass") as HomeAssistant | undefined;
      if (oldHass?.language !== this.hass.language) {
        this._language = this.hass.language;
      }
    }

    if (changedProperties.has("_language") || !this.hasUpdated) {
      this._initializeLocalize();
    }
  }

  private async _initHacs(): Promise<void> {
    websocketSubscription(
      this.hass,
      () => this._updateProperties("configuration"),
      HacsDispatchEvent.CONFIG,
    );

    websocketSubscription(
      this.hass,
      () => this._updateProperties("status"),
      HacsDispatchEvent.STATUS,
    );

    websocketSubscription(
      this.hass,
      () => this._updateProperties("status"),
      HacsDispatchEvent.STAGE,
    );

    websocketSubscription(
      this.hass,
      () => this._updateProperties("repositories"),
      HacsDispatchEvent.REPOSITORY,
    );

    this.hass.connection.subscribeEvents(
      async () => this._updateProperties("lovelace"),
      "lovelace_updated",
    );

    this._updateHacs({
      log: new HacsLogger(),
    });

    this._updateProperties();

    this.addEventListener("update-hacs", (e) =>
      this._updateHacs((e as any).detail as Partial<Hacs>),
    );
  }

  private async _initStore(): Promise<void> {
    console.log("-- _initStore");
    const descriptions = await getIntegrationDescriptions(this.hass);
    this.hass.loadBackendTranslation("title", descriptions.core.translated_name, true);

    await this._updatePropertiesStore();
  }

  private async _initializeLocalize() {
    const { language, data } = await getTranslation(null, this._language);
    this._updateHacs({
      localize: await computeLocalize<HacsLocalizeKeys>(this.constructor.prototype, language, {
        [language]: data,
      }),
    });
  }

  private async _updateProperties(prop = "all") {
    const _updates: any = {};
    const _fetch: any = {};

    if (prop === "all") {
      [_fetch.repositories, _fetch.info] = await Promise.all([
        getRepositories(this.hass),
        fetchHacsInfo(this.hass),
      ]);
    } else if (prop === "info") {
      _fetch.info = await fetchHacsInfo(this.hass);
    } else if (prop === "repositories") {
      _fetch.repositories = await getRepositories(this.hass);
    }

    Object.keys(_fetch).forEach((update) => {
      if (_fetch[update] !== undefined) {
        _updates[update] = _fetch[update];
      }
    });
    if (_updates) {
      this._updateHacs(_updates);
      this.requestUpdate();
    }
  }

  protected _updateHacs(update: Partial<Hacs>) {
    this.hacs = { ...this.hacs, ...update };
  }

  private async _updatePropertiesStore(prop = "all") {
    console.log("-- _updatePropertiesStore");
    const _updates: any = {};
    const _fetch: any = {};

    if (prop === "all") {
      [_fetch.appList] = await Promise.all([getAppList(this.hass)]);
      console.log("-- getAppList finish");
    }

    Object.keys(_fetch).forEach((update) => {
      if (_fetch[update] !== undefined) {
        _updates[update] = _fetch[update];
      }
    });
    if (_updates) {
      this._updateStore(_updates);
      this.requestUpdate();
    }
  }

  protected _updateStore(update: Partial<HassBoxStore>) {
    console.log("-- _updateStore");
    this.store = { ...this.store, ...update };
  }
}
