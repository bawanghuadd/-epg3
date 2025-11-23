/**
 * @module auth
 * @description 认证相关工具函数
 * 提供登录、登出、token 管理、用户信息管理等功能
 */

import { STORAGE_KEYS, USER_TYPES, ROUTES } from '../config'

/**
 * 获取存储的 token
 * @returns {string|null} token 字符串，如果不存在则返回 null
 * @example
 * const token = getToken()
 * if (token) {
 *   // 已登录
 * }
 */
export function getToken() {
  return uni.getStorageSync(STORAGE_KEYS.TOKEN) || null
}

/**
 * 设置 token 到本地存储
 * @param {string} token - 用户 token
 * @throws {Error} 如果 token 为空则抛出错误
 * @example
 * setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 */
export function setToken(token) {
  if (!token) {
    throw new Error('Token 不能为空')
  }
  uni.setStorageSync(STORAGE_KEYS.TOKEN, token)
}

/**
 * 移除存储的 token
 * @example
 * removeToken()
 */
export function removeToken() {
  uni.removeStorageSync(STORAGE_KEYS.TOKEN)
}

/**
 * 检查用户是否已登录
 * @returns {boolean} 已登录返回 true，否则返回 false
 * @example
 * if (isLoggedIn()) {
 *   console.log('用户已登录')
 * } else {
 *   console.log('用户未登录')
 * }
 */
export function isLoggedIn() {
  return !!getToken()
}

/**
 * 获取用户信息
 * @returns {Object|null} 用户信息对象，如果不存在则返回 null
 * @property {string} id - 用户 ID
 * @property {string} nickname - 用户昵称
 * @property {string} avatar - 用户头像 URL
 * @property {string} phone - 用户手机号
 * @property {string} user_type - 用户类型 ('customer' | 'engineer')
 * @property {boolean} is_verified - 是否已实名认证
 * @property {number} vip_level - VIP 等级
 * @example
 * const userInfo = getUserInfo()
 * console.log(userInfo.nickname)
 */
export function getUserInfo() {
  return uni.getStorageSync(STORAGE_KEYS.USER_INFO) || null
}

/**
 * 设置用户信息到本地存储
 * @param {Object} userInfo - 用户信息对象
 * @param {string} userInfo.id - 用户 ID
 * @param {string} userInfo.nickname - 用户昵称
 * @param {string} [userInfo.avatar] - 用户头像 URL
 * @param {string} [userInfo.phone] - 用户手机号
 * @param {string} userInfo.user_type - 用户类型
 * @param {boolean} [userInfo.is_verified] - 是否已实名认证
 * @param {number} [userInfo.vip_level] - VIP 等级
 * @throws {Error} 如果必填字段缺失则抛出错误
 * @example
 * setUserInfo({
 *   id: '123456',
 *   nickname: '张三',
 *   user_type: 'customer'
 * })
 */
export function setUserInfo(userInfo) {
  if (!userInfo || !userInfo.id || !userInfo.user_type) {
    throw new Error('用户信息缺少必填字段: id, user_type')
  }
  uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo)
}

/**
 * 移除存储的用户信息
 * @example
 * removeUserInfo()
 */
export function removeUserInfo() {
  uni.removeStorageSync(STORAGE_KEYS.USER_INFO)
}

/**
 * 清除所有认证信息（token + 用户信息）
 * @example
 * clearAuth()
 */
export function clearAuth() {
  removeToken()
  removeUserInfo()
}

/**
 * 检查用户类型是否匹配
 * @param {string} expectedType - 期望的用户类型 ('customer' | 'engineer')
 * @returns {boolean} 匹配返回 true，否则返回 false
 * @example
 * if (checkUserType(USER_TYPES.ENGINEER)) {
 *   console.log('当前用户是工程师')
 * }
 */
export function checkUserType(expectedType) {
  const userInfo = getUserInfo()
  return userInfo?.user_type === expectedType
}

