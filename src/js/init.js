var port = chrome.runtime.connect({ name: "initConfig" });

port.onMessage.addListener(function(msg) {
    console.log("接收到收到消息：", msg);
});

port.postMessage({});

/**
 * 从线上获取配置文件
 */
async function getConfig() {
    return new Promise((resolve, reject) => {
    });
}

export { getConfig };
