<template>
  <div>
    <div class="page-header">
      <h2>实验室成员</h2>
      <button class="add-btn" @click="showForm = true">+ 添加成员</button>
    </div>

    <!-- 添加成员表单 -->
    <div v-if="showForm" class="form-modal">
      <div class="form-content">
        <h3>添加新成员</h3>
        <form @submit.prevent="handleAdd">
          <label>
            姓名 <span class="required">*</span>
            <input v-model="form.name" required placeholder="请输入姓名" />
          </label>
          <label>
            角色 <span class="required">*</span>
            <select v-model="form.role" required>
              <option value="">请选择角色</option>
              <option value="指导老师">指导老师</option>
              <option value="博士生">博士生</option>
              <option value="硕士生">硕士生</option>
              <option value="本科生">本科生</option>
            </select>
          </label>
          <label>
            研究方向
            <input v-model="form.research" placeholder="请输入研究方向（可选）" />
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

    <LoadingSpinner v-if="loading" text="加载成员列表..." />
    <ErrorBlock v-else-if="error" :message="error" :retry="load" />
    <div v-else class="members-grid">
      <div class="member-card" v-for="m in members" :key="m.id">
        <div class="avatar">{{ m.name.charAt(0) }}</div>
        <div class="info">
          <strong>{{ m.name }}</strong>
          <small>{{ m.role }}</small>
          <small v-if="m.research" class="research">{{ m.research }}</small>
        </div>
      </div>
      <div v-if="members.length === 0" class="empty">暂无成员数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorBlock from '../components/common/ErrorBlock.vue'
import { fetchMembers, createMember } from '../api/members'

const members = ref([])
const loading = ref(false)
const error = ref('')

// 表单相关
const showForm = ref(false)
const submitting = ref(false)
const form = ref({
  name: '',
  role: '',
  research: ''
})

function closeForm() {
  showForm.value = false
  form.value = { name: '', role: '', research: '' }
}

async function handleAdd() {
  submitting.value = true
  try {
    await createMember(form.value)
    closeForm()
    await load()  // 重新加载列表
  } catch (e) {
    alert(e?.response?.data?.detail || e?.message || '添加失败')
  } finally {
    submitting.value = false
  }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetchMembers()
    members.value = res
  } catch (e) {
    error.value = e?.response?.data?.detail || e.message
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
  max-width: 400px;
}
.form-content h3 {
  margin: 0 0 16px 0;
}
.form-content label {
  display: block;
  margin-bottom: 12px;
}
.form-content input,
.form-content select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.member-card {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  display: flex;
  gap: 12px;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  background: #2F54EB;
  color: #fff;
  display: flex;
  font-weight: 600;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.research {
  color: #666;
  font-size: 12px;
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 24px;
  color: #666;
}
</style>