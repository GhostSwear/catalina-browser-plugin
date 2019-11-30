import img2md5 from "./img2md5";
import Http from "./http";

/**
 * 监听content_scripts.js发来的消息，因为content_scripts的权限不能进行跨域
 * 所以要协助background.js的协助
 */
chrome.runtime.onConnect.addListener(function(port) {

    // 对图片转md5进行监听
    if (port.name === "img2md5") {
        port.onMessage.addListener(function(imgUrls) {
            img2md5(imgUrls).then(d => {
                port.postMessage(d);
            });
        }); 
    }

    //对初始化配置进行监听
    if (port.name === "initConfig") {
        port.onMessage.addListener(function() {
            Http.get("https://cdn.jsdelivr.net/gh/starxg/webbrowserforidea@master/src/com/starxg/browserfx/BrowserWindowFactory.java",{
                dataType: "text"
            }).then(d=>{
                console.log(d);
            }).catch(console.log);
        });
    }
});
