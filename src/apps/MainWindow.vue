<script setup
  lang="ts"
>
import { BrowserWindow } from 'vtron'
import { onMounted, ref } from 'vue'
// import { defineAsyncComponent } from 'vue';
import type { MenuProps } from 'ant-design-vue'
import { Menu as AMenu } from 'ant-design-vue'
import beaticon from '../assets/beat.ico'
// import SubWindowsConfig from './SubWindowsConfig.json';
import { subWindows } from './SubWindowsConfig'

// import HelloSubVue from "../browserWindow/HelloSub.vue";
// import HelloSubVue2 from "../browserWindow/HelloSub2.vue";
// import HelloSubVue3 from "../browserWindow/HelloSub3.vue";

interface SubWindowsConfigInterface {
  key: string
  title: string
  component: any
  props: any
}

console.log(subWindows)

const windowMap = new Map<string, BrowserWindow>()

onMounted(() => {
  console.log(`the component is now mounted.`);
  (document.getElementsByClassName('bottom')[0] as HTMLElement).style.zIndex = '1'
})

const menuItems = ref<MenuProps['items']>(subWindows.map((item: any) => {
  return {
    key: item.key,
    title: item.title,
    label: item.title,
  }
}))

function openSubWindow(config: SubWindowsConfigInterface) {
  const { key, title, component, props } = config
  // const AsyncComp = defineAsyncComponent(() =>
  //   import(`../browserWindow/${component}.vue`/* @vite-ignore */)
  // )
  if (!windowMap.has(key)) {
    const bw = new BrowserWindow({
      title,
      icon: beaticon,
      width: 800,
      height: 600,
      center: true,
      content: component,
      config: props,
    })
    windowMap.set(key, bw)
  }
  windowMap.get(key)?.show()
}

function onClickMenuItem(item: any) {
  const config = subWindows.find((configItem: any) => configItem.key === item.key)
  if (config) {
    openSubWindow(config)
  }
}
</script>

<template>
  <span style="color: rgba(255,255,255,0.87);">中海油数据</span>
  <AMenu
    mode="horizontal"
    theme="dark"
    :items="menuItems"
    @click="onClickMenuItem"
  />
  <!-- <button v-for="item in subWindowsConfigRef.subWindows"
    @click="onClickMenu(item)">{{ item.title }}</button> -->
  <!-- <hello-sub-vue v-if="false" /> -->
  <!-- <hello-sub-vue v-if="false" />
  <hello-sub-vue2 v-if="false" />
  <hello-sub-vue3 v-if="false" /> -->
</template>
