import {defineStore} from 'pinia'
/*
    defineStore()
        第一个参数：相当于为容器起一个名字（名字必须唯一，不能重复）
        第二个参数：一个配置对象，里面是对容器仓库的配置说明（以对象的形式）
    state属性：用来存储全局的状态
    getters属性：用来监视或者是计算状态的变化的，有缓存的功能
    actions属性：对state里数据变化的业务逻辑，需求不同，编写逻辑不同，就是修改state全局状态数据的
 */
export const mainStore = defineStore('main', {
    state: () => {
        return {
        }
    },
    // getters是有缓存的，虽然调用多次，但是值一样不会被多次调用
    getters: {
    },
    actions: {
    }
})
