<template>
    <el-container class="index-container">
<!--      头部区域-->
      <el-header>
        <div>
          <img src="../assets/logo.jpg" alt="">
          <span>大数据求职分析系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
<!--      页面主题区-->
      <el-container>
<!--        侧边栏-->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--        侧边栏菜单区域-->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath">
            <!--一级菜单-->
            <el-submenu :index="item.id+ ''" v-for="item in menulist" :key="item.id">
              <!--一级菜单的模板区域-->
              <template slot="title">
              <!--图标-->
                <i :class="iconsObj[item.id]"></i>
              <!-- 文本-->
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
                            :key="subItem.id" @click="saveNavstate('/'+subItem.path)">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-menu"></i>
                  <!--文本-->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="">
<!--          侧边内容主体-->
          <el-main >
<!--            路由占位符-->
            <router-view></router-view>
          </el-main>
<!--          尾部区域-->
          <el-footer class="footer"><i>Copyright 2021 @ECJTU-NETOWRK·双港东大街808号</i></el-footer>
        </el-container>
      </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 110,
          authName: '用户管理',
          path: '',
          children: [
            {
              id: 110,
              authName: '用户列表',
              path: 'users'
            }
          ]
        },
        {
          id: 111,
          authName: '消息提醒',
          path: '',
          children: [
            {
              id: 111,
              authName: '用户反馈',
              path: 'message'
            }
          ]
        }
      ],
      iconsObj: {
        110: 'el-icon-user-solid',
        111: 'el-icon-chat-dot-round'
      },
      // 是否折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    // 获取所有菜单
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data()
    //   console.log(res)
    // },
    // 点击按钮切换,菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavstate (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }

}
</script>

<style lang="less" scoped>
.index-container{
  height: 100%;
}
.el-header{
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px ;
    }
    img {
      width: 6.7%;
      height: 6.7%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #EAEDF1;
}
.el-footer{
  background-color: cornflowerblue;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.footer{
  height: 30px;
  width: 100%;
  background-color: #4971CB;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
