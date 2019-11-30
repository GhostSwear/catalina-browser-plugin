import img2md5 from "./img2md5";
import Http from "./http";
var config = null;

/**
 * 监听content_scripts.js发来的消息，因为content_scripts的权限不能进行跨域
 * 所以要background.js的协助
 */
chrome.runtime.onConnect.addListener(function(port) {
    // 对图片转md5进行监听
    if (port.name === "img2md5") {
        port.onMessage.addListener(function(imgUrls) {
            img2md5(imgUrls)
                .then(d => {
                    port.postMessage(d);
                })
                .catch(console.log);
        });
    }

    //对初始化配置进行监听
    if (port.name === "initConfig") {
        port.onMessage.addListener(function() {
            if (config != null) {
                port.postMessage(config);
                return;
            }
            Http.get("http://catalina.starxg.com/catalina-plugin-conf.json", {
                r: Math.random()
            })
                .then(d => {
                    port.postMessage((config = {
                        success: true,
                        data: d
                    }));
                })
                .catch(e => {
                    port.postMessage((config = {
                        success: false,
                        msg: e
                    }));
                });
        });
    }

    if (port.name === "getAnswers") {
        port.onMessage.addListener(function(md5s) {
            Http.post("http://starxg.com/answer/img/md5", md5s)
                .then(d => {
                    port.postMessage(d);
                })
                .catch(e => {
                    port.postMessage(e);
                });
        });
    }
});
