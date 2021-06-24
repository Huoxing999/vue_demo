<template>
  <div class="app">
    <Header></Header>
    <!-- 搜索 -->
     <div class="box">
        <div style="margin-top: 15px; width: 100%;">
          <el-input placeholder="搜索职位、公司" v-model="defult_job" class="input-with-select">
             <el-select v-model="defult_city" slot="prepend" placeholder="请选择" style="width: 150px;">
              <el-option
                v-for="item in city"
                :key="item.key"
                :label="item.city"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width: 100px; color: #0A6CCF; background-color: #DAECFE;"></el-button>
          </el-input>
        </div>
    </div>
    <!-- 筛选 -->
    <!-- 列表 -->
    <el-divider></el-divider>
    <div class="list"  v-for="item in list" :key="item.id">
      <el-col :span="24">
        <router-link target="_blank" :to="{path:'/SearchDetail',query:{id: item.id}}">
          <div class="list_card">
            <el-col :span="14">
              <div class="card_left">
                <div class="left_top">
                  <a style="color:#55CBC4; font-size: 17px;" class="job_name">{{ item.post_name }}</a>
                  <a style="color:#55CBC4; padding-left: 10px; font-size: 17px;">[{{ item.post_city }}]</a>
                  <a style="padding-left: 10px; color:gray; font-size: 14px;">发布于{{ item.post_release_time }}</a>
                </div>
                <div class="left_middle"><a style="color:#fc703e; font-size: 16px; margin-right: 15px;">{{ item.post_salary }}</a><a style="font-size: 16px; color:#61687c; margin-right: 15px;">{{ item.post_education }}</a><a style="font-size: 16px;color:#61687c;">{{ item.post_category }}</a></div>
                <div style="font-size: 14px; color:gray; "><a>{{ item.post_keywords }}</a></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="card_middle">
                <div style="margin-bottom: 10px;"><a style="color:#55CBC4;font-size: 17px;">{{ item.company_name }}</a></div>
                <div><a style="font-size: 14px;color:#61687c;">{{ item.company_nature }} | {{ item.post_number }}</a></div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="card_right"><img :src="item.company_img" alt="" style="width: 50px; height: 50px; border-radius: 15px;"/></div>
            </el-col>
          </div>
        </router-link>
        <div style="width: 100%; height: 20px;"></div>
        <!-- 分页 -->
      <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
      </el-col>
        <div class="banner"><img :src="Src1" alt="" class="banner_img1"/></div>
        <div><img :src="Src3" alt="" class="banner_img2"/></div>
        <div><img :src="Src2" alt="" class="banner_img3"/></div>
    </div>
    <Footer style="margin: 0"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'SearchInfo',
  components: {
    Header, Footer
  },
  data () {
    return {
      defult_job: '',
      defult_city: '',
      // 地区
      city: [
        {
          key: '1',
          city: '上海'
        },
        {
          key: '2',
          city: '深圳'
        }
      ],
      // 搜索数据列表
      list: [
        {
          id: 1,
          post_name: 'WEB前端开发实习生',
          post_city: '南昌·青山湖区·昌东',
          post_release_time: '4月21日',
          post_salary: '2-3k',
          post_education: '学历不限',
          post_category: '职能类别',
          post_keywords: '前端开发 CSS CSS3 React Vue Vue.js',
          company_name: '铭钦',
          company_nature: '互联网',
          post_number: '0-20人', // 所招人数
          company_img: 'https://img.bosszhipin.com/beijin/images/image/971f8afab4bf25b8c58158a651028369-c55c74eb43c4d21bDtfnA1AiDhIOlQ~~.png?x-oss-process=image/resize,w_100,limit_0'
        },
        {
          id: 2,
          post_name: 'WEB前端开发实习生',
          post_city: '南昌·青山湖区·昌东',
          post_release_time: '4月21日',
          post_salary: '2-3k',
          post_education: '学历不限',
          post_category: '职能类别',
          post_keywords: '前端开发 CSS CSS3 React Vue Vue.js',
          company_name: '铭钦',
          company_nature: '互联网',
          post_number: '0-20人', // 所招人数
          company_img: 'https://img.bosszhipin.com/beijin/images/image/971f8afab4bf25b8c58158a651028369-c55c74eb43c4d21bDtfnA1AiDhIOlQ~~.png?x-oss-process=image/resize,w_100,limit_0'
        },
        {
          id: 3,
          post_name: 'WEB前端开发实习生',
          post_city: '南昌·青山湖区·昌东',
          post_release_time: '4月21日',
          post_salary: '2-3k',
          post_education: '学历不限',
          post_category: '职能类别',
          post_keywords: '前端开发 CSS CSS3 React Vue Vue.js',
          company_name: '铭钦',
          company_nature: '互联网',
          post_number: '0-20人', // 所招人数
          company_img: 'https://img.bosszhipin.com/beijin/images/image/971f8afab4bf25b8c58158a651028369-c55c74eb43c4d21bDtfnA1AiDhIOlQ~~.png?x-oss-process=image/resize,w_100,limit_0'
        },
        {
          id: 4,
          post_name: 'WEB前端开发实习生',
          post_city: '南昌·青山湖区·昌东',
          post_release_time: '4月21日',
          post_salary: '2-3k',
          post_education: '学历不限',
          post_category: '职能类别',
          post_keywords: '前端开发 CSS CSS3 React Vue Vue.js',
          company_name: '铭钦',
          company_nature: '互联网',
          post_number: '0-20人', // 所招人数
          company_img: 'https://img.bosszhipin.com/beijin/images/image/971f8afab4bf25b8c58158a651028369-c55c74eb43c4d21bDtfnA1AiDhIOlQ~~.png?x-oss-process=image/resize,w_100,limit_0'
        },
        {
          id: 5,
          post_name: 'WEB前端开发实习生',
          post_city: '南昌·青山湖区·昌东',
          post_release_time: '4月21日',
          post_salary: '2-3k',
          post_education: '学历不限',
          post_category: '职能类别',
          post_keywords: '前端开发 CSS CSS3 React Vue Vue.js',
          company_name: '铭钦',
          company_nature: '互联网',
          post_number: '0-20人', // 所招人数
          company_img: 'https://img.bosszhipin.com/beijin/images/image/971f8afab4bf25b8c58158a651028369-c55c74eb43c4d21bDtfnA1AiDhIOlQ~~.png?x-oss-process=image/resize,w_100,limit_0'
        }
      ],
      Src1: 'https://static.zhipin.com/zhipin-geek/v434/web/geek/images/pro-3.jpg',
      Src2: require('../assets/pro-22.png'),
      Src3: require('../assets/pro-11.png'),
      currentPage3: 5
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页${val}条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页:${val}`)
    }

  },
  mounted () {
    this.defult_job = this.$route.searchJob.inputValue
    this.defult_city = this.$route.searchJob.address
    console.log('zxxxx' + this.$route.searchJob.inputValue)
  }
}
</script>

<style lang="less" scoped>
.box{
    margin: 0 auto;
    padding-top: 40px;
    height: 80px;
    width: 100%;
}
.fliter{
  width: 100%;
}
.input-with-select{
  width: 70%;
  margin-left: 200px;
}
.list{
  width: 100%;
  height: 80%;
}
.list_card{
  margin-top: 15px;
  width: 60%;
  height: 120px;
  margin-left: 10%;
  margin-bottom: 10px;
}
.card_left{
}
.card_middle{
  font-size: 16px;
}
.card_right{
  font-size: 16px;
}
.left_top{
  height: 33%;
  margin-bottom: 8px;
}
.job_name :hover{
  color: #34B8CA;
}
.left_middle{
  margin-bottom: 20px;
}
.banner{
  width: 30%;
}
.banner_img1{
  width: 300px;
  margin-top: 20px;
  position: absolute;
  right: 110px;
}
.banner_img2{
  width: 300px;
  margin-top: 220px;
  position: absolute;
  right: 110px;
}
.banner_img3{
  width: 300px;
  margin-top: 420px;
  position: absolute;
  right: 110px;
}
.block{
  margin-top: 40px;
  position: absolute;
  top: 970px;
  right: 550px;
}
</style>
