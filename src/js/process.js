var port = chrome.runtime.connect({ name: "img2md5" });
port.postMessage(["https://www.baidu.com/img/bd_logo1.png"]);
port.onMessage.addListener(function (msg) {
    console.log("接收到收到消息：", msg);
});