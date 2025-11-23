/**
 * 模拟登录工具函数
 * 用于开发环境快速测试不同用户角色
 */

import { setToken, setUserInfo, navigateToHome } from './auth'

/**
 * 模拟用户数据库
 */
export const MOCK_USERS = {
  customer: {
    id: 'mock_customer_001',
    nickname: '测试客户',
    avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    phone: '13800138000',
    user_type: 'customer',
    is_verified: false,
    vip_level: 0,
    realName: '张三',
    idCard: '110101199001011234',
    createTime: 1700000000000
  },
  engineer: {
    id: 'mock_engineer_001',
    nickname: '测试工程师',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    phone: '13900139000',
    user_type: 'engineer',
    is_verified: true,
    vip_level: 2,
    realName: '李四',
    idCard: '110101198801011234',
    skills: ['智慧园区', '充电桩维修', 'AGV机器人'],
    rating: 4.8,
    completedOrders: 156,
    createTime: 1690000000000
  },
  customer2: {
    id: 'mock_customer_002',
    nickname: '王小明',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ1ibGPibibKIr9zFzpqZHM1xg1XB1qGb1V4PHmAQZvPOJ8Z5f2icGZEJ5EQZDtRnG2dXBgicHwqXJXGQw/132',
    phone: '13700137000',
    user_type: 'customer',
    is_verified: true,
    vip_level: 1,
    realName: '王小明',
    idCard: '110101199201011234',
    createTime: 1695000000000
  },
  engineer2: {
    id: 'mock_engineer_002',
    nickname: '资深维修师',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoNFbicwbP0QI2OHPjQicia6u8h1ia7u9TdEUvLXgqckYKBgAiaYZEzB62e6JtUzC7O9TqGJD33Eqsiat7A/132',
    phone: '13600136000',
    user_type: 'engineer',
    is_verified: true,
    vip_level: 3,
    realName: '赵大锤',
    idCard: '110101198501011234',
    skills: ['智慧交管', '智慧警务', '应急消防', '出入口通道'],
    rating: 4.9,
    completedOrders: 328,
    createTime: 1680000000000
  }
}

/**
 * 生成模拟 token
 */
export function generateMockToken(userType) {
  return `mock_token_${userType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 模拟登录
 * @param {string} userType - 用户类型：customer, engineer, customer2, engineer2
 * @param {object} options - 配置选项
 */
export function mockLogin(userType = 'customer', options = {}) {
  const {
    showLoading = true,
    showToast = true,
    autoNavigate = true,
    delay = 800
  } = options

  return new Promise((resolve, reject) => {
    // 检查用户类型是否有效
    if (!MOCK_USERS[userType]) {
      const error = new Error(`无效的用户类型: ${userType}`)
      reject(error)
      if (showToast) {
        uni.showToast({
          title: error.message,
          icon: 'none'
        })
      }
      return
    }

    if (showLoading) {
      uni.showLoading({
        title: '登录中...',
        mask: true
      })
    }

    // 模拟网络延迟
    setTimeout(() => {
      try {
        const mockToken = generateMockToken(userType)
        const mockUserInfo = {
          ...MOCK_USERS[userType],
          loginTime: Date.now()
        }

        // 保存登录信息
        setToken(mockToken)
        setUserInfo(mockUserInfo)

        if (showLoading) {
          uni.hideLoading()
        }

        console.log('🎭 模拟登录成功:', {
          userType,
          token: mockToken,
          userInfo: mockUserInfo
        })

        if (showToast) {
          uni.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500
          })
        }

        // 自动跳转到首页
        if (autoNavigate) {
          setTimeout(() => {
            navigateToHome()
          }, showToast ? 1500 : 0)
        }

        resolve({
          token: mockToken,
          userInfo: mockUserInfo
        })
      } catch (error) {
        if (showLoading) {
          uni.hideLoading()
        }
        console.error('模拟登录失败:', error)
        reject(error)
      }
    }, delay)
  })
}

/**
 * 快速切换用户
 * 在已登录状态下快速切换到其他测试账号
 */
export function switchMockUser(userType) {
  return mockLogin(userType, {
    showLoading: false,
    showToast: true,
    autoNavigate: true,
    delay: 300
  })
}

/**
 * 获取所有模拟用户列表
 */
export function getMockUserList() {
  return Object.keys(MOCK_USERS).map(key => ({
    key,
    ...MOCK_USERS[key]
  }))
}

/**
 * 是否为模拟登录（通过 token 判断）
 */
export function isMockLogin() {
  const { getToken } = require('./auth')
  const token = getToken()
  return token && token.startsWith('mock_token_')
}

