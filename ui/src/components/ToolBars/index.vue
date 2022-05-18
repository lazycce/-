<template>
  <el-button @click="handleQuery" plain :icon="Refresh" type="info" />
  <el-button @click="handleSave" plain :icon="Select" type="success" />
  <el-button @click="handleDownload" plain :icon="Download" type="primary" />
  <el-button @click="handleAdd" plain :icon="Plus" type="primary" />
</template>
<script lang="ts" setup>
import { Plus, Select, Download, Refresh } from '@element-plus/icons-vue'
import { defineEmits } from 'vue'
const emit = defineEmits(['handleQuery', 'handleSave', 'handleDownload', 'handleAdd'])

  const handleQuery = () => {
    emit('handleQuery')
  }

  const handleSave = () => {
    emit('handleSave')
  }

  const handleDownload = () => {
    emit('handleDownload')
  }

  const handleAdd = () => {
    emit('handleAdd')
  }
</script>

