<script setup lang="ts">
import { System } from 'vtron'
import beaticon from './assets/beat.ico'
import MainWindowVue from './apps/MainWindow.vue'
import { ExtBrowserWindow } from './extension/ExtBrowserWindow'

const system = new System({
  desktop: [
    {
      name: 'MainWindow',
      icon: beaticon,
      window: {
        title: 'MainWindow',
        icon: beaticon,
        width: 600,
        height: 800,
        center: true,
        content: MainWindowVue,
        fullscreen: false,
      },
    },
  ],
  login: {
    username: 'admin',
    password: 'admin',
    init: () => false,
  },
  loginCallback(username, password) {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        resolve(true)
      }
      else {
        reject(new Error('用户名或密码错误'))
      }
    })
  },
})

system.whenReady().then((readySystem) => {
  console.log(readySystem.version)
  // (document.getElementsByClassName("bottom")[0] as HTMLElement).style.zIndex = "1";

  const extBw = new ExtBrowserWindow({
    title: 'Hello Ext',
    icon: beaticon,
    width: 600,
    height: 800,
    center: true,
    content: MainWindowVue,
    config: {
      message: 'Extension BrowserWindow from App.vue',
    },
    fullscreen: true,
    backgroundColor: '#000',
  })

  extBw.show()
})
</script>

<template>
  <div class="outer">
    <!-- 一定需要引入Win10组件，组件已经在use时注册了 -->
    <Screen />
  </div>
</template>

<style scoped>
.outer {
  width: 100vw;
  height: 100vh;
}
</style>

<style></style>
