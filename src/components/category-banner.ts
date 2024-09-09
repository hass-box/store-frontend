import { LitElement, html, css, CSSResultGroup, customElement, TemplateResult } from "lit-element";

import { haStyle } from "../../homeassistant-frontend/src/resources/styles";

import "../../homeassistant-frontend/src/components/ha-card";
import { navigate } from "../../homeassistant-frontend/src/common/navigate";

@customElement("category-banner")
export class CategoryBanner extends LitElement {
  constructor() {
    super();
  }

  protected render(): TemplateResult {
    return html`
      <h1>热门推荐</h1>
      <div class="grid-container">
        <ha-card class="grid-item" outlined @click="${this._handleClick}">
          <div class="grid-item-content">
            <img
              style="width:100%;height:100%;"
              src="https://mmbiz.qpic.cn/sz_mmbiz_png/borMIDgjEkmp3AQVN0cNLULpFU2G7jetMD3L9AolC092iaKsOxNIeK6ZicQ41fR9Q3ZY53vR7RuSiaselJG2f3Lfw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"
            />
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
      </div>
      <h1>装机必备</h1>
      <div class="grid-container">
        <ha-card class="grid-item" outlined @click="${this._handleClick}">
          <div class="grid-item-content">
            <img
              style="width:100%;height:100%;"
              src="https://mmbiz.qpic.cn/sz_mmbiz_png/borMIDgjEkmp3AQVN0cNLULpFU2G7jetMD3L9AolC092iaKsOxNIeK6ZicQ41fR9Q3ZY53vR7RuSiaselJG2f3Lfw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"
            />
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
        <ha-card class="grid-item" outlined>
          <div class="grid-item-content ">
            <button class="link" @click="${this._handleClick}">dscsdc</button>
          </div>
        </ha-card>
      </div>
    `;
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
        h1 {
          margin-top: 16px;
          margin-left: 16px;
          margin-inline-start: 16px;
          margin-inline-end: initial;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          grid-gap: 8px 8px;
          padding: 8px 16px 16px;
        }

        .grid-item {
          position: relative;
          width: 100%;
          padding-top: 42.55%;
          overflow: hidden;
          cursor: pointer;
        }

        .grid-item-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mdc-data-table__header-row {
          display: none;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "category-banner": CategoryBanner;
  }
}
