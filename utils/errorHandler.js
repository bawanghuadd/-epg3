/**
 * 全局错误处理工具
 * 统一管理应用中的错误处理和上报
 */

/**
 * 错误类型枚举
 */
export const ErrorType = {
  NETWORK: 'NETWORK',           // 网络错误
  API: 'API',                   // API 错误
  BUSINESS: 'BUSINESS',         // 业务逻辑错误
  VALIDATION: 'VALIDATION',     // 验证错误
  RUNTIME: 'RUNTIME',           // 运行时错误
  UNKNOWN: 'UNKNOWN'            // 未知错误
}

/**
 * 错误级别枚举
 */
export const ErrorLevel = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
}

/**
 * 错误日志存储
 */
let errorLogs = []
const MAX_ERROR_LOGS = 50

/**
 * 初始化全局错误处理
 */
export function initErrorHandler() {
  // 监听未捕获的错误
  uni.onError((error) => {
    console.error('全局错误捕获:', error)
    handleError({
      type: ErrorType.RUNTIME,
      level: ErrorLevel.ERROR,
      message: error,
      stack: error
    })
  })
  
  // 监听未处理的 Promise 拒绝
  uni.onUnhandledRejection((event) => {
    console.error('未处理的 Promise 拒绝:', event)
    handleError({
      type: ErrorType.RUNTIME,
      level: ErrorLevel.ERROR,
      message: event.reason || '未处理的 Promise 拒绝',
      detail: event
    })
  })
  
  console.log('✅ 全局错误处理已初始化')
}

/**
 * 统一错误处理函数
 * @param {Object} error - 错误对象
 * @param {string} error.type - 错误类型
 * @param {string} error.level - 错误级别
 * @param {string} error.message - 错误信息
 * @param {*} error.detail - 错误详情
 * @param {boolean} showToast - 是否显示提示
 */
export function handleError(error, showToast = true) {
  // 记录错误日志
  logError(error)
  
  // 根据错误类型和级别进行不同处理
  if (error.level === ErrorLevel.FATAL) {
    handleFatalError(error)
  } else if (showToast) {
    showErrorToast(error)
  }
  
  // 上报错误（生产环境）
  if (process.env.NODE_ENV === 'production') {
    reportError(error)
  }
}

/**
 * 网络错误处理
 */
export function handleNetworkError(error) {
  const errorInfo = {
    type: ErrorType.NETWORK,
    level: ErrorLevel.WARNING,
    message: getNetworkErrorMessage(error),
    detail: error,
    timestamp: Date.now()
  }
  
  handleError(errorInfo)
  return errorInfo
}

/**
 * API 错误处理
 */
export function handleApiError(error) {
  const errorInfo = {
    type: ErrorType.API,
    level: ErrorLevel.ERROR,
    message: error.msg || error.message || 'API 请求失败',
    detail: error,
    timestamp: Date.now()
  }
  
  handleError(errorInfo)
  return errorInfo
}

/**
 * 业务错误处理
 */
export function handleBusinessError(message, detail = null) {
  const errorInfo = {
    type: ErrorType.BUSINESS,
    level: ErrorLevel.WARNING,
    message,
    detail,
    timestamp: Date.now()
  }
  
  handleError(errorInfo)
  return errorInfo
}

/**
 * 验证错误处理
 */
export function handleValidationError(message) {
  const errorInfo = {
    type: ErrorType.VALIDATION,
    level: ErrorLevel.INFO,
    message,
    timestamp: Date.now()
  }
  
  handleError(errorInfo, true)
  return errorInfo
}

/**
 * 致命错误处理
 */
function handleFatalError(error) {
  console.error('💥 致命错误:', error)
  
  uni.showModal({
    title: '系统错误',
    content: '应用遇到了严重错误，需要重启。',
    showCancel: false,
    confirmText: '重启应用',
    success: () => {
      // 清除可能导致错误的缓存
      try {
        uni.clearStorageSync()
      } catch (e) {
        console.error('清除缓存失败:', e)
      }
      
      // 重新启动应用
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  })
}

/**
 * 显示错误提示
 */
function showErrorToast(error) {
  const message = error.message || '操作失败，请稍后重试'
  
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2500,
    mask: false
  })
}

/**
 * 获取网络错误信息
 */
function getNetworkErrorMessage(error) {
  if (!error || !error.errMsg) {
    return '网络请求失败'
  }
  
  const errMsg = error.errMsg
  
  if (errMsg.includes('timeout')) {
    return '请求超时，请检查网络后重试'
  } else if (errMsg.includes('fail')) {
    return '网络连接失败，请检查网络'
  } else if (errMsg.includes('url not in domain list')) {
    return '域名校验失败，请联系管理员'
  }
  
  return '网络请求失败'
}

