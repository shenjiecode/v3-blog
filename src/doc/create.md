## 一、初始化
### 1.使用`vite`创建项目
``` shell
npm方式
npm init @vitejs/app
yarn方式
yarn create @vitejs/app
```
依次选择`vue`- `vue-ts`
### 2. 安装依赖
`npm install`
### 3. 运行
`npm run dev`
### 4.修改`vite`配置文件
``` javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
```

## 二、安装`ts`声明文件
`npm install --save-dev @types/node`

## 三、使用`vue-router`
### 1. 安装
`npm i vue-router@4`
### 2.创建 `src/router/index.ts` 文件
``` typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  { path: '/', redirect: { name: 'Home' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```
### 3. 挂载到`main.ts`
``` typescript
import router from './router/index'
const app = createApp(App)
app.use(router)
```

## 四、使用pinia
### 1. 安装
`npm i pinia`
### 2. 创建`src/store/index.ts`文件
``` typescript
import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
    state: () => {
        return {
            token: 'token'
        }
    },
    getters: {

    },
    actions: {
        updateToken(token: string): void {
            this.token = token
        }
    }
})
```
### 3.挂载到`main.ts`
``` typescript
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
```

## 使用`Tailwind CSS`
### 1.安装
`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`
### 2.创建配置文件
`npx tailwindcss init -p`
### 3.修改生成的`tailwind.config.js`文件
``` javascript
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
### 4.创建 `./src/style/index.css` 文件
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
### 5.在`main.ts`中引入
``` typescript
import './style/index.css'
```

## 六、引入`daisyui`
### 1.安装
`npm i daisyui`
### 2.在`tailwind.config.js`中引入
``` javascript
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

## 七、使用`axios`
### 1. 安装
`npm install axios`
### 2. 新建`src/utils/request.ts`文件
``` typescript
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { mainStore } from '../store'

// store实例
const storeEntity = mainStore();

/**
 * 定义axios实例
 */
const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

/**
 * 请求拦截
 */
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = storeEntity.token;
    if (token) {
        (config.headers as AxiosRequestHeaders).Authorization = token
    }
    return config
}, (error: AxiosError) => {
    console.log('request error', error)
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
instance.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error: AxiosError) => {
    console.log('response error', error)
    return Promise.reject(error)
})

export default instance
```
