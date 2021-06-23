<template>
  <div class="app">
    <Header></Header>
    <div style="width: 100%; height: 100%;" v-for="item in DetailInfo"  :key='item'>
      <div class="first">
          <el-col :span="12">
            <div  style="margin-top: 20px; margin-left:220px;">
              <div style="margin-bottom: 20px; "><a style="color: #DEE1E6; font-size: 16px;">招聘中</a></div>
              <div style="margin-bottom: 15px;"><a style="color: #FFFFFF; font-size: 36px; letter-spacing: 2px;">{{ item.post_name }}</a><a style="color: #5DD5C8; font-size: 34px; font-weight: 690; margin-left: 20px;">{{ item.post_salary }}</a></div>
              <div style="color: #DEE1E6; font-size: 16px; margin-bottom: 30px; letter-spacing: 2px;"><a>{{item.post_city}}</a><a>·{{item.post_experience}}</a><a>·{{item.post_education}}</a></div>
              <div>
                <el-button type="primary" plain icon="el-icon-star-off" style="font-size: 18px; margin-right: 10px;">  感 兴 趣</el-button><el-button plain type="danger" style="font-size: 18px;">立 即 沟 通 </el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-top: 80px; margin-left: 320px;">
              <div><el-button type="primary" plain round style="font-size: 18px; margin-bottom: 40px; margin-left: 5px;">五险一金</el-button></div>
              <div><i class="el-icon-document-checked" style="color: #409EFF; letter-spacing: 2px; font-size: 17px;">填写在线简历</i></div>
            </div>
          </el-col>
      </div>
      <div style="width: 100%; margin-top: 50px;">
        <div style="padding-left: 150px; width: 75%;">
          <el-col :span="16">
            <div><i class="el-icon-document-copy" style="color: #5DD5C8;"></i><a style="padding-left: 10px;">岗位职责</a></div>
            <div style="margin-bottom: 40px;"><p style="color:#61687c; line-height: 36px; font-size: 16px;">{{item.post_assignment}}</p></div>
            <div><i class="el-icon-document-copy" style="color: #5DD5C8;"></i><a style="padding-left: 10px;">任职要求</a></div>
            <div style="margin-bottom: 40px;"><p style="color:#61687c; line-height: 36px; font-size: 16px;">{{item.post_request}}</p></div>
            <div style="margin-bottom: 30px;"><i class="el-icon-loading" style="color: #5DD5C8;"></i><a style="padding-left: 10px;">竞争力分析</a></div>
            <div>
              <el-progress type="circle" :percentage="75" style="margin-left: 20px;"></el-progress>
              <el-progress type="circle" :percentage="25" style="margin-left: 20px;"></el-progress>
              <el-progress type="circle" :percentage="100" status="success" style="margin-left: 20px;"></el-progress>
              <el-progress type="circle" :percentage="70" status="warning" style="margin-left: 20px;"></el-progress>
              <el-progress type="circle" :percentage="50" status="exception" style="margin-left: 20px;"></el-progress>
            </div>
            <div style="color:#61687c; line-height: 36px; font-size: 16px; letter-spacing: 2px;">
              <a style="padding-left: 45px;">专业技能</a><a style="padding-left: 76px;">就业经验</a><a style="padding-left: 76px;">岗位需求</a><a style="padding-left: 76px;">任职需求</a><a style="padding-left: 62px;">资料完整度</a>
            </div>
            <div class="security-box">
              <h3>安全提示</h3>
              <p>严禁用人单位做出任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参与培训等，您一旦发现此类行为，<a>请立即举报</a></p>
            </div>
          </el-col>
