/**
 * 封装http请求类
 */
class Http {
    static get(url, { params = null, dataType = "json" }) {
        return Http._request(url, params, "GET", dataType);
    }

    static post(url, { params = null, dataType = "json" }) {
        return Http._request(url, params, "POST", dataType);
    }

    static _request(url, params, method, dataType) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method || "GET", url, true);
            xhr.responseType = dataType || "json";
            // 请求完成
            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(this.response);
                }
            };
            // 请求出错
            xhr.onerror = reject;
            // 请求超时
            xhr.ontimeout = reject;
            xhr.send();
        });
    }
}
export default Http;
