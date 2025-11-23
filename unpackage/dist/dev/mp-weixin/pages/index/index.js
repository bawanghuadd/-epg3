"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const utils_api = require("../../utils/api.js");
const utils_mockLogin = require("../../utils/mock-login.js");
const debugMode = false;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const wechatLoading = common_vendor.ref(false);
    const phoneLoading = common_vendor.ref(false);
    const showMockLogin = common_vendor.ref(true);
    const userTypeMap = {
      "customer": "customer",
      "engineer": "engineer"
    };
    function transformUserInfo(backendData = null) {
      return new UTSJSONObject({
        id: String(backendData.userId || ""),
        nickname: backendData.nickname || "微信用户",
        avatar: backendData.avatar || "",
        phone: backendData.phone || "",
        user_type: userTypeMap[backendData.userType] || "customer",
        is_verified: backendData.isVerified || false,
        vip_level: backendData.role || 0,
        createTime: Date.now()
      });
    }
    function saveLoginInfoAndNavigate(token, backendData = null) {
      const userInfo = transformUserInfo(backendData);
      utils_auth.setToken(token);
      utils_auth.setUserInfo(userInfo);
      common_vendor.index.__f__("log", "at pages/index/index.uvue:90", "登录成功，用户信息已保存:", userInfo);
      const message = backendData.isFirstLogin ? "注册成功" : "登录成功";
      common_vendor.index.showToast({
        title: message,
        icon: "success",
        duration: 1500
      });
      setTimeout(() => {
        utils_auth.navigateToHome();
      }, 1500);
    }
    common_vendor.onMounted(() => {
      if (utils_auth.isLoggedIn()) {
        utils_auth.navigateToHome();
      }
    });
    function handleWeChatLogin() {
      var _a;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (wechatLoading.value) {
          return Promise.resolve(null);
        }
        wechatLoading.value = true;
        try {
          if (debugMode)
            ;
          const loginRes = yield common_vendor.index.login(new UTSJSONObject({
            provider: "weixin",
            onlyAuthorize: true
          }));
          common_vendor.index.__f__("log", "at pages/index/index.uvue:163", "微信登录凭证:", loginRes);
          let wechatUserInfo = null;
          try {
            const userInfoRes = yield common_vendor.index.getUserProfile(new UTSJSONObject({
              desc: "用于完善用户资料"
            }));
            wechatUserInfo = userInfoRes.userInfo;
          } catch (err) {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:173", "用户拒绝授权用户信息，使用 code 登录");
          }
          const result = yield utils_api.wechatLogin(new UTSJSONObject({
            code: loginRes.code,
            nickname: (wechatUserInfo === null || wechatUserInfo === void 0 ? null : wechatUserInfo.nickName) || "",
            avatar: (wechatUserInfo === null || wechatUserInfo === void 0 ? null : wechatUserInfo.avatarUrl) || "",
            role: (_a = wechatUserInfo === null || wechatUserInfo === void 0 ? null : wechatUserInfo.role) !== null && _a !== void 0 ? _a : 1
          }));
          if (result.code === 0 && result.data) {
            saveLoginInfoAndNavigate(result.data.token, result.data);
          } else {
            throw new Error(result.msg || "登录失败");
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:193", "登录错误:", error);
          common_vendor.index.showToast({
            title: error.message || "登录失败，请稍后重试",
            icon: "none",
            duration: 2e3
          });
        } finally {
          wechatLoading.value = false;
        }
      });
    }
    function handleMockLogin(userType) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          yield utils_mockLogin.mockLogin(userType, new UTSJSONObject({
            showLoading: true,
            showToast: true,
            autoNavigate: true,
            delay: 800
          }));
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:214", "模拟登录失败:", error);
          common_vendor.index.showToast({
            title: error.message || "登录失败",
            icon: "none"
          });
        }
      });
    }
    function handlePhoneNumber(event = null) {
      var _a;
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (!((_a = event === null || event === void 0 ? null : event.detail) === null || _a === void 0 ? null : _a.code)) {
          common_vendor.index.showToast({
            title: "用户取消授权",
            icon: "none"
          });
          return Promise.resolve(null);
        }
        if (phoneLoading.value) {
          return Promise.resolve(null);
        }
        phoneLoading.value = true;
        try {
          common_vendor.index.__f__("log", "at pages/index/index.uvue:239", "手机号授权码:", event.detail.code);
          let wechatUserInfo = null;
          try {
            const userInfoRes = yield common_vendor.index.getUserProfile(new UTSJSONObject({
              desc: "用于完善用户资料"
            }));
            wechatUserInfo = userInfoRes.userInfo;
          } catch (err) {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:249", "用户拒绝授权用户信息");
          }
          const loginRes = yield common_vendor.index.login(new UTSJSONObject({
            provider: "weixin",
            onlyAuthorize: true
          }));
          const result = yield utils_api.phoneLogin(new UTSJSONObject({
            phoneCode: event.detail.code,
            wechatCode: loginRes.code,
            userInfo: wechatUserInfo
          }));
          if (result.code === 0 && result.data) {
            saveLoginInfoAndNavigate(result.data.token, result.data);
          } else {
            throw new Error(result.msg || "授权失败");
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:273", "手机号授权错误:", error);
          common_vendor.index.showToast({
            title: error.message || "授权失败，请重试",
            icon: "none"
          });
        } finally {
          phoneLoading.value = false;
        }
      });
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(handleWeChatLogin),
        c: wechatLoading.value,
        d: common_vendor.o(handlePhoneNumber),
        e: showMockLogin.value
      }, showMockLogin.value ? {
        f: common_vendor.o(($event) => {
          return handleMockLogin("customer");
        }),
        g: common_vendor.o(($event) => {
          return handleMockLogin("engineer");
        })
      } : {}, {
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