<!--          推荐模块-->
          <el-col :span="8">
            <div style="width: 100%; margin-left: 130px; padding-left: 30px;">
              <div style="margin-bottom: 20px;"><i class="el-icon-user" style="color: #5DD5C8;"></i><a style="padding-left: 10px;">公司基本信息</a></div>
              <div style="margin-bottom: 40px;"><p style="font-size: 17px; padding-left: 10px;">{{item.company_name}}</p></div>
              <div style="margin-bottom: 20px;"><i class="el-icon-price-tag" style="color: #5DD5C8; padding-right: 15px;"></i><a style="font-size: 17px;">{{item.company_nature}}</a></div>
              <div style="margin-bottom: 20px;"><i class="el-icon-s-custom" style="color: #5DD5C8; padding-right: 15px;"></i><a style="font-size: 17px;">{{item.company_scale}}</a></div>
              <div style="margin-bottom: 60px;"><i class="el-icon-menu" style="color: #5DD5C8; padding-right: 15px;"></i><a style="font-size: 17px;">{{item.company_category}}</a></div>
              <div style="margin-bottom: 20px;"><i class="el-icon-bell" style="color: #5DD5C8; padding-bottom: 20px;"></i><a style="padding-left: 10px;">相似职位</a></div>
              <div v-for="item in recommendList"  :key='item.company_id'>
                <el-row :gutter="20">
                <el-col :span="16">
                  <div style="margin-bottom: 5px;" class="recommend">
                    <a style="font-size: 17px;">{{item.rec_job}}</a>
                  </div>
                  <div style="margin-bottom: 10px;"><a style="font-size: 17px; color: #fc703e;">{{item.rec_salary}}</a></div>
                  <div style="margin-bottom: 50px;"><a style="font-size: 17px; color: #8d92a1;">{{item.rec_company}} · {{item.rec_city}}</a></div>
                </el-col>
                <el-col :span="8">
                  <div><img :src="item.company_img" alt="" style="width: 80px; border-radius: 40px;"/></div>
                </el-col>
              </el-row>
              </div>
            </div>
          </el-col>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'SearchDetail',
  components: {
    Header, Footer
  },
  data () {
    return {
      // similarSrc: require("../assets/similar.png"),
      DetailInfo: [
        {
          post_name: 'VUE前端开发',
          post_salary: '3-5K',
          post_city: '南昌',
          post_experience: '3-4年经验',
          post_education: '本科',
          post_assignment: '1、参与需求调研工作，配合项目经理完成需求文档、分析文档、设计文档等项目文档工作;2、配合项目经理完成系统逻辑模型和物理模型设计并实现原型；3、负责项目整体开发工作,并能够按要求、高质量地完成开发;4、对开发的代码和功能，编写单元测试，进行自测。5、负责研发环境测试平台服务部署和维护，完成服务部署文档编写。',
          post_request: '1、本科以上学历，计算机科学等相关专业，3年以上的java开发经验；2、熟练使用开源框架：SpringBoot、Spring MVC、MyBatis、Activiti等；3、熟练使用前端技术：html、css、js、jquery、easyui、Vue等；4、熟悉缓存中间件：redis、memcached至少一种；5、熟悉消息中间件：rabbitMQ,、activeMQ、kafka至少一种；6、熟练使用mysql、oracle等常用数据库，并能够理解数据库优化方案；7、熟练使用团队协作工具：svn、maven、Jenkins等；8、熟悉Linux、Tomcat、nginx等，具备相应的应用服务部署及优化能力；9、有强烈的责任心和良好的沟通能力，优秀的团队合作精神，有较强的抗压能力以及学习能力；',
          company_name: '湖南科创信息技术股份有限公司武汉分公司',
          company_nature: '上市公司',
          company_scale: '500-1000人',
          company_category: '计算机服务'
        }
      ],
      recommendList: [
        {
          company_img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20160520/c8f8f07e62f543b5f449dbc519bb14da283da221ddeab94737303af457520dc0.jpg?x-oss-process=image/resize,w_100,limit_0',
          company_id: 1,
          rec_job: 'WedAR&AR小程序前端开发',
          rec_salary: '8-13K',
          rec_company: '映尚科技',
          rec_city: '南昌'
        },
        {
          company_img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20201117/9e01fd5d65c81a332e5e47ae0ee575155b5d53c8d16eb634483c07a2a1294204_s.jpg?x-oss-process=image/resize,w_100,limit_0',
          company_id: 2,
          rec_job: 'Java开发工程师 ',
          rec_salary: '10-15K',
          rec_company: '神州信息',
          rec_city: '南昌'
        },
        {
          company_img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20201224/99d0d73240d08898dfbde3c9a9fcdba50b8761a367a61b7361fbe4147480ca47_s.jpg?x-oss-process=image/resize,w_100,limit_0',
          company_id: 3,
          rec_job: '基带开发工程师（穿戴）',
          rec_salary: '10-15K',
          rec_company: '华勤技术股份有限公司',
          rec_city: '南昌'
        },
        {
          company_img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20160520/c8f8f07e62f543b5f449dbc519bb14da283da221ddeab94737303af457520dc0.jpg?x-oss-process=image/resize,w_100,limit_0',
          company_id: 4,
          rec_job: 'WedAR&AR小程序前端开发',
          rec_salary: '8-13K',
          rec_company: '映尚科技',
          rec_city: '南昌'
        },
        {
          company_img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20201224/99d0d73240d08898dfbde3c9a9fcdba50b8761a367a61b7361fbe4147480ca47_s.jpg?x-oss-process=image/resize,w_100,limit_0',
          company_id: 5,
          rec_job: '基带开发工程师（穿戴）',
          rec_salary: '10-15K',
          rec_company: '华勤技术股份有限公司',
          rec_city: '南昌'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.app{
    width: 100%;
    height: 100%;
}
.first{
    width: 100%;
    height: 250px;
    background-color: #424A61;
}
.security-box{
  margin: 40px 0;
  border: 1px solid rgba(223,224,228,1);
  padding: 30px 20px 20px;
  background-size: 116px 83px;
}
.security-box h3 {
    font-size: 18px;
    font-weight: 400;
    color: rgba(67,125,242,1);
    line-height: 16px;
    padding-bottom: 10px;
}
.security-box p {
    position: relative;
    padding-left: 6px;
    font-size: 18px;
}
.recommend a:hover{
  color: #00d7c6;
}
</style>
