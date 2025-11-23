/**
 * 用户相关接口
 */

import { get, post, put, del } from '../utils/request'

/**
 * 微信登录
 * @param {Object} params - 登录参数
 * @param {String} params.code - 微信登录凭证
 */
export function wechatLogin(params) {
  return post('/miniapp/login/wechat', params)
}

/**
 * 手机号登录
 * @param {Object} params - 登录参数
 * @param {String} params.phone - 手机号
 * @param {String} params.code - 验证码
 */
export function phoneLogin(params) {
  return post('/miniapp/login/phone', params)
}

/**
 * 账号密码登录
 * @param {Object} params - 登录参数
 * @param {String} params.username - 用户名
 * @param {String} params.password - 密码
 */
export function login(params) {
  return post('/api/login', params)
}

/**
 * 退出登录
 */
export function logout() {
  return post('/api/logout')
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return get('/user/info')
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 */
export function updateUserInfo(data) {
  return put('/user/info', data)
}

/**
 * 修改密码
 * @param {Object} data - 密码信息
 * @param {String} data.oldPassword - 旧密码
 * @param {String} data.newPassword - 新密码
 */
export function changePassword(data) {
  return put('/user/password', data)
}

/**
 * 获取用户统计信息
 */
export function getUserStats() {
  return get('/user/stats')
}

/**
 * 实名认证
 * @param {Object} data - 认证信息
 * @param {String} data.realName - 真实姓名
 * @param {String} data.idCard - 身份证号
 */
export function verifyRealName(data) {
  return post('/user/verify', data)
}

/**
 * 获取认证状态
 */
export function getVerifyStatus() {
  return get('/user/verify/status')
}

/**
 * 绑定手机号
 * @param {Object} data - 手机号信息
 * @param {String} data.phone - 手机号
 * @param {String} data.code - 验证码
 */
export function bindPhone(data) {
  return post('/user/bind/phone', data)
}

/**
 * 发送验证码
 * @param {Object} params - 参数
 * @param {String} params.phone - 手机号
 * @param {String} params.type - 类型：login-登录, bind-绑定, reset-重置密码
 */
export function sendVerifyCode(params) {
  return post('/user/sms/send', params)
}

