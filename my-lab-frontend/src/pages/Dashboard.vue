<template>
  <div>
    <h2>个人中心</h2>
    <p v-if="auth.user">欢迎，{{ auth.user.username }}！后续将显示考勤、我的项目、API Key 管理。</p>
    <div class="actions">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.actions {
  margin-top: 16px;
}
.actions button {
  padding: 8px 12px;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>