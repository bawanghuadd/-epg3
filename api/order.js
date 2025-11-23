/**
 * 订单相关接口
 */

import { get, post, put, del } from '../utils/request'

/**
 * 创建订单
 * @param {Object} data - 订单数据
 */
export function createOrder(data) {
  return post('/orders/create', data, {
    showLoading: true,
    loadingText: '提交中...'
  })
}

/**
 * 获取订单列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.status - 订单状态：all-全部, pending-待处理, processing-处理中, completed-已完成, cancelled-已取消
 */
export function getOrderList(params) {
  return get('/orders/list', params)
}

/**
 * 获取订单详情
 * @param {String} orderId - 订单ID
 */
export function getOrderDetail(orderId) {
  return get(`/orders/${orderId}`)
}

/**
 * 更新订单状态
 * @param {String} orderId - 订单ID
 * @param {Object} data - 状态数据
 * @param {String} data.status - 新状态
 */
export function updateOrderStatus(orderId, data) {
  return put(`/orders/${orderId}/status`, data)
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {Object} data - 取消原因
 */
export function cancelOrder(orderId, data = {}) {
  return put(`/orders/${orderId}/cancel`, data)
}

/**
 * 删除订单
 * @param {String} orderId - 订单ID
 */
export function deleteOrder(orderId) {
  return del(`/orders/${orderId}`)
}

/**
 * 获取订单统计
 */
export function getOrderStats() {
  return get('/orders/stats')
}

/**
 * 评价订单
 * @param {String} orderId - 订单ID
 * @param {Object} data - 评价数据
 * @param {Number} data.rating - 评分 1-5
 * @param {String} data.comment - 评价内容
 */
export function rateOrder(orderId, data) {
  return post(`/orders/${orderId}/rate`, data)
}

/**
 * 申请退款
 * @param {String} orderId - 订单ID
 * @param {Object} data - 退款数据
 * @param {String} data.reason - 退款原因
 * @param {Array} data.images - 凭证图片
 */
export function applyRefund(orderId, data) {
  return post(`/orders/${orderId}/refund`, data)
}

/**
 * 获取订单时间线
 * @param {String} orderId - 订单ID
 */
export function getOrderTimeline(orderId) {
  return get(`/orders/${orderId}/timeline`)
}

/**
 * 工程师接单
 * @param {String} orderId - 订单ID
 */
export function acceptOrder(orderId) {
  return post(`/orders/${orderId}/accept`)
}

/**
 * 工程师完成订单
 * @param {String} orderId - 订单ID
 * @param {Object} data - 完成数据
 */
export function completeOrder(orderId, data) {
  return post(`/orders/${orderId}/complete`, data)
}

