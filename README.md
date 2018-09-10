# react-enhanced-cli [![download](https://img.shields.io/npm/dm/react-enhanced-cli.svg)](https://www.npmjs.com/search?q=react-enhanced-cli) [![npm](https://img.shields.io/npm/v/react-enhanced-cli.svg)](https://www.npmjs.com/search?q=react-enhanced-cli) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zhouzuchuan/react-enhanced-cli/master/LICENSE)

## 他是什么

基于 `React` 官方 CLI 工具 [create-react-app](https://github.com/facebook/create-react-app)，为 `react-enhanced` 定制的开箱即用 CLI

## 优势

集成了众多优秀的三方库，加持页面功能实现、开箱即用

| 库名                                                            | 描述             |
| --------------------------------------------------------------- | ---------------- |
| [react](https://github.com/facebook/react)                      | 核心             |
| [react-enhanced](https://github.com/zhouzuchuan/react-enhanced) | 增强器框架       |
| [ant-design](https://github.com/ant-design/ant-design)          | UI 框架          |
| [react-redux](https://github.com/reduxjs/react-redux)           | 状态管理         |
| [less](https://github.com/less/less.js)                         | 动态样式语言     |
| [react-router](https://github.com/ReactTraining/react-router)   | 路由             |
| [lodash](https://github.com/lodash/lodash)                      | 工具库           |
| [immutable](https://github.com/facebook/immutable-js)           | 不可变数据操作库 |
| [api-manage](https://github.com/zhouzuchuan/api-manage)         | api 服务解决方案 |
| [axios](https://github.com/axios/axios)                         | 请求库           |
| [data-mock](https://github.com/zhouzuchuan/data-mock)           | 数据模拟服务     |
| [mockjs](https://github.com/nuysoft/Mock)                       | 模拟库           |
| [classnames](https://github.com/JedWatson/classnames)           | class 条件处理   |

    动手能力强的老铁，亦可自定义修改配置（因为是基于官方CLI，一个字“稳”）

## 使用

```bash
# 安装
npm install react-enhanced-cli -g

# 创建工程
rec create rec-app

# 进入目录
cd rec-app

# 启动
npm run start
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

## 文件结构

```
src
|
└── api # api列表
│  │-- ...
│
└── assets # 开发资源 如：图片
│  │-- ...
│
└── components # 展示组件
│  │-- <component name> # 组件名称
|  |  │-- index.jsx
|  |  └── index.less / index.css
|  | ...
|
└── containers # 容器组件
│  │-- <container name> # 容器组件名称
|  |  │-- index.jsx
|  |  └── index.less / index.css
|  | ...
|
└── mocks # 模拟数据
│  │-- ...
│
└── models # 组件模型
│   │-- ...
│
└── pages # 页面入口文件（在里面可以配置多页面）
│  │-- <page name> # 页面名称
|  |  │-- ...
|  | ...
|
└── styles # 全局样式
│  │-- ...
│
└── utils # 工具库
│  │-- ...
│
```

    src下任意的 styles 文件夹里面的样式 如：less/css，都不会经过css modules处理

## License

[MIT](https://tldrlegal.com/license/mit-license)
