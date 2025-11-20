"use strict";
const common_vendor = require("../common/vendor.js");
function checkLogin() {
  const token = common_vendor.index.getStorageSync("token");
  return !!token;
}
function getToken() {
  return common_vendor.index.getStorageSync("token") || "";
}
function saveLoginInfo(token, userInfo) {
  common_vendor.index.setStorageSync("token", token);
  common_vendor.index.setStorageSync("userInfo", userInfo);
}
function getPhoneNumber(code) {
  return common_vendor.__awaiter(this, void 0, void 0, function* () {
    try {
      const API_BASE_URL = "https://your-api-domain.com";
      const res = yield common_vendor.index.request({
        url: `${API_BASE_URL}/api/auth/phone-number`,
        method: "POST",
        data: {
          code
        },
        header: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });
      return res.data;
    } catch (error) {
      common_vendor.index.__f__("error", "at utils/auth.ts:144", "获取手机号失败:", error);
      throw new Error("获取手机号失败");
    }
  });
}
exports.checkLogin = checkLogin;
exports.getPhoneNumber = getPhoneNumber;
exports.saveLoginInfo = saveLoginInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
