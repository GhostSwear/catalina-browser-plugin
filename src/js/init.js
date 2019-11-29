/**
 * 从线上获取配置文件
 */
async function getConfig() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://cdn.jsdelivr.net/gh/starxg/webbrowserforidea@master/src/com/starxg/browserfx/BrowserWindowFactory.java", true);
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject("响应码并非200，而是：" + this.status);
            }
        };
        // 请求出错
        xhr.onerror = reject;
        // 请求超时
        xhr.ontimeout = reject;
        xhr.send();
    });
}

export { getConfig };