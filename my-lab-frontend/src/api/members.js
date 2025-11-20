import http from './http'

// 后端联调时直接使用 http.get('/members')
export function fetchMembers(params = {}) {
  // 如果后端还没准备好，可以临时返回 Promise.resolve(mock)
  return http.get('/members', { params })
}