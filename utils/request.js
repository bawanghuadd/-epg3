/**
 * uni.request 请求封装
 */

import { API_CONFIG, STORAGE_KEYS, ROUTES } from '../config'

// 请求配置
const config = {
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  showLoading: false,
  loadingText: '加载中...'
}

/**
 * 获取请求头
 */
function getHeaders(customHeaders) {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  }

  // 自动添加 token
  const token = uni.getStorageSync(STORAGE_KEYS.TOKEN)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

/**
 * 显示加载提示
 */
function showLoading(text = config.loadingText) {
  uni.showLoading({
    title: text,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
  uni.hideLoading()
}

/**
 * 统一处理错误
 */
function handleError(error, showToast = true) {
  console.error('请求错误:', error)
  
  let errorMsg = '请求失败，请稍后重试'
  
  if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      errorMsg = '请求超时，请稍后重试'
    } else if (error.errMsg.includes('url not in domain list')) {
      // 域名校验错误，提供友好的提示
      errorMsg = '域名校验失败，请在微信开发者工具中关闭域名校验'
      console.warn('⚠️ 域名校验错误解决方案：')
      console.warn('1. 点击微信开发者工具右上角"详情"')
      console.warn('2. 选择"本地设置"标签页')
      console.warn('3. 勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"')
      console.warn('4. 重启微信开发者工具并重新编译')
    } else if (error.errMsg.includes('fail')) {
      errorMsg = '网络连接失败，请检查网络'
    }
  } else if (error.message) {
    errorMsg = error.message
  }

  if (showToast) {
    uni.showToast({
      title: errorMsg,
      icon: 'none',
      duration: 3000  // 增加显示时间，让用户能看到完整提示
    })
  }

  return Promise.reject(error)
}

/**
 * 统一处理响应
 */
function handleResponse(res) {
  const { statusCode, data } = res

  // HTTP 状态码检查
  if (statusCode !== 200) {
    return Promise.reject({
      errMsg: `HTTP Error: ${statusCode}`,
      statusCode
    })
  }

  // 业务状态码检查（根据后端返回格式调整）
  if (data.code !== undefined && data.code !== 200 && data.code !== 0) {
    // token 过期或未登录
    if (data.code === 401 || data.code === 403) {
      // 清除本地存储
      uni.removeStorageSync(STORAGE_KEYS.TOKEN)
      uni.removeStorageSync(STORAGE_KEYS.USER_INFO)
      
      // 跳转到登录页
      uni.reLaunch({
        url: ROUTES.LOGIN
      })
      
      uni.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none'
      })
    }
    
    return Promise.reject({
      code: data.code,
      msg: data.msg || '请求失败',
      data: data.data
    })
  }

  return Promise.resolve(data)
}

/**
 * 核心请求方法
 */
function request(options) {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    timeout = config.timeout,
    showLoading: needLoading = config.showLoading,
    loadingText
  } = options

  // 显示加载提示
  if (needLoading) {
    showLoading(loadingText)
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: url.startsWith('http') ? url : `${config.baseURL}${url}`,
      method,
      data,
      header: getHeaders(header),
      timeout,
      success: (res) => {
        handleResponse(res)
          .then(resolve)
          .catch(reject)
      },
      fail: (error) => {
        handleError(error)
          .catch(reject)
      },
      complete: () => {
        // 隐藏加载提示
        if (needLoading) {
          hideLoading()
        }
      }
    })
  })
}

/**
 * GET 请求
 */
export function get(url, params, options) {
  // 将参数拼接到 URL 上
  let requestUrl = url
  if (params) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    requestUrl += (url.includes('?') ? '&' : '?') + queryString
  }

  return request({
    url: requestUrl,
    method: 'GET',
    ...options
  })
}

/**
 * POST 请求
 */
export function post(url, data, options) {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT 请求
 */
export function put(url, data, options) {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE 请求
 */
export function del(url, params, options) {
  // DELETE 请求也可以将参数放在 URL 上
  let requestUrl = url
  if (params) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    requestUrl += (url.includes('?') ? '&' : '?') + queryString
  }

  return request({
    url: requestUrl,
    method: 'DELETE',
    ...options
  })
}

/**
 * 设置基础配置
 */
export function setConfig(newConfig) {
  Object.assign(config, newConfig)
}

// 默认导出 request 方法
export default request

