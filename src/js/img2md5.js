import SparkMD5 from "spark-md5";
import Http from "./http";
/**
 * 把img转成md5
 * @param {图片地址，可以是数组} imgUrls
 */
const img2md5 = function (imgUrls, referer) {
    // 如果是单个的时候转成数组
    imgUrls = typeof imgUrls === "string" ? [imgUrls] : imgUrls;

    // 采用数组，因为异步无须，利用数组保证有序！
    let result = [];
    for (let i = 0; i < imgUrls.length; i++) {
        result.push(i);
    }
    // 统计数量，等于imgUrls.length的时候就是返回结果的时候
    let count = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < imgUrls.length; i++) {
            const url = imgUrls[i];
            doConvert(url, referer)
                .then(d => {
                    result[i] = d;
                    ++count === imgUrls.length && resolve(result);
                })
                .catch(() => {
                    result[i] = null;
                    ++count === imgUrls.length && resolve(result);
                });
        }
    });
};

/**
 * 转换
 * @param {图片地址} img
 */
function doConvert(img, referer) {
    return new Promise((resolve, reject) => {
        Http.get({
            url: img,
            method: "get",
            responseType: "blob",
            headers: {
                myReferer: referer
            }
        }).then(d => {
            try {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var spark = new SparkMD5.ArrayBuffer();
                    spark.append(e.target.result);
                    resolve(spark.end());
                };
                reader.readAsArrayBuffer(d);
            } catch (error) {
                console.log(error);
            }
        }).catch(reject);
    });
}

export default img2md5;
