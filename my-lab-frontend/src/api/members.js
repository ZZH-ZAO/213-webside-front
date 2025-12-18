import http from './http'

// 获取成员列表
export function fetchMembers(params = {}) {
  return http.get('/members', { params })
}

// 创建新成员
export function createMember(data) {
  return http.post('/members', data)
}

// 获取单个成员
export function getMember(id) {
  return http.get(`/members/${id}`)
}