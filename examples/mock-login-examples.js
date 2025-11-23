/**
 * 模拟登录功能使用示例
 * 
 * 本文件包含了各种常见场景的使用示例
 */

import { 
  mockLogin, 
  switchMockUser, 
  getMockUserList, 
  isMockLogin,
  generateMockToken,
  MOCK_USERS 
} from '../utils/mock-login'

import { 
  isLoggedIn, 
  getUserInfo, 
  getToken,
  isCustomer,
  isEngineer,
  logout 
} from '../utils/auth'

// ==================== 示例 1: 基础登录 ====================

/**
 * 示例1.1: 简单的客户登录
 */
async function example1_1() {
  console.log('=== 示例1.1: 客户登录 ===')
  
  try {
    await mockLogin('customer')
    console.log('✓ 登录成功')
    console.log('用户信息:', getUserInfo())
  } catch (error) {
    console.error('✗ 登录失败:', error)
  }
}

/**
 * 示例1.2: 简单的工程师登录
 */
async function example1_2() {
  console.log('=== 示例1.2: 工程师登录 ===')
  
  try {
    await mockLogin('engineer')
    console.log('✓ 登录成功')
    console.log('用户信息:', getUserInfo())
  } catch (error) {
    console.error('✗ 登录失败:', error)
  }
}

/**
 * 示例1.3: 带配置的登录
 */
async function example1_3() {
  console.log('=== 示例1.3: 自定义配置登录 ===')
  
  try {
    const result = await mockLogin('customer', {
      showLoading: false,    // 不显示加载
      showToast: false,      // 不显示提示
      autoNavigate: false,   // 不自动跳转
      delay: 300            // 更短的延迟
    })
    
    console.log('✓ 登录成功')
    console.log('Token:', result.token)
    console.log('用户信息:', result.userInfo)
  } catch (error) {
    console.error('✗ 登录失败:', error)
  }
}

// ==================== 示例 2: 用户切换 ====================

/**
 * 示例2.1: 快速切换用户
 */
async function example2_1() {
  console.log('=== 示例2.1: 快速切换用户 ===')
  
  // 先登录为客户
  await mockLogin('customer')
  console.log('当前用户:', getUserInfo().nickname)
  
  // 等待2秒
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 切换为工程师
  await switchMockUser('engineer')
  console.log('切换后用户:', getUserInfo().nickname)
}

/**
 * 示例2.2: 循环切换所有账号
 */
