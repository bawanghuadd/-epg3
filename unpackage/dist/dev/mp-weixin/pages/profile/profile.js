"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_mockLogin = require("../../utils/mock-login.js");
if (!Math) {
  common_vendor.unref(MockUserSwitch)();
}
const MockUserSwitch = () => "../../components/MockUserSwitch/MockUserSwitch.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "profile",
  setup(__props) {
    const userInfo = common_vendor.ref(new UTSJSONObject({
      id: "CU10086",
      nickname: "张先生",
      avatar: "",
      vip_level: 1
    }));
    const stats = common_vendor.ref(new UTSJSONObject({
      totalAmount: "1,280",
      coupons: 5,
      points: "2,680"
    }));
    const showDevTools = common_vendor.ref(false);
    const orderCounts = common_vendor.ref(new UTSJSONObject({
      pending: 3,
      inService: 1,
      toCheck: 0,
      toRate: 0,
      total: 4
    }));
    common_vendor.onMounted(() => {
      loadUserInfo();
      showDevTools.value = utils_mockLogin.isMockLogin();
    });
    function loadUserInfo() {
      const info = common_vendor.index.getStorageSync("userInfo");
      if (info) {
        userInfo.value = Object.assign(Object.assign({}, userInfo.value), info);
      }
    }
    function goToSettings() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/settings"
      });
    }
    function goToProfile() {
      common_vendor.index.showToast({
        title: "个人信息页面开发中",
        icon: "none"
      });
    }
    function goToOrders(status = null) {
      if (status) {
        common_vendor.index.reLaunch({
          url: `/pages/order/order?status=${status}`
        });
      } else {
        common_vendor.index.reLaunch({
          url: "/pages/order/order"
        });
      }
    }
    function goToMockLoginDemo() {
      common_vendor.index.navigateTo({
        url: "/pages/test/mock-login-demo"
      });
    }
    function handleMenuClick(type) {
      const routes = new UTSJSONObject({
        "address": "/pages/profile/address",
        "favorite": "/pages/profile/favorite",
        "wallet": "/pages/profile/wallet",
        "coupon": "/pages/profile/coupon",
        "service": "/pages/chat/service",
        "agreement": "/pages/profile/agreement",
        "privacy": "/pages/profile/privacy",
        "about": "/pages/profile/about"
      });
      if (routes[type]) {
        common_vendor.index.navigateTo({
          url: routes[type]
        });
      } else {
        common_vendor.index.showToast({
          title: "功能开发中",
          icon: "none"
        });
      }
    }
    function handleFabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
      });
    }
    function navigateTo(page) {
      if (page === "profile") {
        return null;
      }
      const pageMap = new UTSJSONObject({
        "home": "/pages/home/home",
        "order": "/pages/order/order",
        "message": "/pages/message/message"
      });
      if (pageMap[page]) {
        common_vendor.index.reLaunch({
          url: pageMap[page]
        });
      }
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goToSettings),
        b: userInfo.value.avatar
      }, userInfo.value.avatar ? {
        c: userInfo.value.avatar
      } : {}, {
        d: common_vendor.t(userInfo.value.nickname || "微信用户"),
        e: userInfo.value.vip_level > 0
      }, userInfo.value.vip_level > 0 ? {} : {}, {
        f: common_vendor.t(userInfo.value.id || "CU10086"),
        g: common_vendor.o(goToProfile),
        h: common_vendor.t(stats.value.totalAmount),
        i: common_vendor.t(stats.value.coupons),
        j: common_vendor.t(stats.value.points),
        k: common_vendor.o(goToOrders),
        l: common_assets._imports_2$3,
        m: orderCounts.value.pending > 0
      }, orderCounts.value.pending > 0 ? {
        n: common_vendor.t(orderCounts.value.pending)
      } : {}, {
        o: common_vendor.o(($event) => {
          return goToOrders("pending");
        }),
        p: common_assets._imports_1$3,
        q: orderCounts.value.inService > 0
      }, orderCounts.value.inService > 0 ? {
        r: common_vendor.t(orderCounts.value.inService)
      } : {}, {
        s: common_vendor.o(($event) => {
          return goToOrders("inService");
        }),
        t: common_assets._imports_2$2,
        v: common_vendor.o(($event) => {
          return goToOrders("toCheck");
        }),
        w: common_assets._imports_3$1,
        x: common_vendor.o(($event) => {
          return goToOrders("toRate");
        }),
        y: common_assets._imports_4$2,
        z: common_vendor.o(($event) => {
          return handleMenuClick("address");
        }),
        A: common_assets._imports_5$1,
        B: common_vendor.o(($event) => {
          return handleMenuClick("favorite");
        }),
        C: common_assets._imports_6,
        D: common_vendor.o(($event) => {
          return handleMenuClick("wallet");
        }),
        E: common_assets._imports_7,
        F: stats.value.coupons > 0
      }, stats.value.coupons > 0 ? {
        G: common_vendor.t(stats.value.coupons)
      } : {}, {
        H: common_vendor.o(($event) => {
          return handleMenuClick("coupon");
        }),
        I: common_assets._imports_8,
        J: common_vendor.o(($event) => {
          return handleMenuClick("service");
        }),
        K: common_assets._imports_9,
        L: common_vendor.o(($event) => {
          return handleMenuClick("agreement");
        }),
        M: common_assets._imports_10,
        N: common_vendor.o(($event) => {
          return handleMenuClick("privacy");
        }),
        O: common_assets._imports_11,
        P: common_vendor.o(($event) => {
          return handleMenuClick("about");
        }),
        Q: showDevTools.value
      }, showDevTools.value ? {
        R: common_vendor.o(goToMockLoginDemo)
      } : {}, {
        S: common_assets._imports_2,
        T: common_vendor.o(($event) => {
          return navigateTo("home");
        }),
        U: common_assets._imports_3,
        V: orderCounts.value.total > 0
      }, orderCounts.value.total > 0 ? {
        W: common_vendor.t(orderCounts.value.total)
      } : {}, {
        X: common_vendor.o(($event) => {
          return navigateTo("order");
        }),
        Y: common_vendor.o(handleFabClick),
        Z: common_assets._imports_1$2,
        aa: common_vendor.o(($event) => {
          return navigateTo("message");
        }),
        ab: common_assets._imports_15,
        ac: common_vendor.o(($event) => {
          return navigateTo("profile");
        }),
        ad: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a67938aa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
