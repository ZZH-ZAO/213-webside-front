<template>
  <div>
    <h2>实验室成员</h2>
    <LoadingSpinner v-if="loading" text="加载成员列表..." />
    <ErrorBlock v-else-if="error" :message="error" :retry="load" />
    <div v-else class="members-grid">
      <div class="member-card" v-for="m in members" :key="m.id">
        <div class="avatar">{{ m.name.charAt(0) }}</div>
        <div class="info">
          <strong>{{ m.name }}</strong>
          <small>{{ m.role }}</small>
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
// 真实联调时改为 import { fetchMembers } from '../api/members'
const members = ref([])
const loading = ref(false)
const error = ref('')

function mockFetchMembers() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '张三', role: '学生' },
        { id: 2, name: '李四', role: '学生' },
        { id: 3, name: '王老师', role: '指导老师' }
      ])
    }, 600)
  })
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    // const res = await fetchMembers()
    // members.value = res.data || []
    members.value = await mockFetchMembers()
  } catch (e) {
    error.value = e?.message || '请求失败'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 24px;
  color: #666;
}
</style>