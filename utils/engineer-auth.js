/**
 * 工程师认证状态检查工具
 * 用于全局判断工程师认证状态并显示对应页面
 */

import { ROUTES } from '../config'

/**
 * 认证状态枚举
 */
export const VERIFY_STATUS = {
  UNVERIFIED: null,        // 未认证
  PENDING: 'pending',      // 审核中
  APPROVED: 'approved',    // 已通过
  REJECTED: 'rejected'     // 已拒绝
}

/**
 * 认证状态文本映射
 */
export const VERIFY_STATUS_TEXT = {
  [VERIFY_STATUS.UNVERIFIED]: '未认证',
  [VERIFY_STATUS.PENDING]: '审核中',
  [VERIFY_STATUS.APPROVED]: '已认证',
  [VERIFY_STATUS.REJECTED]: '认证失败'
}

/**
 * 获取工程师认证状态
 * @returns {Object} { status, info }
 */
export function getEngineerVerifyStatus() {
  const status = uni.getStorageSync('engineerVerifyStatus')
  const info = uni.getStorageSync('engineerVerifyInfo')
  return {
    status: status || null,
    info: info || null
  }
}

/**
 * 设置工程师认证状态
 * @param {String} status - 认证状态
 * @param {Object} info - 认证信息
 */
export function setEngineerVerifyStatus(status, info = null) {
  if (status) {
    uni.setStorageSync('engineerVerifyStatus', status)
  } else {
    uni.removeStorageSync('engineerVerifyStatus')
  }
  
  if (info) {
    uni.setStorageSync('engineerVerifyInfo', info)
  } else {
    uni.removeStorageSync('engineerVerifyInfo')
  }
}

/**
 * 清除工程师认证状态
 */
export function clearEngineerVerifyStatus() {
  uni.removeStorageSync('engineerVerifyStatus')
  uni.removeStorageSync('engineerVerifyInfo')
}

/**
 * 检查工程师是否已认证通过
 * @returns {Boolean}
 */
export function isEngineerVerified() {
  const { status } = getEngineerVerifyStatus()
  return status === VERIFY_STATUS.APPROVED
}

/**
 * 检查工程师是否在审核中
 * @returns {Boolean}
 */
export function isEngineerVerifyPending() {
  const { status } = getEngineerVerifyStatus()
  return status === VERIFY_STATUS.PENDING
}

/**
 * 检查工程师是否被拒绝
 * @returns {Boolean}
 */
export function isEngineerVerifyRejected() {
  const { status } = getEngineerVerifyStatus()
  return status === VERIFY_STATUS.REJECTED
}

/**
 * 检查工程师是否未认证
 * @returns {Boolean}
 */
export function isEngineerUnverified() {
  const { status } = getEngineerVerifyStatus()
  return !status || status === VERIFY_STATUS.REJECTED
}

/**
 * 获取认证状态文本
 * @returns {String}
 */
export function getVerifyStatusText() {
  const { status } = getEngineerVerifyStatus()
  return VERIFY_STATUS_TEXT[status] || '未认证'
}

/**
 * 检查工程师认证状态并跳转到对应页面
 * @param {Object} options - 配置选项
 * @param {String} options.verifiedUrl - 已认证时跳转的页面
 * @param {String} options.unverifiedUrl - 未认证时跳转的页面
 * @param {String} options.pendingUrl - 审核中时跳转的页面（可选）
 * @param {String} options.rejectedUrl - 已拒绝时跳转的页面（可选）
 * @param {Boolean} options.showToast - 是否显示提示（默认true）
 * @param {String} options.navigateType - 跳转方式：navigateTo, redirectTo, reLaunch, switchTab（默认navigateTo）
 * @returns {Object} { verified, status, navigated }
 */
export function checkEngineerVerifyAndNavigate(options = {}) {
  const {
    verifiedUrl,
    unverifiedUrl,
    pendingUrl,
    rejectedUrl,
    showToast = true,
    navigateType = 'navigateTo'
  } = options

  const { status } = getEngineerVerifyStatus()
  
  let targetUrl = null
  let toastMessage = ''
  let verified = false

  // 根据认证状态决定跳转页面
  switch (status) {
    case VERIFY_STATUS.APPROVED:
      // 已认证通过
      targetUrl = verifiedUrl
      verified = true
      break
      
    case VERIFY_STATUS.PENDING:
      // 审核中
      targetUrl = pendingUrl || unverifiedUrl
      toastMessage = '您的认证申请正在审核中，请耐心等待'
      break
      
    case VERIFY_STATUS.REJECTED:
      // 已拒绝
      targetUrl = rejectedUrl || unverifiedUrl
      toastMessage = '您的认证申请未通过，请重新提交'
      break
      
    default:
      // 未认证
      targetUrl = unverifiedUrl
      toastMessage = '请先完成工程师认证'
      break
  }

  // 显示提示
  if (showToast && toastMessage) {
    uni.showToast({
      title: toastMessage,
      icon: 'none',
      duration: 2000
    })
  }

  // 跳转页面
  let navigated = false
  if (targetUrl) {
    const navigateFn = uni[navigateType] || uni.navigateTo
    navigateFn({
      url: targetUrl,
      success: () => {
        navigated = true
      },
      fail: (error) => {
        console.error('页面跳转失败:', error)
      }
    })
  }

  return {
    verified,
    status,
    navigated
  }
}

