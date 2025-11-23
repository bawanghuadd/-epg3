/**
 * 通用接口
 */

import { get, post } from '../utils/request'
import { API_CONFIG } from '../config'

/**
 * 上传文件
 * @param {String} filePath - 文件路径
 * @param {Object} options - 上传选项
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
 * @param {Array} filePaths - 文件路径数组
 * @param {Object} options - 上传选项
 */
export function uploadFiles(filePaths, options = {}) {
  const uploadPromises = filePaths.map(filePath => uploadFile(filePath, options))
  return Promise.all(uploadPromises)
}

/**
 * 上传图片
 * @param {String} imagePath - 图片路径
 * @param {Object} options - 上传选项
 */
export function uploadImage(imagePath, options = {}) {
  return uploadFile(imagePath, {
    ...options,
    name: 'image'
  })
}

/**
 * 批量上传图片
 * @param {Array} imagePaths - 图片路径数组
 * @param {Object} options - 上传选项
 */
export function uploadImages(imagePaths, options = {}) {
  return uploadFiles(imagePaths, {
    ...options,
    name: 'image'
  })
}

/**
 * 获取地区数据
 * @param {String} parentId - 父级ID，不传则获取省份列表
 */
export function getRegions(parentId = '') {
  return get('/common/regions', { parentId })
}

/**
 * 获取配置信息
 * @param {String} key - 配置键名
 */
export function getConfig(key) {
  return get('/common/config', { key })
}

/**
 * 获取字典数据
 * @param {String} type - 字典类型
 */
export function getDictData(type) {
  return get('/common/dict', { type })
}

/**
 * 意见反馈
 * @param {Object} data - 反馈数据
 * @param {String} data.content - 反馈内容
 * @param {String} data.contact - 联系方式
 * @param {Array} data.images - 截图
 */
export function submitFeedback(data) {
  return post('/common/feedback', data)
}

/**
 * 检查版本更新
 */
export function checkUpdate() {
  return get('/common/version/check')
}

/**
 * 获取协议内容
 * @param {String} type - 协议类型：user-用户协议, privacy-隐私政策, service-服务条款
 */
export function getAgreement(type) {
  return get('/common/agreement', { type })
}

/**
 * 获取关于我们
 */
export function getAboutUs() {
  return get('/common/about')
}

/**
 * 获取常见问题
 */
export function getFAQ() {
  return get('/common/faq')
}

/**
 * 获取客服信息
 */
export function getCustomerService() {
  return get('/common/customer-service')
}

/**
 * 搜索
 * @param {Object} params - 搜索参数
 * @param {String} params.keyword - 关键词
 * @param {String} params.type - 搜索类型：all-全部, service-服务, order-订单
 */
export function search(params) {
  return get('/common/search', params)
}

/**
 * 获取热门搜索
 */
export function getHotSearch() {
  return get('/common/search/hot')
}

/**
 * 获取搜索历史
 */
export function getSearchHistory() {
  return get('/common/search/history')
}

/**
 * 清除搜索历史
 */
export function clearSearchHistory() {
  return post('/common/search/history/clear')
}

