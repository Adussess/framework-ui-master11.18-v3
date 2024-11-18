# Vtron Template

## 安装依赖 install

```
npm install
```

## 启动 start

```
npm run dev
```

## 项目打包

```
npm run build
```

## 如何添加新的窗口
1. 在 `src/browserWindow/` 文件夹下创建新的vue组件, 参考`src/browserWindow/HelloSub.vue`.
2. 在 `src/apps/SubWindowsConfig.ts` 中引入该组件, 并添加该组件的配置项, 可参考已有的配置项.
3. 在子窗口中获取后台数据，可参考组件`src/browserWindow/HelloSub.vue`, 该组件会每隔1秒向后台请求一次数据，并刷新到页面上。
4. 如何引入第三方库，可参考组件`src/browserWindow/HelloSub2.vue`，在该组件中，我们引入了第三方库Echarts来展示图表。