/**
 * 工程师认证状态守卫
 * 在需要认证的页面的 onLoad 中调用
 * @param {Object} options - 配置选项
 * @param {Boolean} options.requireVerified - 是否要求已认证（默认true）
 * @param {String} options.unverifiedUrl - 未认证时跳转的页面（默认工程师认证页面）
 * @param {Boolean} options.allowPending - 是否允许审核中的工程师访问（默认false）
 * @param {Boolean} options.showToast - 是否显示提示（默认true）
 * @returns {Boolean} 是否允许访问
 */
export function engineerVerifyGuard(options = {}) {
  const {
    requireVerified = true,
    unverifiedUrl = '/pages/engineer/verify',
    allowPending = false,
    showToast = true
  } = options

  if (!requireVerified) {
    return true
  }

  const { status } = getEngineerVerifyStatus()

  // 已认证通过，允许访问
  if (status === VERIFY_STATUS.APPROVED) {
    return true
  }

  // 审核中
  if (status === VERIFY_STATUS.PENDING) {
    if (allowPending) {
      return true
    }
    
    if (showToast) {
      uni.showToast({
        title: '您的认证申请正在审核中',
        icon: 'none',
        duration: 2000
      })
    }
    
    setTimeout(() => {
      uni.redirectTo({
        url: unverifiedUrl,
        fail: () => {
          uni.navigateTo({ url: unverifiedUrl })
        }
      })
    }, 2000)
    
    return false
  }

  // 未认证或已拒绝
  if (showToast) {
    const message = status === VERIFY_STATUS.REJECTED 
      ? '您的认证申请未通过，请重新提交' 
      : '请先完成工程师认证'
    
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }

  setTimeout(() => {
    uni.redirectTo({
      url: unverifiedUrl,
      fail: () => {
        uni.navigateTo({ url: unverifiedUrl })
      }
    })
  }, 2000)

  return false
}

/**
 * 从服务器获取并更新工程师认证状态
 * @returns {Promise<Object>} { success, status, info }
 */
export async function fetchAndUpdateEngineerVerifyStatus() {
  try {
    // TODO: 调用后端接口获取认证状态
    const response = await uni.request({
      url: '/api/engineer/verify/status',
      method: 'GET'
    })

    if (response.data.code === 200) {
      const { status, verifyInfo } = response.data.data
      setEngineerVerifyStatus(status, verifyInfo)
      return {
        success: true,
        status,
        info: verifyInfo
      }
    } else {
      return {
        success: false,
        message: response.data.message || '获取认证状态失败'
      }
    }
  } catch (error) {
    console.error('获取工程师认证状态失败:', error)
    return {
      success: false,
      message: '网络请求失败'
    }
  }
}

/**
 * 显示认证状态信息
 * @param {Object} options - 配置选项
 */
export function showVerifyStatusInfo(options = {}) {
  const { status, info } = getEngineerVerifyStatus()
  const statusText = getVerifyStatusText()
  
  let content = `当前认证状态：${statusText}`
  
  if (status === VERIFY_STATUS.PENDING) {
    content += '\n\n您的认证申请正在审核中，预计1-3个工作日内完成审核。'
  } else if (status === VERIFY_STATUS.REJECTED && info && info.rejectReason) {
    content += `\n\n拒绝原因：${info.rejectReason}\n\n请修改后重新提交。`
  } else if (status === VERIFY_STATUS.APPROVED && info) {
    content += `\n\n认证姓名：${info.realName || '未知'}\n认证时间：${info.verifyTime || '未知'}`
  }

  uni.showModal({
    title: '认证状态',
    content,
    showCancel: false,
    confirmText: '我知道了',
    ...options
  })
}

export default {
  VERIFY_STATUS,
  VERIFY_STATUS_TEXT,
  getEngineerVerifyStatus,
  setEngineerVerifyStatus,
  clearEngineerVerifyStatus,
  isEngineerVerified,
  isEngineerVerifyPending,
  isEngineerVerifyRejected,
  isEngineerUnverified,
  getVerifyStatusText,
  checkEngineerVerifyAndNavigate,
  engineerVerifyGuard,
  fetchAndUpdateEngineerVerifyStatus,
  showVerifyStatusInfo
}

