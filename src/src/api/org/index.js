import axios from 'axios'

export default {
  // 添加组织信息
  create: async (org) => {
    let rest = await axios.post('/api/orgs', org)
    return rest.data
  },
  // 删除组织机构信息
  remove: async (id) => {
    let rest = await axios.delete(`/api/orgs/${id}`)
    return rest.data
  },
  // 修改组织信息
  update: async (org) => {
    let rest = await axios.put('/api/orgs', org)
    return rest.data
  },
  // 查询所有组织信息
  getOrgs: async (superId) => {
    let resp = await axios.get(`/api/orgs/actions/query?superId=${superId}`)
    return resp.data
  },
  // 查询所有组织名称
  roles: async () => {
    let rest = await axios.get(`/api/orgs`)
    return rest.data
  },


}
