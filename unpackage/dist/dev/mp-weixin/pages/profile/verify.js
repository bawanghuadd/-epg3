"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "verify",
  setup(__props) {
    const formData = common_vendor.ref(new UTSJSONObject({
      realName: "",
      idCard: "",
      idCardFront: "",
      idCardBack: ""
    }));
    const agreed = common_vendor.ref(false);
    const canSubmit = common_vendor.computed(() => {
      return formData.value.realName && formData.value.idCard && formData.value.idCardFront && formData.value.idCardBack && agreed.value;
    });
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function chooseImage(type) {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 0) {
            if (type === "front") {
              formData.value.idCardFront = tempFilePaths[0];
            } else {
              formData.value.idCardBack = tempFilePaths[0];
            }
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/profile/verify.uvue:190", "选择图片失败:", err);
          common_vendor.index.showToast({
            title: "选择图片失败",
            icon: "none"
          });
        }
      }));
    }
    function showExample() {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "示例说明",
        content: "请确保身份证照片清晰完整，四角可见，光线充足，无反光遮挡。",
        showCancel: false
      }));
    }
    function onAgreementChange(e = null) {
      agreed.value = e.detail.value.length > 0;
    }
    function viewAgreement(type) {
      const title = type === "verify" ? "实名认证协议" : "隐私政策";
      common_vendor.index.showModal(new UTSJSONObject({
        title,
        content: "协议内容页面开发中...",
        showCancel: false
      }));
    }
    function validateIdCard(idCard) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(idCard);
    }
    function handleSubmit() {
      if (!canSubmit.value) {
        common_vendor.index.showToast({
          title: "请完善所有信息",
          icon: "none"
        });
        return null;
      }
      if (!validateIdCard(formData.value.idCard)) {
        common_vendor.index.showToast({
          title: "身份证号格式不正确",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.showModal(new UTSJSONObject({
        title: "确认提交",
        content: "请确认您提供的信息真实有效，提交后将进入审核流程。",
        success: (res) => {
          if (res.confirm) {
            submitVerification();
          }
        }
      }));
    }
    function submitVerification() {
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal(new UTSJSONObject({
          title: "提交成功",
          content: "您的实名认证申请已提交，我们将在1-3个工作日内完成审核，请耐心等待。",
          showCancel: false,
          success: () => {
            const userInfo = common_vendor.index.getStorageSync("userInfo");
            if (userInfo) {
              userInfo.is_verified = true;
              userInfo.verify_status = "pending";
              common_vendor.index.setStorageSync("userInfo", userInfo);
            }
            common_vendor.index.navigateBack();
          }
        }));
      }, 2e3);
    }
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack),
        b: formData.value.realName,
        c: common_vendor.o(($event) => {
          return formData.value.realName = $event.detail.value;
        }),
        d: formData.value.idCard,
        e: common_vendor.o(($event) => {
          return formData.value.idCard = $event.detail.value;
        }),
        f: formData.value.idCardFront
      }, formData.value.idCardFront ? {
        g: formData.value.idCardFront
      } : {}, {
        h: common_vendor.o(($event) => {
          return chooseImage("front");
        }),
        i: formData.value.idCardBack
      }, formData.value.idCardBack ? {
        j: formData.value.idCardBack
      } : {}, {
        k: common_vendor.o(($event) => {
          return chooseImage("back");
        }),
        l: common_vendor.o(showExample),
        m: agreed.value,
        n: common_vendor.o(($event) => {
          return viewAgreement("verify");
        }),
        o: common_vendor.o(($event) => {
          return viewAgreement("privacy");
        }),
        p: common_vendor.o(onAgreementChange),
        q: !canSubmit.value ? 1 : "",
        r: common_vendor.o(handleSubmit),
        s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d46df6f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/verify.js.map
