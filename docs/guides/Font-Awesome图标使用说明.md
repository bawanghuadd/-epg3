# Font Awesome 图标集成说明

## ✅ 已完成的修改

### 1. **服务分类入口**
已将三个服务分类图标更新：
- 🔧 **找售后** - 维护保养（红色背景）
- 🚚 **找售前** - 安装调试（红色背景）
- 👥 **找团队** - 项目外包（红色背景）

所有图标统一使用红色主题（`#F44336`），与设计图保持一致。

### 2. **业务领域9宫格**
- 将图标容器改为**圆形**设计
- 每个业务领域添加了专属颜色
- 优化了图标显示效果

### 3. **样式优化**
- 添加 `.entry-icon-wrapper.red` 类，红色浅背景
- 添加 `.entry-icon.fa-icon` 类，红色图标文字
- 图标容器改为圆形（`border-radius: 50%`）

---

## 📚 关于 Font Awesome 在 Uni-app 中的使用

### ⚠️ 重要说明

在 Uni-app/小程序环境中，**不能直接使用** Font Awesome 的标准方式（`<i class="fas fa-xxx">`），因为：

1. **小程序不支持** Font Awesome 的 CDN 引入
2. **不支持** 标准的 `<i>` 标签
3. **CSS 引入受限**

### 🎯 推荐方案

#### 方案1：使用 Iconfont（推荐）⭐

1. 访问 [iconfont.cn](https://www.iconfont.cn/)
2. 搜索并添加需要的图标到项目
3. 下载 **Unicode** 或 **Font class** 格式
4. 在 Uni-app 中引入并使用

**示例：**
```vue
<template>
  <text class="iconfont icon-home"></text>
</template>

<style>
@import "~@/static/fonts/iconfont.css";
</style>
```

#### 方案2：使用 SVG 图标

将 Font Awesome 图标转换为 SVG 文件，然后：
```vue
<image src="@/static/icons/home.svg" class="icon"></image>
```

#### 方案3：使用 Unicode 字符（当前方案）

当前我们使用的是 **emoji/Unicode 字符**，这是最简单的方案：
- ✅ 无需额外引入
- ✅ 小程序完美支持
- ✅ 颜色、大小可自定义
- ⚠️ 图标样式有限

---

## 🔄 如何替换为真正的 Font Awesome 图标

### Step 1: 注册并创建 Iconfont 项目

1. 访问 [iconfont.cn](https://www.iconfont.cn/)
2. 注册/登录账号
3. 创建新项目："工程师服务平台"

### Step 2: 搜索并添加图标

根据 `icon-customer/font-awesome-icons-extract.html` 中的图标列表：

**服务类型图标：**
- 🔧 维修 → 搜索 "wrench" 或 "工具"
- 🚚 搬运 → 搜索 "truck" 或 "卡车"
- 👥 团队 → 搜索 "users" 或 "用户组"

**业务领域图标：**
- ⚡ 充电桩 → 搜索 "charging" 或 "充电"
- 🏢 建筑 → 搜索 "building" 或 "大楼"
- 🛡️ 安防 → 搜索 "shield" 或 "盾牌"
- 🧯 消防 → 搜索 "fire-extinguisher" 或 "灭火器"
- 🚪 门禁 → 搜索 "door" 或 "门"
- 🤖 机器人 → 搜索 "robot" 或 "机器人"

### Step 3: 下载并导入项目

1. 在 Iconfont 项目中点击"下载至本地"
2. 解压文件，复制以下文件到项目：
   ```
   /static/fonts/iconfont.css
   /static/fonts/iconfont.ttf
   /static/fonts/iconfont.woff
   /static/fonts/iconfont.woff2
   ```

3. 在 `App.vue` 中全局引入：
   ```vue
   <style>
   @import "@/static/fonts/iconfont.css";
   </style>
   ```

### Step 4: 更新组件代码

将 `pages/home/home.uvue` 中的图标替换为 iconfont：

```vue
<!-- 修改前 -->
<text class="entry-icon fa-icon">🔧</text>

<!-- 修改后 -->
<text class="entry-icon iconfont icon-wrench"></text>
```

### Step 5: 调整样式

```scss
.entry-icon {
  font-size: 48rpx;
  color: #F44336;
  
  &.iconfont {
    font-family: 'iconfont' !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

---

## 📖 图标对照表

根据 `icon-customer` 文件夹中的定义：

| 功能 | 当前Emoji | Font Awesome | 推荐Iconfont搜索词 |
|------|-----------|--------------|-------------------|
| 首页 | 🏠 | `fa-home` | home, 首页 |
| 订单 | 📋 | `fa-clipboard-list` | clipboard, 订单 |
| 用户 | 👤 | `fa-user` | user, 用户 |
| 消息 | 💬 | `fa-comment-dots` | message, 消息 |
| 搜索 | 🔍 | `fa-search` | search, 搜索 |
| 维修 | 🔧 | `fa-wrench` | wrench, 扳手 |
| 搬运 | 🚚 | `fa-truck` | truck, 卡车 |
| 团队 | 👥 | `fa-users` | users, 团队 |
| 充电桩 | 🔌 | `fa-charging-station` | charging, 充电 |
| 建筑 | 🏢 | `fa-building` | building, 建筑 |
| 安防 | 🛡️ | `fa-shield-alt` | shield, 盾牌 |
| 消防 | 🧯 | `fa-fire-extinguisher` | fire, 灭火器 |
| 门禁 | 🚪 | `fa-door-open` | door, 门 |
| 机器人 | 🤖 | `fa-robot` | robot, 机器人 |
| 工具 | 🔧 | `fa-tools` | tools, 工具 |
| 电话 | ☎️ | `fa-phone` | phone, 电话 |
| 地址 | 📍 | `fa-map-marker-alt` | location, 定位 |
| 时间 | 🕐 | `fa-clock` | clock, 时钟 |
| 评分 | ⭐ | `fa-star` | star, 星星 |
| 客服 | 🎧 | `fa-headset` | headset, 耳机 |

---

## 🎨 颜色方案

根据设计图，已设置的颜色：

| 类型 | 背景色 | 图标色 |
|------|--------|--------|
| 服务入口 | `#FFEBEE` (浅红) | `#F44336` (红色) |
| 充电桩 | `#F5F5F5` (灰) | `#F44336` (红) |
| 智慧交管 | `#F5F5F5` (灰) | `#2196F3` (蓝) |
| 智慧园区 | `#F5F5F5` (灰) | `#4CAF50` (绿) |
| 智慧体育 | `#F5F5F5` (灰) | `#FFC107` (黄) |
| 智慧警务 | `#F5F5F5` (灰) | `#9C27B0` (紫) |
| 应急消防 | `#F5F5F5` (灰) | `#FF5722` (橙红) |
| 出入口通道 | `#F5F5F5` (灰) | `#00BCD4` (青) |
| AGV机器人 | `#F5F5F5` (灰) | `#E91E63` (粉) |
| 大楼弱电 | `#F5F5F5` (灰) | `#607D8B` (灰蓝) |

---

## ⚡ 快速开始

当前代码已经可以正常运行，图标显示为：
- ✅ 服务入口使用红色主题
- ✅ 业务领域使用圆形图标
- ✅ 所有样式与设计图匹配

如需使用真正的图标字体，请按照上述步骤集成 Iconfont。

---

## 📞 需要帮助？

如果需要进一步调整图标样式或有其他问题，请随时告诉我！

