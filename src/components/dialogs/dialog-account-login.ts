import "@material/mwc-button/mwc-button";
import "@material/mwc-linear-progress/mwc-linear-progress";
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators";
import { fireEvent } from "../../../homeassistant-frontend/src/common/dom/fire_event";
import "../../../homeassistant-frontend/src/components/ha-alert";
import "../../../homeassistant-frontend/src/components/ha-circular-progress";
import "../../../homeassistant-frontend/src/components/buttons/ha-progress-button";
import { HassDialog } from "../../../homeassistant-frontend/src/dialogs/make-dialog-manager";
import { haStyleDialog } from "../../../homeassistant-frontend/src/resources/styles";
import { HomeAssistant } from "../../../homeassistant-frontend/src/types";
import { AccountLoginDialogParams } from "./show-store-dialog";

import { getLoginQRCode, verifyAccount } from "../../data/websocket";
import { QRCodeInfo } from "../../data/store";

@customElement("dialog-account-login")
export class DialogAccountLogin extends LitElement implements HassDialog<AccountLoginDialogParams> {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _dialogParams?: AccountLoginDialogParams;

  @state() _loading = true;
  @state() _waiting?: boolean;
  @state() _errmsg?: string;

  private _qrcodeInfo?: QRCodeInfo;

  public async showDialog(dialogParams: AccountLoginDialogParams): Promise<void> {
    console.log("-- showDialog");
    this._dialogParams = dialogParams;
    this._qrcodeInfo = await getLoginQRCode(this.hass);
    this._loading = false;
    if (this._qrcodeInfo?.errcode == 200) {
      this.closeDialog();
    }
  }

  public closeDialog(): void {
    this._dialogParams = undefined;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render() {
    if (!this._dialogParams) {
      return nothing;
    }

    return html`
      <ha-dialog open scrimClickAction="" @closed=${this.closeDialog}>
        <h1>账号绑定</h1>
        ${this._loading
          ? html`<ha-circular-progress indeterminate></ha-circular-progress>`
          : html`${this._qrcodeInfo?.ticket
              ? html`<img
                    style="width:100%;"
                    src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${this._qrcodeInfo
                      ?.ticket}"
                  />
                  ${this._errmsg
                    ? html`<ha-alert alert-type="error"> ${this._errmsg} </ha-alert>`
                    : html` <ha-alert alert-type="info">
                        请使用 微信 扫码绑定，未关注请先关注，绑定成功后再点击提交。</ha-alert
                      >`}

                  <ha-progress-button
                    slot="primaryAction"
                    @click=${this._submit}
                    .progress=${this._waiting == true}
                  >
                    提交
                  </ha-progress-button>`
              : html`<ha-alert alert-type="error"> ${this._qrcodeInfo?.errmsg} </ha-alert>
                  <ha-progress-button
                    slot="primaryAction"
                    @click=${this._retry}
                    .progress=${this._waiting == true}
                  >
                    重试
                  </ha-progress-button>`}`}
      </ha-dialog>
    `;
  }

  private async _submit(ev: CustomEvent): Promise<void> {
    if (this._qrcodeInfo?.token == null) {
      return;
    }
    const button = ev.currentTarget as any;
    // button.actionError();
    this._waiting = true;
    const result = await verifyAccount(this.hass);
    this._waiting = false;
    if (result.errcode == 0) {
      this.closeDialog();
    } else {
      this._errmsg = result.errmsg;
    }
  }

  private async _retry(ev: CustomEvent): Promise<void> {
    this._loading = true;
    this._qrcodeInfo = await getLoginQRCode(this.hass);
    this._loading = false;
  }

  static get styles(): CSSResultGroup {
    return [
      haStyleDialog,
      css`
        a {
          text-decoration: none;
        }
        a ha-svg-icon {
          --mdc-icon-size: 16px;
        }
        mwc-linear-progress {
          margin-bottom: -8px;
          margin-top: 4px;
        }
        ha-circular-progress {
          display: block;
          text-align: center;
        }

        ha-dialog {
          --mdc-dialog-max-width: min(400px, 95vw);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-account-login": DialogAccountLogin;
  }
}
