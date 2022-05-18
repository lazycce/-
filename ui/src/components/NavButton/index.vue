<template>
  <div class="fixed">
    <el-button size="large" :icon="ArrowLeftBold" type="info" circle @click="() => { router.go(-1) }" />
    <el-button size="large" :icon="House" type="primary" circle @click="() => { router.push('/') }" />
  </div>
</template>
<script setup lang="ts">
import { ArrowLeftBold, House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style>
.fixed {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