/**
 * 判断当前用户是否为客户
 * @returns {boolean} 是客户返回 true，否则返回 false
 * @example
 * if (isCustomer()) {
 *   // 显示客户相关功能
 * }
 */
export function isCustomer() {
  return checkUserType(USER_TYPES.CUSTOMER)
}

/**
 * 判断当前用户是否为工程师
 * @returns {boolean} 是工程师返回 true，否则返回 false
 * @example
 * if (isEngineer()) {
 *   // 显示工程师相关功能
 * }
 */
export function isEngineer() {
  return checkUserType(USER_TYPES.ENGINEER)
}

/**
 * 根据用户类型跳转到对应的首页
 * - 工程师跳转到工程师首页
 * - 客户跳转到客户首页
 * @example
 * navigateToHome()
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
 * @returns {boolean} 已登录返回 true，未登录返回 false 并跳转到登录页
 * @example
 * onMounted(() => {
 *   if (!requireAuth()) {
 *     return // 未登录，已自动跳转到登录页
 *   }
 *   // 已登录，继续执行业务逻辑
 *   loadData()
 * })
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
 * @param {string} expectedType - 期望的用户类型 ('customer' | 'engineer')
 * @returns {boolean} 类型匹配返回 true，不匹配返回 false 并跳转
 * @example
 * onMounted(() => {
 *   if (!requireUserType(USER_TYPES.ENGINEER)) {
 *     return // 不是工程师，已自动跳转
 *   }
 *   // 是工程师，继续执行
 *   loadEngineerData()
 * })
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
 * 会弹出确认对话框，用户确认后清除认证信息并跳转到登录页
 * @returns {Promise<boolean>} 用户确认退出返回 true，取消返回 false
 * @example
 * async function handleLogout() {
 *   const confirmed = await logout()
 *   if (confirmed) {
 *     console.log('已退出登录')
 *   }
 * }
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

/**
 * 获取用户 ID
 * @returns {string|null} 用户 ID，如果未登录或用户信息不存在则返回 null
 * @example
 * const userId = getUserId()
 */
export function getUserId() {
  const userInfo = getUserInfo()
  return userInfo?.id || null
}

/**
 * 获取用户昵称
 * @returns {string} 用户昵称，如果未登录或昵称不存在则返回 '未知用户'
 * @example
 * const nickname = getUserNickname()
 */
export function getUserNickname() {
  const userInfo = getUserInfo()
  return userInfo?.nickname || '未知用户'
}

/**
 * 检查用户是否已实名认证
 * @returns {boolean} 已认证返回 true，否则返回 false
 * @example
 * if (!isVerified()) {
 *   // 提示用户进行实名认证
 * }
 */
export function isVerified() {
  const userInfo = getUserInfo()
  return userInfo?.is_verified === true
}

/**
 * 检查用户是否为 VIP
 * @returns {boolean} 是 VIP 返回 true，否则返回 false
 * @example
 * if (isVip()) {
 *   // 显示 VIP 专属功能
 * }
 */
export function isVip() {
  const userInfo = getUserInfo()
  return (userInfo?.vip_level || 0) > 0
}

/**
 * 更新本地用户信息（部分更新）
 * @param {Object} updates - 要更新的字段
 * @example
 * updateUserInfo({ 
 *   nickname: '新昵称',
 *   avatar: 'new-avatar-url.jpg'
 * })
 */
export function updateUserInfo(updates) {
  const currentUserInfo = getUserInfo()
  if (!currentUserInfo) {
    throw new Error('用户信息不存在，无法更新')
  }
  
  const newUserInfo = {
    ...currentUserInfo,
    ...updates
  }
  
  setUserInfo(newUserInfo)
}

// 默认导出（向后兼容）
export default {
  getToken,
  setToken,
  removeToken,
  isLoggedIn,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  clearAuth,
  checkUserType,
  isCustomer,
  isEngineer,
  navigateToHome,
  requireAuth,
  requireUserType,
  logout,
  getUserId,
  getUserNickname,
  isVerified,
  isVip,
  updateUserInfo
}

