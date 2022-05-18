 <template>
  <div class="app-container">
    <div class="app-title">
      <el-tag effect="plain" size="large">表单生成</el-tag>
    </div>
    <div class="fr mb5">
      <el-button @click="showDialog" plain :icon="Plus" type="primary" title="新增"/>
    </div>
    <el-table
      :data="list"
      border
      v-loading="tabLoading"
      ref=tableRef
      :max-height="tableMaxHeight"
      @selection-change="handleSelectionChange">
      <el-table-column
          label="序号"
          type="index"
          align="center"
          :index="indexMethod"
          width="55">
      </el-table-column>
      <el-table-column align="center" prop="name" label="表名称" />
      <el-table-column align="center" prop="type" label="类型" />
      <el-table-column align="center" prop="remark" label="备注" />
      <el-table-column align="center" prop="create_time" label="创建时间" />
      <el-table-column align="center" prop="update_time" label="更新时间" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="text" :icon="Delete" @click="handleDelete(scope.row.id)" title="删除"/>
          <el-button type="text" :icon="Edit" @click="handleEdit(scope.row.id)" title="编辑"/>
          <el-button type="text" :icon="Download" @click="handleDownload(scope.row.id)" title="下载"/>
          <el-button type="text" :icon="View" @click="handleView(scope.row.id)" title="预览"/>
          <el-button  @click="() => { router.push(`/pcPage/detail?id=${scope.row.id}`) }" type="text" :icon="Setting" title="配置"/>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
        :page="pageNum"
        :limit="pageSize"
        :total="total"
        @pagination="handleChangePage"
    ></Pagination>
    <AddTableDialog ref=addTableRef @queryProjects="queryProjects"></AddTableDialog>
    <el-dialog
        v-model="dialogVisible"
        title="代码预览"
        width="40%"
    >
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="列表vue" name="vue">
          <highlightjs lanuage="html" :code="codeView.vue" />
        </el-tab-pane>
        <el-tab-pane label="新增/编辑vue" name="add">
          <highlightjs lanuage="html" :code="codeView.detail" />
        </el-tab-pane>
        <el-tab-pane label="api" name="api">
          <highlightjs lanuage="html" :code="codeView.api" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
   <NavButton />
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from "vue-router";
import { Plus, Delete, Edit, Download, Setting, View } from '@element-plus/icons-vue'
import { successNotification, infoNotification, msgConfirm } from '@/utils/index'
import {getProjects, deleteProject, viewCode, download} from '@/api/modules/pcPage'
import { downloadZip } from '@/utils/file'
import AddTableDialog from '@/views/TableConfig/Dialog/AddTableDialog.vue'
import NavButton from '../../components/NavButton/index.vue'
import { downloadUrl } from '@/config/common'
import Pagination from '../../components/Pagination/index.vue'

const multipleSelection = ref([])
const list = ref([])
const pageNum = ref(1)
const pageSize = ref(30)
const total = ref(0)
const tabLoading = ref(false)
const tableMaxHeight = ref(0)
const router = useRouter()
const addTableRef = ref<typeof AddTableDialog>()
const dialogVisible = ref(false)
const codeView = ref({
  vue: '',
  api: '',
  detail: ''
})
const activeName = ref('vue')
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val
}
interface IPPageInfo {
  pageNum?: number,
  pageSize?: number
}
const queryList = async (params?: IPPageInfo) => {
  tabLoading.value = true
  const res = await getProjects(params)
  list.value = res.rows || []
  total.value = res.total
  tabLoading.value = false
}
const handleChangePage = async ({page, limit}) => {
  pageNum.value = page
  pageSize.value = limit
  await queryList({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
}
const indexMethod = (index: number) => {
  return (pageNum.value - 1) * pageSize.value + index + 1
}
const showDialog = () => {
  if (addTableRef.value) {
    addTableRef.value.show()
  }
}
const handleEdit = async (id: number) => {
  if (addTableRef.value) {
    addTableRef.value.show(id)
    queryProjects()
  }
}
const queryProjects = () => {
  queryList({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
}

/** 删除 */
const handleDelete = async (id: number) => {
  try {
    await msgConfirm('确定要删除吗?')
    await deleteProject([id])
    successNotification('删除成功')
    await queryList({
      pageNum: pageNum.value,
      pageSize: pageSize.value
    })
  } catch (e) {
    infoNotification('取消删除')
  }
}

const tableRef = ref()
const calcMaxHeight = () => {
  tableMaxHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 25
}

const handleDownload = async (id: number) => {
  const res = await download(downloadUrl, id)
  downloadZip(res.data)
}

const handleView = async (projectId: number) => {
  const res = await viewCode(projectId)
  codeView.value = res.data
  dialogVisible.value = true
}

onMounted (async () => {
  await queryList({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  await nextTick()
  calcMaxHeight()
})
</script>
