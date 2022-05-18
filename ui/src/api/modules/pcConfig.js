import request from '@/api/request'
// 获取list
export function getProjectConfigByProjectId(id) {
    return request({
        url: `/getProjectConfigByProjectId?projectId=${id}`,
        method: 'get',
    })
}

// 保存
export function saveConfig(data) {
    return request({
        url: `/updateProjectConfig`,
        method: 'post',
        data
    })
}

// 删除
export function removeConfig(ids) {
    return request({
        url: `/removeProjectConfig`,
        method: 'delete',
        data: ids
    })
}
