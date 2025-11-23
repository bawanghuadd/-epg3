"use strict";
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
function getToken() {
  return common_vendor.index.getStorageSync(config_index.STORAGE_KEYS.TOKEN);
}
function setToken(token) {
  common_vendor.index.setStorageSync(config_index.STORAGE_KEYS.TOKEN, token);
}
function removeToken() {
  common_vendor.index.removeStorageSync(config_index.STORAGE_KEYS.TOKEN);
}
function isLoggedIn() {
  return !!getToken();
}
function getUserInfo() {
  return common_vendor.index.getStorageSync(config_index.STORAGE_KEYS.USER_INFO) || null;
}
function setUserInfo(userInfo) {
  common_vendor.index.setStorageSync(config_index.STORAGE_KEYS.USER_INFO, userInfo);
}
function removeUserInfo() {
  common_vendor.index.removeStorageSync(config_index.STORAGE_KEYS.USER_INFO);
}
function clearAuth() {
  removeToken();
  removeUserInfo();
}
function navigateToHome() {
  const userInfo = getUserInfo();
  const homeRoute = (userInfo == null ? void 0 : userInfo.user_type) === config_index.USER_TYPES.ENGINEER ? config_index.ROUTES.ENGINEER_HOME : config_index.ROUTES.HOME;
  common_vendor.index.reLaunch({
    url: homeRoute
  });
}
function logout() {
  return new Promise((resolve) => {
    common_vendor.index.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: (res) => {
        if (res.confirm) {
          clearAuth();
          common_vendor.index.reLaunch({
            url: config_index.ROUTES.LOGIN,
            complete: () => {
              resolve(true);
            }
          });
        } else {
          resolve(false);
        }
      }
    });
  });
}
exports.getToken = getToken;
exports.getUserInfo = getUserInfo;
exports.isLoggedIn = isLoggedIn;
exports.logout = logout;
exports.navigateToHome = navigateToHome;
exports.setToken = setToken;
exports.setUserInfo = setUserInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
