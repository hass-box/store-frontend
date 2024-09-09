import { css } from "lit";

export const hacsStyleVariables = css`
  :host {
    --paper-font-common-base_-_font-family: Roboto, Noto, sans-serif;
    --paper-font-common-base_-_-webkit-font-smoothing: antialiased;
    --paper-font-common-code_-_font-family: "Roboto Mono", Consolas, Menlo, monospace;
    --paper-font-common-code_-_-webkit-font-smoothing: antialiased;
    --paper-font-common-expensive-kerning_-_text-rendering: optimizeLegibility;
    --paper-font-common-nowrap_-_white-space: nowrap;
    --paper-font-common-nowrap_-_overflow: hidden;
    --paper-font-common-nowrap_-_text-overflow: ellipsis;
    --paper-font-display4_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-display4_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-display4_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-display4_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-display4_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-display4_-_font-size: 112px;
    --paper-font-display4_-_font-weight: 300;
    --paper-font-display4_-_letter-spacing: -0.044em;
    --paper-font-display4_-_line-height: 120px;
    --paper-font-display3_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-display3_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-display3_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-display3_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-display3_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-display3_-_font-size: 56px;
    --paper-font-display3_-_font-weight: 400;
    --paper-font-display3_-_letter-spacing: -0.026em;
    --paper-font-display3_-_line-height: 60px;
    --paper-font-display2_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-display2_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-display2_-_font-size: 45px;
    --paper-font-display2_-_font-weight: 400;
    --paper-font-display2_-_letter-spacing: -0.018em;
    --paper-font-display2_-_line-height: 48px;
    --paper-font-display1_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-display1_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-display1_-_font-size: 34px;
    --paper-font-display1_-_font-weight: 400;
    --paper-font-display1_-_letter-spacing: -0.01em;
    --paper-font-display1_-_line-height: 40px;
    --paper-font-headline_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-headline_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-headline_-_font-size: 24px;
    --paper-font-headline_-_font-weight: 400;
    --paper-font-headline_-_letter-spacing: -0.012em;
    --paper-font-headline_-_line-height: 32px;
    --paper-font-title_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-title_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-title_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-title_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-title_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-title_-_font-size: 20px;
    --paper-font-title_-_font-weight: 500;
    --paper-font-title_-_line-height: 28px;
    --paper-font-subhead_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-subhead_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-subhead_-_font-size: 16px;
    --paper-font-subhead_-_font-weight: 400;
    --paper-font-subhead_-_line-height: 24px;
    --paper-font-body2_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-body2_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-body2_-_font-size: 14px;
    --paper-font-body2_-_font-weight: 500;
    --paper-font-body2_-_line-height: 24px;
    --paper-font-body1_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-body1_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-body1_-_font-size: 14px;
    --paper-font-body1_-_font-weight: 400;
    --paper-font-body1_-_line-height: 20px;
    --paper-font-caption_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-caption_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-caption_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-caption_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-caption_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-caption_-_font-size: 12px;
    --paper-font-caption_-_font-weight: 400;
    --paper-font-caption_-_letter-spacing: 0.011em;
    --paper-font-caption_-_line-height: 20px;
    --paper-font-menu_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-menu_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-menu_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-menu_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-menu_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-menu_-_font-size: 13px;
    --paper-font-menu_-_font-weight: 500;
    --paper-font-menu_-_line-height: 24px;
    --paper-font-button_-_font-family: var(--paper-font-common-base_-_font-family);
    --paper-font-button_-_-webkit-font-smoothing: var(
      --paper-font-common-base_-_-webkit-font-smoothing
    );
    --paper-font-button_-_white-space: var(--paper-font-common-nowrap_-_white-space);
    --paper-font-button_-_overflow: var(--paper-font-common-nowrap_-_overflow);
    --paper-font-button_-_text-overflow: var(--paper-font-common-nowrap_-_text-overflow);
    --paper-font-button_-_font-size: 14px;
    --paper-font-button_-_font-weight: 500;
    --paper-font-button_-_letter-spacing: 0.018em;
    --paper-font-button_-_line-height: 24px;
    --paper-font-button_-_text-transform: uppercase;
    --paper-font-code2_-_font-family: var(--paper-font-common-code_-_font-family);
    --paper-font-code2_-_-webkit-font-smoothing: var(
      --paper-font-common-code_-_-webkit-font-smoothing
    );
    --paper-font-code2_-_font-size: 14px;
    --paper-font-code2_-_font-weight: 700;
    --paper-font-code2_-_line-height: 20px;
    --paper-font-code1_-_font-family: var(--paper-font-common-code_-_font-family);
    --paper-font-code1_-_-webkit-font-smoothing: var(
      --paper-font-common-code_-_-webkit-font-smoothing
    );
    --paper-font-code1_-_font-size: 14px;
    --paper-font-code1_-_font-weight: 500;
    --paper-font-code1_-_line-height: 20px;

    --hcv-color-error: var(--hacs-error-color, var(--error-color));
    --hcv-color-warning: var(--hacs-warning-color, var(--warning-color));
    --hcv-color-update: var(--hacs-update-color, var(--info-color));
    --hcv-color-new: var(--hacs-new-color, var(--success-color));
    --hcv-color-icon: var(--hacs-default-icon-color, var(--primary-text-color));

    --hcv-text-color-primary: var(--primary-text-color);
    --hcv-text-color-on-background: var(--text-primary-color);
    --hcv-text-color-secondary: var(--secondary-text-color);
    --hcv-text-color-link: var(--link-text-color, var(--accent-color));

    --mdc-dialog-heading-ink-color: var(--hcv-text-color-primary);
    --mdc-dialog-content-ink-color: var(--hcv-text-color-primary);
  }
`;
