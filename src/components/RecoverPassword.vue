<template>
  <div class="rePass_contenter">
    <div class="rePass_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <!--登录表单区域-->
      <el-form ref="rePassFormRef" :model="rePassForm" :rules="rePassFormRules" label-width="0px" class="rePass_form">
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="rePassForm.email" prefix-icon="el-icon-message" type="email" placeholder="E-mail" clearable></el-input>
        </el-form-item>
        <!-- 获取验证码按钮区域 -->
        <div class="verify_contenter">
        <el-form-item prop="verify">
        <el-input v-model="rePassForm.verify" prefix-icon="el-icon-message"  placeholder="验证码" clearable></el-input>
        </el-form-item>
          <el-form-item >
          <el-button style="width: 150px" type="primary" :disabled="disabled" @click="sendcode">{{btntxt}}</el-button>
        </el-form-item>
        </div>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="rePassForm.password" prefix-icon="el-icon-lock" type="password" placeholder="Password" clearable></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPassword">
          <el-input v-model="rePassForm.checkPassword" prefix-icon="el-icon-lock" type="password" placeholder="Check Your Password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="repass" style=" width: 400px">修改密码</el-button>
        </el-form-item>
        <el-form-item id="bottom" >
          <div><a href="" @click="index">回到首页</a></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.rePassForm.password !== '') {
          this.$refs.rePassFormRef.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.rePassForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (value === '') {
        return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      // 这是注册表单的数据绑定对象
      // log: 1,
      disabled: false,
      time: 5,
      btntxt: '发送验证码',
      rePassForm: {
        password: '',
        checkPassword: '',
        email: '',
        verify: ''
      },
      // 这是表单的验证规则
      rePassFormRules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        verify: [
          { required: true, message: '请输入验证码名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    index () {
      this.$router.push('/home')
    },
    repass () {
      this.$message.success('修改成功')
    },
    sendcode () {
      this.time = 5
      this.timer()
      this.$message.success('已发送验证码')
    },
    // 发送手机验证码倒计时
    timer () {
      if (this.time > 0) {
        this.disabled = true
        this.time--
        this.btntxt = this.time + '秒'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '发送验证码'
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.verify_contenter{
  display: flex;
  justify-content: space-between;
}
#bottom{
  width: 450px;
  text-align: center;
  background-color: cyan;
  height: 35px;
  border-radius: 0 0 3px 3px;
  margin-left: -4.81%;
}

.rePass_contenter {
  background-color: #2b4b6b;
  height: 100%;
}

.rePass_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-form{
    top: 80px;
  }
  .rePass_form {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    bottom: 0;
  }

}
</style>
