<template>
  <section>
    <h1>实验室官网首页</h1>
    <p>这里放愿景、研究方向简介、项目统计占位。</p>
    <div class="quick-stats">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <h3>{{ s.value }}</h3>
        <span>{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { label: '成员数', value: 0 },
  { label: '项目数', value: 0 },
  { label: '论文数', value: 0 }
]
</script>

<style scoped>
.quick-stats {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.stat-card {
  flex: 1 1 160px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
  background: #fafafa;
}
</style>