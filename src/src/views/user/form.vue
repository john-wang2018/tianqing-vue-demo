<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="userForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item v-if="title === '修改用户'" label="组织代码" prop="deptId">
          <el-select v-model="userForm.deptId" placeholder="请选择">
            <el-option
              v-for="item in orgData"
              :key="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>


</template>
<script>
  import UserApi from '@/api/user'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
      },
      formData: {
        type: Object
      },
      orgData: {
        type: Array
      },
      flag: {
        type: Number
      },
    },

    watch: {
      visible(val) {
        if (this.title === '修改用户') {
          this.userForm = this.formData
        }
        if (!val) {
          this.$emit("update:visible", false)
          if (this.title === '新增用户') {
            this.userForm = {
              username: null,
              password: null,
              deptId: null,
            }
          }
          this.$refs["form"].resetFields()
        }
      }
    },
    data() {
      return {
        rules: {
          username: [
            {required: true, trigger: "change", message: "请输入姓名!"}
          ],
          password: [
            {required: true, trigger: "change", message: "请输入密码!"}
          ],
        },
        userForm: {
          id: '',
          username: '',
          password: '',
          deptId: ''
        }
      }
    },
    methods: {
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.title === '新增用户') {
              let resp = await UserApi.create(this.userForm)
            } else {
              let resp = await UserApi.update(this.userForm)

            }
            this.$emit("success", false)
            this.$message({
              message: "成功!",
              type: "success"
            })
          }
        })
      },
      closeDialog() {
        this.$emit("success", false)
      }
    }
  }
</script>
