<script lang="ts" setup>
import type { BrowserWindow } from 'vtron'
import { inject, onMounted, ref } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import axios from 'axios'

const browserWindow = inject<BrowserWindow>('browserWindow')
const columns = ref([
  {
    title: 'CurveName',
    dataIndex: 'CurveName',
    width: 50,
  },
  {
    title: 'Tool',
    dataIndex: 'Tool',
    width: 100,
  },
  {
    title: 'FilterType',
    dataIndex: 'FilterType',
    width: 100,
  },
  {
    title: 'FilterLevel',
    dataIndex: 'FilterLevel',
    width: 100,
  },
  {
    title: 'Unit',
    dataIndex: 'Unit',
    width: 100,
  },
  {
    title: 'UnitClass',
    dataIndex: 'UnitClass',
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    width: 200,
  },
])

const dataSource = ref([])

if (browserWindow) {
  browserWindow.windowInfo.width = 984
  browserWindow.windowInfo.height = 632
}
onMounted(async () => {
  try {
    // 使用axios发送GET请求获取表格数据
    const response = await axios.get('8080/api/serviceTable/curveProperties')
    // 将获取到的数据赋值给dataSource，用于表格展示
    dataSource.value = response.data
  }
  catch (error) {
    console.error('请求数据出错：', error)
  }
})
</script>

<template>
  <div>
    <ATable :columns="columns" :data-source="dataSource" :pagination="false" bordered size="small" />
  </div>
</template>

<style scoped>
.data-container {
  display: flex;
  flex-direction: column;
}
</style>
