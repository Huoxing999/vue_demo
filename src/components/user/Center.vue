<template>
<div class="all_content" >
  <Header></Header>
  <!--标题区域-->
  <div class="title_content">
    <img style="height: 120px;width: 120px" alt="" src='../../assets/safe.png'/>
    <div class="title_info">个人信息</div>
  </div>
  <el-container>
    <el-aside width="50%" >
      <!--  头像区-->
      <div  class="center_content" >
        <div class="avatar_box">
          <img src="../../assets/logo.jpg" alt="">
        </div>
      </div>
      <!--上传区域-->
      <div class="center_content" >
      <div class="upload_content">
        <div class="upload_info">
          <!--  action,必选参数,上传的地址
                on-preview,点击文件列表中已上传的文件时的钩子
                on-remove,文件列表移除文件时的钩子
                on-success,文件上传成功时的钩子
                before-remove,删除文件之前的钩子，参数为上传的文件和文件列表，
                若返回 false 或者返回 Promise 且被 reject，则停止删除。
                list-type,文件列表的类型,
                file-list,上传的文件列表,
                例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                limit,最大允许上传个数
          -->
<!--          list-type="picture"-->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload"
            style="font-size: 25px"
            list-type="picture"
           >
            <i class="el-icon-camera" style="font-size: 50px;color: #4971CB"></i>
            上传新头像
          </el-upload>
        </div>
      </div>
      </div>
      <!--用户名显示区域-->
      <div class="center_content">
        <div class="username_content">Username</div>
      </div>
      <!--用户职位显示区域-->
      <div class="center_content">
        <div class="position_content">前端工程师</div>
      </div>
    </el-aside>
    <el-main>
      <el-menu :default-active="activeIndex"
               mode="horizontal"
               @select="handleSelect"
               text-color="#4971CB"
               active-text-color="deepskyblue"
               router
                     background-color="#DAECFE">
        <el-menu-item index="/basic">基本信息</el-menu-item>
        <el-menu-item index="/repass">修改密码</el-menu-item>
      </el-menu>
      <div class="child_content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
  <Footer style="position: absolute;bottom: 0"></Footer>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Footer, Header
  },
  data () {
    return {
      imageUrl: '',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message.success('头像上传成功')
    },
    handleAvatarError (res, file) {
      console.log(file.raw)
      console.log(URL.createObjectURL(file.raw))
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message.error('头像上传失败')
    },
    beforeAvatarUpload (file) {
      let isPic = false
      isPic = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPic && isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
.child_content{
  margin-top: 60px;
}
.el-menu-item{
  width: 200px;
  font-size: 35px;
}
.position_content{
  margin-top: 10px;
  color: #4971CB;
  font-size: 20px;
}
.username_content{
  margin-top: 20px;
  color: #4971CB;
  font-size: 25px;
}
.center_content{
  width: 100%;
  display: flex;
  justify-content: center
}
.upload_info{
  margin-top: 20px;
  color: #4971CB;
}
.upload_content{
  margin-top: 20px;
  display:flex;
  justify-content: flex-start;
}
.avatar_box {
  margin-top: 100px;
  height: 130px;
  width: 130px;
  border: 1px solid #4971CB;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #4971CB;
  background-color: #4971CB;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.title_content{
  margin-left: 230px;
  font-size: 40px;
  color: #4971CB;
  display:flex;
  justify-content: flex-start;
}
.title_info{
  margin-top: 55px;
}
.all_content{
  position: absolute;
  width: 100%;
  background: url("../../assets/login_background2.png");
  background-size: 100% 100%;
  height: 100%;
}
</style>
