<template>
  <div class="app-container">
    <div class="app-title">
      <el-tag effect="plain" size="large">表单配置</el-tag>
    </div>
    <div class="tr mb5">
      <ToolBars
        @handleQuery="getList"
        @handleSave="handleSave"
        @handleDownload="handleDownload"
        @handleAdd="handleAdd"
      />
    </div>
    <el-row :gutter="10">
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="120px"
      >
        <el-form-item label="moduleName" prop="module_name">
          <el-input v-model="form.module_name" placeholder="请输入模块名"/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :row-key="row => row.id" border v-loading="loading" :data="tableList">
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column label="key" align="center" prop="key">
        <template #default="{ row }">
          <el-input v-model="row.key" />
        </template>
      </el-table-column>
      <el-table-column label="name" align="center" prop="name">
        <template #default="{ row }">
          <el-input v-model="row.name" />
        </template>
      </el-table-column>
      <el-table-column label="国际化" align="center" prop="i18n">
        <template #default="{ row }">
          <el-input v-model="row.i18n" />
        </template>
      </el-table-column>
      <el-table-column label="展开查询" width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_more_query" true-label="1" false-label="0"/>
        </template>
      </el-table-column>
      <el-table-column label="收缩查询"  width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_query" true-label="1" false-label="0" />
        </template>
      </el-table-column>
      <el-table-column label="插入"  width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_insert" true-label="1" false-label="0" />
        </template>
      </el-table-column>
      <el-table-column label="更新"  width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_edit" true-label="1" false-label="0" />
        </template>
      </el-table-column>
      <el-table-column label="列表"  width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-checkbox v-model="row.is_list" true-label="1" false-label="0" />
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="name">
        <template #default="{ row }">
          <el-select v-model="row.type">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="字典值" align="center" prop="name">
        <template #default="{row}">
          <el-input v-if="row.type === 'mulSelect' || row.type === 'singleSelect'" v-model="row.dictName" />
        </template>
      </el-table-column>
      <el-table-column label="排序"  width="100" align="center" prop="name">
        <template #default="{ row }">
          <el-input type="number" v-model="row.sort" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="55" class-name="small-padding fixed-width">
        <template #default="{ $index, row }">
          <el-tooltip content="删除"  placement="top">
            <el-button @click="handleDelete($index, row.id)" type="text" :icon="CloseBold" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <NavButton />
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, CloseBold, Select, Download } from '@element-plus/icons-vue'
import { getProjectConfigByProjectId, saveConfig, removeConfig } from '@/api/modules/pcConfig'
import { download } from '@/api/modules/pcPage'
import { downloadZip } from '@/utils/file'
import { successNotification, errorNotification } from '@/utils/index'
import NavButton from '../../../components/NavButton/index.vue'
import ToolBars from '../../../components/ToolBars/index.vue'
import {downloadUrl} from "@/config/common";
import type { FormInstance } from 'element-plus'

const loading = ref(true)
const router = useRouter()
const route = useRoute()
const formRef = ref<FormInstance>()
const projectId = route.query.id
const { id = '' } = router.currentRoute.value.query
const tableList = ref([{
  key: '',
  name: '',
  project_id: ''
}])

const form = reactive({
  id: '',
  module_name: ''
})
const rules = reactive({
})
const options = [{
  value: 'string',
  label: '字符'
}, {
  value: 'date',
  label: '日期'
}, {
  value: 'datetime',
  label: '时间'
}, {
  value: 'singleSelect',
  label: '单选'
}, {
  value: 'mulSelect',
  label: '多选'
}]

/** 新增 */
const handleAdd = () => {
  tableList.value.splice(0, 0, { project_id: id ,  key: '', name: ''})
}

/** 删除 */
const handleDelete = async (index: number, id: number) => {
  try {
    await removeConfig([id])
    tableList.value.splice(index, 1)
    successNotification('删除成功')
  } catch (e) {
    errorNotification('删除失败')
  }
}
/* 表单校验 */
const validForm = () => {
  return new Promise((resolve) => {
    formRef.value.validate((valid) => {
      resolve(valid)
    })
  })
}
/** 保存 */
const handleSave = async () => {
  const valid = await validForm()
  if (!valid) {
    return
  }
  const data = {
    form: {
      ...form,
      project_id: id,
    },
    list: tableList.value
  }
  await saveConfig(data)
  successNotification('保存成功')
  await getList()
}

/**  下载 */
const handleDownload = async () => {
  const res = await download(downloadUrl, id)
  downloadZip(res.data)
}

/** 查询配置 */
const getList = async () => {
  loading.value = true
  const res = await getProjectConfigByProjectId(id)
  const {rows, config} = res.data
  Object.assign(form, config)
  tableList.value = rows
  loading.value = false
}
getList()
</script>
<style scoped>
</style>
