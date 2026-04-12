# PhotoMasterPro - Android 自动构建

## GitHub Actions 配置步骤

### 1. 创建 GitHub 仓库

```bash
cd /Users/ding/Documents/openClaw/PhotoMasterPro

# 初始化 git（如果还没做）
git init
git add .
git commit -m "Initial commit"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/你的用户名/PhotoMasterPro.git
git branch -M main
git push -u origin main
```

### 2. 启用 GitHub Actions

推送代码后，GitHub Actions 会自动运行。你可以在仓库页面的 **Actions** 标签查看构建状态。

### 3. 下载 APK

构建完成后：
1. 进入 GitHub 仓库 → Actions 标签
2. 点击最新的工作流运行
3. 找到 **Artifacts** 部分
4. 下载 `app-debug` 文件（包含 APK）

### 4. 安装到手机

```bash
# 解压下载的 app-debug.zip
# 安装 APK
adb install app-debug.apk

# 或者直接用浏览器下载到手机安装
```

## 手动触发构建

进入 GitHub 仓库 → Actions → Build Android APK → Run workflow

## 构建配置说明

- **触发条件**: push 到 main/master 分支、PR、或手动触发
- **构建环境**: Ubuntu + Node.js 20 + JDK 17 + Android SDK
- **输出**: Debug APK（无需签名密钥）
- **保留期**: 7 天

## 发布版 APK（可选）

如需构建签名发布版，需要配置签名密钥：

1. 生成签名密钥：
```bash
keytool -genkey -v -keystore photomaster.keystore -alias photomaster -keyalg RSA -keysize 2048 -validity 10000
```

2. 在 GitHub 仓库设置中添加 Secrets：
   - `KEYSTORE_BASE64`: base64 编码的 keystore 文件
   - `KEYSTORE_PASSWORD`: 密钥库密码
   - `KEY_ALIAS`: 别名
   - `KEY_PASSWORD`: 密钥密码

3. 修改 workflow 使用签名步骤（已注释在 workflow 文件中）
