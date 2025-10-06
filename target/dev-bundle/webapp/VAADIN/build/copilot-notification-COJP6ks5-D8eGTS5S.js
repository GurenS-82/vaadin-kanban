import { b as b$1, $, Z as Zi } from "./indexhtml-DqTFWpr5.js";
const a = 5e3;
let o = 1;
function m(s) {
  b$1.notifications.includes(s) && (s.dontShowAgain && s.dismissId && r(s.dismissId), b$1.removeNotification(s), $.emit("notification-dismissed", s));
}
function f(s) {
  return Zi.getDismissedNotifications().includes(s);
}
function r(s) {
  f(s) || Zi.addDismissedNotification(s);
}
function u(s) {
  return !(s.dismissId && (f(s.dismissId) || b$1.notifications.find((t) => t.dismissId === s.dismissId)));
}
function N(s) {
  u(s) && c(s);
}
function c(s) {
  const t = o;
  o += 1;
  const e = { ...s, id: t, dontShowAgain: false, animatingOut: false };
  b$1.setNotifications([...b$1.notifications, e]), !s.link && !s.dismissId && setTimeout(() => {
    m(e);
  }, s.delay ?? a), $.emit("notification-shown", s);
}
export {
  m as dismissNotification,
  N as showNotification
};
