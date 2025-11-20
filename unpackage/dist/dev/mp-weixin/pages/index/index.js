"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const isDev = true;
const debugMode = false;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const wechatLoading = common_vendor.ref(false);
    const phoneLoading = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (utils_auth.checkLogin()) {
        common_vendor.index.reLaunch({
          url: "/pages/home/home"
        });
      }
    });
    function requestLogin(code) {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          const API_BASE_URL = "https://your-api-domain.com";
          const res = yield common_vendor.index.request({
            url: `${API_BASE_URL}/api/auth/wechat-login`,
            method: "POST",
            data: new UTSJSONObject({
              code,
              platform: "weixin"
            }),
            header: new UTSJSONObject({
              "Content-Type": "application/json"
            })
          });
          return res.data;
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:73", "请求登录接口失败:", error);
          throw new Error("网络请求失败");
        }
      });
    }
    function handleWeChatLogin() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        if (wechatLoading.value) {
          return Promise.resolve(null);
        }
        wechatLoading.value = true;
        try {
          if (debugMode)
            ;
          if (isDev) {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:125", "开发模式：使用模拟登录");
            yield simulateLogin();
            return Promise.resolve(null);
          }
          const loginRes = yield common_vendor.index.login(new UTSJSONObject({
            provider: "weixin",
            onlyAuthorize: true
          }));
          common_vendor.index.__f__("log", "at pages/index/index.uvue:137", "微信登录凭证:", loginRes.code);
          const result = yield requestLogin(loginRes.code);
          if (result.success) {
            utils_auth.saveLoginInfo(result.data.token, result.data.userInfo);
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success",
              duration: 1500
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/home/home"
              });
            }, 1500);
          } else {
            throw new Error(result.message || "登录失败");
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:164", "登录错误:", error);
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
    function simulateLogin() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
          return setTimeout(resolve, 1e3);
        });
        const mockToken = "mock_token_" + Date.now();
        const mockUserInfo = new UTSJSONObject(
          {
            id: "10001",
            nickname: "测试用户",
            avatar: "",
            phone: "",
            is_verified: false,
            vip_level: 0,
            createTime: Date.now()
          }
          // 保存到本地存储
        );
        utils_auth.saveLoginInfo(mockToken, mockUserInfo);
        common_vendor.index.__f__("log", "at pages/index/index.uvue:195", "模拟登录成功:", mockUserInfo);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/home/home"
          });
        }, 1500);
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
          common_vendor.index.__f__("log", "at pages/index/index.uvue:229", "手机号授权码:", event.detail.code);
          if (isDev) {
            common_vendor.index.__f__("log", "at pages/index/index.uvue:233", "开发模式：模拟手机号授权");
            yield new Promise((resolve) => {
              return setTimeout(resolve, 500);
            });
            const userInfo = common_vendor.index.getStorageSync("userInfo") || new UTSJSONObject({});
            userInfo.phone = "138****8888";
            common_vendor.index.setStorageSync("userInfo", userInfo);
            common_vendor.index.showToast({
              title: "手机号授权成功",
              icon: "success"
            });
            return Promise.resolve(null);
          }
          const result = yield utils_auth.getPhoneNumber(event.detail.code);
          if (result.success) {
            const userInfo = common_vendor.index.getStorageSync("userInfo") || new UTSJSONObject({});
            userInfo.phone = result.data.phoneNumber;
            common_vendor.index.setStorageSync("userInfo", userInfo);
            common_vendor.index.showToast({
              title: "手机号授权成功",
              icon: "success"
            });
          } else {
            throw new Error(result.message || "授权失败");
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.uvue:264", "手机号授权错误:", error);
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
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_vendor.o(handleWeChatLogin),
        c: wechatLoading.value,
        d: common_vendor.o(handlePhoneNumber),
        e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
