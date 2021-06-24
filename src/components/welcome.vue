<template >
<div class="content">
  <div class="message">
  <router-link to="/message">
    <el-badge :value="newsNum" class="item">
      <i class="el-icon-message" style="font-size: 50px"></i>
    </el-badge>
  </router-link>
  </div>
  <div class="title_all">
    <div class="title_one">大数据求职管理系统</div>
    <div class="title_two">大数据分析模式 + 信息加密模式</div>
    <div class="title_three"> 专业·易用·精准·安全 </div>
  </div>
<!--  <span style="font-size: 75px">欢迎使用大数据求职系统！</span>-->
<!--  <div style="font-size: 50px">-->
<!--  </div>-->
</div>
</template>

<script>
export default {
  data () {
    return {
      // conTop: {
      //   backgroundImage: 'url(' + require('../assets/login_background.png') + ')',
      //   backgroundSize: 'cover',
      //   height: '100%'
      // },
      newsNum: 2
    }
  }
}
</script>

<style lang="less" scoped>
.message{
  position: absolute;
  top:100px;
  right: 100px;
}
.title_all{
  text-align: center;
  top: 30%;
  left: 65%;
  position:absolute;
}
.title_one{
  font-size: 45px;
  font-weight: 700;
}
.title_two{
  font-size: 40px;
  margin-top: 20px;
}
.title_three{
    width: 350px;
    border-radius:25px;
    font-size:35px;
    color: white;
    background-color: #0A6CCF;
    margin-top: 20px;
    margin-left: 100px;
}
.content{
  background: url("../assets/banner1.png");
  background-size: 100% 100%;
  height: 100%;
}
</style>
