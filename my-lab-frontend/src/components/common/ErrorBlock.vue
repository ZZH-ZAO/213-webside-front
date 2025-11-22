<template>
  <div class="error-block">
    <p>{{ message }}</p>
    <button v-if="retry" @click="retry">重试</button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '发生错误'
  },
  retry: {
    type: Function,
    default: null
  }
})
</script>

<style scoped>
.error-block {
  padding: 16px;
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #dc2626;
  text-align: center;
  margin: 16px 0;
}
button {
  margin-top: 8px;
  padding: 4px 12px;
  background-color: #fff;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #fef2f2;
}
</style>
