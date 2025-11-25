/**
 * 导航工具函数
 */

import { ROUTES } from '../config'

/**
 * 跳转到登录页
 */
export function navigateToLogin() {
  uni.reLaunch({
    url: ROUTES.LOGIN
  })
}

/**
 * 跳转到首页
 */
export function navigateToHome() {
  uni.reLaunch({
    url: ROUTES.HOME
  })
}

/**
 * 跳转到订单列表
 */
export function navigateToOrderList(status) {
  const url = status ? `${ROUTES.ORDER_LIST}?status=${status}` : ROUTES.ORDER_LIST
  uni.reLaunch({
    url
  })
}

/**
 * 跳转到创建订单
 */
export function navigateToCreateOrder(params = {}) {
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  const url = query ? `${ROUTES.ORDER_CREATE}?${query}` : ROUTES.ORDER_CREATE
  
  uni.navigateTo({
    url
  })
}

/**
 * 跳转到消息中心
 */
export function navigateToMessage() {
  uni.reLaunch({
    url: ROUTES.MESSAGE
  })
}

/**
 * 跳转到个人中心
 */
export function navigateToProfile() {
  uni.reLaunch({
    url: ROUTES.PROFILE
  })
}

/**
 * 跳转到实名认证
 */
export function navigateToVerify() {
  uni.navigateTo({
    url: ROUTES.VERIFY
  })
}

/**
 * 返回上一页
 */
export function navigateBack(fallbackUrl = ROUTES.HOME) {
  const pages = getCurrentPages()
  
  if (pages && pages.length > 1) {
    uni.navigateBack()
    return
  }

  const target = fallbackUrl || ROUTES.HOME
  uni.reLaunch({
    url: target
  })
}

/**
 * 底部导航切换
 */
export function switchTabBar(page) {
  const pageMap = {
    'home': ROUTES.HOME,
    'order': ROUTES.ORDER_LIST,
    'message': ROUTES.MESSAGE,
    'profile': ROUTES.PROFILE
  }
  
  const targetUrl = pageMap[page]
  if (targetUrl) {
    uni.reLaunch({
      url: targetUrl
    })
  }
}