/**
 * 记录错误日志
 */
function logError(error) {
  const errorLog = {
    ...error,
    timestamp: error.timestamp || Date.now(),
    userAgent: getSystemInfo()
  }
  
  // 添加到错误日志队列
  errorLogs.unshift(errorLog)
  
  // 保持日志队列大小
  if (errorLogs.length > MAX_ERROR_LOGS) {
    errorLogs = errorLogs.slice(0, MAX_ERROR_LOGS)
  }
  
  // 持久化存储（可选）
  try {
    uni.setStorageSync('error_logs', errorLogs)
  } catch (e) {
    console.error('保存错误日志失败:', e)
  }
  
  // 控制台输出
  const logFn = error.level === ErrorLevel.FATAL ? console.error : 
                error.level === ErrorLevel.ERROR ? console.error :
                error.level === ErrorLevel.WARNING ? console.warn : console.log
  
  logFn(`[${error.type}] ${error.message}`, error.detail)
}

/**
 * 上报错误到监控系统
 */
function reportError(error) {
  // TODO: 集成错误监控服务（如 Sentry, Fundebug 等）
  console.log('📊 上报错误:', error)
  
  // 示例：发送到后端
  // uni.request({
  //   url: 'https://your-api.com/error-report',
  //   method: 'POST',
  //   data: {
  //     type: error.type,
  //     level: error.level,
  //     message: error.message,
  //     detail: JSON.stringify(error.detail),
  //     timestamp: error.timestamp,
  //     userAgent: error.userAgent,
  //     userId: getUserId()
  //   }
  // })
}

/**
 * 获取系统信息
 */
function getSystemInfo() {
  try {
    const systemInfo = uni.getSystemInfoSync()
    return {
      platform: systemInfo.platform,
      system: systemInfo.system,
      version: systemInfo.version,
      model: systemInfo.model,
      pixelRatio: systemInfo.pixelRatio,
      screenWidth: systemInfo.screenWidth,
      screenHeight: systemInfo.screenHeight
    }
  } catch (e) {
    return {}
  }
}

/**
 * 获取错误日志
 */
export function getErrorLogs() {
  return errorLogs
}

/**
 * 清除错误日志
 */
export function clearErrorLogs() {
  errorLogs = []
  try {
    uni.removeStorageSync('error_logs')
  } catch (e) {
    console.error('清除错误日志失败:', e)
  }
}

/**
 * 导出错误日志（用于调试）
 */
export function exportErrorLogs() {
  const logs = getErrorLogs()
  const content = JSON.stringify(logs, null, 2)
  
  console.log('📋 错误日志导出:')
  console.log(content)
  
  return logs
}

/**
 * 创建错误边界（高阶函数）
 * 用于包装异步函数，自动捕获错误
 */
export function createErrorBoundary(fn, options = {}) {
  const {
    errorType = ErrorType.UNKNOWN,
    errorLevel = ErrorLevel.ERROR,
    showToast = true,
    onError = null
  } = options
  
  return async function(...args) {
    try {
      return await fn.apply(this, args)
    } catch (error) {
      const errorInfo = {
        type: errorType,
        level: errorLevel,
        message: error.message || error,
        detail: error,
        timestamp: Date.now()
      }
      
      handleError(errorInfo, showToast)
      
      if (onError) {
        onError(errorInfo)
      }
      
      return null
    }
  }
}

/**
 * 安全执行函数（同步）
 */
export function safeExecute(fn, fallback = null) {
  try {
    return fn()
  } catch (error) {
    handleError({
      type: ErrorType.RUNTIME,
      level: ErrorLevel.ERROR,
      message: error.message || error,
      detail: error,
      timestamp: Date.now()
    })
    return fallback
  }
}

/**
 * 安全执行函数（异步）
 */
export async function safeExecuteAsync(fn, fallback = null) {
  try {
    return await fn()
  } catch (error) {
    handleError({
      type: ErrorType.RUNTIME,
      level: ErrorLevel.ERROR,
      message: error.message || error,
      detail: error,
      timestamp: Date.now()
    })
    return fallback
  }
}

// 默认导出
export default {
  ErrorType,
  ErrorLevel,
  initErrorHandler,
  handleError,
  handleNetworkError,
  handleApiError,
  handleBusinessError,
  handleValidationError,
  getErrorLogs,
  clearErrorLogs,
  exportErrorLogs,
  createErrorBoundary,
  safeExecute,
  safeExecuteAsync
}

