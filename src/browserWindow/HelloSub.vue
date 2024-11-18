<template>
  <div style="background-color: #a1a1a1;">
    <div>Hello This child window</div>
    <div>
      {{ browserWindow.config?.message }}
    </div>
    <div class="data-container">
      <span v-for="item in backendData">{{ item.time }} {{ item.value }}</span>
    </div>
  </div>
</template>
<script setup
  lang="ts">
  import { BrowserWindow } from "vtron";
  import { inject, onMounted, onUnmounted, ref } from "vue";
  const browserWindow = inject<BrowserWindow>("browserWindow")!;

  interface BackendDataItem {
    time: string;
    value: string;
  }

  const backendData = ref<BackendDataItem[]>([]);

  let fetchDataTimer: number | undefined = undefined;

  onMounted(() => {
    fetchDataTimer = setInterval(() => {
      setTimeout(fetchData, 0)
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(fetchDataTimer)  //clearInterval 是一个 JavaScript 内置函数，用于清除由 setInterval 创建的定时器。
  })

  async function fetchData() {
    const res = await fetch("/8001/api")
    const data = await res.json()
    backendData.value.push(data.list[0])
  }
</script>
<style scoped>
.data-container {
  display: flex;
  flex-direction: column;
}
</style>
