<template>
  <div>
    <el-form :model="userForm" ref="userForm" label-width="100px" width="600px" class="login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import UserApi from '@/api/user'

  export default {
    name: 'login',
    data() {
      return {
        userForm: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      async login() {
        if (this.userForm.username === '') {
          this.$message({
            message: '请输入用户名',
            type: 'info'
          })
          return
        }
        if (this.userForm.password === '') {
          this.$message({
            message: '请输入密码',
            type: 'info'
          })
          return
        }
        let result = await UserApi.login(this.userForm)
        if (result.state === 1) {
          // 将用户名放入sessionStorage
          sessionStorage.setItem('username', this.userForm.username)
          // 将用户名放入vuex
          //this.$store.dispatch("setUser",this.userForm.username)
          this.$router.push({path: '/'})
          this.userForm = {
            password: '',
            username: ''
          }
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: result.message,
            type: 'error'
          })
        }

      },
      resetForm(reset) {
        this.$refs[reset].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
