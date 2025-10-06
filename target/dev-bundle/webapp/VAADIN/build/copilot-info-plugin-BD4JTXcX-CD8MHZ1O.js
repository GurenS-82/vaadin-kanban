import { z as zl, b as b$1, w as wr, F as Fi, E, x as xs, $, h as hl, a as El, O as Ol, K as Ki, l as ls } from "./indexhtml-DqTFWpr5.js";
import { g as g$1 } from "./state-DIGAkjaT-C84QFF6G.js";
import { o } from "./base-panel-Bo-7csvK-Cte7bcaO.js";
import { showNotification as N$1 } from "./copilot-notification-COJP6ks5-D8eGTS5S.js";
import { r as r$1 } from "./icons-BFatMQTq-Dpw_7QDw.js";
const O = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:var(--space-100) var(--space-50);font:var(--font-xsmall)}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}copilot-info-panel li{list-style:none}";
var U = function() {
  var e = document.getSelection();
  if (!e.rangeCount)
    return function() {
    };
  for (var t = document.activeElement, a = [], s = 0; s < e.rangeCount; s++)
    a.push(e.getRangeAt(s));
  switch (t.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      t.blur();
      break;
    default:
      t = null;
      break;
  }
  return e.removeAllRanges(), function() {
    e.type === "Caret" && e.removeAllRanges(), e.rangeCount || a.forEach(function(r) {
      e.addRange(r);
    }), t && t.focus();
  };
}, j = U, v = {
  "text/plain": "Text",
  "text/html": "Url",
  default: "Text"
}, T = "Copy to clipboard: #{key}, Enter";
function F(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function N(e, t) {
  var a, s, r, o2, l, n, m = false;
  t || (t = {}), a = t.debug || false;
  try {
    r = j(), o2 = document.createRange(), l = document.getSelection(), n = document.createElement("span"), n.textContent = e, n.ariaHidden = "true", n.style.all = "unset", n.style.position = "fixed", n.style.top = 0, n.style.clip = "rect(0, 0, 0, 0)", n.style.whiteSpace = "pre", n.style.webkitUserSelect = "text", n.style.MozUserSelect = "text", n.style.msUserSelect = "text", n.style.userSelect = "text", n.addEventListener("copy", function(c) {
      if (c.stopPropagation(), t.format)
        if (c.preventDefault(), typeof c.clipboardData > "u") {
          a && console.warn("unable to use e.clipboardData"), a && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
          var h = v[t.format] || v.default;
          window.clipboardData.setData(h, e);
        } else
          c.clipboardData.clearData(), c.clipboardData.setData(t.format, e);
      t.onCopy && (c.preventDefault(), t.onCopy(c.clipboardData));
    }), document.body.appendChild(n), o2.selectNodeContents(n), l.addRange(o2);
    var D = document.execCommand("copy");
    if (!D)
      throw new Error("copy command was unsuccessful");
    m = true;
  } catch (c) {
    a && console.error("unable to copy using execCommand: ", c), a && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), m = true;
    } catch (h) {
      a && console.error("unable to copy using clipboardData: ", h), a && console.error("falling back to prompt"), s = F("message" in t ? t.message : T), window.prompt(s, e);
    }
  } finally {
    l && (typeof l.removeRange == "function" ? l.removeRange(o2) : l.removeAllRanges()), n && document.body.removeChild(n), r();
  }
  return m;
}
var B = N;
const M = /* @__PURE__ */ hl(B);
var L = Object.defineProperty, W = Object.getOwnPropertyDescriptor, g = (e, t, a, s) => {
  for (var r = s > 1 ? void 0 : s ? W(t, a) : t, o2 = e.length - 1, l; o2 >= 0; o2--)
    (l = e[o2]) && (r = (s ? l(t, a, r) : l(r)) || r);
  return s && r && L(t, a, r), r;
};
const b = wr`<a
  href="${El}"
  target="_blank"
  @click="${() => x("idea")}"
  title="Get IntelliJ plugin"
  >Get IntelliJ plugin</a
>`, w = wr`<a
  href="${Ol}"
  target="_blank"
  @click="${() => x("vscode")}"
  title="Get VS Code plugin"
  >Get VS Code plugin</a
>`;
function x(e) {
  return Ki("get-plugin", e), false;
}
let f = class extends o {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e) => {
      const t = JSON.parse(e.data.info);
      this.serverInfo = t.versions, this.updateJdkInfo(t.jdkInfo), this.updateIdePluginInfo(), zl().then((a) => {
        a && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.onEventBus("system-info-with-callback", (e) => {
      e.detail.callback(this.getInfoForClipboard(e.detail.notify));
    }), this.reaction(
      () => b$1.idePluginState,
      () => {
        this.updateIdePluginInfo(), this.requestUpdate("serverInfo");
      }
    );
  }
  updateJdkInfo(e) {
    const t = e.extendedClassDefCapable && e.runningWithExtendClassDef && e.hotswapAgentFound && e.runningWitHotswap && e.hotswapAgentPluginsFound, a = e.jrebel;
    b$1.jdkInfo = {
      ...e,
      activeHotswap: a ? "jrebel" : t ? "hotswapagent" : void 0
    };
  }
  updateIdePluginInfo() {
    const e = this.getIndex("Copilot IDE Plugin");
    let t = "false", a;
    b$1.idePluginState?.active ? t = `${b$1.idePluginState.version}-${b$1.idePluginState.ide}` : b$1.idePluginState?.ide === "vscode" ? a = w : b$1.idePluginState?.ide === "idea" ? a = b : a = wr`${b} or ${w}`, this.serverInfo[e].version = t, this.serverInfo[e].more = a;
  }
  getIndex(e) {
    return this.serverInfo.findIndex((t) => t.name === e);
  }
  render() {
    return wr`<style>
        ${O}
      </style>
      <div class="info-tray">
        <dl>
          ${[...this.serverInfo, ...this.clientInfo].map(
      (e) => wr`
              <dt>${e.name}</dt>
              <dd title="${e.version}" style="${e.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${this.renderVersion(e)} ${e.more}
              </dd>
            `
    )}
        </dl>
      </div>`;
  }
  renderVersion(e) {
    return e.name === "Java Hotswap" ? this.renderJavaHotswap() : this.renderValue(e.version);
  }
  renderValue(e) {
    return e === "false" ? d(false) : e === "true" ? d(true) : e;
  }
  getInfoForClipboard(e) {
    const t = this.renderRoot.querySelectorAll(".info-tray dt"), r = Array.from(t).map((o2) => ({
      key: o2.textContent.trim(),
      value: o2.nextElementSibling.textContent.trim()
    })).filter((o2) => o2.key !== "Live reload").filter((o2) => !o2.key.startsWith("Vaadin Emplo")).map((o2) => {
      const { key: l } = o2;
      let { value: n } = o2;
      return l === "Copilot IDE Plugin" && !b$1.idePluginState?.active ? n = "false" : l === "Java Hotswap" && (n = String(n.includes("JRebel is in use") || n.includes("HotswapAgent is in use"))), `${l}: ${n}`;
    }).join(`
`);
    return e && N$1({
      type: Fi.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), r.trim();
  }
  renderJavaHotswap() {
    const e = b$1.jdkInfo;
    if (!e)
      return E;
    const t = e.activeHotswap === "jrebel";
    return !e.extendedClassDefCapable && !t ? wr`<details>
        <summary>${d(false)} No Hotswap solution in use</summary>
        <p>To enable hotswap for Java, you can either use HotswapAgent or JRebel.</p>
        <p>HotswapAgent is an open source project that utilizes the JetBrains Runtime (JDK).</p>
        <ul>
          <li>If you are running IntelliJ, edit the launch configuration to use the bundled JDK.</li>
          <li>
            Otherwise, download it from
            <a target="_blank" href="https://github.com/JetBrains/JetBrainsRuntime/releases"
              >the JetBrains release page</a
            >
            to get started.
          </li>
        </ul>
        <p>
          JRebel is a commercial solution available from
          <a target="_blank" href="https://www.jrebel.com/">jrebel.com</a>
        </p>
      </details>` : t ? wr`${d(true)} JRebel is in use` : e.activeHotswap === "hotswapagent" ? wr`${d(true)} HotswapAgent is in use` : wr`<details>
      <summary>${d(false)} HotswapAgent is partially enabled</summary>
      <ul style="margin:0;padding:0">
        <li>${d(e.extendedClassDefCapable)} JDK supports hotswapping</li>
        <li>
          ${d(e.runningWithExtendClassDef)} JDK hotswapping
          enabled${e.runningWithExtendClassDef ? E : wr`<br />Add the <code>-XX:+AllowEnhancedClassRedefinition</code> JVM argument when launching the
                application`}
        </li>
        <li>
          ${d(e.hotswapAgentFound)} HotswapAgent
          installed${e.hotswapAgentFound ? E : wr`<br /><a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
                  >Download the latest HotswapAgent</a
                >
                and place it in <code>${e.hotswapAgentLocation}</code>`}
        </li>
        <li>
          ${d(e.runningWitHotswap)} HotswapAgent configured
          ${e.runningWitHotswap ? E : wr`<br />Add the <code>-XX:HotswapAgent=fatjar</code> JVM argument when launching the application`}
        </li>
        <li>
          ${d(e.hotswapAgentPluginsFound)} Vaadin HotswapAgent plugin available
          ${e.hotswapAgentPluginsFound ? E : wr`<div>
                Add src/main/resources/hotswap-agent.properties containing
                <!-- prettier-ignore -->
                <code class="codeblock"><copilot-copy></copilot-copy>pluginPackages=com.vaadin.hilla.devmode.hotswapagent</code>
                and restart the application
              </div>`}
        </li>
        <li>
          ${d(e.runningInJavaDebugMode)} Application running in Java debug mode
          ${e.runningInJavaDebugMode ? E : wr`<div>Start the application in debug mode in the IDE</div>`}
        </li>
      </ul>
    </details> `;
  }
};
g([
  g$1()
], f.prototype, "serverInfo", 2);
g([
  g$1()
], f.prototype, "clientInfo", 2);
f = g([
  ls("copilot-info-panel")
], f);
let y = class extends xs {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return wr`<button title="Copy to clipboard" aria-label="Copy to clipboard" theme="icon tertiary">
      <span
        @click=${() => {
      $.emit("system-info-with-callback", {
        callback: M,
        notify: true
      });
    }}
        >${r$1.copy}</span
      >
    </button>`;
  }
};
y = g([
  ls("copilot-info-actions")
], y);
const G = {
  header: "Info",
  expanded: true,
  panelOrder: 15,
  panel: "right",
  floating: false,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions"
}, K = {
  init(e) {
    e.addPanel(G);
  }
};
window.Vaadin.copilot.plugins.push(K);
function d(e) {
  return e ? wr`<span class="true">☑</span>` : wr`<span class="false">☒</span>`;
}
export {
  y as Actions,
  f as CopilotInfoPanel
};
