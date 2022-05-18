<template>
  <el-dialog
      width="30%"
      v-model="dialogFormVisible"
      title="表单信息">
    <el-form :model="form">
      <el-row>
        <el-col>
          <el-form-item label="表名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input :rows="2" type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref,  defineExpose, nextTick, defineEmits} from 'vue'
import {getProjectById, postProject, putProjectById} from '@/api/modules/pcPage'

const dialogFormVisible = ref(false)
const projectId = ref('')
const formLabelWidth = '80px'

let form = reactive({
  name: '',
  type: '',
  remark: ''
})
const show = async (id: string = '') => {
  dialogFormVisible.value = true
  await nextTick()
  if (!id) {
    return
  }
  projectId.value = id
  const res = await getProjectById(id)
  const {name, type, remark} = res.data
  form.name = name
  form.type = type
  form.remark = remark
}
const emit = defineEmits(['queryProjects'])
const handleConfirm = () => {
  if (!projectId.value) {
    handleAdd()
  } else {
    handleModify()
  }
  dialogFormVisible.value = false
  emit('queryProjects')
}
const handleAdd = async () => {
  await postProject(form)
}
const handleModify = async () => {
  await putProjectById({...form, id: projectId.value})

}
defineExpose({
  show
})
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
