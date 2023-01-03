<template>
   <div>

      <div>
         <el-form :inline="true" :model="pageDate" class="demo-form-inline">
            <el-form-item>
               <el-button icon="el-icon-plus" type="primary" size="medium " @click="addBook">添加</el-button>
            </el-form-item>

            <el-form-item style="float: right;">
               <el-input clearable v-model="seardata.name" placeholder="请输入名字搜索"></el-input>
            </el-form-item>
            <el-form-item style="float: right;">
               <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
         </el-form>


      </div>

      <div>
         <el-table max-height="600" :data="bookList" stripe style="width: 100%" border>
            <el-table-column prop="idcard" label="编号" width="150">
            </el-table-column>
            <el-table-column prop="name" label="书籍  " width="400">
               <template slot-scope="scope">
                  <p style="display: block;float: left;">{{ scope.row.name }}</p>
                  <img src="./logo.png" alt="" style="width: 80px;height: 80px;float: right;">

               </template>
            </el-table-column>
            <el-table-column prop="num" label="库存">
            </el-table-column>
            <el-table-column label="操作">
               <template slot-scope="scope">
                  <el-button type="primary" size="mini " icon="el-icon-edit" @click="editBook(scope.row)">修改</el-button>
                  <el-button size="mini" icon="el-icon-delete" type="danger" @click="delBook(scope.row)">删除</el-button>

                  <el-button size="mini" icon="el-icon-circle-check" type="info"
                     :disabled="scope.row.isT === 0 ? false : true" @click="jieshu(scope.row)">我要借书</el-button>



               </template>
            </el-table-column>
         </el-table>
      </div>


      <!-- 对话框 -->
      <div>
         <el-dialog :title="moty === 2 ? '修改' : '添加'" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :inline="true" label-position="left"
               style="display: flex;flex-direction: column;" :rules="rules">


               <el-form-item label="编号">
                  <el-input v-model="form.idcard" placeholder="请输入编号"></el-input>
               </el-form-item>


               <el-form-item label="书名" style="margin-right: 80px;" prop="name">
                  <el-input v-model="form.name" placeholder="请输入书名"></el-input>
               </el-form-item>




               <el-form-item label="库存" prop="num">
                  <el-input v-model="form.num" placeholder="请输入库存"></el-input>
               </el-form-item>




            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="suAdd">确 定</el-button>
            </div>
         </el-dialog>
      </div>

      <!-- 我要借书 -->
      <div class="diglog">
         <el-dialog title="新增用户" :visible.sync="dialogFormVisibleBook" >

            <el-form ref="form1" :model="form1" :inline="true" label-position="left" :rules="rules1">


               <el-form-item label="姓名" prop="name">
                  <el-input v-model="form1.name" placeholder="请输入姓名"></el-input>
               </el-form-item>


               <el-form-item label="编号" style="margin-right: 80px;" prop="idcrad">
                  <el-input v-model="form1.idcrad" placeholder="请输入编号"></el-input>
               </el-form-item>



               <el-form-item label="书名" prop="book">
                  <el-input v-model="form1.book" placeholder="书名"></el-input>
               </el-form-item>

               <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form1.phone" placeholder="请输入11位手机号"></el-input>
               </el-form-item>

               <el-form-item label="租借日期">
                  <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form1.ondata"
                     style="width: 100%;">
                  </el-date-picker>
               </el-form-item>


               <el-form-item label="租借时间">

                  <el-input placeholder="请输入租借时间" v-model="form1.backdata"></el-input>
               </el-form-item>

               <el-form-item label="归还日期" prop="subackdata">
                  <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form1.subackdata"
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

   </div>
</template>

<script>




export default {
   name: 'mall',
   data() {
      return {
         bookList: [],
         pageDate: {
            page: 1,
            limit: 20
         },
         seardata: {
            name: ''
         },
         dialogFormVisible: false,
         dialogFormVisibleBook: false,
         form: {
            idcard: '100000',
            name: '',
            num: '',
            img: '',
            isT: 0

         },
         moty: 0,

         rules: {
            name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            idcrad: [
               { required: true, message: '请输入编号', trigger: 'blur' },

            ],


            num: [
               { required: true, message: '请输入书名', trigger: 'blur' },
            ],
         },
         rules1: {
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
         form1: {
            name: '',
            idcrad: '',
            ondata: '',
            backdata: '',
            book: '',
            phone: '',
            subackdata: '',
            isB: 0

         },
      };
   },

   methods: {
      //点击我要借书
      jieshu(val) {
         const woyaojieshu = JSON.parse(JSON.stringify(val))
         console.log(woyaojieshu);
         this.form1.idcrad  = woyaojieshu.idcard
         this.form1.book  = woyaojieshu.name
         this.dialogFormVisibleBook = true
      },
      //点击修改
      editBook(val) {
         console.log(val);
         this.moty = 2
         this.form = JSON.parse(JSON.stringify(val))
         this.dialogFormVisible = true

      },
      //点击删除
      delBook(val) {
         this.$confirm('是否删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
            console.log(11);
            this.$API.booklib.del({ id: val.id }).then(() => {
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               });
               this.getBookList()
            })
         }).catch(() => {


            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });
      },
      //点击确定
      suAdd() {

         this.$refs.form.validate((valid) => {
            if (valid) {
               if (this.moty === 1) {



                  this.$API.booklib.add(this.form).then(({ data }) => {
                     this.getBookList()
                     this.dialogFormVisible = false
                     this.reseleFrom()
                  })
                  //否则就修改
               } else {

                  this.$API.booklib.upd(this.form).then(() => {
                     this.getBookList()

                     this.dialogFormVisible = false
                     this.reseleFrom()
                  })
               }

            }

         })



      },
      //点击添加
      addBook() {
         this.moty = 1
         this.reseleFrom()
         this.dialogFormVisible = true
      },
      //点击搜索
      search(val) {
         this.$API.booklib.serbook({ params: this.seardata }).then(({ data }) => {
            console.log(data.message);
            this.bookList = data.message
         })
         // this.getBookList()
      },
      getBookList() {
         this.$API.booklib.getbook({ params: { ...this.pageDate } }).then(({ data }) => {
            // this.bookList = 
            // console.log(data);
            this.bookList = data.pageList
         })

      },
      reseleFrom() {
         this.form = {
            idcard: '100000',
            name: '',
            num: '',
            img: ''
         }
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
      subdig(val) {
         //表单验证
         console.log(val);
         this.$refs.form1.validate(async (valid) => {
            if (valid) {
               if (this.modelType === 0) {

                  this.vaIsb()

                  const { data } = await this.$API.book.add(this.form)
                  if (data.status === 0) {
                     //发送请求成功重新获取列表
                     
                     this.dialogFormVisibleBook = false
                     this.reseleFrom()
                  } else {
                     alert(data.message)
                  }
                  //否则就修改
               } else {
                  this.vaIsb()
                  this.$API.book.upd(this.form).then(() => {
                     

                     this.dialogFormVisibleBook = false
                     this.reseleFrom()
                  })
               }

            }

         })


      },
      //点击取消按钮
      offdig() {
         this.dialogFormVisibleBook = false

      },

   },

   mounted() {
      this.getBookList()
   },

}
</script>

<style scoped>

</style>