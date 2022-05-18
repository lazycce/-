import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import config from '../config'
// 创建axios实例
const service = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout,
    headers: config.headers,
    withCredentials: config.withCredentials
})
// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false
    // if (getToken() && !isToken) {
    //     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const message = res.data.msg
        if (code === 401) {
            ElMessageBox.confirm(
                '登录状态已过期，您可以继续留在该页面，或者重新登录',
                '系统提示',
                {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                // store.dispatch('LogOut').then(() => {
                //     location.reload() // 为了重新实例化vue-router对象 避免bug
                // })
            })
        } else if (code === 500) {
            ElMessage({
                message: message,
                type: 'error'
            })
            return Promise.reject(new Error(message))
        } else if (code !== 200) {
            ElNotification.error({
                title: message
            })
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
