<template>
  <footer class="footer">
    <div>© {{ year }} 实验室网站</div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: #666;
  border-top: 1px solid #eee;
  margin-top: 24px;
}
</style>