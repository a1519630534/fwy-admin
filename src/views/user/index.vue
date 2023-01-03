<template>
   <div>



      <el-form :inline="true" :model="serData" class="demo-form-inline">
         <el-form-item>
            <el-button icon="el-icon-plus" type="primary" size="medium " @click="addUs">添加</el-button>
         </el-form-item>

         <el-form-item style="float: right;">
            <el-input v-model="serData.name" placeholder="请输入名字搜索" @keyup.enter.native="onSubmit"></el-input>
         </el-form-item>
         <el-form-item style="float: right;">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
         </el-form-item>
      </el-form>


      <el-table :data="tableData" style="width: 100%" max-height="600" stripe="">
         <el-table-column prop="name" label="姓名">
         </el-table-column>
         <el-table-column prop="idcrad" label="编号">
         </el-table-column>
         <el-table-column prop="phone" label="手机号">
         </el-table-column>
         <el-table-column prop="book" label="书名">
         </el-table-column>
         <el-table-column prop="ondata" label="租借日期">
         </el-table-column>
         <el-table-column prop="backdata" label="租借时间">
         </el-table-column>
         <el-table-column prop="subackdata" label="归还日期">
         </el-table-column>
         <el-table-column prop="isB" label="状态"
            :filters="[{ text: '已归还', value: '已归还' }, { text: '未归还', value: '未归还' }]" :filter-method="filterTag">

            <template slot-scope="scope">
               <el-tag :type="scope.row.isB === '已归还' ? 'success' : 'primary'" disable-transitions>{{ scope.row.isB
}}</el-tag>
            </template>

         </el-table-column>


         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button type="primary" size="mini " icon="el-icon-edit" @click="editDate(scope.row)">修改</el-button>
               <el-button size="mini" icon="el-icon-delete" type="danger" @click="delDate(scope.row)">删除</el-button>



            </template>
         </el-table-column>
      </el-table>


      <!-- 对话框 -->
      <div class="diglog">
         <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="50%">

            <el-form ref="form" :model="form" :inline="true" label-position="left" :rules="rules">


               <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
               </el-form-item>


               <el-form-item label="编号" style="margin-right: 80px;" prop="idcrad">
                  <el-input v-model="form.idcrad" placeholder="请输入编号"></el-input>
               </el-form-item>



               <el-form-item label="书名" prop="book">
                  <el-input v-model="form.book" placeholder="书名"></el-input>
               </el-form-item>

               <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入11位手机号"></el-input>
               </el-form-item>

               <el-form-item label="租借日期">
                  <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.ondata"
                     style="width: 100%;">
                  </el-date-picker>
               </el-form-item>


               <el-form-item label="租借时间">

                  <el-input placeholder="请输入租借时间" v-model="form.backdata"></el-input>
               </el-form-item>

               <el-form-item label="归还日期" prop="subackdata">
                  <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.subackdata"
                     style="width: 100%;">
                  </el-date-picker>
               </el-form-item>
            </el-form>



            <div slot="footer" class="dialog-footer">
               <el-button @click="offdig">取 消</el-button>
               <el-button type="primary" @click="subdig">确 定</el-button>
            </div>

         </el-dialog>
      </div>
      <!-- 分页 -->
      <div>
         <el-pagination layout="prev, pager, next" :total="total" @current-change="handelPage">
         </el-pagination>

      </div>
   </div>
</template>

<script>

