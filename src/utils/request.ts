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