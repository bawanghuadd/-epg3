/**
 * 认证工具函数
 * 用于管理用户登录状态和token
 */

// 用户信息接口
export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  phone?: string
}

// 登录响应接口
export interface LoginResponse {
  success: boolean
  message: string
  data: {
    token: string
    userInfo: UserInfo
  }
}

// 检查是否已登录
export function checkLogin(): boolean {
  const token = uni.getStorageSync('token')
  return !!token
}

// 获取 token
export function getToken(): string {
  return uni.getStorageSync('token') || ''
}

// 获取用户信息
export function getUserInfo(): UserInfo | null {
  const userInfo = uni.getStorageSync('userInfo')
  return userInfo || null
}

// 保存登录信息
export function saveLoginInfo(token: string, userInfo: UserInfo): void {
  uni.setStorageSync('token', token)
  uni.setStorageSync('userInfo', userInfo)
}

// 清除登录信息
export function clearLoginInfo(): void {
  uni.removeStorageSync('token')
  uni.removeStorageSync('userInfo')
}

// 退出登录
export function logout(): void {
  clearLoginInfo()
  uni.reLaunch({
    url: '/pages/index/index'
  })
}

// 验证登录状态，未登录则跳转
export function requireLogin(): boolean {
  if (!checkLogin()) {
    uni.reLaunch({
      url: '/pages/index/index'
    })
    return false
  }
  return true
}

// 微信登录
export async function wechatLogin(): Promise<LoginResponse> {
  try {
    // 1. 获取微信登录凭证
    const loginRes = await uni.login({
      provider: 'weixin',
      onlyAuthorize: true
    })
    
    console.log('微信登录凭证:', loginRes.code)
    
    // 2. 将 code 发送到后端换取 token
    // TODO: 替换为实际的后端接口地址
    const result = await requestLogin(loginRes.code)
    
    if (result.success) {
      // 3. 保存登录信息
      saveLoginInfo(result.data.token, result.data.userInfo)
    }
    
    return result
  } catch (error: any) {
    console.error('微信登录失败:', error)
    throw error
  }
}

// 请求后端登录接口
async function requestLogin(code: string): Promise<LoginResponse> {
  try {
    // TODO: 替换为您的实际后端接口地址
    const API_BASE_URL = 'https://your-api-domain.com'
    
    const res = await uni.request({
      url: `${API_BASE_URL}/api/auth/wechat-login`,
      method: 'POST',
      data: {
        code: code,
        platform: 'weixin'
      },
      header: {
        'Content-Type': 'application/json'
      }
    })
    
    return res.data as LoginResponse
  } catch (error) {
    console.error('请求登录接口失败:', error)
    throw new Error('网络请求失败')
  }
}

// 获取手机号
export async function getPhoneNumber(code: string): Promise<any> {
  try {
    // TODO: 替换为您的实际后端接口地址
    const API_BASE_URL = 'https://your-api-domain.com'
    
    const res = await uni.request({
      url: `${API_BASE_URL}/api/auth/phone-number`,
      method: 'POST',
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
    
    return res.data
  } catch (error) {
    console.error('获取手机号失败:', error)
    throw new Error('获取手机号失败')
  }
}

// 更新用户信息
export function updateUserInfo(userInfo: Partial<UserInfo>): void {
  const currentUserInfo = getUserInfo()
  if (currentUserInfo) {
    const newUserInfo = { ...currentUserInfo, ...userInfo }
    uni.setStorageSync('userInfo', newUserInfo)
  }
}