export default {
   name: 'User',
   data() {
      return {
         dialogFormVisible: false,
         form: {
            name: '',
            idcrad: '',
            ondata: '',
            backdata: '',
            book: '',
            phone: '',
            subackdata: '',
            isB: 0

         },
         rules: {
            name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            idcrad: [
               { required: true, message: '请输入编号', trigger: 'change' },
               { min: 6, max: 12, message: '请输入6位编号', trigger: 'change' }
            ],
            phone: [
               { required: true, message: '请输入地址', trigger: 'change' },
               { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'change' }

            ],
            sex: [
               { required: true, message: '请选择性别', trigger: 'change' },
            ],
            data: [
               { required: true, message: '请选择日期', trigger: 'change' },
               { min: 1, max: 255, message: '请输入租借时间', trigger: 'change' }
            ],
            data2: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            book: [
               { required: true, message: '请输入书名', trigger: 'blur' },
            ],
         },
         operateFormLabel: [
            {
               model: 'name',
               label: '姓名',
               type: 'input'
            },
            {
               model: 'age',
               label: '年龄',
               type: 'input'
            },
            {
               model: 'sex',
               label: '性别',
               type: 'select',
               opts: [
                  {
                     label: '男',
                     value: 1
                  },
                  {
                     label: '女',
                     value: 0
                  }
               ]
            },
            {
               model: 'birth',
               label: '出生日期',
               type: 'date'
            },
            {
               model: 'addr',
               label: '地址',
               type: 'input'
            }
         ],
         tableData: [],
         noData: [],
         modelType: 0,
         total: 0,
         pageDate: {
            page: 1,
            limit: 20
         },
         serData: {
            name: ''
         },
         isback: 0
      };

   },
   mounted() {
      this.getList()


   },

   methods: {
      //筛选
      filterTag(value, row) {
         // console.log(value,row.isB);
         return row.isB === value;
      },

      filterHandler(value, row, column) {
         const property = column['property'];
         return row[property] === value;
      },
      vaIsb() {
         if (this.form.subackdata) {
            this.form.isB = '已归还'
            this.$API.booklib.updNum({ name: this.form.book })
            console.log(this.form.isB);

         } else {
            this.form.isB = '未归还'
            console.log(this.form.isB);

         }
      },
      //获取列表
      getList() {
         this.$API.book.getlist({ params: { ...this.pageDate } }).then(({ data }) => {
            this.tableData = data.pageList
            this.total = data.count || 0

            console.log(data);
         })
      },
      //清空form表单函数
      clearform() {
         this.form = {
            name: '',
            idcrad: '',
            ondata: '',
            backdata: '',
            book: '',
            phone: '',
            subackdata: ''
         }
      },
      //对话框点击确定提交
      subdig() {
         //表单验证

         this.$refs.form.validate(async (valid) => {
            if (valid) {
               if (this.modelType === 0) {

                  this.vaIsb()

                  const { data } = await this.$API.book.add(this.form)
                  if (data.status === 0) {
                     //发送请求成功重新获取列表
                     this.getList()
                     this.dialogFormVisible = false
                     this.clearform()
                  } else {
                     alert(data.message)
                  }
                  //否则就修改
               } else {
                  this.vaIsb()
                  this.$API.book.upd(this.form).then(() => {
                     this.getList()
                     this.isback = 1
                     this.dialogFormVisible = false
                     this.clearform()
                  })
               }

            }

         })


      },
      //点击添加按钮
      addUs() {
         this.dialogFormVisible = true
         this.modelType = 0


      },
      //点击取消按钮
      offdig() {
         this.dialogFormVisible = false
         this.clearform()
      },
      delDate(row) {


         this.$confirm('是否确认该用户已归还书籍？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {

            this.$API.book.del({ id: row.id }).then(() => {
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               });
               this.getList()
            })
         }).catch(() => {
            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });
      },
      //点击修改按钮
      editDate(row) {

         console.log(row.innerHtml);
         this.modelType = 1
         this.dialogFormVisible = true
         //深拷贝
         this.form = JSON.parse(JSON.stringify(row))

      },
      //分页
      handelPage(val) {
         this.pageDate.page = val
         this.getList()
      },
      onSubmit() {
         // console.log(this.serData.name);
         if (this.serData.name) {
            this.$API.book.serlist({ params: { ...this.serData } }).then(({ data }) => {
               this.tableData = data.message
               return
            })

         } else this.getList()
      }
   },


}
</script>

<style lang="less" scoped>
.diglog {
   .el-dialog {
      .el-form {
         margin-left: 20px;

         .el-form-item {
            margin-right: 120px;

         }
      }
   }
}

.el-pagination {
   text-align: right;
}
</style>