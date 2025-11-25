/**
 * 工程师相关接口
 */

import { get, post, put, del } from '../utils/request'

/**
 * 获取可接订单列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.orderType - 订单类型
 * @param {Number} params.serviceType - 服务类型
 * @param {Number} params.domainId - 业务领域ID
 * @param {String} params.sortBy - 排序方式
 * @param {String} params.sortOrder - 排序方向
 */
export function getAvailableOrders(params) {
  return get('/api/engineer/orders/available', params)
}

/**
 * 接单
 * @param {String} orderId - 订单ID
 * @param {Object} data - 接单数据
 * @param {String} data.remark - 接单备注
 */
export function acceptOrder(orderId, data) {
  return post(`/api/orders/${orderId}/accept`, data)
}

/**
 * 更新在线状态
 * @param {Object} data - 状态数据
 * @param {Boolean} data.isOnline - 是否在线
 * @param {Object} data.location - 位置信息
 * @param {Number} data.location.latitude - 纬度
 * @param {Number} data.location.longitude - 经度
 */
export function updateOnlineStatus(data) {
  return put('/api/engineer/online-status', data)
}

/**
 * 获取工程师统计数据
 * @param {Object} params - 查询参数
 * @param {String} params.period - 统计周期：month-本月, week-本周, today-今天
 * @param {String} params.month - 月份（YYYY-MM格式）
 */
export function getEngineerStats(params) {
  return get('/api/engineer/stats', params)
}

/**
 * 获取订单详情
 * @param {String} orderId - 订单ID
 */
export function getOrderDetail(orderId) {
  return get(`/api/orders/${orderId}`)
}

/**
 * 搜索订单
 * @param {Object} params - 查询参数
 * @param {String} params.keyword - 搜索关键词
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 */
export function searchOrders(params) {
  return get('/api/engineer/orders/search', params)
}

/**
 * 获取接单设置
 */
export function getOrderSettings() {
  return get('/api/engineer/settings')
}

/**
 * 保存接单设置
 * @param {Object} data - 设置数据
 * @param {Boolean} data.autoAccept - 自动接单
 * @param {Boolean} data.pauseAccept - 暂停接单
 * @param {Number} data.serviceRadius - 服务半径(km)
 * @param {Object} data.serviceTypes - 服务类型
 * @param {Boolean} data.serviceTypes.aftersales - 售后维修
 * @param {Boolean} data.serviceTypes.presales - 售前安装
 * @param {Boolean} data.serviceTypes.outsourcing - 项目外包
 * @param {Object} data.notifications - 推送通知
 * @param {Boolean} data.notifications.newOrder - 新订单推送
 * @param {Boolean} data.notifications.message - 消息提醒
 * @param {Boolean} data.notifications.income - 收益到账提醒
 */
export function saveOrderSettings(data) {
  return put('/api/engineer/settings', data)
}

/**
 * 获取工程师工单列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.status - 订单状态
 */
export function getEngineerOrders(params) {
  return get('/api/engineer/orders', params)
}

/**
 * 获取工程师收入列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.month - 月份（YYYY-MM格式）
 */
export function getEngineerIncome(params) {
  return get('/api/engineer/income', params)
}

/**
 * 完成订单服务
 * @param {String} orderId - 订单ID
 * @param {Object} data - 完成数据
 * @param {Array} data.images - 完成照片
 * @param {String} data.remark - 备注
 */
export function completeOrderService(orderId, data) {
  return post(`/api/engineer/orders/${orderId}/complete`, data)
}

/**
 * 签到
 * @param {String} orderId - 订单ID
 * @param {Object} data - 签到数据
 * @param {Number} data.latitude - 纬度
 * @param {Number} data.longitude - 经度
 */
export function checkIn(orderId, data) {
  return post(`/api/engineer/orders/${orderId}/checkin`, data)
}

/**
 * 开始服务
 * @param {String} orderId - 订单ID
 */
export function startService(orderId) {
  return post(`/api/engineer/orders/${orderId}/start`)
}

/**
 * 获取工程师认证信息
 */
export function getEngineerVerifyInfo() {
  return get('/api/engineer/verify/info')
}

/**
 * 提交工程师认证
 * @param {Object} data - 认证数据
 */
export function submitEngineerVerify(data) {
  return post('/api/engineer/verify/submit', data)
}

