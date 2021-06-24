<template>
  <div >
    <!--  面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息提醒</el-breadcrumb-item>
      <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区域-->
    <el-card>
      <!-- 用户列表区域 -->
      <el-table :data="messagelist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名" prop="username" width="150px"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="企业Id" prop="enterpriseId"></el-table-column>
        <el-table-column label="反馈消息" prop="message" width="500px"></el-table-column>
        <el-table-column label="反馈时间" prop="time"></el-table-column>
        <el-table-column label="是否已解决" prop="isFix" width="150px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isFix" @change="isFixChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini"
                       @click="showEditDialog(scope.row)"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeUserById(scope.row.id)"></el-button>
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
    <!--  修改用户的对话框-->
    <el-dialog
      title="修改反馈消息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogVisibleClosed">
      <!--    内容主体区域-->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="editForm.username" prefix-icon="el-icon-user-solid" ></el-input>
        </el-form-item>
        <!--        &lt;!&ndash; 邮箱 &ndash;&gt;-->
        <!--        <el-form-item label="邮箱" prop="mail">-->
        <!--          <el-input v-model="editForm.mail" prefix-icon="el-icon-message"  clearable></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="editForm.role" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--  反馈消息    -->
        <el-form-item label="消息" prop="message" label-width="100px">
          <el-input v-model="editForm.message" prefix-icon="el-icon-chat-line-round" clearable></el-input>
        </el-form-item>
        <!--  反馈消息    -->
        <el-form-item label="反馈时间" prop="time" label-width="100px">
          <el-input v-model="editForm.time" prefix-icon="el-icon-watch" disabled></el-input>
        </el-form-item>
      </el-form>
      <!--    底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editMessageInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
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
      messagelist: [
        {
          enterpriseId: 1,
          id: 111,
          username: 'zs',
          mail: '12312@pp.com',
          isFix: false,
          message: '公司地点出错了！',
          role: '管理员',
          time: '2021.7.15'
        },
        {
          enterpriseId: 2,
          id: 112,
          username: 'ls',
          mail: '12312@pp.com',
          role: 'VIP',
          isFix: true,
          time: '2017.6.15',
          message: '这个职位已经招满了！'
        },
        {
          enterpriseId: 3,
          id: 113,
          username: 'ww',
          mail: '12312@pp.com',
          role: '普通用户',
          time: '2012.6.12',
          message: '这个家公司已经倒闭了！',
          isFix: false
        }
      ],
      total: 3,
      // 控制添加用户框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户框的显示与隐藏
      editDialogVisible: false,
      // 修改用户信息表单
      editForm: {},
      // 修改用户信息表单的验证规则对象
      editFormRules: {
        message: [
          { required: true, message: '请输入用户的反馈消息', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getMessageList()
  },
  methods: {
    async getMessageList () {
      // const { data: res } = await this.$http.get('users',
      //   { params: this.queryInfo })
      // if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      // this.userlist = res.data.users
      // this.total = res.data.total
      // console.log(res)
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getMessageList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getMessageList()
    },
    // 监听 switch 开关状态的改变
    async isFixChanged (userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(`${userinfo.id}/${userinfo.isFro}`)
      if (res.state !== 200) {
        userinfo.isFix = !userinfo.isFix
        return this.$message.error('消息状态更新失败！')
      }
      this.$message.success('更新消息状态成功！')
    },
    // 监听关闭修改用户对话框的的关闭事件
    editDialogVisibleClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 展示编辑用户的对话框
    showEditDialog (row) {
      // console.log(row)
      this.editDialogVisible = true
      this.editForm = JSON.parse(JSON.stringify(row))
      // console.log(this.editForm)
    },
    // 修改信息并提交
    editMessageInfo () {
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
      const confirmResult = await this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
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
        return this.message.error('删除消息失败！')
      }
      this.$message.success('删除消息成功！')
      await this.getUserList()
    }
  }
}
</script>

<style scoped>
</style>
