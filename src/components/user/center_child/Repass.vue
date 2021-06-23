<template>
  <div>
  <!--修改密码表单区域-->
  <el-form ref="formRef" :model="form"  :rules="FormRules" label-width="80px">
    <el-form-item label="旧密码:" prop="oldPass" class="input_content">
      <el-input v-model="form.oldPass" clearable></el-input>
    </el-form-item>
    <el-form-item label="新密码:" prop="newPass1" class="input_content">
      <el-input v-model="form.newPass1" clearable></el-input>
    </el-form-item>
    <el-form-item label="确认密码:" prop="newPass2" class="input_content">
      <el-input v-model="form.newPass2" clearable></el-input>
    </el-form-item>
    <el-form-item style="margin-left: 230px">
      <el-button type="primary" @click="rePass">立即修改</el-button>
      <el-button type="info" @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
<!--    密码保护区域-->
  <div style="display:flex;justify-content: flex-start;text-align: center;margin-left: 50px">
    <div class="passwordPro" :style="textStyle">
      <i :class="iconStyle"></i>
      {{text}}
      <i class="el-icon-loading" :style="displayStyle"></i>
    </div>
    <template >
      <el-switch  v-model="isPro" @change="proStateChanged()"  style="margin-top: 10px;margin-left: 20px">
      </el-switch>
    </template>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.form.newPass1 !== '') {
          this.$refs.formRef.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPass1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPass: '',
        newPass1: '',
        newPass2: ''
      },
      isPro: true,
      text: '密码保护启用中',
      textStyle: 'background-color: lawngreen',
      displayStyle: '',
      iconStyle: 'el-icon-lock',
      // 这是表单的验证规则
      FormRules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPass2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      // console.log(this)
      this.$refs.formRef.resetFields()
    },
    rePass () {
      this.$message.success('修改成功')
    },
    proStateChanged () {
      console.log(this.isPro)
      if (this.isPro) {
        this.text = '密码保护启用中'
        this.textStyle = 'background-color: lawngreen'
        this.displayStyle = ''
        this.iconStyle = 'el-icon-lock'
        this.$message.success('密码保护启用成功')
      } else {
        this.text = '未启用密码保护!'
        this.textStyle = 'background-color: red'
        this.displayStyle = 'display: none'
        this.iconStyle = 'el-icon-unlock'
        this.$message.error('已取消密码保护')
      }
    }
  }
}
</script>

<style scoped>
.input_content{
  width: 500px;
}
.passwordPro{
  width: 350px;
  border-radius:25px;
  text-align: center;
  font-size:35px;
}
</style>
