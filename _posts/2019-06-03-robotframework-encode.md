---
layout: post
title: Robot Framework乱码问题处理
categories: [测试]
description: 记录Robot Framework环境配置中乱码问题处理过程
keywords: Robot Framework
---

### 'ascii' codec can't encode characters in position 8-50: ordinal not in range(128)

Python在安装时，默认的编码是ascii，当程序中出现非ascii编码时，python的处理常常会报这样的错UnicodeDecodeError: 'ascii' codec can't decode byte 0x?? in position 1: ordinal not in range(128)，python没办法处理非ascii编码，此时需设置将python的默认编码改为目标编码，如utf8<br>
查询系统默认编码：

```python
sys.getdefaultencoding()  
```

设置默认编码<br>
python的Lib\site-packages文件夹下新建一个sitecustomize.py，内容为：

```python
# encoding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
```

重启查询即可生效

### 解决console乱码问题

修改python安装目录下以下文件<br>
[python安装目录]\Lib\site-packages\robotide\contrib\testrunner\testrunner.py<br>
修改pop方法，把if window前面的"latin1"编码改成gbk：

```python
def pop(self):
        result = ""
        try:
            myqueuerng = xrange(self._queue.qsize())
        except NameError:  # py3
            myqueuerng = range(self._queue.qsize())
        for _ in myqueuerng:
            try:
                # DEBUG result += self._queue.get_nowait()
                # .decode(utils.SYSTEM_ENCODING, 'replace')
                # .decode('UTF-8','ignore')
                result += encoding.console_decode(self._queue.get_nowait(),
                                                  'gbk' if IS_WINDOWS
                                                  else 'UTF-8')
                # ,'replace')  # 'latin1' .decode(utils.SYSTEM_ENCODING,
                # 'replace')  # .decode('UTF-8','ignore')
            except Empty:
                pass
        return result  # DEBUG .decode('UTF-8', 'ignore')
```

![修改结果](/images/posts/test/rf_encode.png "testrunner.py修改结果")

