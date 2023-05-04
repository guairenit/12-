<template>
  <div class="product">
  <div class="head">
    <el-form ref="searchForm" :model="search">
        <el-form-item>
            <el-input v-model="search.content" />
        </el-form-item>  
        <el-form-item>
            <el-button  type="primary" @click="search">查询</el-button>
        </el-form-item>  
    </el-form>
  </div>
  <el-table :data='tableData'>
     <el-table-column type="index" label="序号" width="120"></el-table-column>
     <el-table-column show-overflow-tooltip prop="name" label="名称"  width="200"></el-table-column>
     <el-table-column show-overflow-tooltip prop="price" label="价格"  width="100"></el-table-column>
     <el-table-column show-overflow-tooltip prop="type" label="类型"  width="300"></el-table-column>
     <el-table-column show-overflow-tooltip prop="isFree" label="是否免费"  width="100"></el-table-column>
  </el-table>
    
  <el-pagination         layout="prev, pager, next,jumper"
       @current-change="handleCurrentChange"
       :total="pageBean.totalData"
       :pageSize="pageBean.pageSize"
       :current-page.sync="pageBean.currentPage"
       @size-change="handleSizechange">

    </el-pagination>
  </div>
</template>

<script>
import {
   pagefind
 }from '@/api/find.js'
 import {searchBook} from '@/api/books'
export default {
  data(){
    return{
      tableData:[],
      pageBean: {
          currentPage: 1,
          pageSize: 10,
          totalData: 0,
          totalPage: 0
      },
        //查询的内容
        searchContent:'',
      // search:{
      //           content:""
      //       },
      //       second:0

    };
  },
  mounted(){
    this.getList()

  },
  methods:{
    // sendSMS(){
    //   this. second=3
    //   let interval=setInterval(() => {//注意 这个方法会一直干到死
    //     if(this.second>0){
    //       this.second --
    //     }else{
    //       clearInterval(interval)  //干到second=0为止
    //     }
    //   },1000)
    // },

        //     //通过用户名搜索
        //     search(){
        //     // this.pageBean.currentPage = 1
        //     this.tableLoading = true
        //     getUserByUsername(this.searchForm.username).then(res => {
        //         this.tableLoading = false
        //         console.log(res)
        //         this.pageBean = res.data.data
        //         this.tableData = res.data.data.rows
        //     })
        // },
        

// //搜索
// search(){
            
//           },
//           // 获取表格数据
//           getList() {
//               this.tableLoading = true
//               // 调用接口获取
//               pagefind(this.searchRoleKey).then(res => {
//                   this.tableLoading = false
//                   console.log(res)
//                   this.tableData = res.data.data
//               })
//           },
//搜索
search(){
                if(this.searchContent.trim() != ''){
                    //调用查询接口
                    searchBook(this.searchContent).then(res => {
                        console.log('开始调用查询接口');    
                        if(res.data.code < 200){
                            this.tableData = res.data.data[0].rows
                            console.log(res.data.data.rows);
                            console.log('调用查询接口成功');
                            this.$message.success('查询成功！')
                            console.log(this.tableData);
                        }else{
                            this.$message.error('没有你想要查询的结果！')
                        }
                    })
                }else {
                    this.$message.error('请输入正确的查询内容！')
                }
                
            },
    getList(){
      pagefind(this.pageBean).then(res => {
        console.log(res.data);
        this.pageBean = res.data.data
        this.tableData = res.data.data.rows
      })
    },
    
   handleSizechange(){},
   handleCurrentChange(val){
      console.log(val);
      this.pageBean.currentPage = val
      // 调用接口
      pagefind(this.pageBean).then(res => {
          this.tableLoading = false
          console.log(res)
          this.pageBean = res.data.data
          this.tableData = res.data.data.rows
      })
      // this.$bus.$emit("page",val)
}

  }

}
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item{
        float:left;
        margin-right: 10px;
        .el-input{
            width: 1110px;
        }
    }

}
.head{
    margin-top: 20px;
    width: 100%;
}
.product{
    width:1200px;
    margin:0 auto;
}
</style>