import axios from "axios";
import { MessageBox } from "element-ui";

const api = axios.create({
    // 请求的公共地址
    baseURL: 'http://1.12.235.213:8088/api',
    // 请求超时时间 当请求的时间超过3秒还没获取请求结果，提示用户超时
    timeout: 3000,
});

// 获取当前用户的token值
import { token } from './config.js';

// 请求拦截器
api.interceptors.request.use(config => {
    config.headers.Accept = 'application/json'
    // 请求投中携带用户的token信息
    config.headers.Autotization = 'Bearer ' + token;
    // 将配置完成的config对象返回出去 如果不返回 请求则不会进行
    return config;
}, err => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
});

// 响应拦截器
api.interceptors.response.use(res => {
    // 当请求状态码为200时
    if (res.status >= 200 && res.status <= 299) {
        // 说明该次请求成功，将数据返回
        return res;
    }
}, err => {
    // 用户登录持久化
    const status = err.response.status;
    if (status === 401) {
        MessageBox.alert(
            '登录状态已过期, 您可以继续留在该页面, 或者重新登陆',
            '系统提示', {
            confirmButtonText: '重新登录',
            type: 'warning',
            callback: action => {
                location.href = '/math/home';
            }
        }
        )
        // 将过期的token进行清除
        window.localStorage.removeItem('token');
    }

    return Promise.reject(err);
})

// 将api对象导出
export default api;