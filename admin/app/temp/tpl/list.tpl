<template>
  <div class="<%=config.module_name%>-list">
    <tnt-block-title>
      <div slot="ext-content">
        <tnt-query-area-for-list
          :options="queryOptions"
          :context="this"
          @query="queryConditions"
        />
      </div>
      <div class="operation-area">
      </div>
    </tnt-block-title>
    <div class="table-list">
      <tnt-el-table
        ref="multipleTable"
        :data="list"
        border
        max-height="400"
        row-primary-key="id"
        tooltip-effect="dark"
        @sort-change="queryListBySortConditions"
        style="width: 100%;"
      >
        <!-- 多选框-->
        <el-table-column type="selection" />
        <%_items.forEach(i =>{_%>
        <%_if(i.is_list == '1') {_%>
        <!-- <%=i.name%> -->
        <el-table-column
          prop="<%=i.key%>"
          label="$t('<%=i.i18n%>')"
          sortable="custom"
        />
        <%_}_%>
        <%_})_%>
      </tnt-el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import paginationMixin from '@/trinity-fe-common/mixins/paginationMixin'
  import { mapGetters } from 'vuex'
  const queryParam = {
    <%_items.forEach(i =>{%>
    <%=i.key_%>: '', // <%=i.name_%>
    <%_})%>
  }
  export default {
    name: 'EquipmentPage',
    mixins: [paginationMixin],
    data () {
      return {
        // 查询参数
        form: {
          ...queryParam
        },
        // 表格数据参数
        list: []
      }
    },
    methods: {
      /** 批量删除 */
      async handleDelete () {
        // 判断是否有内容可以删除
        if (!this.$refs.multipleTable.selections.length) {
          this.$message.warning(this.$t('common.deleteWarning'))
        }
        // 二次确认
        try {
          await this.deleteConfirm()
          const ids = this.$refs.multipleTable.selections.map(i => i.id)
          this.$refs.multipleTable.clearSelection()
          await this.$api.equipment.deleteEquipments(ids)
          this.$message.success(this.$t('common.deleteSuccess'))
          this.initialQuery()
        } catch (e) {
          this.$message.warning(this.$t('common.cancelDelete'))
        }
      },
      /** 查询 */
      queryConditions () {
        this.$refs.multipleTable.clearSelection()
        // 查询设备列表
        this.initialQuery()
      },
      /** 清除查询 */
      clearConditions () {
        this.form = {
          ...queryParam
        }
        this.queryConditions()
      },
      /** 查询列表 */
      async queryList (pageInfo = {}) {
        const param = this.getQueryListParam(pageInfo)
        const res = await this.$api.equipment.getEquipmentsList(param)
        this.updatePageInfo(res)
      },
      /** 获取检索参数 */
      getQueryListParam (pageInfo = {}) {
        return {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.form,
          ...pageInfo,
          sortKeys: this.getSortKeys()
        }
      },
      /** 删除确认 */
      deleteConfirm () {
        return new Promise((resolve, reject) => {
          this.$confirm(this.$t('common.deleteConfirmContent'), this.$t('common.confirmTitleDelete'), {
            confirmButtonText: this.$t('common.confirmTitle'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(async () => {
            resolve()
          }).catch((e) => {
            reject(e)
          })
        })
      }
    },
    mounted () {
      this.initialQuery()
    }
  }
</script>
