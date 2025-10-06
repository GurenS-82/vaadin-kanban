import { w as wr, F as Fi, l as ls } from "./indexhtml-DqTFWpr5.js";
import { g } from "./state-DIGAkjaT-C84QFF6G.js";
import { o } from "./base-panel-Bo-7csvK-Cte7bcaO.js";
import { showNotification as N } from "./copilot-notification-COJP6ks5-D8eGTS5S.js";
import { r as r$1 } from "./icons-BFatMQTq-Dpw_7QDw.js";
const v = "copilot-features-panel{padding:var(--space-100);font:var(--font-xsmall);display:grid;grid-template-columns:auto 1fr;gap:var(--space-50);height:auto}copilot-features-panel a{display:flex;align-items:center;gap:var(--space-50);white-space:nowrap}copilot-features-panel a svg{height:12px;width:12px;min-height:12px;min-width:12px}";
var b = Object.defineProperty, F = Object.getOwnPropertyDescriptor, d = (e, t, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? F(t, a) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o2 = (r ? l(t, a, o2) : l(o2)) || o2);
  return r && o2 && b(t, a, o2), o2;
};
const n = window.Vaadin.devTools;
let i = class extends o {
  constructor() {
    super(...arguments), this.features = [], this.handleFeatureFlags = (e) => {
      this.features = e.data.features;
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("featureFlags", this.handleFeatureFlags);
  }
  render() {
    return wr` <style>
        ${v}
      </style>
      ${this.features.map(
      (e) => wr`
          <copilot-toggle-button
            .title="${e.title}"
            ?checked=${e.enabled}
            @on-change=${(t) => this.toggleFeatureFlag(t, e)}>
          </copilot-toggle-button>
          <a class="ahreflike" href="${e.moreInfoLink}" title="Learn more" target="_blank"
            >learn more ${r$1.linkExternal}</a
          >
        `
    )}`;
  }
  toggleFeatureFlag(e, t) {
    const a = e.target.checked;
    n.frontendConnection ? (n.frontendConnection.send("setFeature", { featureId: t.id, enabled: a }), N({
      type: Fi.INFORMATION,
      message: `“${t.title}” ${a ? "enabled" : "disabled"}`,
      details: t.requiresServerRestart ? "This feature requires a server restart" : void 0,
      dismissId: `feature${t.id}${a ? "Enabled" : "Disabled"}`
    })) : n.log("error", `Unable to toggle feature ${t.title}: No server connection available`);
  }
};
d([
  g()
], i.prototype, "features", 2);
i = d([
  ls("copilot-features-panel")
], i);
const w = {
  header: "Features",
  expanded: true,
  panelOrder: 20,
  panel: "right",
  floating: false,
  tag: "copilot-features-panel",
  helpUrl: "https://vaadin.com/docs/latest/flow/configuration/feature-flags"
}, $ = {
  init(e) {
    e.addPanel(w);
  }
};
window.Vaadin.copilot.plugins.push($);
export {
  i as CopilotFeaturesPanel
};
