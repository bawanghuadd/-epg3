/**
 * 认证相关工具函数
 */

import { STORAGE_KEYS, USER_TYPES, ROUTES } from '../config'

/**
 * 获取 token
 */
export function getToken() {
  return uni.getStorageSync(STORAGE_KEYS.TOKEN)
}

/**
 * 设置 token
 */
export function setToken(token) {
  uni.setStorageSync(STORAGE_KEYS.TOKEN, token)
}

/**
 * 移除 token
 */
export function removeToken() {
  uni.removeStorageSync(STORAGE_KEYS.TOKEN)
}

/**
 * 检查是否已登录
 */
export function isLoggedIn() {
  return !!getToken()
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return uni.getStorageSync(STORAGE_KEYS.USER_INFO) || null
}

/**
 * 设置用户信息
 */
export function setUserInfo(userInfo) {
  uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo)
}

/**
 * 移除用户信息
 */
export function removeUserInfo() {
  uni.removeStorageSync(STORAGE_KEYS.USER_INFO)
}

/**
 * 清除所有登录信息
 */
export function clearAuth() {
  removeToken()
  removeUserInfo()
}

/**
 * 检查用户类型
 */
export function checkUserType(expectedType) {
  const userInfo = getUserInfo()
  return userInfo?.user_type === expectedType
}

/**
 * 是否为客户
 */
export function isCustomer() {
  return checkUserType(USER_TYPES.CUSTOMER)
}

/**
 * 是否为工程师
 */
export function isEngineer() {
  return checkUserType(USER_TYPES.ENGINEER)
}

/**
 * 根据用户类型跳转到对应首页
 */
export function navigateToHome() {
  const userInfo = getUserInfo()
  const homeRoute = userInfo?.user_type === USER_TYPES.ENGINEER 
    ? ROUTES.ENGINEER_HOME 
    : ROUTES.HOME
  
  uni.reLaunch({
    url: homeRoute
  })
}

/**
 * 检查登录状态，未登录则跳转到登录页
 */
export function requireAuth() {
  if (!isLoggedIn()) {
    uni.reLaunch({
      url: ROUTES.LOGIN
    })
    return false
  }
  return true
}

/**
 * 检查用户类型，不匹配则跳转到对应首页
 */
export function requireUserType(expectedType) {
  if (!requireAuth()) {
    return false
  }
  
  const userInfo = getUserInfo()
  if (userInfo?.user_type !== expectedType) {
    navigateToHome()
    return false
  }
  
  return true
}

/**
 * 退出登录
 */
export function logout() {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          clearAuth()
          uni.reLaunch({
            url: ROUTES.LOGIN,
            complete: () => {
              resolve(true)
            }
          })
        } else {
          resolve(false)
        }
      }
    })
  })
}

