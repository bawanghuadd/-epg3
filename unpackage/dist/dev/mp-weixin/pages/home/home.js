"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const city = common_vendor.ref("扬州");
    function handleLogout() {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        try {
          yield utils_auth.logout();
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/home/home.uvue:117", "退出登录失败:", error);
        }
      });
    }
    const mainServices = common_vendor.ref([
      new UTSJSONObject({ icon: "/static/icon-png-home/扳手.png", name: "找售后", desc: "维护保养" }),
      new UTSJSONObject({ icon: "/static/icons/货车.png", name: "找售前", desc: "安装调试" }),
      new UTSJSONObject({ icon: "/static/icons/团队.png", name: "找团队", desc: "项目外包" })
    ]);
    const gridServices = common_vendor.ref([
      new UTSJSONObject({ icon: "/static/icons/charging-pile-line.png", name: "场站充电桩", bgClass: "bg-red", iconClass: "icon-red" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/信号灯 (2).png", name: "智慧交管", bgClass: "bg-blue", iconClass: "icon-blue" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/智慧园区.png", name: "智慧园区", bgClass: "bg-green", iconClass: "icon-green" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/跑步 (1).png", name: "智慧体育", bgClass: "bg-orange", iconClass: "icon-orange" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/盾牌保卫.png", name: "智慧警务", bgClass: "bg-purple", iconClass: "icon-purple" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/灭火器.png", name: "应急消防", bgClass: "bg-red", iconClass: "icon-red" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/出入口通道.png", name: "出入口通道", bgClass: "bg-cyan", iconClass: "icon-cyan" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/机器人 (2).png", name: "AGV机器人", bgClass: "bg-pink", iconClass: "icon-pink" }),
      new UTSJSONObject({ icon: "/static/icons/building-weak.png", name: "大楼弱电", bgClass: "bg-blue", iconClass: "icon-blue" }),
      new UTSJSONObject({ icon: "/static/icons/cod-payment.png", name: "代收货款", bgClass: "bg-red", iconClass: "icon-red" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/二维码 (1).png", name: "扫码下单", bgClass: "bg-blue", iconClass: "icon-blue" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/团队 (2).png", name: "找团队", bgClass: "bg-teal", iconClass: "icon-teal" })
    ]);
    const actions = common_vendor.ref([
      new UTSJSONObject({ icon: "/static/icons/customer-service.png", name: "在线客服" }),
      new UTSJSONObject({ icon: "/static/icons/service-query.png", name: "服务查询" }),
      new UTSJSONObject({ icon: "/static/icon-png-home/握手,合作,协作.png", name: "企业合作" })
    ]);
    common_vendor.onMounted(() => {
      checkLoginStatus();
    });
    function checkLoginStatus() {
      const token = common_vendor.index.getStorageSync("token");
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!token || !userInfo) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
        return null;
      }
      if (userInfo.user_type === "engineer") {
        common_vendor.index.reLaunch({
          url: "/pages/engineer/home"
        });
        return null;
      }
      common_vendor.index.__f__("log", "at pages/home/home.uvue:173", "客户已登录:", userInfo);
    }
    function selectCity() {
      common_vendor.index.showActionSheet({
        itemList: ["扬州", "南京", "苏州", "无锡", "常州"],
        success: (res) => {
          const cities = ["扬州", "南京", "苏州", "无锡", "常州"];
          city.value = cities[res.tapIndex];
          common_vendor.index.showToast({
            title: `已切换至${city.value}`,
            icon: "none"
          });
        }
      });
    }
    function showMenu() {
      common_vendor.index.showActionSheet({
        itemList: ["设置", "帮助", "关于", "退出登录"],
        success: (res) => {
          if (res.tapIndex === 3) {
            common_vendor.index.showModal(new UTSJSONObject({
              title: "提示",
              content: "确定要退出登录吗？",
              success: (modalRes) => {
                if (modalRes.confirm) {
                  common_vendor.index.removeStorageSync("token");
                  common_vendor.index.removeStorageSync("userInfo");
                  common_vendor.index.reLaunch({
                    url: "/pages/index/index"
                  });
                }
              }
            }));
          } else {
            common_vendor.index.showToast({
              title: `选择了选项${res.tapIndex + 1}`,
              icon: "none"
            });
          }
        }
      });
    }
    function showSearch() {
      common_vendor.index.showToast({
        title: "搜索功能开发中",
        icon: "none"
      });
    }
    function handleServiceClick(item = null) {
      if (item.name === "找售前") {
        common_vendor.index.navigateTo({
          url: "/pages/service/presales"
        });
      } else if (item.name === "找售后") {
        common_vendor.index.navigateTo({
          url: "/pages/service/aftersales"
        });
      } else if (item.name === "找团队") {
        common_vendor.index.navigateTo({
          url: "/pages/service/presales?service_type=4"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/order/create?service_type=3"
        });
      }
    }
    function handleGridServiceClick(item = null) {
      const domainMap = new UTSJSONObject({
        "场站充电桩": 1,
        "智慧交管": 2,
        "智慧园区": 3,
        "智慧体育": 4,
        "智慧警务": 5,
        "应急消防": 6,
        "出入口通道": 7,
        "AGV机器人": 8,
        "大楼弱电": 9,
        "代收货款": 10,
        "扫码下单": 11,
        "找团队": 12
      });
      const domainId = domainMap[item.name] || 0;
      if (["场站充电桩", "智慧交管", "智慧园区", "智慧体育"].includes(item.name)) {
        common_vendor.index.navigateTo({
          url: `/pages/service/aftersales?domain_id=${domainId}&service_name=${encodeURIComponent(item.name)}`
        });
      } else if (item.name === "扫码下单") {
        common_vendor.index.scanCode(new UTSJSONObject({
          success: (scanRes) => {
            common_vendor.index.showToast({
              title: "扫码功能开发中",
              icon: "none"
            });
          }
        }));
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/order/create?domain_id=${domainId}`
        });
      }
    }
    function handleBannerClick() {
      common_vendor.index.showToast({
        title: "会员权益功能开发中",
        icon: "none"
      });
    }
    function handlePrivilegeClick() {
      common_vendor.index.showToast({
        title: "权益开通功能开发中",
        icon: "none"
      });
    }
    function handleActionClick(item = null) {
      if (item.name === "在线客服") {
        common_vendor.index.showToast({
          title: "客服功能开发中",
          icon: "none"
        });
      } else if (item.name === "服务查询") {
        common_vendor.index.reLaunch({
          url: "/pages/order/order"
        });
      } else if (item.name === "企业合作") {
        common_vendor.index.showToast({
          title: "企业合作功能开发中",
          icon: "none"
        });
      }
    }
    function handleFabClick() {
      common_vendor.index.showActionSheet({
        itemList: ["发起服务请求", "扫码下单", "拍照识别"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.navigateTo({
              url: "/pages/order/create"
            });
          } else if (res.tapIndex === 1) {
            common_vendor.index.scanCode(new UTSJSONObject({
              success: (scanRes) => {
                common_vendor.index.showToast({
                  title: "扫码功能开发中",
                  icon: "none"
                });
              }
            }));
          } else if (res.tapIndex === 2) {
            common_vendor.index.chooseImage(new UTSJSONObject({
              count: 1,
              sourceType: ["camera"],
              success: (imgRes) => {
                common_vendor.index.showToast({
                  title: "拍照识别功能开发中",
                  icon: "none"
                });
              }
            }));
          }
        }
      });
    }
    function navigateTo(page) {
      if (page === "home") {
        return null;
      }
      const pageMap = new UTSJSONObject({
        "order": "/pages/order/order",
        "message": "/pages/message/message",
        "profile": "/pages/profile/profile"
      });
      if (pageMap[page]) {
        common_vendor.index.reLaunch({
          url: pageMap[page]
        });
      }
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_1,
        b: common_vendor.t(city.value),
        c: common_vendor.o(selectCity),
        d: common_assets._imports_1$1,
        e: common_vendor.o(handleLogout),
        f: common_vendor.o(showMenu),
        g: common_assets._imports_0$1,
        h: common_vendor.o(showSearch),
        i: common_vendor.o(handleBannerClick),
        j: common_assets._imports_2,
        k: common_vendor.o(handlePrivilegeClick),
        l: common_vendor.f(mainServices.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.desc),
            d: index,
            e: common_vendor.o(($event) => {
              return handleServiceClick(item);
            }, index)
          };
        }),
        m: common_vendor.f(gridServices.value, (item, index, i0) => {
          return {
            a: common_vendor.n(item.iconClass),
            b: item.icon,
            c: common_vendor.n(item.bgClass),
            d: common_vendor.t(item.name),
            e: index,
            f: common_vendor.o(($event) => {
              return handleGridServiceClick(item);
            }, index)
          };
        }),
        n: common_vendor.f(actions.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => {
              return handleActionClick(item);
            }, index)
          };
        }),
        o: common_assets._imports_4,
        p: common_vendor.o(($event) => {
          return navigateTo("home");
        }),
        q: common_assets._imports_3,
        r: common_vendor.o(($event) => {
          return navigateTo("order");
        }),
        s: common_vendor.o(handleFabClick),
        t: common_assets._imports_1$2,
        v: common_vendor.o(($event) => {
          return navigateTo("message");
        }),
        w: common_assets._imports_5,
        x: common_vendor.o(($event) => {
          return navigateTo("profile");
        }),
        y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2a3e8b3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
