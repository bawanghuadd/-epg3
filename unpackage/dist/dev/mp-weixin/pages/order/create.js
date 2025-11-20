"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create",
  setup(__props) {
    const formData = common_vendor.ref(new UTSJSONObject({
      serviceType: 0,
      domainId: 0,
      title: "",
      description: "",
      images: [],
      address: "",
      contact: "",
      phone: "",
      serviceDate: "",
      remark: ""
    }));
    const serviceTypes = common_vendor.ref([
      new UTSJSONObject({ id: 1, name: "找售后" }),
      new UTSJSONObject({ id: 2, name: "找售前" }),
      new UTSJSONObject({ id: 3, name: "找团队" })
    ]);
    const businessDomains = common_vendor.ref([
      new UTSJSONObject({ id: 1, name: "充电桩" }),
      new UTSJSONObject({ id: 2, name: "智慧交管" }),
      new UTSJSONObject({ id: 3, name: "智慧园区" }),
      new UTSJSONObject({ id: 4, name: "智慧体育" }),
      new UTSJSONObject({ id: 5, name: "智慧警务" }),
      new UTSJSONObject({ id: 6, name: "应急消防" }),
      new UTSJSONObject({ id: 7, name: "出入口通道" }),
      new UTSJSONObject({ id: 8, name: "AGV机器人" }),
      new UTSJSONObject({ id: 9, name: "大楼弱电" })
    ]);
    const canSubmit = common_vendor.computed(() => {
      return formData.value.serviceType && formData.value.domainId && formData.value.title && formData.value.description && formData.value.address && formData.value.contact && formData.value.phone && formData.value.serviceDate;
    });
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options || new UTSJSONObject(
        {}
        // 如果有传入服务类型
      );
      if (options.service_type) {
        const serviceTypeIndex = parseInt(options.service_type) - 1;
        if (serviceTypeIndex >= 0 && serviceTypeIndex < serviceTypes.value.length) {
          formData.value.serviceType = serviceTypeIndex;
        }
      }
      if (options.domain_id) {
        const domainId = parseInt(options.domain_id);
        const domain = UTS.arrayFind(businessDomains.value, (d = null) => {
          return d.id === domainId;
        });
        if (domain) {
          formData.value.domainId = domainId;
        }
      }
      if (options.copyFrom) {
        common_vendor.index.__f__("log", "at pages/order/create.uvue:227", "复制订单:", options.copyFrom);
      }
    });
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function onServiceTypeChange(e = null) {
      formData.value.serviceType = e.detail.value;
    }
    function onDomainChange(e = null) {
      const index = e.detail.value;
      formData.value.domainId = businessDomains.value[index].id;
    }
    function chooseImage() {
      const remainCount = 6 - formData.value.images.length;
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: remainCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          formData.value.images.push(...res.tempFilePaths);
        }
      }));
    }
    function deleteImage(index) {
      formData.value.images.splice(index, 1);
    }
    function chooseAddress() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "提示",
        content: "地址选择功能开发中，V2版本将支持地图选点",
        showCancel: false
      }));
    }
    function onDateChange(e = null) {
      formData.value.serviceDate = e.detail.value;
    }
    function handleSubmit() {
      if (!canSubmit.value) {
        common_vendor.index.showToast({
          title: "请完善工单信息",
          icon: "none"
        });
        return null;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认提交",
        content: "确认提交工单吗？提交后将为您匹配合适的工程师。",
        success: (res) => {
          if (res.confirm) {
            submitOrder();
          }
        }
      }));
    }
    function submitOrder() {
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal(new UTSJSONObject({
          title: "提交成功",
          content: "工单已提交，我们将尽快为您匹配工程师。",
          showCancel: false,
          success: () => {
            common_vendor.index.reLaunch({
              url: "/pages/order/order"
            });
          }
        }));
      }, 2e3);
    }
    return (_ctx, _cache) => {
      "raw js";
      var _a;
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.t(formData.value.serviceType ? serviceTypes.value[formData.value.serviceType].name : "请选择服务类型"),
        c: !formData.value.serviceType ? 1 : "",
        d: serviceTypes.value,
        e: common_vendor.o(onServiceTypeChange),
        f: common_vendor.t(formData.value.domainId ? (_a = businessDomains.value.find((d) => {
          return d.id === formData.value.domainId;
        })) == null ? void 0 : _a.name : "请选择业务领域"),
        g: !formData.value.domainId ? 1 : "",
        h: businessDomains.value,
        i: common_vendor.o(onDomainChange),
        j: formData.value.title,
        k: common_vendor.o(($event) => {
          return formData.value.title = $event.detail.value;
        }),
        l: formData.value.description,
        m: common_vendor.o(($event) => {
          return formData.value.description = $event.detail.value;
        }),
        n: common_vendor.f(formData.value.images, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => {
              return deleteImage(index);
            }, index),
            c: index
          };
        }),
        o: formData.value.images.length < 6
      }, formData.value.images.length < 6 ? {
        p: common_vendor.o(chooseImage)
      } : {}, {
        q: common_vendor.t(formData.value.address || "请选择服务地址"),
        r: !formData.value.address ? 1 : "",
        s: common_vendor.o(chooseAddress),
        t: formData.value.contact,
        v: common_vendor.o(($event) => {
          return formData.value.contact = $event.detail.value;
        }),
        w: formData.value.phone,
        x: common_vendor.o(($event) => {
          return formData.value.phone = $event.detail.value;
        }),
        y: common_vendor.t(formData.value.serviceDate || "请选择日期"),
        z: !formData.value.serviceDate ? 1 : "",
        A: common_vendor.o(onDateChange),
        B: formData.value.remark,
        C: common_vendor.o(($event) => {
          return formData.value.remark = $event.detail.value;
        }),
        D: !canSubmit.value ? 1 : "",
        E: common_vendor.o(handleSubmit),
        F: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f068813"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/create.js.map
