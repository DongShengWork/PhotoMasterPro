# PhotoMaster Pro — 产品规格书 v2.0

## 产品概述

相机优先的手机摄影参数指导 App。用户打开 App 即进入相机拍摄界面，同时查看当前场景的专业参数建议。App 分为三大模块：拍照、模式、我的。

## 核心流程

用户打开 App → 直接进入相机 → 选择拍照模式 → 实时显示该模式参数 → 点击快门拍照

---

## 页面结构

### 1. 拍照页（首页 / 默认页）
**进入 App 即展示此页**

- 全屏相机预览（前置/后置摄像头切换）
- 顶部状态栏（闪光灯、倒计时等快捷操作）
- **浮动模式选择条**（导航栏上方，支持左右滑动切换）
  - 每个模式显示 icon + 名称
  - 当前选中模式底部高亮
- 快门按钮（大圆圈，底部居中）
- 相机模式参数覆盖层（拍照前短暂显示，或展开详情）

**相机交互**
- 点击快门：调用系统相机拍照（capture API）
- 长按快门：打开手动参数调节（ISO/快门/白平衡滑块）
- 点击模式标签：显示该模式的参数说明浮层
- 闪光灯切换（自动/开/关）
- 前后摄像头切换
- 权限申请：首次使用请求相机授权

---

### 2. 模式页
**底部 Tab：模式**

- 顶部搜索框（搜索模式名称/标签）
- 三个分区 Tab（可滑动切换）
  - ❤️ **我的收藏**：用户收藏的拍照模式
  - 🎯 **定制模式**：用户自定义的参数预设（暂不支持，留空）
  - 📦 **模式仓库**：全部 12 个拍照模式

---

### 3. 我的页
**底部 Tab：我的**

- 用户头像 + 昵称
- 会员状态（免费/Pro）
- 续订入口（Pro用户展示续订按钮）
- 数据统计（收藏数、拍摄次数）
- 功能列表（意见反馈、使用帮助、版本信息）

---

## 技术方案

- **前端**：React 18 + Vite 6 + TailwindCSS
- **相机**：Web RTC API（navigator.mediaDevices.getUserMedia）
- **图片捕获**：canvas 截图 + HTML Canvas API
- **数据持久化**：localStorage
  - favorites: 收藏模式列表
  - tier: 订阅等级（free/pro）
  - subscription_expires: 过期时间
- **状态管理**：React useState + useContext（简单 App 不引入 Redux）

## 数据模型

### 拍照模式（PHOTOGRAPHY_MODES）
```js
{
  id: string,
  name: string,           // "星空"
  nameEn: string,         // "Starry Sky"
  icon: string,           // emoji
  description: string,
  tags: string[],
  searchKeywords: string,  // 小红书搜索词
  params: {
    iso: string,           // "800–3200"
    shutter: string,       // "15–30秒"
    aperture: string,       // "f/1.8–f/2.8"
    wb: string,            // "3300–4500K"
    focus: string,         // "无穷远"
    tips: string,          // 拍摄提示语
  }
}
```

### 手机品牌（PHONE_BRANDS）
```js
{
  id: string,
  name: string,
  nameZh: string,
  logo: string,
  models: [{ id, name, hasProMode, hasNightMode }],
  howToProMode: string,
  howToNightMode: string,
}
```

## 页面路由（Tab 路由，无 URL 跳转）

| 页面 | Tab | 路由 key |
|------|-----|----------|
| 相机拍照页 | — | camera |
| 模式页 | 模式 | modes |
| 我的页 | 我的 | profile |

---

## 开发进度

- [x] SPEC.md v2.0
- [x] 项目脚手架
- [x] 拍照模式数据（12个场景 + 7个手机品牌）
- [x] 相机拍照页 CameraPage（含摄像头切换/闪光灯/快门）
- [x] 模式页 ModesPage（搜索 + 收藏/定制/仓库 三 Tab）
- [x] 我的页 ProfilePage（含订阅状态）
- [x] 收藏功能（localStorage）
- [x] 订阅系统（Mock）
- [ ] 小红书真实 API 接入
- [ ] 真实支付接入
- [ ] 定制模式功能
