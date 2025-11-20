"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    const activeTab = common_vendor.ref(0);
    const tabs = common_vendor.ref([
      new UTSJSONObject({ name: "全部", status: 0, count: 0 }),
      new UTSJSONObject({ name: "待付款", status: 1, count: 0 }),
      new UTSJSONObject({ name: "待接单", status: 2, count: 0 }),
      new UTSJSONObject({ name: "待签约", status: 3, count: 0 }),
      new UTSJSONObject({ name: "待服务", status: 4, count: 0 }),
      new UTSJSONObject({ name: "服务中", status: 5, count: 0 }),
      new UTSJSONObject({ name: "待确认", status: 6, count: 0 }),
      new UTSJSONObject({ name: "已完成", status: 7, count: 0 }),
      new UTSJSONObject({ name: "售后中", status: 8, count: 0 }),
      new UTSJSONObject({ name: "已取消", status: 9, count: 0 })
    ]);
    const orders = common_vendor.ref([
      new UTSJSONObject({
        id: 1,
        orderNo: "ORD202501190001",
        status: 1,
        statusText: "待付款",
        serviceType: "售后服务",
        title: "智慧园区弱电系统维修",
        description: "网络设备故障，需要紧急维修",
        address: "扬州市江都区智慧产业园3号楼",
        engineerName: "",
        price: "500.00",
        createTime: "2025-01-19 10:30"
      }),
      new UTSJSONObject({
        id: 2,
        orderNo: "ORD202501190002",
        status: 3,
        statusText: "已接单（待签约）",
        serviceType: "售前服务",
        title: "充电桩安装方案咨询",
        description: "需要专业工程师评估现场",
        address: "扬州市广陵区商业广场停车场",
        engineerName: "李工",
        price: "1200.00",
        createTime: "2025-01-18 15:20"
      }),
      new UTSJSONObject({
        id: 3,
        orderNo: "ORD202501180003",
        status: 5,
        statusText: "服务中",
        serviceType: "团队服务",
        title: "智慧体育场馆综合布线",
        description: "大型项目，需要团队协作",
        address: "扬州市邗江区体育中心",
        engineerName: "张工团队",
        price: "8500.00",
        createTime: "2025-01-17 09:00"
      })
    ]);
    const filteredOrders = common_vendor.computed(() => {
      if (activeTab.value === 0) {
        return orders.value;
      }
      const targetStatus = tabs.value[activeTab.value].status;
      return orders.value.filter((order) => {
        return order.status === targetStatus;
      });
    });
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options || new UTSJSONObject(
        {}
        // 根据参数切换到对应的tab
      );
      if (options.status) {
        const statusMap = new UTSJSONObject({
          "pending": 2,
          "inService": 5,
          "toCheck": 6,
          "toRate": 7
          // 待评价(已完成)
        });
        const tabIndex = statusMap[options.status] || 0;
        if (tabIndex > 0 && tabIndex < tabs.value.length) {
          activeTab.value = tabIndex;
        }
      }
      loadOrders();
      updateTabCounts();
    });
    function switchTab(index) {
      activeTab.value = index;
    }
    function loadOrders() {
      common_vendor.index.__f__("log", "at pages/order/order.uvue:251", "加载订单列表");
    }
    function updateTabCounts() {
      tabs.value.forEach((tab) => {
        if (tab.status === 0) {
          tab.count = orders.value.length;
        } else {
          tab.count = orders.value.filter((o) => {
            return o.status === tab.status;
          }).length;
        }
      });
    }
    function goToDetail(order = null) {
      common_vendor.index.navigateTo({
        url: `/pages/order/detail?id=${order.id}`
      });
    }
    function payOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认支付",
        content: `订单金额：￥${order.price}`,
        confirmText: "确认支付",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "支付功能开发中",
              icon: "none"
            });
          }
        }
      }));
    }
    function cancelOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "取消订单",
        content: "确定要取消这个订单吗？",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "订单已取消",
              icon: "success"
            });
            loadOrders();
          }
        }
      }));
    }
    function signContract(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "签订合同",
        content: "请确认与工程师签订服务合同",
        confirmText: "确认签约",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "签约功能开发中",
              icon: "none"
            });
          }
        }
      }));
    }
    function contactEngineer(order = null) {
      common_vendor.index.showToast({
        title: "正在进入群聊...",
        icon: "loading"
      });
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "IM功能开发中",
          icon: "none"
        });
      }, 1e3);
    }
    function contactPlatform(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "联系平台",
        content: "订单已签约，需要联系平台客服协助取消",
        confirmText: "联系客服",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "客服功能开发中",
              icon: "none"
            });
          }
        }
      }));
    }
    function reportOrder(order = null) {
      common_vendor.index.showActionSheet({
        itemList: ["投诉工程师", "举报订单", "取消"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.showToast({
              title: "投诉功能开发中",
              icon: "none"
            });
          } else if (res.tapIndex === 1) {
            common_vendor.index.showToast({
              title: "举报功能开发中",
              icon: "none"
            });
          }
        }
      });
    }
    function confirmComplete(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认完成",
        content: "确认工程师已完成服务？确认后将无法撤销",
        confirmText: "确认完成",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "订单已完成",
              icon: "success"
            });
            loadOrders();
          }
        }
      }));
    }
    function applyAfterSale(order = null) {
      common_vendor.index.showActionSheet({
        itemList: ["申请退款", "申请返工", "质量问题", "取消"],
        success: (res) => {
          if (res.tapIndex < 3) {
            common_vendor.index.showToast({
              title: "售后功能开发中",
              icon: "none"
            });
          }
        }
      });
    }
    function deleteOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "删除订单",
        content: "确定要删除这个订单吗？删除后无法恢复",
        confirmText: "删除",
        confirmColor: "#E53935",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "订单已删除",
              icon: "success"
            });
            loadOrders();
          }
        }
      }));
    }
    function reOrder(order = null) {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "再来一单",
        content: "根据此订单信息创建新订单？",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: `/pages/order/create?copyFrom=${order.id}`
            });
          }
        }
      }));
    }
    function goToCreate() {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
      });
    }
    function handleFabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
      });
    }
    function navigateTo(page) {
      if (page === "order") {
        return null;
      }
      const pageMap = new UTSJSONObject({
        "home": "/pages/home/home",
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
      const __returned__ = common_vendor.e({
        a: common_vendor.f(tabs.value, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.name),
            b: tab.count > 0
          }, tab.count > 0 ? {
            c: common_vendor.t(tab.count > 99 ? "99+" : tab.count)
          } : {}, {
            d: activeTab.value === index ? 1 : "",
            e: index,
            f: common_vendor.o(($event) => {
              return switchTab(index);
            }, index)
          });
        }),
        b: filteredOrders.value.length === 0
      }, filteredOrders.value.length === 0 ? {
        c: common_vendor.o(goToCreate)
      } : {}, {
        d: common_vendor.f(filteredOrders.value, (order, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(order.orderNo),
            b: common_vendor.t(order.createTime),
            c: common_vendor.t(order.statusText),
            d: common_vendor.n("status-" + order.status),
            e: common_vendor.t(order.serviceType),
            f: common_vendor.t(order.title),
            g: common_vendor.t(order.description),
            h: common_vendor.t(order.address),
            i: order.engineerName
          }, order.engineerName ? {
            j: common_vendor.t(order.engineerName)
          } : {}, {
            k: common_vendor.t(order.price),
            l: common_vendor.o(($event) => {
              return goToDetail(order);
            }, index),
            m: order.status === 1
          }, order.status === 1 ? {
            n: common_vendor.o(($event) => {
              return cancelOrder(order);
            }, index),
            o: common_vendor.o(($event) => {
              return payOrder(order);
            }, index)
          } : {}, {
            p: order.status === 2
          }, order.status === 2 ? {
            q: common_vendor.o(($event) => {
              return cancelOrder(order);
            }, index),
            r: common_vendor.o(($event) => {
              return goToDetail(order);
            }, index)
          } : {}, {
            s: order.status === 3
          }, order.status === 3 ? {
            t: common_vendor.o(($event) => {
              return contactEngineer(order);
            }, index),
            v: common_vendor.o(($event) => {
              return signContract(order);
            }, index)
          } : {}, {
            w: order.status === 4
          }, order.status === 4 ? {
            x: common_vendor.o(($event) => {
              return contactPlatform(order);
            }, index),
            y: common_vendor.o(($event) => {
              return contactEngineer(order);
            }, index)
          } : {}, {
            z: order.status === 5
          }, order.status === 5 ? {
            A: common_vendor.o(($event) => {
              return reportOrder(order);
            }, index),
            B: common_vendor.o(($event) => {
              return contactEngineer(order);
            }, index)
          } : {}, {
            C: order.status === 6
          }, order.status === 6 ? {
            D: common_vendor.o(($event) => {
              return applyAfterSale(order);
            }, index),
            E: common_vendor.o(($event) => {
              return confirmComplete(order);
            }, index)
          } : {}, {
            F: order.status === 7
          }, order.status === 7 ? {
            G: common_vendor.o(($event) => {
              return applyAfterSale(order);
            }, index),
            H: common_vendor.o(($event) => {
              return goToDetail(order);
            }, index)
          } : {}, {
            I: order.status === 8
          }, order.status === 8 ? {
            J: common_vendor.o(($event) => {
              return goToDetail(order);
            }, index)
          } : {}, {
            K: order.status === 9
          }, order.status === 9 ? {
            L: common_vendor.o(($event) => {
              return deleteOrder(order);
            }, index),
            M: common_vendor.o(($event) => {
              return reOrder(order);
            }, index)
          } : {}, {
            N: index
          });
        }),
        e: common_assets._imports_12,
        f: common_vendor.o(($event) => {
          return navigateTo("home");
        }),
        g: common_assets._imports_1$1,
        h: common_vendor.o(($event) => {
          return navigateTo("order");
        }),
        i: common_vendor.o(handleFabClick),
        j: common_assets._imports_14,
        k: common_vendor.o(($event) => {
          return navigateTo("message");
        }),
        l: common_assets._imports_3,
        m: common_vendor.o(($event) => {
          return navigateTo("profile");
        }),
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb8c3ec3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map
