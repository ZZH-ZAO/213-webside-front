<template>
  <header class="header">
    <div class="logo" @click="$router.push('/')">LabSite</div>
    <nav class="nav">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/members">成员</RouterLink>
      <RouterLink to="/projects">项目</RouterLink>
      <RouterLink v-if="!auth.isLogged" to="/login">登录</RouterLink>
      <RouterLink v-else to="/dashboard">个人中心</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #eee;
}
.logo {
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
}
.nav a {
  margin-left: 16px;
  text-decoration: none;
  color: #333;
}
.nav a.router-link-active {
  color: var(--color-primary, #2F54EB);
  font-weight: 500;
}
</style>