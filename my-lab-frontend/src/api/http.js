import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
  timeout: 10000
})

http.interceptors.request.use(cfg => {
  const auth = useAuthStore()
  if (auth.token) {
    cfg.headers = cfg.headers || {}
    cfg.headers.Authorization = `Bearer ${auth.token}`
  }
  return cfg
})

http.interceptors.response.use(
  resp => resp.data,
  err => {
    // 可以在这里做统一错误处理或弹 Toast
    return Promise.reject(err)
  }
)

export default http