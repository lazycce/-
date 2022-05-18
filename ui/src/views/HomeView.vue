<template>
  <div class="is-background"></div>
  <div class="app-home">
    <el-row :gutter="20">
      <template v-for="item in terminal" :key="item.type">
        <el-col :span="6">
          <el-card style="height: 88px;background:#D9ECFF;color:#303133" @click="handleClick(item.type)">
            {{ item.value }}
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useRouter} from 'vue-router'
export default defineComponent({
  name: 'HomeView',
  setup () {
    let terminal: {type: string;value: string}[] = []
    terminal = [
      {
        'type': '01',
        'value': 'APP前端'
      },
      {
        'type': '02',
        'value': 'PC前端'
      },
      {
        'type': '03',
        'value': '后端sql Xml'
      },
      {
        'type': '04',
        'value': 'other'
      }
    ]
    const router = useRouter()
    const path = ref('')
    const handleClick = (type: string) => {
      path.value = type === '01' ? '/appPage' : 'pcPage'
      router.push({
        path: path.value
      })
    }
    return {
      terminal,
      handleClick
    }
  }
});
</script>
<style lang="scss">
.app-home {
  width: 1000px;
  margin: 0 auto;
}
</style>
