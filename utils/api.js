/**
 * API 接口封装
 * 使用封装的 request 工具
 */

import { get, post, put, del } from './request'
import { API_CONFIG } from '../config'

// ==================== 登录相关 ====================

/**
 * 微信登录
 */
export function wechatLogin(params) {
  return post('/miniapp/login/wechat', params)
}

/**
 * 手机号登录
 */
export function phoneLogin(params) {
  return post('/miniapp/login/phone', params)
}

// ==================== 用户相关 ====================

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return get('/user/info')
}

/**
 * 更新用户信息
 */
export function updateUserInfo(data) {
  return put('/user/info', data)
}

// ==================== 订单相关 ====================

/**
 * 创建订单
 */
export function createOrder(data) {
  return post('/orders/create', data, {
    showLoading: true,
    loadingText: '提交中...'
  })
}

/**
 * 获取订单列表
 */
export function getOrderList(params) {
  return get('/orders/list', params)
}

/**
 * 获取订单详情
 */
export function getOrderDetail(orderId) {
  return get(`/orders/${orderId}`)
}

/**
 * 取消订单
 */
export function cancelOrder(orderId) {
  return del(`/orders/${orderId}`)
}

// ==================== 其他接口示例 ====================

/**
 * 上传文件
 */
export function uploadFile(filePath, options = {}) {
  const { STORAGE_KEYS } = require('../config')
  
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: options.url || API_CONFIG.uploadURL,
      filePath,
      name: options.name || 'file',
      header: {
        'Authorization': `Bearer ${uni.getStorageSync(STORAGE_KEYS.TOKEN)}`,
        ...options.header
      },
      success: (res) => {
        try {
          const data = JSON.parse(res.data)
          if (data.code === 0 || data.code === 200) {
            resolve(data)
          } else {
            reject(new Error(data.msg || '上传失败'))
          }
        } catch (e) {
          reject(e)
        }
      },
      fail: reject
    })
  })
}

/**
 * 批量上传文件
 */
export function uploadFiles(filePaths, options = {}) {
  const uploadPromises = filePaths.map(filePath => uploadFile(filePath, options))
  return Promise.all(uploadPromises)
}

