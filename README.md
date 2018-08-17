# react-enhanced-cli

[![download](https://img.shields.io/npm/dm/react-enhanced-cli.svg)](https://www.npmjs.com/search?q=react-enhanced-cli)
[![npm](https://img.shields.io/npm/v/react-enhanced-cli.svg)](https://www.npmjs.com/search?q=react-enhanced-cli)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zhouzuchuan/react-enhanced-cli/master/LICENSE)

基于 create-react-app 定制并且集成 [React-enhanced](https://github.com/zhouzuchuan/react-enhanced) 、[ant-design](https://github.com/ant-design/ant-design) 等三方库的 CLI

## 愿景

提高开发效率、降低开发门槛、维护世界和平 😁

## 使用

```bash
# 安装
npm install react-enhanced-cli -g

# 创建工程
rec create rec-app

# 进入目录
cd rec-app

# 启动
npm run dev
```

## 命令

新建 `rec-app` 文件夹并初始化工程

```bash
# 初始化并下载资源
rec create rec-app

# 初始化（不下载资源）
rec init rec-app --no-install
```

在 `rec-app` 文件夹中初始化工程

```bash
# 初始化并下载资源
rec init rec-app

# 初始化（不下载资源）
rec init rec-app --no-install
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
