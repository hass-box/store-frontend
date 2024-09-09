import { LitElement, html, css, property, query, customElement } from "lit-element";

@customElement("story-card")
export class StoryCard extends LitElement {
  constructor() {
    super();

    this.addEventListener("entered", () => {
      console.log("entered");
      if (this._slottedMedia) {
        console.log("entered play");
        this._slottedMedia.currentTime = 0;
        this._slottedMedia.play();
      }
    });

    this.addEventListener("exited", () => {
      console.log("exited");
      if (this._slottedMedia) {
        console.log("entered pause");
        this._slottedMedia.pause();
      }
    });
  }

  static styles = css`
    #media {
      height: 100%;
    }

    #media ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  /**
   * The element in the "media" slot, ONLY if it is an
   * HTMLMediaElement, such as <video>.
   */
  private get _slottedMedia(): HTMLMediaElement | null {
    const el = this._mediaSlot && this._mediaSlot.assignedNodes()[0];
    return el instanceof HTMLMediaElement ? el : null;
  }

  /*
   * @query(selector) is shorthand for
   * this.renderRoot.querySelector(selector)
   */
  @query("slot[name=media]")
  private _mediaSlot?: HTMLSlotElement;

  render() {
    return html`
      <div id="media">
        <slot name="media"></slot>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-card": StoryCard;
  }
}
