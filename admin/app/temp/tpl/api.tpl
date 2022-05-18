import axios from '@/http/axios'
import { serializeSortKeysArrInGet } from '@/trinity-fe-common/utils/qs'
const baseUrl = 'baseUrl'
/**
 * 查询列表
 */
export const query<%=config.name%>List = (params) => {
  return axios({
    url: `${baseUrl}/list`,
    method: 'get',
    params,
    paramsSerializer: serializeSortKeysArrInGet,
  })
}

/**
 * 查询详情
 */
export const query<%=config.name%>ById = (id) => {
  return axios({
    url: `${baseUrl}?id=${id}`,
    method: 'get'
  })
}

/**
 * 新增
 */
export const add<%=config.name%> = (data) => {
  return axios({
    url: baseUrl,
    method: 'post',
    data
  })
}

/**
 * 更新
 */
export const update<%=config.name%> = (data) => {
  return axios({
    url: baseUrl,
    method: 'put',
    data
  })
}

/**
 * 删除
 */
export const delete<%=config.name%> = (data) => {
  return axios({
    url: baseUrl,
    method: 'delete',
    data
  })
}