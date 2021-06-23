<template >
<!--  :style="conTop"-->
<div >
  <span style="font-size: 75px">欢迎使用大数据求职系统！</span>
  <div style="font-size: 50px">
    <router-link to="/message">
      <el-badge :value="newsNum" class="item">
        <i class="el-icon-message"></i>
      </el-badge>
      你有
      <span style="color: red">
      {{newsNum}}</span>条信息
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      conTop: {
        backgroundImage: 'url(' + require('../assets/login_background.png') + ')',
        backgroundSize: 'cover',
        height: '100%'
      },
      newsNum: 2
    }
  }
}
</script>

<style scoped>
</style>
