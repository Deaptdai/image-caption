import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // api 的 base_url
    timeout: 5000
    // 发送请求时携带 cookie
    // withCredentials: true, 
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
      return response.data; // 直接返回后端返回的数据
  },
  (error) => {
      return Promise.reject(error);
  }
)

export default service