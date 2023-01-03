<template>
   <div>

      <el-form :model="form" ref="form" label-width="80px" :inline="true" size="normal">
         <el-form-item label="" size="normal">
            <el-button type="primary" size="medium" @click="addUser">添加管理员用户</el-button>
         </el-form-item>

         <el-form-item label="" size="normal">
            <el-button type="primary" size="medium" @click="addVipUser">添加VIP用户</el-button>
         </el-form-item>


         <el-form-item label="" size="normal" style="float: right;">
            <el-button type="primary" size="medium" @click="swUser">{{this.isAdminLisr? '切换至VIP用户':'切换至管理员用户'}}</el-button>
         </el-form-item>


      </el-form>


      <!-- 管理员列表 -->
      <el-table v-show="isAdminLisr" :data="adminList" stripe style="width: 100%" max-height="600">
         <el-table-column type="index" label="序号" width="150px">
         </el-table-column>
         <el-table-column prop="username" label="用户名">
         </el-table-column>
         <el-table-column prop="phone" label="手机号">
         </el-table-column>
         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button type="primary" size="mini " icon="el-icon-edit" @click="editUser(scope.row)">修改</el-button>
               <el-button size="mini" icon="el-icon-delete" type="danger" @click="remUser(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- VIP列表 -->
      <el-table v-show="!isAdminLisr" :data="vipList" stripe style="width: 100%" max-height="600">
         <el-table-column type="index" label="序号" width="150px">
         </el-table-column>
         <el-table-column prop="username" label="用户名">
         </el-table-column>
         <el-table-column prop="phone" label="手机号">
         </el-table-column>
         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button type="primary" size="mini " icon="el-icon-edit" @click="editVipUser(scope.row)">修改</el-button>
               <el-button size="mini" icon="el-icon-delete" type="danger" @click="remVipUser(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <div>
         <el-dialog :title="modeType === 0 ? '添加' : '修改'" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="150px">
               <el-form-item label="用户名" prop="username">
                  <el-input v-model="form.username" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="submMit">确 定</el-button>
            </div>
         </el-dialog>

      </div>

      <!-- VIP对话框 -->
      <div>
         <el-dialog :title="modeType === 0 ? '添加' : '修改'" :visible.sync="dialogFormVisibleVip">
            <el-form ref="form" :rules="rules" :inline="true" :model="vipform" label-width="150px">
               <el-form-item label="用户名" prop="username">
                  <el-input v-model="vipform.username" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="密码" prop="password">
                  <el-input v-model="vipform.password" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="手机号" prop="phone">
                  <el-input v-model="vipform.phone" autocomplete="off"></el-input>
               </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisibleVip = false">取 消</el-button>
               <el-button type="primary" @click="vipsubmMit">确 定</el-button>
            </div>
         </el-dialog>

      </div>
   </div>
</template>

<script>
// import { getAdminUser, addAdmin, updAdmin, delAdmin, getVipUser, addAVip, updVip, delVip, addVip } from '../../api'

export default {
   name: 'mall',
   data() {
      return {
         isAdminLisr: 1,
         modeType: 0,
         adminList: [],
         vipList: [],
         form: {
            username: '',
            password: '',
            phone: '',
            isA:1
         },
         vipform: {
            username: '',
            password: '',
            phone: '',
            isA:0

         },
         dialogFormVisible: false,
         dialogFormVisibleVip: false,
         rules: {
            username: [
               { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            phone: [
               { required: true, message: '请输入活动名称', trigger: 'blur' },
               { min: 11, max: 11, message: '请输入11位手机号', trigger: 'change' }
            ],
            password: [
               { required: true, message: '请输入密码', trigger: 'blur' },
            ],
         },
         serName: {
            name: ''
         }
      };
   },
   methods: {
      //点击添加按钮
      addUser() {
         this.dialogFormVisible = true
         this.modeType = 0
         this.form = {
            username: '',
            password: '',
            phone: '',
            isA:1
         }
      },
      addVipUser() {
         this.dialogFormVisibleVip = true
         this.modeType = 0
         this.vipform = {
            username: '',
            password: '',
            phone: '',
            isA:0
         }
      },
      getList() {
      

         this.$API.user.getUserInfo().then(({ data }) => {
            // console.log(data.message);
            this.adminList = data.message
            this.total = data.count || 0

         })

         this.$API.user.getVipUserInfo().then(({ data }) => {
            // console.log(data);
            this.vipList = data.message
            this.total = data.count || 0

         })


      },
      //点击对话框确定提交按钮
      submMit() {
         this.$refs.form.validate((valid) => {

            if (valid) {
               if (this.modeType === 0) {
                  //添加请求
                  console.log(12321);

                  this.$API.user.regist(this.form).then(() => {

                     this.getList()
                  })
                  //否则就修改请求
               } else {
                  this.$API.user.updUserInfo(this.form).then(() => {
                     this.getList()
                  })
               }
            }

         })
         this.form = {
            username: '',
            password: '',
            phone: ''
         },
            this.dialogFormVisible = false
      },

      //点击修改
      editUser(row) {
         this.dialogFormVisible = true
         this.modeType = 1
         this.form = JSON.parse(JSON.stringify(row))

      },
      //点击删除
      remUser(row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
         }).then(() => {
            this.$API.user.delUserInfo({ id: row.id }).then((data) => {
               this.getList()
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               });
            })


         }).catch(() => {
            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });
      },
      //VIP请求
      vipsubmMit() {
         console.log(11);
         this.$refs.form.validate((valid) => {
            console.log(this.vipform);
            if (valid) {
               if (this.modeType === 0) {
                  //添加请求

                  this.$API.user.regist(this.vipform).then(() => {

                     this.getList()
                     this.dialogFormVisibleVip = false
                  })
                  //否则就修改请求
               } else {
                  this.$API.user.updUserInfo(this.vipform).then(() => {
                     this.dialogFormVisibleVip = false
                     this.getList()
                  })
               }
            }

         })
         this.form = {
            username: '',
            password: '',
            phone: ''
         },
            this.dialogFormVisible = false
      },
      //VIP点击修改
      editVipUser(row) {
         this.dialogFormVisibleVip = true
         this.modeType = 1
         // console.log(row);
         this.vipform = JSON.parse(JSON.stringify(row))

         console.log(row,'row');
         console.log(this.vipform);
      },
      //点击删除
      remVipUser(row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
         }).then(() => {
            this.$API.user.vipdelUserInfo({ id: row.id }).then((data) => {
               this.getList()
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               });
            })


         }).catch(() => {
            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });
      },

      //切换显示列表
      swUser() {
         this.isAdminLisr = !this.isAdminLisr
      }
   },
   mounted() {
      this.getList()
   },

}
</script>

<style scoped>

</style>