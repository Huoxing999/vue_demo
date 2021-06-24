<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="FormRules">
      <!--用户名-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-user" style="font-size: 35px"></i>
          <span class="text_select">用户名</span>
        </el-col>
        <el-col :span="18">
          <el-form-item prop="username">
            <el-input v-model="form.username" style="width: 40%;" :disabled="form.flag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--  性别-->
      <el-row :gutter="10">
        <el-form-item>
          <el-col :span="6">
            <i :class=iconStyle style="font-size: 35px"></i>
            <span class="text_select">性别</span>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <el-radio v-model="form.radio" label="1" @change="sexChanged()" style=" margin-left: 20px;"><a
                style="font-size: 20px;">男</a></el-radio>
              <el-radio v-model="form.radio" label="2" @change="sexChanged()"><a style="font-size: 20px">女</a>
              </el-radio>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <!--  年龄-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-potato-strips" style="font-size: 35px"></i>
          <span class="text_select">年龄</span>
        </el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input-number v-model="form.num" :min="12" :max="99"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 联系电话-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-phone-outline" style="font-size: 35px"></i>
          <span class="text_select">联系电话</span>
        </el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input v-model="form.tele" style=" width: 40%;" :disabled="form.flag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--  联系邮箱-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-message" style="font-size: 35px"></i>
          <span class="text_select">邮箱</span>
        </el-col>
        <el-col :span="18">
          <el-form-item prop="mail">
            <el-input v-model="form.mail" style="width: 40%;" :disabled="form.flag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--  居住地-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-map-location" style="font-size: 35px"></i>
          <span class="text_select">居住地</span>
        </el-col>
        <el-col :span="18">
      <el-form-item>
        <el-input v-model="form.location" style="width: 40%;" :disabled="form.flag"></el-input>
        <!-- 选择城市地区 -->
      </el-form-item>
        </el-col>
      </el-row>
      <!--  职位意向-->
      <el-row :gutter="10">
        <el-col :span="6">
          <i class="el-icon-star-off" style="font-size: 35px"></i>
          <span class="text_select">求职意向</span>
        </el-col>
        <el-col :span="18">
      <el-form-item>
        <el-input v-model="form.wish" style="width: 40%;" :disabled="form.flag"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-left: 230px">
        <el-button type="primary" @click="save">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (value === '') {
        return
        // return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      form: {
        num: 18,
        radio: '1',
        tele: '123456',
        mail: '123@xx.com',
        location: '南昌',
        wish: '前端工程师',
        username: 'zs',
        flag: false
      },
      iconStyle: 'el-icon-male',
      FormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mail: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.sexChanged()
  },
  methods: {
    save () {
      this.$message.success('保存修改成功')
    },
    sexChanged () {
      // console.log(this.form.radio)
      // eslint-disable-next-line eqeqeq
      if (Number(this.form.radio) === 1) {
        this.iconStyle = 'el-icon-male'
      } else {
        this.iconStyle = 'el-icon-female'
      }
      // console.log(this.iconStyle)
    }
  }
}
</script>

<style lang="less" scoped>
.text_select {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  color: #606266;
}

.el-icon-edit-outline {
  position: relative;
  top: 10px;
  font-size: 40px;
  margin-left: 20px;
}
</style>
