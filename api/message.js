/**
 * 消息相关接口
 */

import { get, post, put, del } from '../utils/request'

/**
 * 获取消息列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.type - 消息类型：all-全部, system-系统消息, order-订单消息, notice-通知消息
 */
export function getMessageList(params) {
  return get('/messages/list', params)
}

/**
 * 获取消息详情
 * @param {String} messageId - 消息ID
 */
export function getMessageDetail(messageId) {
  return get(`/messages/${messageId}`)
}

/**
 * 标记消息为已读
 * @param {String} messageId - 消息ID
 */
export function markMessageRead(messageId) {
  return put(`/messages/${messageId}/read`)
}

/**
 * 批量标记消息为已读
 * @param {Array} messageIds - 消息ID数组
 */
export function batchMarkRead(messageIds) {
  return put('/messages/batch/read', { messageIds })
}

/**
 * 标记所有消息为已读
 */
export function markAllRead() {
  return put('/messages/all/read')
}

/**
 * 删除消息
 * @param {String} messageId - 消息ID
 */
export function deleteMessage(messageId) {
  return del(`/messages/${messageId}`)
}

/**
 * 批量删除消息
 * @param {Array} messageIds - 消息ID数组
 */
export function batchDeleteMessages(messageIds) {
  return del('/messages/batch', { data: { messageIds } })
}

/**
 * 获取未读消息数量
 */
export function getUnreadCount() {
  return get('/messages/unread/count')
}

/**
 * 获取消息统计
 */
export function getMessageStats() {
  return get('/messages/stats')
}

/**
 * 发送消息（客服消息）
 * @param {Object} data - 消息数据
 * @param {String} data.content - 消息内容
 * @param {String} data.type - 消息类型：text-文本, image-图片
 */
export function sendMessage(data) {
  return post('/messages/send', data)
}

/**
 * 获取消息设置
 */
export function getMessageSettings() {
  return get('/messages/settings')
}

/**
 * 更新消息设置
 * @param {Object} data - 设置数据
 * @param {Boolean} data.systemNotice - 系统通知
 * @param {Boolean} data.orderNotice - 订单通知
 * @param {Boolean} data.soundEnabled - 声音提醒
 * @param {Boolean} data.vibrationEnabled - 震动提醒
 */
export function updateMessageSettings(data) {
  return put('/messages/settings', data)
}

