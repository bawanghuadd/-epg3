"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "message",
  setup(__props) {
    const activeTab = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      new UTSJSONObject({ name: "全部消息", type: "all", count: 5 }),
      new UTSJSONObject({ name: "订单消息", type: "order", count: 3 }),
      new UTSJSONObject({ name: "系统消息", type: "system", count: 0 })
    ]);
    const messages = common_vendor.ref([
      new UTSJSONObject({
        id: 1,
        type: "order",
        icon: "📋",
        iconClass: "blue",
        title: "订单已确认",
        content: "您的订单 OR202511180001 已被工程师确认接单，预计今天下午到达现场。",
        time: "10分钟前",
        isRead: false
      }),
      new UTSJSONObject({
        id: 2,
        type: "order",
        icon: "👷",
        iconClass: "green",
        title: "工程师已到达",
        content: "工程师张师傅已到达现场并完成开卡，开始为您提供服务。",
        time: "1小时前",
        isRead: false
      }),
      new UTSJSONObject({
        id: 3,
        type: "order",
        icon: "💰",
        iconClass: "orange",
        title: "额外费用申请",
        content: "工程师申请额外费用 ¥300.00，原因：需更换故障配件。请及时处理。",
        time: "2小时前",
        isRead: false
      }),
      new UTSJSONObject({
        id: 4,
        type: "system",
        icon: "📢",
        iconClass: "red",
        title: "平台公告",
        content: "【重要通知】平台将于本周六凌晨2:00-4:00进行系统维护升级，期间部分功能可能受到影响。",
        time: "昨天 18:00",
        isRead: true
      }),
      new UTSJSONObject({
        id: 5,
        type: "order",
        icon: "✓",
        iconClass: "blue",
        title: "服务已完成",
        content: "订单 OR202511170012 服务已完成，请对本次服务进行评价。",
        time: "昨天 16:30",
        isRead: true
      }),
      new UTSJSONObject({
        id: 6,
        type: "order",
        icon: "📄",
        iconClass: "orange",
        title: "支付成功",
        content: "您已成功支付订单 OR202511170012，金额 ¥1,200.00。",
        time: "11-17 14:22",
        isRead: true
      }),
      new UTSJSONObject({
        id: 7,
        type: "system",
        icon: "🎁",
        iconClass: "green",
        title: "优惠券到账",
        content: "恭喜您获得新用户专属优惠券：满500减50，有效期30天。",
        time: "11-16 10:00",
        isRead: true
      }),
      new UTSJSONObject({
        id: 8,
        type: "system",
        icon: "🛡️",
        iconClass: "red",
        title: "实名认证审核通过",
        content: "您的实名认证已审核通过，现在可以享受更多平台服务。",
        time: "11-15 09:30",
        isRead: true
      })
    ]);
    const filteredMessages = common_vendor.computed(() => {
      const tab = tabs.value[activeTab.value];
      if (tab.type === "all") {
        return messages.value;
      }
      return messages.value.filter((msg) => {
        return msg.type === tab.type;
      });
    });
    common_vendor.onMounted(() => {
      loadMessages();
      updateTabCounts();
    });
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function switchTab(index) {
      activeTab.value = index;
    }
    function loadMessages() {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:207", "加载消息列表");
    }
    function updateTabCounts() {
      const allUnread = messages.value.filter((msg) => {
        return !msg.isRead;
      }).length;
      tabs.value[0].count = allUnread;
      const orderUnread = messages.value.filter((msg) => {
        return msg.type === "order" && !msg.isRead;
      }).length;
      tabs.value[1].count = orderUnread;
      const systemUnread = messages.value.filter((msg) => {
        return msg.type === "system" && !msg.isRead;
      }).length;
      tabs.value[2].count = systemUnread;
    }
    function handleMessageClick(msg = null) {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:227", "点击消息:", msg.title);
      if (!msg.isRead) {
        msg.isRead = true;
        updateTabCounts();
      }
      switch (msg.type) {
        case "order":
          common_vendor.index.navigateTo({
            url: `/pages/message/detail?id=${msg.id}`
          });
          break;
        case "service":
          common_vendor.index.navigateTo({
            url: `/pages/chat/service`
          });
          break;
        case "system":
        case "notice":
          common_vendor.index.navigateTo({
            url: `/pages/message/detail?id=${msg.id}`
          });
          break;
        default:
          common_vendor.index.showToast({
            title: "查看消息：" + msg.title,
            icon: "none"
          });
      }
    }
    function markAllRead() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "标记已读",
        content: "确定将所有消息标记为已读吗？",
        success: (res) => {
          if (res.confirm) {
            messages.value.forEach((msg) => {
              msg.isRead = true;
            });
            updateTabCounts();
            common_vendor.index.showToast({
              title: "已全部标记为已读",
              icon: "success"
            });
          }
        }
      }));
    }
    function handleFabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
      });
    }
    function navigateTo(page) {
      if (page === "message") {
        return null;
      }
      const pageMap = new UTSJSONObject({
        "home": "/pages/home/home",
        "order": "/pages/order/order",
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
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.o(markAllRead),
        c: common_vendor.f(tabs.value, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.name),
            b: tab.count > 0
          }, tab.count > 0 ? {
            c: common_vendor.t(tab.count)
          } : {}, {
            d: activeTab.value === index ? 1 : "",
            e: index,
            f: common_vendor.o(($event) => {
              return switchTab(index);
            }, index)
          });
        }),
        d: common_vendor.f(filteredMessages.value, (msg, index, i0) => {
          return common_vendor.e({
            a: !msg.isRead
          }, !msg.isRead ? {} : {}, {
            b: common_vendor.t(msg.icon),
            c: common_vendor.n(msg.iconClass),
            d: common_vendor.t(msg.title),
            e: common_vendor.t(msg.time),
            f: common_vendor.t(msg.content),
            g: !msg.isRead ? 1 : "",
            h: index,
            i: common_vendor.o(($event) => {
              return handleMessageClick(msg);
            }, index)
          });
        }),
        e: filteredMessages.value.length === 0
      }, filteredMessages.value.length === 0 ? {} : {}, {
        f: common_assets._imports_12,
        g: common_vendor.o(($event) => {
          return navigateTo("home");
        }),
        h: common_assets._imports_13,
        i: common_vendor.o(($event) => {
          return navigateTo("order");
        }),
        j: common_vendor.o(handleFabClick),
        k: common_assets._imports_2$1,
        l: common_vendor.o(($event) => {
          return navigateTo("message");
        }),
        m: common_assets._imports_3,
        n: common_vendor.o(($event) => {
          return navigateTo("profile");
        }),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e403ad2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
