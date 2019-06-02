---
layout: post
title: Robot Framework编码问题处理
categories: [测试]
description: 记录Robot Framework环境配置中乱码问题处理过程
keywords: Robot Framework
---

记录Robot Framework环境配置中乱码问题处理过程

### 1. 环境版本

```shell
PS C:\Users\Administrator.WIN-EL9VQPTCC4M> pip list
DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7.
Package                         Version
------------------------------- --------
certifi                         2019.3.9
chardet                         3.0.4
idna                            2.8
numpy                           1.16.3
Pillow                          6.0.0
pip                             19.1.1
Pygments                        2.4.1
PyPubSub                        3.3.0
pywin32                         224
requests                        2.22.0
robotframework                  3.1.2
robotframework-databaselibrary  1.2
robotframework-requests         0.5.0
robotframework-ride             1.7.3.1
robotframework-selenium2library 3.0.0
robotframework-seleniumlibrary  3.3.1
robotframeworklexer             1.1
selenium                        3.141.0
setuptools                      28.8.0
six                             1.12.0
urllib3                         1.25.3
wxPython                        4.0.6
```

### 2. 'ascii' codec can't encode characters in position 8-50: ordinal not in range(128)

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

### 3. 解决console乱码问题

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

改完重启ride生效

