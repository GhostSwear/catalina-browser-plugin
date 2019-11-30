var port = chrome.runtime.connect({ name: "initConfig" });

/**
 * 从线上获取配置文件
 */
async function getConfig() {
    return new Promise((resolve, reject) => {
        port.postMessage({});
        port.onMessage.addListener(function(d) {
            if (d.success) {
                resolve(d.data);
            } else {
                reject();
            }
        });
    });
}

export { getConfig };
