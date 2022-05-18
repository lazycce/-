<template>
  <div class="pagination">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :background="background"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits} from 'vue'

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 30
  },
  pageSizes: {
    type: Array,
    default() {
      return [30, 60, 90]
    }
  },
  layout: {
    type: String,
    default: '->, total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits()
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val){
    emit('update:limit', val)
  }
})
const handleSizeChange = (val: number) => {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
}
const handleCurrentChange = (val: number) => {
  emit('pagination', { page: val, limit: pageSize.value })
}

</script>
<style lang="scss">
.pagination{
  margin-top: 10px;
}
</style>
