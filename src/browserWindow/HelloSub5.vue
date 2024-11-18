<script lang="ts" setup>
import type { BrowserWindow } from 'vtron'
import type { Ref } from 'vue'
import { computed, inject, onMounted, ref } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import axios from 'axios'

// 定义接口
interface ServiceTableItem {
  ServiceNO: string
  Description: string
  SuperToolNames: string
}

const browserWindow = inject<BrowserWindow>('browserWindow')
const columns = ref([
  {
    title: 'No.',
    dataIndex: 'ServiceNO',
    width: 20,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    width: 50,
  },
  {
    title: 'ToolString',
    dataIndex: 'SuperToolNames',
    width: 100,
  },
])

const dataSource: Ref<ServiceTableItem[]> = ref([])
// 为三个搜索框添加响应式数据
const searchNo = ref('')
const searchDescription = ref('')
const searchToolString = ref('')

// 计算属性，根据搜索条件过滤数据
// 计算属性，根据搜索条件过滤数据
const filteredData = computed(() => {
  return dataSource.value.filter((item: ServiceTableItem) => {
    const noMatch = searchNo.value === '' || item.ServiceNO.includes(searchNo.value)
    const descMatch = searchDescription.value === '' || item.Description.includes(searchDescription.value)
    let toolStringMatch = true
    if (searchToolString.value !== '') {
      toolStringMatch = item.SuperToolNames.includes(searchToolString.value)
    }
    return noMatch && descMatch && toolStringMatch
  })
})

if (browserWindow) {
  browserWindow.windowInfo.width = 984
  browserWindow.windowInfo.height = 632
}
onMounted(async () => {
  try {
    const response = await axios.get<ServiceTableItem[]>('8080/api/serviceTable')
    // 使用as断言，强制告诉TypeScript按照期望的类型处理
    dataSource.value = response.data
  }
  catch (error) {
    console.error('请求数据出错：', error)
  }
})
</script>

<template>
  <div>
    <!-- 添加三个搜索框 -->
    <input type="text" v-model="searchNo" placeholder="Search No.">
    <input type="text" v-model="searchDescription" placeholder="Search Description">
    <input type="text" v-model="searchToolString" placeholder="Search ToolString">
    <!-- 使用filteredData作为表格数据源 -->
    <ATable
      :columns="columns"
      :data-source="filteredData"
      :pagination="false"
      bordered
      size="small"
      :scroll="{ x: '100%', y: '600px' }"
    />
  </div>
</template>

<style scoped>
.data-container {
  display: flex;
  flex-direction: column;
}
</style>
