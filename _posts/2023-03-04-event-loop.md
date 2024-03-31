---
layout: post
title: 事件循环
category: 前端
description: 事件循环即消息循环,同消息队列一起是浏览器协调不同线程协同工作的机制,浏览器通过for循环依次从消息队列中出队第一个任务并派发给主线程执行,当遇到延时、网线、交互等耗时时任时,会将对应任务加入对应类型的队列,分配给对应的线程处理,其他线程在任务结束后只需要将回调作为下一任务加入消息队列末尾即可
tags: [Js, Event, EventLoop]
---

## 浏览器进程模型

### 浏览器的进程与线程

+ 浏览器进程: 界面显示、用户交互、子进程管理

+ 网络进程: 加载网络资源

+ 渲染进程: 启动渲染主线程,解析html,应用css,执行js代码.

> 当前每个标签页开启一个主进程,后续会为每个站点开启一个共享的渲染进程
> 可以在浏览器的任务管理器中查看进程模型

![浏览器任务管理器](/assets/images/posts/2023-03-05 09.45.07.png){:.full-width}

## 渲染线程工作原理

### 渲染线程工作内容

+ 解析HTML、CSS、计算样式
+ 处理布局、图层
+ 执行全局JS
+ 处理事件回调和计时器
+ 页面刷新频率

### 消息队列

渲染主线程开启一个无限循环(Event Loop)来依次执行消息队(宏任务队列与微任务队列)列中等待执行的各项任务,所有耗时操作会交给其他的线程去执行,渲染主线程与其他线程之间依赖在各消息队列中调度各种任务实现通讯

> W3C最新的解释已经将宏任务队列进一步细分了延时队列、交互队列、网络队列、渲染队列等……,并保证有唯一的一个微队列且拥有最高优先级
> 微队列我 &gt; 交互队列 &gt; 延时队列
> 各任务按不同任务类型,同一类型任务必须在一个队列,不同类型的任务可以在不同类型的队列,也可以在同一个类型的队列中

## JS异步执行

JS运行于唯一的渲染主线程中,是一门单线程语言.为避免极为繁忙的渲染线程产生阻塞,从而导致消息队列中很多更高优先级的任务无法得到执行,造成页面卡死交互不畅,所以浏览器采用异步方式来避免:当某些计时、网络、事件监听等耗时任务发时时,主线程将任务交给其他线程去处理,主线程结束当前任务并执行后续代码,当其他线程完成时,将之前传递的回调函数作为任务加入到消息队列的末尾,等待主线程重新调度执行.
> JS为何阻塞渲染:因为JS运行和渲染都运行于渲染主线程

## 任务的优先级
不同任务没有优先级,但任务按不同类型分配到不同类型的任务队列,任务队列有优先级,分配到同一类型任务队列的相同或不同类型的任务之间没有优先级之分,按入队先后顺序依次等待调度

> 添加任务至微队列:
> + Promise
>```js
> Promise.resolve().then(()=>{/* ... */})
>```
> + [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
>```js
> new MutationObserver((mutationsList, observer)=> {/* ... */}).observe(dom, config);
>```