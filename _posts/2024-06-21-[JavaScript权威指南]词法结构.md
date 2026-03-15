---
layout: post
title: 词法结构
category: JavaScript
description: 变量名如何命名、注释的界定符及如何分隔程序的语句等。
tags: [js, javascript, 词法结构]
---

## 文本

+ 区分大小写
+ 忽略程序记号间的空格和换行符
+ 识别制表符、各ASCII控制符和Unicode间格为空格
+ 识别换行符、回车符和回车/换行为行终止符

## 注释

+ // 单行注释
+ /* 多行注释 */

## 字面量（ literal ）

直接出现在程序中的数据值：

+ 12
+ 1.2
+ "hello world"
+ 'hi'
+ true
+ false
+ null

## 标识符和保留字

### 标识符

命名常量、变量、属性、函数和类：字母、下划线或$开头，后跟字母、数字、下划线或$

### 保留字

`as` `const`  `export` `get` `null` `target` `void` `async` `continue` `extends` `if` `of` `this` `while` `await` `debugger` `false` `import` `return` `throw` `with` `break` `default` `finaly` `in` `set` `true` `yield` `case` `delete` `for` `instanceof` `static` `try` `catch` `do` `from` `let` `super` `typeof` `class` `else` `function` `new` `switch` `var`

`enum` `implements` `interface` `package` `private` `protected` `public`

`arguments` `eval`

## Unicode

字符串和注释中可以使用任意Unicode字符，建议在标识符中只使用ASCII字符。

### Unicode转义序列

使用ASCII字符表示Unicode字符：以`\u`开头,后跟4位十六进制数字或包含在一对花括号内的1-6位十六进制数字

```javascript
let café = 1;
console.log(caf\u00e9,caf\{e9}); // 1 1

// ES6后，支持大于等于16位的unicode字符，下面输出表情符号😀
console.log('\u{1f600}')
```

### Unicode归一化

Unicode允许多种编码方式表示同一个字符，`é`可以是`\u00E9`也可以是`e\u0301`：

```javascript
const café = 1; // 等同 caf\u{e9}
const café = 2; // 等同 cafe\u{301}
console.log(café,caf\u{e9},cafe\u{301}) // => 1 1 2

// Unicode标准为所有字符定义了首选编码并规定了归一化例程，
// 用于将文本转换为适配比较的规范形式，
// Javascript假定源代码已经归一化且不参与任何归一化
// 如é的首选编辑即为\u{e9}
let café = 1；
console.log(café)；// => 1
caf\u{e9} = 2；
console.log(café,caf\u{e9})；// => 2 2
// cafe\u{301} = 3； cafe\u{301}未定义，因为它与上面的café不同
const cafe\u{301} = 3；
console.log(café,caf\u{e9},cafe\u{301})；// => 1 2 3

```

## 可选的分号





