"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/home/home.js";
  "./pages/order/order.js";
  "./pages/message/message.js";
  "./pages/profile/profile.js";
  "./pages/profile/verify.js";
  "./pages/order/create.js";
  "./pages/service/presales.js";
  "./pages/service/aftersales.js";
  "./pages/engineer/home.js";
  "./pages/engineer/workorders.js";
  "./pages/engineer/income.js";
  "./pages/test/mock-login-demo.js";
}
const _sfc_main = common_vendor.defineComponent({
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.uvue:7", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.uvue:10", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.uvue:13", "App Hide");
  },
  onExit: function() {
    common_vendor.index.__f__("log", "at App.uvue:34", "App Exit");
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
