<template>
  <div class="<%=config.module_name%>-detail editable-page">
    <!-- 页头 -->
    <tnt-block-title>
      <span>title</span>
    </tnt-block-title>
    <tnt-page-top-sticky-tool-box>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button
            size="mini"
            @click="handleSave()"
            type="primary"
            icon="iconfont icon-save"
          >
            <span class="action-button-text"> {{$t('common.save')}}</span>
          </el-button>
        </el-col>
      </el-row>
    </tnt-page-top-sticky-tool-box>
    <div>
      <el-row :gutter="10">
        <fieldset>
          <%_items.forEach(i =>{_%>
          <el-form
            label-width="125px"
            :model="form"
            ref="form"
            :label-position="$store.getters.formItemLabelPosition"
            :rules="rules"
          ></el-form>
          <%_}_%>
        </fieldset>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'equipmentDetail',
    data () {
      return {
        rules: {
          plantId: [{
            required: this.getRequired('plantId'),
            message: this.$t('check.itemRequired', {name: this.$t('ram.plant')}),
            trigger: 'change'
          }]
        },
        form: {}
      }
    },
    ...mapGetters([
      'equipmentCategory'
    ]),
    methods: {
      /** 查询详情 */
      async query () {
        const res = await this.$api.equipment.queryEquipmentDetail(this.id)
        this.form = {
          ...res,
          departmentId: [res.departmentId]
        }
      },
      /** 处理保存 */
      async handleSave () {
        const valid = await this.validateForm()
        if (!valid) return
        if (this.form.id) {
          await this.update()
        } else {
          await this.add()
        }
      },
      async update () {
        await this.$api.equipment.updateEquipment(this.getParams())
        this.$message.success(this.$t('common.updateSuccess'))
      },
      async add () {
        await this.$api.equipment.addEquipment([this.getParams()])
        // if (!isSaved)
        // 判断保存状态
        this.$message.success(this.$t('operation.addItemSuccess', {name: this.$t('ram.unit')}))
        this.$router.push({
          path: '/basicData/equipment'
        })
      },
      /** 验证表单 */
      validateForm () {
        return new Promise((resolve) => {
          this.$refs.form.validate((valid) => {
            resolve(valid)
          })
        })
      },
      /** 清除校验 */
      clearValidate () {
        this.$refs.form.clearValidate()
      }
    }
  }
</script>
