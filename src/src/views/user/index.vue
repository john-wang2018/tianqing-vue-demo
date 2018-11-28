<template>
  <div>
    <div style="text-align: right;margin-bottom: 10px;">

      <el-col>
        <el-form :inline="true" :model="query">
          <el-form-item>
            <el-input v-model="query.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openDialog">新增人员</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </div>
    <el-table border :data="tableData" :row-class-name="tableRowClassName">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="组织代码" prop="deptId"></el-table-column>
      <el-table-column label="组织名称" prop="organization.deptName"></el-table-column>
      <el-table-column label="修改操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="query.pageSize"
              @current-change="pageChange">
      </el-pagination>
    </div>

    <UserForm :visible.sync="visible"
              @success="loadData"
              :title="title"
              :formData="formData"
              :orgData.sync="orgData">
    </UserForm>


  </div>
</template>

<script>
  import axios from 'axios'
  import UserForm from './form.vue'
  import UserApi from '@/api/user'
  import OrgApi from '@/api/org'

  export default {
    components: {UserForm},
    props: {
      deptId: {
        Type: Number
      }
    },
    watch: {
      deptId(val) {
        if (val) {
          this.queryUserList(this.deptId)
        }
      }
    },
    data() {
      return {
        visible: false,
        tableData: [],
        total: 1,
        title: '',
        query: {
          deptId: '',
          username: '',
          pageNum: 1,
          pageSize: 6,
        },
        formData: {
          id: '',
          username: '',
          password: '',
          deptId: ''
        },
        orgData: [],

      }
    },
    // 在模板渲染成html后调用
    mounted() {
      this.loadData()
    },
    methods: {
      // 加载数据
      async loadData(flag) {
        let resp = await UserApi.paging(this.query)
        this.tableData = resp.list
        this.total = resp.total
        this.visible = flag

      },

      pageChange(page) {
        this.query.pageNum = page
        this.loadData()
      },
      //删除用户信息
      remove(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let resp = await UserApi.remove(id)
          this.$message({
            message: "删除成功!",
            type: "success"
          })
          this.loadData()
        }).catch(() => {

        });

      },
      // 修改用户信息
      async update(user) {
        this.formData = user
        this.title = '修改用户'
        let resp = await OrgApi.roles()
        this.orgData = resp
        this.visible = true
      },

      async openDialog() {
        this.title = '新增用户'
        this.visible = true
      },
      // 根据条件查询用户
      getUsers() {
        this.loadData()
      },
      //根据deptId查询
      async queryUserList(deptId) {
        this.query.deptId = deptId
        let resp = await UserApi.queryUserList(this.query)
        this.tableData = resp.list
        this.total = resp.total
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 1) {
          return 'warning-row'
        }
        return ''
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: #f2eada;
  }

</style>
