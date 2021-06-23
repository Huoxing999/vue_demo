<template>
  <div class="register_contenter">
    <div class="register_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <!--登录表单区域-->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user-solid" placeholder="Username" clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password" placeholder="Password" clearable></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkPassword">
          <el-input v-model="registerForm.checkPassword" prefix-icon="el-icon-lock" type="password" placeholder="Check Your Password" clearable></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" prefix-icon="el-icon-message" type="email" placeholder="E-mail" clearable></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item id="bottom" >
          <div>已有账号？
            <a href="" @click="login">登录</a>
          </div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Home from '@/components/Home'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerFormRef.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
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
      registerForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: ''
      },
      // 这是表单的验证规则
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入注册用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/home')
      // Home1.methods.login()
      // Home1.home_z_index = 'z-index: -1'
      // Home1.isShowLogin = 'display: inline'
      console.log(Home.home_z_index)
      console.log(Home.isShowLogin)
      this.$message.success('注册成功')
    },

    register () {
      // this.$refs.loginFormRef.validate(async (valid) => {
      //   console.log(valid)
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('login', this.loginForm)
      //   if (res.meta.status !== 200) return this.$message.error('登录失败！')
      this.$message.success('注册成功')
      //   // 1.将登录成功之后的 token，保存到客户端的 sessionStorage 中
      //   //  1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
      //   //  1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
      //   window.sessionStorage.setItem('token', res.data.token)
      //   // 2.通过编程式导航跳转到后台主页，路由地址是 /home
      //   await this.$router.push('/home')
      // })
    }
  }
}
</script>

<style lang="less" scoped>
#bottom{
  width: 450px;
  text-align: center;
  background-color: cyan;
  height: 35px;
  border-radius: 0 0 3px 3px;
  margin-top: -2%;
  margin-left: -4.81%;
}

.register_contenter {
  background-color: #2b4b6b;
  height: 100%;
}

.register_box {
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
  .register_form {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    bottom: 0;
  }

  .btns {
    display: flex;
    justify-content: center;
    //margin-top: -25px;
  }
  .el-button{
    width: 400px;
  }
}
</style>
