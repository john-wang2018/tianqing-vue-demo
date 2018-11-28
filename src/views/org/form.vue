<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="orgForm" :rules="rules">
        <el-form-item label="组织代码" prop="deptId" v-if="title === '新增组织机构'">
          <el-input v-model="orgForm.deptId"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="deptName">
          <el-input v-model="orgForm.deptName"></el-input>
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
  import OrgApi from '@/api/org'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
      },
      editData: {
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
        if (this.title === '修改组织机构') {
          this.orgForm = this.editData
        }
        if (!val) {
          if (this.title === '新增组织机构') {
            this.orgForm = {
              deptId: null,
              deptName: null,
            }
          }

          this.$refs["form"].resetFields()
        }
      }
    },
    data() {
      return {
        rules: {
          deptId: [
            {required: true, trigger: "change", message: "请输入组织代码!"}
          ],
          deptName: [
            {required: true, trigger: "change", message: "请输入组织名称!"}
          ],
        },
        orgForm: {
          id: '',
          deptId: '',
          deptName: '',
          superId: ''
        }
      }
    },
    methods: {
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.title === '新增组织机构') {
              this.orgForm.superId = this.editData.deptId
              let resp = await OrgApi.create(this.orgForm)
            } else {
              let resp = await OrgApi.update(this.orgForm)

            }
            this.closeDialog()
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
