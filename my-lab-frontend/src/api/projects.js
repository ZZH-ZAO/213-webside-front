import http from './http'

export function fetchProjects(params = {}) {
  return http.get('/projects', { params })
}