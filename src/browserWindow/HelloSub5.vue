<script lang="ts" setup>
import type {BrowserWindow} from 'vtron'
import {inject, onMounted, ref} from 'vue'
import {Table as ATable} from 'ant-design-vue'
import axios from 'axios'

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

const dataSource = ref([])

if (browserWindow) {
  browserWindow.windowInfo.width = 984
  browserWindow.windowInfo.height = 632
}
onMounted(async () => {
  try {
    const response = await axios.get('8080/api/serviceTable')
    // 将获取到的数据赋值给dataSource，用于表格展示
    const data = response.data
    // 处理SuperToolNames字段
    // 处理SuperToolNames字段
    dataSource.value = data.map(item => {
      if (Array.isArray(item.SuperToolNames)) {
        item.SuperToolNames = item.SuperToolNames.join('/')
      }
      return item
    })
  }
  catch (error) {
    console.error('请求数据出错：', error)
  }
})
</script>

<template>
  <div>
    <ATable
      :columns="columns"
      :data-source="dataSource"
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
