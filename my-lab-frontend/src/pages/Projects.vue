<template>
  <div>
    <h2>项目列表</h2>
    <LoadingSpinner v-if="loading" text="加载项目..." />
    <ErrorBlock v-else-if="error" :message="error" :retry="load" />
    <div v-else class="project-list">
      <div class="project-card" v-for="p in projects" :key="p.id">
        <h3>{{ p.title }}</h3>
        <p class="summary">{{ p.summary }}</p>
        <span class="badge" :class="p.status">{{ translateStatus(p.status) }}</span>
      </div>
      <div v-if="projects.length === 0" class="empty">暂无项目</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorBlock from '../components/common/ErrorBlock.vue'
// import { fetchProjects } from '../api/projects'

const projects = ref([])
const loading = ref(false)
const error = ref('')

function mockFetchProjects() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: '智能感知平台', summary: '环境参数采集与分析', status: 'ongoing' },
        { id: 2, title: '数据可视化系统', summary: '展示数据与成果', status: 'completed' }
      ])
    }, 700)
  })
}

function translateStatus(status) {
  const map = { ongoing: '进行中', completed: '已完成', published: '已发表' }
  return map[status] || status
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    // const res = await fetchProjects()
    // projects.value = res.data || []
    projects.value = await mockFetchProjects()
  } catch (e) {
    error.value = e?.message || '请求失败'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.project-list {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}
.project-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  position: relative;
}
.summary {
  margin: 8px 0;
  font-size: 14px;
  color: #555;
}
.badge {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}
.badge.ongoing { background: #2F54EB; }
.badge.completed { background: #10B981; }
.badge.published { background: #F59E0B; }
.empty {
  text-align: center;
  padding: 24px;
  color: #666;
}
</style>