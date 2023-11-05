---
layout: post
title: Webpack5下使用@jeffchi\/logger报缺少核心依赖问题的解决方案
category: 前端
description: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case. Verify if you need this module and configure a polyfill for it.
tags: [webpack5, @jeffchi/logger]
---

```bash
Failed to compile.

Module not found: Error: Can't resolve 'fs' in '/Users/jeff/Desktop/console-x/node_modules/@jeffchi/logger/lib'
ERROR in ./node_modules/@jeffchi/logger/lib/index.mjs 1252:133-145
Module not found: Error: Can't resolve 'fs' in '/Users/jeff/Desktop/console-x/node_modules/@jeffchi/logger/lib'

ERROR in ./node_modules/@jeffchi/logger/lib/index.mjs 1252:147-161
Module not found: Error: Can't resolve 'path' in '/Users/jeff/Desktop/console-x/node_modules/@jeffchi/logger/lib'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
        - install 'path-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "path": false }

webpack compiled with 2 errors
No issues found.
```

## 原因

```@jeffchi/logger``` 是一个前后端能用的npm库,在后端使用时需要写入日志文件,需要依赖于```fs``` 和 ```path``` 两个node核心库,在前端,则不需要. 早前webpack4会在构建bundle为node.js核心库附加庞大的polyfills,对于前端项目,大部分的polyfills都不是必须的,webpack5现在要停止这项工作,在模块构建时不再自动引入polyfills,以减小打包体积.

## 解决方案

### ~~1. 安装 path-browserify~~

```bash
npm install path-browserify --save
# or
yarn add path-browserify
```

> 因为前端项目不需要写放日志文件,所以此处可以跳过这一步

### 2. 配置webpack

```js
// webpack.config.js
resolve:{
  fallback:{
  	// 如果需要,则引入path-browserify
  	// path: require.resolve("path-browserify"),
    path: false
  }
}
```

#### 2.1craco

如果你使用的是craco:

```js
module.exports = {
    webpack: {
        alias: {
          // alias...
        },

        configure: config => {
            const { resolve = {} } = config;
            resolve.fallback = { ...(resolve.fallback || {}), fs: false, path: false };
            resolve.fallback.path = false;
            return { ...config, resolve };
        },
    },
    plugins: [
      // plugins...
    ],
};

```

### 3.修改package.json

```json
"browser":{
  "path":false,
  "fs":false
},
"dependencies":{
  // ...
}
```

> 此步骤非必须





