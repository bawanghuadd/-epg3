/**
 * 表单验证工具函数
 */

import { VALIDATION_RULES } from '../config'

/**
 * 验证手机号
 */
export function validatePhone(phone) {
  if (!phone) {
    return { valid: false, message: '请输入手机号' }
  }
  
  if (!VALIDATION_RULES.PHONE.test(phone)) {
    return { valid: false, message: '请输入正确的手机号' }
  }
  
  return { valid: true }
}

/**
 * 验证身份证号
 */
export function validateIdCard(idCard) {
  if (!idCard) {
    return { valid: false, message: '请输入身份证号' }
  }
  
  if (!VALIDATION_RULES.ID_CARD.test(idCard)) {
    return { valid: false, message: '身份证号格式不正确' }
  }
  
  return { valid: true }
}

/**
 * 验证必填字段
 */
export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { valid: false, message: `请输入${fieldName}` }
  }
  return { valid: true }
}

/**
 * 验证数组非空
 */
export function validateArrayNotEmpty(arr, fieldName) {
  if (!arr || arr.length === 0) {
    return { valid: false, message: `请选择${fieldName}` }
  }
  return { valid: true }
}

/**
 * 显示验证错误提示
 */
export function showValidationError(message) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

