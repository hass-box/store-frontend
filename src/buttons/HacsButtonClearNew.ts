import { customElement, TemplateResult, html, property } from "lit-element";
import { HacsRepositoryButton } from "./HacsRepositoryButton"

@customElement("hacs-button-clear-new")
export class HacsButtonClearNew extends HacsRepositoryButton {
    @property() public category?: string
    protected render(): TemplateResult | void {
        return html`
            <mwc-button @click=${this.ExecuteAction}>
                ${this.hass.localize(`component.hacs.store.clear_new`)}
            </mwc-button>
        `;
    }

    ExecuteAction() {
        var message = {
            type: "hacs/settings",
            action: "clear_new",
            category: this.category
        }
        this.hass.connection.sendMessage(message);
    }
}