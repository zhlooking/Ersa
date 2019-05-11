# Usage

- `npm i` or `yarn install`
- `npm start`
- `open url：http://localhost:3009/`

# Deploy

- `PROD => npm run deploy:prod`
- `BETA => npm run deploy:beta`

# Directory

```
├── components 公共组件
│   ├── index.js
│   └── nomatch 页面无匹配时
├── index.html
├── lib 公共库，比如异步加载路由、权限验证、异步请求以及公共函数等等
│   └── api
├── public 静态资源
│   └── logo.png
├── src 开发目录
│   ├── app.js 主路由
│   ├── home 主页
│   ├── index.js 入口文件
│   └── login.js
├── styles 样式文件 base下面为基础类样式，pages对应响应的页面
│   ├── base
│   ├── index.scss
│   └── pages
├── server.js
└── webpack.config.js
```

# Code Style

项目中使用`prettier/editorconfig`做代码格式的检查优化，需在开发之前设置好编辑器的相关配置
- `js`代码使用`eslint`配合`eslint-config-zcool`作为检查工具
- `scss`代码使用`sass-lint`作为检查工具
- 代码提交时会使用`lint-staged`和`prettier/eslint/sass-lint`做代码检查和格式化

# Stack

> - 代码规范：eslint-config-zcool
> - 静态类型检查：none
> - 异步请求：axios
> - 状态管理: react hooks
> - 组件库：antd
> - 样式：scss
> - 工具库：lodash
> - 测试：none
> - 响应式布局：
>   ...

# Tips

* [API 文档地址]()
