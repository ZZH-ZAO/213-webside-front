<template>
  <div>
    <div class="page-header">
      <h2>项目列表</h2>
      <button class="add-btn" @click="showForm = true">+ 添加项目</button>
    </div>

    <!-- 添加项目表单 -->
    <div v-if="showForm" class="form-modal">
      <div class="form-content">
        <h3>添加新项目</h3>
        <form @submit.prevent="handleAdd">
          <label>
            项目名称 <span class="required">*</span>
            <input v-model="form.title" required placeholder="请输入项目名称" />
          </label>
          <label>
            项目简介 <span class="required">*</span>
            <input v-model="form.summary" required placeholder="请输入项目简介" />
          </label>
          <label>
            详细描述 <span class="required">*</span>
            <textarea v-model="form.description" required placeholder="请输入详细描述" rows="3"></textarea>
          </label>
          <label>
            状态
            <select v-model="form.status">
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
              <option value="published">已发表</option>
            </select>
          </label>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeForm">取消</button>
            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? '提交中...' : '确认添加' }}
            </button>
          </div>
        </form>
      </div>
    </div>

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
import { fetchProjects, createProject } from '../api/projects'

const projects = ref([])
const loading = ref(false)
const error = ref('')

// 表单相关
const showForm = ref(false)
const submitting = ref(false)
const form = ref({
  title: '',
  summary: '',
  description: '',
  status: 'ongoing'
})

function closeForm() {
  showForm.value = false
  form.value = { title: '', summary: '', description: '', status: 'ongoing' }
}

async function handleAdd() {
  submitting.value = true
  try {
    await createProject(form.value)
    closeForm()
    await load()  // 重新加载列表
  } catch (e) {
    alert(e?.response?.data?.detail || e?.message || '添加失败')
  } finally {
    submitting.value = false
  }
}

function translateStatus(status) {
  const map = { ongoing: '进行中', completed: '已完成', published: '已发表' }
  return map[status] || status
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetchProjects()
    projects.value = res
  } catch (e) {
    error.value = e?.response?.data?.detail || e?.message || '请求失败'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-btn {
  padding: 8px 16px;
  background: #2F54EB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-btn:hover {
  background: #1d3ed1;
}
.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.form-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
}
.form-content h3 {
  margin: 0 0 16px 0;
}
.form-content label {
  display: block;
  margin-bottom: 12px;
}
.form-content input,
.form-content select,
.form-content textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
}
.required {
  color: #dc2626;
}
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
}
.cancel-btn {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}
.submit-btn {
  padding: 8px 16px;
  background: #2F54EB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
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