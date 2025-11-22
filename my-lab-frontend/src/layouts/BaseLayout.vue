<template>
  <div class="layout">
    <AppHeader />
    <main class="main-container">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/common/AppHeader.vue'
import AppFooter from '../components/common/AppFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-container {
  flex: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>