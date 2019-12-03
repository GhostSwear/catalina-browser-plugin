## 前言

#### 说明
因为微信小程序的技术限制（仅支持https协议且不能修改请求头等元素），我们不得不开发一个可以跨域的应用，考虑过JavaFx、Android等技术，但最后还是选择了开发Chromium内核浏览器的插件。

#### 封号问题
官方之前根据请求头来判断是否使用了卡特琳娜，我们一直在模拟真实用户的请求头让官方无法判断。但是在前两日（2019-10-28）官方似乎检测ip了，因为你们的每一个请求都会到我们的服务器然后再转发到官方的服务器，所以有些时候登录就会被封。但是插件版官方想要封号我觉得很难很难很难...几乎不可能。

## 安装&使用

#### 安装(Android)
> [点我看图文教程](http://bbs.huluxia.com/wap/thread/612097.html?para=37Hftt%2B337bftN%2Bx37Lftt%2By3p%2Fftt%2Bx37LfsN%2B537c%3D%0A&product=tool)

#### 安装(iOS)
> 非常抱歉，暂不支持iOS。

#### 安装(Windows、Mac OS) ([点我看视频教程](https://www.bilibili.com/video/av77590532))
1. 下载最新版的插件 [点我下载](https://github.com/YQHP-Happi/catalina-browser-plugin/releases)
    > 进去之后找最上面的：[catalina-browser-plugin-release-v1.1.2.zip](https://github.com/YQHP-Happi/catalina-browser-plugin/releases/download/v1.1.1/catalina-browser-plugin-release-v1.1.2.zip)
，下载后解压
2. 解压完成之后打开 Chromium内核浏览器
    > 推荐使用 [Chrome](https://www.google.cn/intl/zh-CN/chrome/) 、[新版Edge](https://www.microsoftedgeinsider.com/zh-cn/download/) 浏览器。当然用360、QQ、百度、搜狗等浏览器也可以（但不保证可用性）。
3. 打开浏览器之后（以新版Edge为例）
    > * 点击右上角的三个点  
    > 
    > * 点击 “扩展”  
    > * 打开左下角的 “开发人员模式”    
    > * 然后点击上面的 “加载解压缩的扩展”  
    > * 选择刚刚解压的插件即可


#### 使用
1. 打开官方题库页面
    > [题库1](https://dwz.cn/xFyS0BnI) [题库2](https://dwz.cn/lth8zBgx) [题库3](https://dwz.cn/iWszcdfI) 这三个题库地址没有区别不用刻意区分，进入任意一个即可。
2. 答题
    > 随便进入一个答题模式：专项技能型、课程复习型、模拟真题型进入之后等3-5秒答案会自动选中。  
    > 
    > 如果答案未自动选中请看下面：开发者模式
3. 开发者模式
    > 打开试卷时候我们推荐你打开“开发者模式”（按键盘F12）然后点击“Console”即可看到对应日志。
4. 此插件仅支持ACCP课程，如其它课程也要使用请向我们 [反馈](https://github.com/YQHP-Happi/catalina-browser-plugin/issues/new)

## 源码解析

#### 前提
想要看懂源码你应当会以下技术

* javascript
* npm
* node
* webpack

npm、node、webpack不懂也可以，只要会javascript也可以看懂。

#### 结构
```
|── catalina-browser-plugin
    ├── .babelrc
    ├── .eslintrc.js
    ├── .gitignore
    ├── LICENSE
    ├── README.md
    ├── package.json
    ├── webpack.config.js
    └── src
        |── index.js
        ├── conf
        |   └── manifest.json
        ├── images
        |   ├── icon-orgin.png
        |   └── icon.png
        ├── js
        |   ├── background.js
        |   ├── http.js
        |   ├── img2md5.js
        |   ├── init.js
        |   └── process.js
        └── pages
            └── background.html
```

## 关于我们

#### 联系
QQ群：[532077356](https://qm.qq.com/cgi-bin/qm/qr?k=kpuO3MBZH5QB-nEA0RRe8y7OQTWNqsgi&authKey=YU0ymghKS0ZziCJJsq5omi3uj%2FgyV2o3hirsBkTRVwG3d0ay%2Fp9wqdqIAHJMCHAo)  
微信公众号：卡特琳娜

#### 意见/建议
如在使用中遇到问题，[点我反馈](https://github.com/YQHP-Happi/catalina-browser-plugin/issues/new)
