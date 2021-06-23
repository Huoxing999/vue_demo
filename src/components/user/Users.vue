<template>
<div >
<!--  面包屑导航区-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--  卡片视图区域-->
  <el-card >
    <!--搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="userlist">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">添加用户
        </el-button>
      </el-col>
    </el-row>
    <!-- 用户列表区域 -->
    <el-table :data="userlist" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="邮箱" prop="mail"></el-table-column>
      <el-table-column label="居住地" prop="location"></el-table-column>
      <el-table-column label="求职意向" prop="wish"></el-table-column>
      <el-table-column label="是否被冻结" prop="isFro">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isFro" @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template  slot-scope="scope">
          <!--修改按钮-->
          <el-button type="primary" icon="el-icon-edit" size="mini"
          @click="showEditDialog(scope.row)"></el-button>
          <!--删除按钮-->
          <el-button type="danger" icon="el-icon-delete" size="mini"
          @click="removeUserById(scope.row.id)"></el-button>
<!--          &lt;!&ndash;分配角色按钮&ndash;&gt;-->
<!--          <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">-->
<!--            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>-->
<!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
<!--    分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  <!--  添加用户的对话框-->
  <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    width="50%"
    @close="addDialogVisibleClosed">
    <!--    内容主体区域-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
      <!-- 用户名 -->
      <el-form-item  label="用户名" prop="username">
        <el-input v-model="addForm.username" prefix-icon="el-icon-user-solid"  clearable></el-input>
      </el-form-item>
      <!--  密码    -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" prefix-icon="el-icon-lock" type="password"  clearable></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="addForm.checkPassword" prefix-icon="el-icon-lock" type="password"  clearable></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" prefix-icon="el-icon-message" type="email"  clearable></el-input>
      </el-form-item>
    </el-form>
    <!--    底部区域-->
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  </el-dialog>
  <!--  修改用户的对话框-->
  <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="50%"
    @close="editDialogVisibleClosed">
    <!--    内容主体区域-->
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
      <!-- 用户名 -->
      <el-form-item  label="用户名" >
        <el-input v-model="editForm.username" prefix-icon="el-icon-user-solid"  disabled></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="editForm.mail" prefix-icon="el-icon-message"  clearable></el-input>
      </el-form-item>
      <!--  居住地    -->
      <el-form-item label="居住地" prop="location">
        <el-input v-model="editForm.location" prefix-icon="el-icon-location-outline"   clearable></el-input>
      </el-form-item>
      <!--  求职意愿    -->
      <el-form-item label="意向" prop="wish">
        <el-input v-model="editForm.wish" prefix-icon="el-icon-star-off"   clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" >
        <el-select v-model="editForm.role" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!--    底部区域-->
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.password !== '') {
          if (this.addForm.password.length <= 4 || this.addForm.password.length >= 14) {
            callback(new Error('密码的长度在5-15个字符之间'))
          } else {
            this.$refs.addFormRef.validateField('checkPassword')
          }
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
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
      // select选项
      options: [{
        value: '管理员'
      }, {
        value: 'VIP'
      }, {
        value: '普通用户'
      }],
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [
        {
          id: 111,
          username: 'zs',
          mail: '12312@pp.com',
          location: '南昌',
          wish: '前端工程师',
          role: '管理员',
          isFro: false
        },
        {
          id: 112,
          username: 'ls',
          sex: '女',
          age: '19',
          tele: '1612737123',
          mail: '12312@pp.com',
          location: '北京',
          wish: '会计',
          role: 'VIP',
          isFro: true
        },
        {
          id: 113,
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: false
        },
        {
          id: 114,
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: true
        },
        {
          id: 115,
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: false
        },
        {
          id: 116,
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: true
        },
        {
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: false
        },
        {
          id: 117,
          username: 'ww',
          mail: '12312@pp.com',
          location: '上海',
          wish: '插画师',
          role: '普通用户',
          isFro: true
        }
      ],
      total: 0,
      // 控制添加用户框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户框的显示与隐藏
      editDialogVisible: false,
      // 添加用户表单
      addForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: ''
      },
      // 修改用户信息表单
      editForm: {
      },
      // 添加表单的验证规则对象
      addFormRules: {
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
      },
      // 修改用户信息表单的验证规则对象
      editFormRules: {
        mail: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请输入用户居住地', trigger: 'blur' }
        ],
        wish: [
          { required: true, message: '请输入用户的求职意愿', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users',
        { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.user
      this.total = res.data.total
      console.log(res)
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged (userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(`${userinfo.id}/${userinfo.isFro}`)
      if (res.state !== 200) {
        userinfo.isFro = !userinfo.isFro
        return this.$message.error('用户状态更新失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    // 监听关闭添加用户对话框的的关闭事件
    addDialogVisibleClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听关闭修改用户对话框的的关闭事件
    editDialogVisibleClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async vaild => {
        console.log(vaild)
        // if (!vaild) {}
        // // 可以发起添加用户的网络请求
        // const { data: res } = await this.$http('users', this.addForm)
        // if (res.meta.state !== 201) {
        //   this.$message.error('添加用户失败')
        // }
        // this.$message.success('添加用户成功！')
        // // 隐藏添加对话框
        // this.addDialogVisible = false
        // // 重新获取用户数据
        // await this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    showEditDialog (row) {
      // console.log(row)
      this.editDialogVisible = true
      this.editForm = JSON.parse(JSON.stringify(row))
      // console.log(this.editForm)
    },
    // 修改信息并提交
    editUserInfo () {
      this.editDialogVisible = false
      this.$refs.editFormRef.validate(async vaild => {
        console.log(vaild)
        console.log(this.editForm)
        // if (!vaild) {}
        // // 可以发起添加用户的网络请求
        // const { data: res } = await this.$http('users', this.addForm)
        // if (res.meta.state !== 201) {
        //   this.$message.error('添加用户失败')
        // }
        // this.$message.success('添加用户成功！')
        // // 隐藏添加对话框
        // this.addDialogVisible = false
        // // 重新获取用户数据
        // await this.getUserList()
      })
    },
    // 更加Id删除对应的用户信息
    async removeUserById (id) {
      // console.log(id)
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // console.log('确认了删除')
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      await this.getUserList()
    }
  }
}
</script>

<style scoped>
</style>