async function example2_2() {
  console.log('=== 示例2.2: 循环切换所有账号 ===')
  
  const users = getMockUserList()
  
  for (const user of users) {
    console.log(`\n切换到: ${user.nickname}`)
    await switchMockUser(user.key)
    
    console.log('- 用户类型:', user.user_type)
    console.log('- 是否认证:', user.is_verified ? '是' : '否')
    console.log('- 会员等级:', user.vip_level)
    
    // 等待1秒再切换下一个
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

// ==================== 示例 3: 权限检查 ====================

/**
 * 示例3.1: 检查用户类型
 */
async function example3_1() {
  console.log('=== 示例3.1: 检查用户类型 ===')
  
  // 登录为客户
  await mockLogin('customer')
  console.log('登录为客户:')
  console.log('- isCustomer():', isCustomer())
  console.log('- isEngineer():', isEngineer())
  
  // 切换为工程师
  await switchMockUser('engineer')
  console.log('\n切换为工程师:')
  console.log('- isCustomer():', isCustomer())
  console.log('- isEngineer():', isEngineer())
}

/**
 * 示例3.2: 条件执行不同逻辑
 */
async function example3_2() {
  console.log('=== 示例3.2: 条件执行 ===')
  
  await mockLogin('customer')
  
  if (isCustomer()) {
    console.log('执行客户专属逻辑...')
    // 显示发布工单按钮
    // 显示我的订单
  } else if (isEngineer()) {
    console.log('执行工程师专属逻辑...')
    // 显示接单大厅
    // 显示我的任务
  }
}

// ==================== 示例 4: 状态检查 ====================

/**
 * 示例4.1: 检查登录状态
 */
function example4_1() {
  console.log('=== 示例4.1: 检查登录状态 ===')
  
  console.log('是否已登录:', isLoggedIn())
  console.log('是否模拟登录:', isMockLogin())
  console.log('Token:', getToken())
  console.log('用户信息:', getUserInfo())
}

/**
 * 示例4.2: 根据登录状态显示不同内容
 */
function example4_2() {
  console.log('=== 示例4.2: 条件显示 ===')
  
  if (!isLoggedIn()) {
    console.log('显示登录按钮')
    return
  }
  
  if (isMockLogin()) {
    console.log('显示模拟登录标识')
    console.log('显示用户切换按钮')
  }
  
  console.log('显示用户信息')
}

// ==================== 示例 5: 测试场景 ====================

/**
 * 示例5.1: 测试订单创建流程
 */
async function example5_1() {
  console.log('=== 示例5.1: 测试订单流程 ===')
  
  // 1. 客户创建订单
  await mockLogin('customer2')
  console.log('✓ 客户已登录')
  console.log('📝 创建订单...')
  
  // 模拟创建订单API调用
  const orderId = 'ORDER_' + Date.now()
  console.log('✓ 订单创建成功:', orderId)
  
  // 2. 切换为工程师接单
  await switchMockUser('engineer')
  console.log('\n✓ 工程师已登录')
  console.log('👀 查看待接单列表...')
  console.log('✓ 接单成功:', orderId)
  
  // 3. 切换回客户查看状态
  await switchMockUser('customer2')
  console.log('\n✓ 切换回客户')
  console.log('👀 查看订单状态: 已接单')
}

/**
 * 示例5.2: 测试实名认证流程
 */
async function example5_2() {
  console.log('=== 示例5.2: 测试实名认证 ===')
  
  // 1. 未认证客户登录
  await mockLogin('customer')
  const user = getUserInfo()
  
  console.log('用户:', user.nickname)
  console.log('认证状态:', user.is_verified ? '已认证' : '未认证')
  
  if (!user.is_verified) {
    console.log('\n⚠️ 需要实名认证')
    console.log('🔄 跳转到认证页面...')
    // uni.navigateTo({ url: '/pages/profile/verify' })
  }
  
  // 2. 切换到已认证客户
  await switchMockUser('customer2')
  const verifiedUser = getUserInfo()
  
  console.log('\n用户:', verifiedUser.nickname)
  console.log('认证状态:', verifiedUser.is_verified ? '✓ 已认证' : '未认证')
  console.log('✓ 可以使用所有功能')
}

/**
 * 示例5.3: 测试不同等级权限
 */
async function example5_3() {
  console.log('=== 示例5.3: 测试权限等级 ===')
  
  const users = ['customer', 'customer2', 'engineer', 'engineer2']
  
  for (const userKey of users) {
    await switchMockUser(userKey)
    const user = getUserInfo()
    
    console.log(`\n用户: ${user.nickname}`)
    console.log(`类型: ${user.user_type}`)
    console.log(`会员等级: VIP ${user.vip_level}`)
    
    // 根据等级显示不同功能
    if (user.vip_level >= 3) {
      console.log('✓ 高级会员特权')
    } else if (user.vip_level >= 1) {
      console.log('✓ 普通会员特权')
    } else {
      console.log('- 普通用户')
    }
  }
}

// ==================== 示例 6: 获取用户列表 ====================

/**
 * 示例6.1: 获取并显示所有用户
 */
function example6_1() {
  console.log('=== 示例6.1: 获取用户列表 ===')
  
  const users = getMockUserList()
  
  console.log(`共有 ${users.length} 个测试账号:\n`)
  
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.nickname}`)
    console.log(`   - ID: ${user.id}`)
    console.log(`   - 手机: ${user.phone}`)
    console.log(`   - 类型: ${user.user_type}`)
    console.log(`   - 认证: ${user.is_verified ? '✓' : '✗'}`)
    console.log('')
  })
}

/**
 * 示例6.2: 筛选特定类型的用户
 */
function example6_2() {
  console.log('=== 示例6.2: 筛选用户 ===')
  
  const users = getMockUserList()
  
  const customers = users.filter(u => u.user_type === 'customer')
  const engineers = users.filter(u => u.user_type === 'engineer')
  
  console.log('客户账号:')
  customers.forEach(u => console.log(`- ${u.nickname} (${u.phone})`))
  
  console.log('\n工程师账号:')
  engineers.forEach(u => console.log(`- ${u.nickname} (${u.phone})`))
}

// ==================== 示例 7: Token 操作 ====================

/**
 * 示例7.1: 生成和验证 Token
 */
async function example7_1() {
  console.log('=== 示例7.1: Token 操作 ===')
  
  await mockLogin('customer')
  
  const token = getToken()
  console.log('Token:', token)
  console.log('Token 长度:', token.length)
  console.log('是否模拟 Token:', token.startsWith('mock_token_'))
  
  // Token 格式解析
  const parts = token.split('_')
  console.log('\nToken 组成:')
  console.log('- 前缀:', parts[0] + '_' + parts[1])
  console.log('- 用户类型:', parts[2])
  console.log('- 时间戳:', parts[3])
  console.log('- 随机码:', parts[4])
}

/**
 * 示例7.2: 自定义 Token 生成
 */
function example7_2() {
  console.log('=== 示例7.2: 自定义 Token ===')
  
  const customToken = generateMockToken('custom')
  console.log('自定义 Token:', customToken)
}

// ==================== 示例 8: 退出登录 ====================

/**
 * 示例8.1: 退出登录
 */
async function example8_1() {
  console.log('=== 示例8.1: 退出登录 ===')
  
  await mockLogin('customer')
  console.log('✓ 已登录')
  console.log('用户:', getUserInfo().nickname)
  
  // 退出登录
  await logout()
  console.log('✓ 已退出')
  console.log('是否登录:', isLoggedIn())
}

// ==================== 示例 9: Vue 组件中使用 ====================

/**
 * 示例9.1: 在 Vue 组件中使用（示例代码）
 */
const example9_1_code = `
<template>
  <view class="page">
    <!-- 未登录状态 -->
    <view v-if="!isLoggedIn" class="login-section">
      <button @click="handleLogin('customer')">客户登录</button>
      <button @click="handleLogin('engineer')">工程师登录</button>
    </view>
    
    <!-- 已登录状态 -->
    <view v-else class="user-section">
      <text>欢迎，{{ userInfo.nickname }}</text>
      <button @click="handleLogout">退出登录</button>
    </view>
    
    <!-- 用户切换组件 -->
    <MockUserSwitch v-if="isMock" />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { mockLogin, isMockLogin } from '@/utils/mock-login'
import { isLoggedIn as checkLogin, getUserInfo, logout } from '@/utils/auth'
import MockUserSwitch from '@/components/MockUserSwitch/MockUserSwitch.uvue'

const userInfo = ref(null)
const isLoggedIn = ref(false)
const isMock = ref(false)

async function handleLogin(userType) {
  try {
    await mockLogin(userType)
    refreshUserInfo()
  } catch (error) {
    console.error('登录失败:', error)
  }
}

async function handleLogout() {
  await logout()
  refreshUserInfo()
}

function refreshUserInfo() {
  isLoggedIn.value = checkLogin()
  userInfo.value = getUserInfo()
  isMock.value = isMockLogin()
}

onMounted(() => {
  refreshUserInfo()
})
</script>
`

// ==================== 示例 10: 实战场景组合 ====================

/**
 * 示例10.1: 完整的开发测试流程
 */
async function example10_1() {
  console.log('=== 示例10.1: 完整测试流程 ===')
  
  console.log('\n--- 第一步: 客户注册 ---')
  await mockLogin('customer')
  console.log('✓ 新用户注册')
  console.log('认证状态:', getUserInfo().is_verified ? '已认证' : '未认证')
  
  console.log('\n--- 第二步: 实名认证 ---')
  await switchMockUser('customer2')
  console.log('✓ 切换到已认证账号')
  console.log('认证状态:', getUserInfo().is_verified ? '已认证' : '未认证')
  
  console.log('\n--- 第三步: 发布订单 ---')
  console.log('✓ 创建维修订单')
  const orderId = 'ORDER_' + Date.now()
  console.log('订单号:', orderId)
  
  console.log('\n--- 第四步: 工程师接单 ---')
  await switchMockUser('engineer')
  console.log('✓ 工程师登录')
  console.log('✓ 接单成功')
  
  console.log('\n--- 第五步: 完成服务 ---')
  console.log('✓ 标记服务完成')
  
  console.log('\n--- 第六步: 客户确认 ---')
  await switchMockUser('customer2')
  console.log('✓ 客户确认完成')
  console.log('✓ 订单流程结束')
}

// ==================== 导出示例函数 ====================

export {
  // 基础登录
  example1_1,
  example1_2,
  example1_3,
  
  // 用户切换
  example2_1,
  example2_2,
  
  // 权限检查
  example3_1,
  example3_2,
  
  // 状态检查
  example4_1,
  example4_2,
  
  // 测试场景
  example5_1,
  example5_2,
  example5_3,
  
  // 用户列表
  example6_1,
  example6_2,
  
  // Token 操作
  example7_1,
  example7_2,
  
  // 退出登录
  example8_1,
  
  // 实战场景
  example10_1
}

// ==================== 使用说明 ====================

/**
 * 如何使用这些示例：
 * 
 * 1. 在控制台中运行单个示例：
 *    import { example1_1 } from './examples/mock-login-examples'
 *    example1_1()
 * 
 * 2. 运行所有基础示例：
 *    runAllBasicExamples()
 * 
 * 3. 运行特定场景测试：
 *    example5_1() // 订单流程测试
 * 
 * 4. 在组件中参考使用：
 *    参考 example9_1_code 中的 Vue 组件代码
 */

// 运行所有基础示例
async function runAllBasicExamples() {
  console.log('========================================')
  console.log('开始运行所有基础示例')
  console.log('========================================\n')
  
  await example1_1()
  await new Promise(r => setTimeout(r, 1000))
  
  await example1_2()
  await new Promise(r => setTimeout(r, 1000))
  
  example4_1()
  await new Promise(r => setTimeout(r, 1000))
  
  example6_1()
  
  console.log('\n========================================')
  console.log('所有基础示例运行完成')
  console.log('========================================')
}

export { runAllBasicExamples }

