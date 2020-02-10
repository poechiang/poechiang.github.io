---
layout: post
title: Flutter之遇到的问题记录
categories: [Flutter]
description: 记录在Flutter开发中遇到的一系列问题、分析过程及解决方法。
keywords: Flutter

---

记录在Flutter开发中遇到的一系列问题、分析过程及解决方法。

### 1. 给现有Flutter应用添加Web支持，运行报bad import错

* 错误信息

```shell
$ flutter run -d chrome
Launching lib/main.dart on Chrome in debug mode...
                                                                        
Unable to find modules for some sources, this is usually the result of either a
bad import, a missing dependency in a package (or possibly a dev_dependency
needs to move to a real dependency), or a build failure (if importing a
generated file).

Please check the following imports:

`import 'generated_plugin_registrant.dart';` from flutter_jzcf|lib/utils/encrypt_web_entrypoint.dart at 5:1

Failed after 2.3s                                                       
Building application for the web...                                12.2s
Failed to build application for the Web.

```

* 问题解决

原因是app中存在多个main()函数，注释掉其他不必要的测试main()函数，只保留一个即可。

* 参考： [Enable web in flutter import errors](https://stackoverflow.com/questions/59968935/enable-web-in-flutter-import-errors)