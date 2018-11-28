/**
 * Created by binwang on 2018/11/7.
 */
import axios from 'axios'

export default {
  // 新增用户
  create: async (user) => {
    let resp = await axios.post('/api/users', user)
    return resp.data
  },
  // 根据id删除用户
  remove: async (id) => {
    let resp = await axios.delete(`/api/users/${id}`)
    return resp.data
  },
  // 修改用户
  update: async (user) => {
    let resp = await axios.put(`/api/users`, user)
    return resp.data
  },
  // 根据用户名模糊查询，分页显示
  paging: async (query) => {
    let resp = await axios.get(`/api/users?username=${query.username}&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return resp.data
  },
  // 根据deptId分页查询
  queryUserList: async (query) => {
    let rest = await axios.get(`/api/users/actions/query?deptId=${query.deptId}&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return rest.data
  },

  // 登录
  login: async (user) => {
    let resp = await axios.post('/api/users/actions/login/', user)
    return resp.data
  }


}
