<template>
    <div style="width: 100%; height: 75px; text-align: center; background-color: #DAECFE">
        <!-- 导航栏 -->
        <div class="title">
            <img :src="logoSrc" alt="" style="width: 50px; height: 50px; position: absolute; left: 100px; top: 20px;"/>
            <div style="font-size: 22px; position: absolute; top:35px; left: 160px;">基于信息安全的求职分析平台</div>
        </div>
        <div class="menu">
            <el-menu :default-active="activeIndex" mode="horizontal"
                     background-color="#DAECFE"
                     router>
                <el-menu-item index="1" width="100px" @click="ToHome">首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">招聘信息</template>
                    <el-menu-item index="2-1" @click="skip('https://mp.weixin.qq.com/s/Agc6nxkQkaXyjFnsz1f3sw')">行业速递</el-menu-item>
                    <el-menu-item index="2-2" @click="skip('https://mp.weixin.qq.com/s/WHlnJtClmBDc8Lh5SHsSnw')">薪资一览</el-menu-item>
                    <el-menu-item index="2-3" @click="skip('https://mp.weixin.qq.com/s/xZWf0G7ndW2WMaFLX8dRsw')">就业政策</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                     <template slot="title">关于我们</template>
                     <img :src="QQImgSrc" alt="" style="width: 50px; height: 50px; padding-left: 16px;"/>
                     <img :src="WechatImgSrc" alt="" style="width: 50px; height: 50px; padding-left: 10px;"/>
                     <img :src="WeiboImgSrc" alt="" style="width: 50px; height: 50px; padding-left: 10px;"/>
                </el-submenu>
                <el-menu-item index="/center" >我的</el-menu-item>
            </el-menu>
        </div>
        <img :src="headImgSrc" @click="login" alt="" style="width: 50px; height: 50px; position: absolute; right: 40px; top: 20px;"/>
      <!--  修改用户的对话框-->
      <el-dialog
        title="登录"
        :visible.sync="loginDialogVisible"
        width="450px"
        @close="loginDialogVisibleClosed"
        style="margin-top:5%">
        <!--    内容主体区域-->
        <div class="login_box">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="10px">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="Username" clearable></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="Password" clearable></el-input>
          </el-form-item>
          <!-- 忘记密码-->
          <el-form-item >
            <div id="forget"><router-link to="/recoverPassword">Forget Password？</router-link></div>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
          <div id="bottom" >
            <div  style="margin-left: 38%">还没注册？
              <router-link to="/register">注册</router-link></div>
          </div>
        </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      logoSrc: require('../assets/logo.png'),
      headImgSrc: require('../assets/defultHead.png'),
      QQImgSrc: require('../assets/QQ.png'),
      WechatImgSrc: require('../assets/Wechat.png'),
      WeiboImgSrc: require('../assets/Weibo.png'),
      activeIndex: '1',
      // 控制login对话框的显示与隐藏
      loginDialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 点击重置按钮，重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    ToHome () {
      this.$router.push('/home')
    },
    skip (url) {
      location.href = url
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    login () {
      this.loginDialogVisible = true
    },
    loginDialogVisibleClosed () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.menu{
    position: absolute;
    top:1.5%;
    right: 200px;
    display: inline-block;
}
.login_box {
}
.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
}
#forget{
  display: flex;
  justify-content: flex-end;
  margin-top: -15px;
  position: relative;
}
#bottom{
  display: flex;
  align-items: center;
  background-color: cyan;
  position: absolute;
  width: 450px;
  height: 35px;
  border-radius: 0 0 3px 3px;
  margin-left: -4.45%;
}
</style>
