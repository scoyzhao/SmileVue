import axios from 'axios';
import { Toast } from "vant";

let instance = axios.create()

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    const {
        data: {
            code,
            message,
        }
    } = response;
    if (code === 403) {
        Toast.fail(message);
        return window.location.href = '/login'
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;