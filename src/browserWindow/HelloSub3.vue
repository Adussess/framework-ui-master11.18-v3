<script lang="ts" setup>
import type { BrowserWindow } from 'vtron'
import { inject, onMounted, ref } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import axios from 'axios'

const browserWindow = inject<BrowserWindow>('browserWindow')
const columns = ref([
  {
    title: 'Seq',
    dataIndex: 'Seq',
    width: 50,
  },
  {
    title: 'ToolSeries',
    dataIndex: 'ToolSeries',
    width: 200,
  },
  {
    title: 'SubsetNo',
    dataIndex: 'SubsetNo',
    width: 100,
  },
  {
    title: 'AcqMode',
    dataIndex: 'AcqMode',
    width: 200,
  },
  {
    title: 'DepthSampleRate',
    dataIndex: 'DepthSampleRate',
    width: 200,
  },
  {
    title: 'TimeSampleRate',
    dataIndex: 'TimeSampleRate',
    width: 200,
  },
  {
    title: 'MappingMode',
    dataIndex: 'MappingMode',
    width: 200,
  },
])

const dataSource = ref([])

if (browserWindow) {
  browserWindow.windowInfo.width = 984
  browserWindow.windowInfo.height = 632
}

// async function fetchData() {
//   const res = await fetch('/8081/api/readfile?filename=test.conf')
//   const { data } = await res.json()
//   dataSource.value = data
// }

onMounted(async () => {
  try {
    // 使用axios发送GET请求获取表格数据
    const response = await axios.get('8080/api/serviceTable/acquisitionControl')
    // 将获取到的数据赋值给dataSource，用于表格展示
    dataSource.value = response.data
  }
  catch (error) {
    console.error('请求数据出错：', error)
  }
})

// axios.get('8080/api/serviceTable/curveProperties')
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     })
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
