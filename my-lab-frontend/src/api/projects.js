import http from './http'

// 获取项目列表
export function fetchProjects(params = {}) {
  return http.get('/projects', { params })
}

// 创建新项目
export function createProject(data) {
  return http.post('/projects', data)
}

// 获取单个项目
export function getProject(id) {
  return http.get(`/projects/${id}`)
}