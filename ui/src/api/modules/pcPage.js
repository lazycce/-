import request from '@/api/request'
// 获取list
export function getProjects(params) {
    return request({
        url: '/genProject',
        method: 'get',
        params
    })
}
// 增加
export function postProject(data) {
    return request({
        url: '/insertProject',
        method: 'post',
        data
    })
}
// 删除
export function deleteProject(data) {
    return request({
        url: `/removeProject`,
        method: 'delete',
        data
    })
}
// Id查询
export function getProjectById(id) {
    return request({
        url: `/getProjectById?id=${id}`,
        method: 'get'
    })
}
// 修改
export function putProjectById(data) {
    return request({
        url: `/updateProject`,
        method: 'put',
        data
    })
}

// 代码预览
export function viewCode(id) {
    return request({
        url: `/viewCode?projectId=${id}`,
        method: 'get'
    })
}

// 下载
export function download (url, id) {
    return request({
        url: `${url}?projectId=${id} `,
        method: 'get'
    })
}
