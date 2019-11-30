/**
 * 封装fly请求类
 */
import Fly from "flyio/dist/npm/fly";
const fly = new Fly();

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((response) => {
    return response.data;
},
(err) => {
    return Promise.resolve(err);
});
export default fly;
