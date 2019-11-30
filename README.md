# 前言

### 说明
因为微信小程序的技术限制（仅支持https协议且不能修改请求头等元素），我们不得不开发一个可以跨域的应用，考虑过JavaFx、Android等技术，但最后还是使用了Chromium内核浏览器插件。

### 微信小程序问题
官方之前根据http请求头来判断是否使用了卡特琳娜，我们一直在模拟真实用户的请求头让官方无法判断。但是在前两日（2019-10-28）官方似乎检查ip了，因为你们的每一个请求都会到我们的服务器我们再转发到官方的服务器。所以登录就会被封。

# 安装/使用

### 安装
1. 下载最新版的插件 [点我下载](https://github.com/YQHP-Happi/catalina-browser-plugin/releases)
    > 进去之后找最上面的：catalina-browser-plugin-release-vxx.zip，下载后解压
2. 解压完成之后打开 Chromium内核浏览器
    > 推荐使用 [Chrome](https://www.google.cn/intl/zh-CN/chrome/) 、[新版Edge](https://www.microsoftedgeinsider.com/zh-cn/download/) 浏览器
3. 打开浏览器之后（以新版Edge为例）
    > * 点击右上角的三个点  
    > 
    > * 点击 “扩展”  
    > * 打开左下角的 “开发人员模式”    
    > * 然后点击上面的 “加载解压缩的扩展”  
    > * 选择刚刚解压的插件即可

### 使用
1. 打开官方题库页面
    > [题库1](https://dwz.cn/xFyS0BnI) [题库2](https://dwz.cn/lth8zBgx) [题库3](https://dwz.cn/iWszcdfI) 这三个题库地址没有区别不用刻意区分，进入任意一个即可。
2. 答题
    > 随便进入一个答题模式：专项技能型、课程复习型、模拟真题型进入之后等3-5秒题目会自动选中。  
    > 
    > 如果答案未自动选中请看下面：开发者模式）
3. 开发者模式
    > 打开试卷时候我们推荐你打开“开发者模式”（按键盘F12）然后点击“Console”即可看到对应日志。

# 源码解析

### 前提
想要看懂源码你应当会以下技术

* javascript
* npm
* node
* webpack

不懂也可以，只要会javascript也可以看懂。

### 结构
```
|── mp-project
    ├── .babelrc （babel配置）
    ├── .eslintrc.js （eslint配置）
    ├── .gitignore （git）
    ├── LICENSE （开源协议）
    ├── README.md （说明）
    ├── package.json （使用npm管理依赖）
    ├── webpack.config.js （webpack配置，负责打包等...）
    └── src
        |── index.js
        ├── conf
        |   └── manifest.json (插件配置文件)
        ├── images （logo图片）
        |   ├── icon-orgin.png
        |   └── icon.png
        ├── js
        |   ├── background.js （负责跨域请求）
        |   ├── http.js （对flyjs的封装）
        |   ├── img2md5.js (图片转md5工具)
        |   ├── init.js （初始化获取配置）
        |   └── process.js （获取答案）
        └── pages
            └── background.html （常驻后台页面和background.js）
```

# 联系我们
微信公众号
<img src="https://www.baidu.com/img/bd_logo1.png"/>
