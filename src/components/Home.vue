<template>
  <div class="app">
    <Header></Header>
    <img :src="imgSrc" width="100%" alt=""/>
    <div class="home_title">百万工作，任你挑选</div>
    <!-- 搜索职位 -->
    <div >
      <div style="display: flex;justify-content: center">
        <div>
        <el-autocomplete popper-class="Autocomplete" v-model="inputValue" :fetch-suggestions="querySearch"
                         placeholder="请输入工作岗位/工作技能/公司名称" @select="handleSelect">
          <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
        </div>
        <!-- 选择城市地区 -->
        <div>
          <el-cascader
            v-model="address"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange">
          </el-cascader>
        </div>
      </div>
      <!-- 点击搜索 -->
      <el-button type="primary" round style="width:170px; top:450px;position: absolute; left: 45%; font-size:18px;"
                 @click="searchJob">搜 索 职 位
      </el-button>
    </div>
    <!-- 中间内容 -->
    <div style="width: 100%; position:absolute;">
      <el-row>
        <el-col :span="8">
          <div>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="font-weight: bolder;font-size: 16px; padding-bottom:20px; padding-top:100px; padding-left:200px;">
              互联网/运营/产品<br></el-link>
            <br>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="font-weight: bolder;font-size: 16px; padding-bottom:20px; padding-left:200px;">设计/销售/房地产
            </el-link>
            <br>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="font-weight: bolder;font-size: 16px; padding-bottom:20px; padding-left:200px;">人力/法律
            </el-link>
            <br>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="font-weight: bolder;font-size: 16px; padding-bottom:15px; padding-left:200px;">学生活动
            </el-link>
            <br>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="padding-left:200px; padding-bottom: 5px;">· 职等你来,就业同行
            </el-link>
            <br>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false"
                     style="padding-left:200px; padding-bottom: 5px;">· 24365校园招聘服务
            </el-link>
            <el-link href="https://element.eleme.io" target="_blank" :underline="false" style="padding-left:200px;">·
              江西南昌场招聘活动
            </el-link>
          </div>
        </el-col>
        <!-- 轮播图 -- elementui走马灯 -->
        <el-col :span="16">
          <div style="width: 80%; padding-top:60px;">
            <template>
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in imgList" :key="item.name">
                  <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了"/>
                </el-carousel-item>
              </el-carousel>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="card">
      <p style="font-size: 18px; font-weight: 600; letter-spacing: 5px; color:#414A60;">热门校招</p>
      <div class="card_content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全职" name="first">
            <template>
              <div class="wrapper">
                <div class="wrapper-content" v-for="item in quanzhi_list" :key="item.title">
                  <div class="quanzhi_card"><img :src="item.quanzhi_img" style="height: 100%; width: 100%;" alt=""/>
                  </div>
                  <div class="card_text">{{ item.title }}</div>
                </div>
              </div>
            </template>
          </el-tab-pane>
          <!-- 分割线 -->
          <el-tab-pane label="实习" name="second">
            <div class="wrapper">
              <div class="wrapper-content" v-for="item in shixi_list" :key="item.jobName">
                <div class="shixi_card">
                  <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                      <div class="title_left">{{ item.jobName }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="salary">{{ item.salary }}</div>
                    </el-col>
                  </el-row>
                  <br>
                  <div style="width: 85%;margin: 0 auto;">
                    <el-breadcrumb separator="/">
                      <el-breadcrumb-item>{{ item.address }}</el-breadcrumb-item>
                      <el-breadcrumb-item>{{ item.workCycle }}</el-breadcrumb-item>
                      <el-breadcrumb-item>{{ item.workTime }}</el-breadcrumb-item>
                      <el-breadcrumb-item>{{ item.degree }}</el-breadcrumb-item>
                    </el-breadcrumb>
                  </div>
                  <el-divider></el-divider>
                  <el-row>
                    <el-col :span="3">
                      <div class="card_avatar">
                        <el-avatar style="width: 30px; height: 30px; " :src="item.src"></el-avatar>
                      </div>
                    </el-col>
                    <el-col :span="14">
                      <div class="">{{ item.company }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="small_text">{{ item.note }}</div>
                    </el-col>
                  </el-row>
                </div>
                <!-- 实习 模块 分割线 -->
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 四个图标 -->
    <div class="Icons">
      <div style="width:100%;"><p
        style="font-size:30px; padding-left: 70px; padding-bottom: 30px; letter-spacing:10px;">核心竞争</p></div>
      <el-row>
        <el-col :span="4" style="margin-left: 280px;">
          <div class="">
            <img :src="talkImg" class="iconImg" alt=""/>
            <p>大数据分析</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="">
            <img :src="manyjobImg" class="iconImg" alt=""/>
            <p>海量职位</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="">
            <img :src="personalImg" class="iconImg" alt=""/>
            <p>隐私保护</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="">
            <img :src="safeImg" class="iconImg" alt=""/>
            <p>安全可靠</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 底部 -->
  <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Footer, Header
  },
  data () {
    return {
      imgSrc: require('../assets/login_background.png'),
      talkImg: require('../assets/talkImg.png'),
      manyjobImg: require('../assets/manyjobImg.png'),
      personalImg: require('../assets/personalImg.png'),
      safeImg: require('../assets/safeImg.png'),
      activeIndex: '1',
      activeName: 'first',
      jobs: [],
      inputValue: '',
      address: '',
      // card_img1: 'https://boss-bj.oss-cn-beijing.aliyuncs.com/beijin/upload/school/live/20210528/4a07c92c3cc5fdabf9abc3798b7fb551-b5566e6705fdd427b1537cd2a2d918e4',
      options: [{
        value: '1',
        label: '江西省',
        children: [{
          value: '1',
          label: '南昌市'
        }, {
          value: '2',
          label: '九江市'
        }, {
          value: '3',
          label: '上饶市'
        }, {
          value: '4',
          label: '景德镇'
        }]
      }, {
        value: '2',
        label: '北京市'
      }, {
        value: '3',
        label: '上海市'
      }, {
        value: '4',
        label: '深圳市'
      }],
      imgList: [
        {
          name: '1',
          src: 'https://static.zhipin.com/zhipin-geek/v432/web/geek/images/school/banner/wuhan.png'
        },
        {
          name: '2',
          src: require('../assets/4.png')
        },
        {
          name: '3',
          src: require('../assets/3.png')
        },
        {
          name: '4',
          src: require('../assets/1.png')
        },
        {
          name: '5',
          src: require('../assets/2.png')
        }],
      // 轮播图end
      quanzhi_list: [
        {
          quanzhi_img: 'https://boss-bj.oss-cn-beijing.aliyuncs.com/beijin/upload/school/live/20210528/4a07c92c3cc5fdabf9abc3798b7fb551-b5566e6705fdd427b1537cd2a2d918e4',
          title: '一起学网校在线辅导老师全国招聘'
        },
        {
          quanzhi_img: 'https://boss-bj.oss-cn-beijing.aliyuncs.com/beijin/upload/school/live/20210528/4a07c92c3cc5fdabf9abc3798b7fb551-b5566e6705fdd427b1537cd2a2d918e4',
          title: '一起学网校在线辅导老师全国招聘'
        },
        {
          quanzhi_img: 'https://boss-bj.oss-cn-beijing.aliyuncs.com/beijin/upload/school/live/20210528/4a07c92c3cc5fdabf9abc3798b7fb551-b5566e6705fdd427b1537cd2a2d918e4',
          title: '一起学网校在线辅导老师全国招聘'
        }
      ],
      shixi_list: [
        {
          jobName: '前端开发/实习生',
          salary: '60-80/天',
          address: '南昌',
          workCycle: '5天/周',
          workTime: '6个月',
          degree: '本科',
          company: '南昌晟源软件有限公司',
          note: '计算机服务',
          src: 'https://img.bosszhipin.com/beijin/upload/com/logo/20201229/16203d8f80aa15364f09ac2fde568e197a2d5dd20c87af490c74a08b52bc62a3.jpg?x-oss-process=image/resize,w_60,limit_0'
        },
        {
          jobName: '前端开发/实习生',
          salary: '60-80/天',
          address: '南昌',
          workCycle: '5天/周',
          workTime: '6个月',
          degree: '本科',
          company: '南昌晟源软件有限公司',
          note: '计算机服务',
          src: 'https://img.bosszhipin.com/beijin/upload/com/logo/20201229/16203d8f80aa15364f09ac2fde568e197a2d5dd20c87af490c74a08b52bc62a3.jpg?x-oss-process=image/resize,w_60,limit_0'
        },
        {
          jobName: '前端开发/实习生',
          salary: '60-80/天',
          address: '南昌',
          workCycle: '5天/周',
          workTime: '6个月',
          degree: '本科',
          company: '南昌晟源软件有限公司',
          note: '计算机服务',
          src: 'https://img.bosszhipin.com/beijin/upload/com/logo/20201229/16203d8f80aa15364f09ac2fde568e197a2d5dd20c87af490c74a08b52bc62a3.jpg?x-oss-process=image/resize,w_60,limit_0'
        }
      ]
    }
  },
  methods: {
    querySearch (queryString, cb) { // 返回输入建议的方法,输入框一获取焦点,
      const jobs = this.jobs
      const results = queryString ? jobs.filter(this.createFilter(queryString)) : jobs
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (jobs) => {
        return (jobs.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [{ value: '前端工程师' }, { value: '后端工程师' }, { value: '网络工程师' },
        { value: '前端实习生' }, { value: '后端实习生' }, { value: '网络安全防护实习生' }]
    },
    handleSelect (item) { // 当选中建议项时，调用该方法
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 触发子菜单
    handleChange (value) {
      console.log(value)
    },
    // 卡片内容切换
    handleClick (tab, event) {
      console.log(tab, event)
    },
    searchJob () {
      const that = this
      console.log('xxxxx' + that.inputValue)
      console.log(that.address)
      this.$router.push({
        path: '/searchInfo',
        searchJob: {
          inputValue: that.inputValue,
          address: that.address
        }
      })
    }
  },
  mounted () {
    // 加载推荐的工作岗位
    this.jobs = this.loadAll()
  }
}
</script>

<style lang="less" scoped>
.home_title{
  position: absolute;
  top: 250px;
  left: 32%;
  font-size: 80px;
  font-weight: 700;//字体加粗
  font-family: STHupo;
  background: linear-gradient(0.25turn, #2D5ACC, #A5BDFA);
  -webkit-background-clip: text;
  color: transparent;
}
.app {
  width: 100%;
  text-align: center;
}

.menu {
  position: absolute;
  top: 20px;
  right: 200px;
}

.el-autocomplete {
  width: 500px;
  position: absolute;
  top: 40%;
  left: 20%;
}

.el-autocomplete ::placeholder {
  font-size: 19px;
}

.el-cascader {
  width: 500px;
  position: absolute;
  top: 40%;
  left: 52%;
}

.el-cascader ::placeholder {
  font-size: 19px;
}

.search_bar {
  display: flex;
  align-items: center;
}

// 轮播图
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

// 卡片
.card {
  width: 80%;
  margin-top: 460px;
  margin-left: 200px;
}

.card_content {
  width: 100%;
  // height: 100%;
}

.wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.wrapper-content {
  margin-top: 30px;
  width: 33%;
}

.quanzhi_card { // 卡片样式
  width: 300px;
  height: 180px;
  box-shadow: 20px 0 30px 10px #c3c4c5;
}

.quanzhi_card :hover {
  box-shadow: 10px 10px 5px 5px #dfe0e2;
  position: relative;
  top: 6px;
  left: 5px;
  border: none;
}

.card_text {
  font-size: 16px;
  width: 300px;
}

.shixi_card {
  width: 350px;
  height: 150px;
  background-color: #EEF0F5;
  border: solid 1px #E6E6E6;
  font-size: 14px;
}

.col_hover:hover {
  box-shadow: 20px 0 30px 10px #c3c4c5;
  border-radius: 10px;
  position: relative;
  left: 5px;
  top: 8px;
}

.title_left {
  font-size: 15px;
  padding-top: 10px;
}

.card_avatar {
  width: 30px;
  height: 30px;
  margin-left: 15px;

}

.small_text {
  color: gray;
}

.salary {
  color: #fc6c38;
  font-size: 16px;
  padding-top: 10px;
}

// 图标盒子
.Icons {
  width: 100%;
  height: 300px;
  margin-top: 100px;
  text-align: center;
}

.iconImg {
  width: 80px;
  height: 80px;
}

</style>
