import { x as xs, $ } from "./indexhtml-DqTFWpr5.js";
class o extends xs {
  constructor() {
    super(...arguments), this.eventBusRemovers = [], this.messageHandlers = {};
  }
  createRenderRoot() {
    return this;
  }
  onEventBus(e, s) {
    this.eventBusRemovers.push($.on(e, s));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.eventBusRemovers.forEach((e) => e());
  }
  onCommand(e, s) {
    this.messageHandlers[e] = s;
  }
  handleMessage(e) {
    return this.messageHandlers[e.command] ? (this.messageHandlers[e.command].call(this, e), true) : false;
  }
}
export {
  o
};
