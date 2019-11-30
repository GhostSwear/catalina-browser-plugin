# 前言

### 说明
因为微信小程序的技术限制（仅支持https协议且不能修改请求头等元素），我们不得不开发一个可以跨域的应用，考虑过JavaFx、Android等技术，但最后还是使用了Chromium内核浏览器插件。

### 微信小程序问题
官方之前根据http请求头来判断是否使用了卡特琳娜，我们一直在模拟真实用户的请求头让官方无法判断。但是在前两日（2019-10-28）官方似乎检查ip了，因为你们的每一个请求都会到我们的服务器我们再转发到官方的服务器。所以登录就会被封。

# 如何使用

### 安装
1. 下载最新版的插件 [点我下载](https://github.com/YQHP-Happi/catalina-browser-plugin/releases)
    > 进去之后找最上面的：catalina-browser-plugin-release-vxx.zip，下载后解压
2. 解压完成之后打开 Chromium内核浏览器
    > 推荐使用 [Chrome](https://www.google.cn/intl/zh-CN/chrome/) 、[新版Edge](https://www.microsoftedgeinsider.com/zh-cn/download/) 浏览器
3. 打开浏览器之后（以新版Edge为例）
    1. 点击右上角的三个点  
    2. 点击 “扩展”  
    3. 打开左下角的 “开发人员模式”  
    4. 然后点击上面的 “加载解压缩的扩展”
    5. 选择刚刚解压的插件即可

