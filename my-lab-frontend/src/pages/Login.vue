<template>
  <div class="login-wrapper">
    <h2>登录</h2>
    <form @submit.prevent="submit">
      <label>
        用户名
        <input v-model="username" required />
      </label>
      <label>
        密码
        <input v-model="password" type="password" required />
      </label>
      <button type="submit" :disabled="loading">{{ loading ? '处理中...' : '登录' }}</button>
    </form>
    <p class="tip">目前为模拟登录，后端接口完成后替换。</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'
// import http from '../api/http'

const username = ref('')
const password = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function submit() {
  loading.value = true
  try {
    // const res = await http.post('/auth/login', { username: username.value, password: password.value })
    // auth.setToken(res.data.token)
    // auth.setUser(res.data.user)
    // 模拟
    await new Promise(r => setTimeout(r, 700))
    auth.setToken('FAKE_TOKEN')
    auth.setUser({ id: 1, username: username.value, role: 'member' })
    router.push(route.query.redirect || '/dashboard')
  } catch (e) {
    alert(e?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  max-width: 360px;
  margin: 0 auto;
  padding: 32px 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
}
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  background: #2F54EB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.tip {
  font-size: 12px;
  color: #666;
  margin-top: 12px;
  text-align: center;
}
</style>