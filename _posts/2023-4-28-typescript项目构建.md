---
layout: post
title: Typescript 项目搭建
category: Typescript
description: 记录一次typescript项目本地开发环境的搭建过程……
tags: [type script, rollup]
---

## typescript 本地开发环境搭建

初始化package.json

```js
npm init -y
```

安装依赖

```js
yarn add rollup @rollup/plugin-typescript rollup-plugin-dts typescript tslib concurrently @web/dev-server
```

配置文件

 ```rollup.config.js```

```js
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: './lib/index.esm.js',
                format: 'es',
                sourcemap: true,
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    },
    {
        input: "src/index.ts",
        output: [{ file: "lib/index.d.ts", format: "es" }],
        plugins: [dts()]
    }
]
export default config;
```

```tsconfig.json```

```bash
tsc --init
```



```json
{
    "compilerOptions": {
        "sourceMap": true,
        "target": "es2015",
        "module": "es2015",
        "moduleResolution": "node",
        "noEmitOnError": true,
        "lib": [
            "es2017",
            "DOM"
        ],
        "strict": true,
        "esModuleInterop": false,
        "outDir": "out-tsc",
        "rootDir": "./",
        "allowJs": true,
        "noImplicitAny": true
    },
    "include": [
        "./src/**/*.ts"
    ]
}
```

```web-dev-server.config.json```

```js
export default {
    port: 8000,
    nodeResolve: true,
    open: true,
    watch: true,
    appIndex: "index.html"
};
```

```package.json```

```json
{
  "scripts":{
    "clear":"rm -rf lib/",
    "build": "npm run clear && rollup -c",
    "dev": "concurrently 'rollup -c -w' 'wds'"
  }
}
```

