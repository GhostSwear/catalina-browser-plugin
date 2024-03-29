import img2md5 from "./img2md5";
import Http from "./http";

// 获取浏览器版本
const CHROME_VERSION = parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1]);
// 拦截请求头选项
const BEFORE_SEND_HEADERS_OPTIONS = ["blocking", "requestHeaders"];
// 兼容低版本浏览器,因为 Chromium 要求72版本以上要想修改Referer头必须加extraHeaders
if (chrome.webRequest.OnBeforeRequestOptions.EXTRA_HEADERS || CHROME_VERSION >= 72) {
    BEFORE_SEND_HEADERS_OPTIONS.push("extraHeaders");
}
console.log(`当前Chromium版本：${CHROME_VERSION}，拦截请求选项：${BEFORE_SEND_HEADERS_OPTIONS}`);

/**
 * 监听content_scripts.js发来的消息，因为content_scripts的权限不能进行跨域
 * 所以要background.js的协助
 */
chrome.runtime.onConnect.addListener(function (port) {
    // 对图片转md5进行监听
    if (port.name === "img2md5") {
        port.onMessage.addListener(function ({ imgUrls, referer }) {
            img2md5(imgUrls, referer)
                .then(d => {
                    port.postMessage(d);
                })
                .catch(console.log);
        });
    }

    //对初始化配置进行监听
    if (port.name === "initConfig") {
        port.onMessage.addListener(function () {
            Http.get("http://catalina.starxg.com/catalina-plugin-conf.json", {
                r: Math.random()
            })
                .then(d => {
                    port.postMessage({
                        success: true,
                        data: d
                    });
                })
                .catch(e => {
                    port.postMessage({
                        success: false,
                        msg: e
                    });
                });
        });
    }

    if (port.name === "getAnswers") {
        port.onMessage.addListener(function (md5s) {
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

/**
 * 拦截图片资源请求.从而达到添加 Referer
 */
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {

    for (const h of details.requestHeaders) {
        if (h.name === "myReferer") {
            h.name = "Referer";
            break;
        }
    }

    return { requestHeaders: details.requestHeaders };
},
{ urls: ["*://exam-resources.bdqn.cn/*", "*://tiku.ekgc.cn/*", "*://tiku.kgc.cn/*", "*://exam.bdqn.cn/*"] },
BEFORE_SEND_HEADERS_OPTIONS);