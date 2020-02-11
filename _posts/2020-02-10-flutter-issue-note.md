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

### 2. 设置CocoaPods报ruby: bad interpreter: No such file or directory

* 错误信息

在配置iOS环境时，安装CocoaPods后，设置报如下错误

```shell
$ pod setup
-bash: /usr/local/bin/pod: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: bad interpreter: No such file or directory
```

* 问题分析

确认pod路径

```shell
$ which pod
/usr/local/bin/pod
```

确认cocoapods安装状态

```shell
$ gem list --local |grep coco
cocoapods (1.8.4)
cocoapods-core (1.8.4)
cocoapods-deintegrate (1.0.4)
cocoapods-downloader (1.3.0)
cocoapods-plugins (1.0.0)
cocoapods-search (1.0.0)
cocoapods-stats (1.1.0)
cocoapods-trunk (1.4.1)
cocoapods-try (1.1.0)
```

说明cocoapods有安装，再确认一下cocoapods 信息

```shell
$ gem info cocoapods

*** LOCAL GEMS ***

cocoapods (1.8.4)
    Authors: Eloy Duran, Fabio Pelosin, Kyle Fuller, Samuel Giddins
    Homepage: https://github.com/CocoaPods/CocoaPods
    License: MIT
    Installed at: /usr/local/lib/ruby/gems/2.6.0

    The Cocoa library package manager.
```

初步发现问题：目前path上获取的pod是在/usr/local/bin/pod的，而我们安装的在/usr/local/lib/ruby/gems/2.6.0，说明并非我们安装的版本，回想起之前处理升级到Catalina的兼容问题时（见[修复升级Catalina后Jekyll本地预览启动失败](https://peterlpt.github.io/2019/12/02/fix-jekyll-local-exec-fail-on-catalina)）修改过ruby后，所有安装的gems均已经在此目录下，在其中的bin中存放了各个包的可执行入口，包含了这里的pod：

```shell
$ ls /usr/local/lib/ruby/gems/2.6.0/bin
bundle          github-pages    nokogiri        sandbox-pod     xcodeproj
bundler         httpclient      pod             sass
commonmarker    jekyll          rake            sass-convert
fuzzy_match     kramdown        rougify         scss
gemoji          listen          safe_yaml       update_rubygems
```

* 问题解决

修改Paths

```shell
$ echo 'export PATH="/usr/local/lib/ruby/gems/2.6.0/bin:$PATH"' >> ~/.bash_profile
$ source ~/.bash_profile

# 再次执行pod相关命令则不会再报错了
$ pod --version
1.8.4
```

