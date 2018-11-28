<template>
  <div>
    <el-tree
      highlight-current
      :props="defaultProps"
      :load="loadNodes"
      :expand-on-click-node="false"
      lazy>

          <span slot-scope="{ node, data }">
            <span @click="search(data)">{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-plus"
                @click=addTree(data)>
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click=deleteTree(data)>
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click=editTree(data)>
              </el-button>
           </span>
        </span>

    </el-tree>
    <el-col :span="16" :xs="24" :sm="24" :md="16" :lg="16">
      <UserIndex :deptId="checkId"></UserIndex>
    </el-col>
    <OrgForm :visible.sync="visible"
             @success="loadTree"
             :title="title"
             :editData="editData"
             :orgData.sync="orgData">

    </OrgForm>

  </div>
</template>

<script>
  import OrgApi from '@/api/org'
  import OrgForm from './form'
  import UserIndex from '@/views/user/index'

  export default {
    components: {
      OrgForm,
      UserIndex
    },
    data() {
      return {
        defaultProps: {
          label: 'deptName',
          children: 'children',
          id: 'deptId'
        },
        title: '',
        visible: false,
        checkId: null,
        orgData: [],
        editData: {
          deptId: null,
          deptName: '',
          superId: null
        },
      }
    },
    methods: {

      // 新增组织信息
      async addTree(data) {
        this.title = '新增组织机构'
        this.editData = data
        this.visible = true
      },
      // 删除组织信息
      deleteTree(data) {
        this.$confirm('是否删除该组织?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let id = data.id
          let resp = await OrgApi.remove(id)
          if (resp.state === 1) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.loadTree()
          } else if (resp.state === 3007) {
            this.$message({
              message: resp.message,
              type: 'failed'
            })
          } else {
            return
          }

        }).catch(() => {

        })
      },
      // 修改组织信息
      async editTree(data) {
        this.title = '修改组织机构'
        this.editData = data
        this.visible = true

      },
      // 查询
      async search(data) {
        this.checkId = data.deptId
      },
      // 加载节点
      async loadNodes(node, resolve) {
        this.node = node
        if (node.level === 0) {
          let resp = await OrgApi.getOrgs(0)
          return resolve(resp)
        }
        if (node.level > 0) {
          let resp = await OrgApi.getOrgs(node.data.deptId)
          return resolve(resp)
        }
      },
      // 加载
      async loadTree(flag) {
        this.visible = flag
        this.$router.push({
            name: '组织机构',
            query: {
              _t: Date.now()
            }
          }
        )
      }

    }
  }

</script>

<style>

</style>
