import SparkMD5 from "spark-md5";
import Http from "./http";
/**
 * 把img转成md5 
 * @param {图片地址，可以是数组} imgUrls 
 */
const img2md5 = function (imgUrls) {
    // 如果是单个的时候转成数组
    imgUrls = typeof imgUrls === "string" ? [imgUrls] : imgUrls;

    // 结果采用map方式，因为是异步请求无法保证顺序性，到时候结果可能是乱的，这时候需要map来一一对应
    let map = {};

    return new Promise((resolve, reject) => {
        for (const url of imgUrls) {
            doConvert(url).then(d => {
                map[url] = d;
                Object.keys(map).length === imgUrls.length && resolve(map);
            }).catch(e => {
                map[url] = null;
                Object.keys(map).length === imgUrls.length && resolve(map);
            });
        }
    });
};

/**
 * 转换
 * @param {图片地址}} img 
 */
function doConvert(img) {
    return new Promise((resolve, reject) => {
        Http.get(img,null,"blob").then(d=>{
            var blob = this.response;
            var reader = new FileReader();
            reader.onload = function (e) {
                var spark = new SparkMD5.ArrayBuffer();
                spark.append(e.target.result);
                resolve(spark.end());
            };
            //转换成FileReader对象
            reader.readAsArrayBuffer(blob);
        }).catch(reject);

    });
}

export default img2md5;