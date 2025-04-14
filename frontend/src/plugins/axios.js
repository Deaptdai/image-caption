import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 5000
    // 发送请求时携带 cookie
    // withCredentials: true, 
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 排除对 login 和 register 路径的拦截
        if (config.url === '/login' || config.url === '/register') {
            return config
        }
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 410) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default service