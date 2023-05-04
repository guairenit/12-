<template>
    <div>
      <div class = "buju">
  <body>
      
              <div class="w">
                  <bread_Crumb/>
              </div>
          <div class="table">
              <el-table
              :data="tableData"
              height="400"
              stripe
              style="width: 60%">
              <el-table-column
              prop="userId"
              label="商品信息"
              >
              </el-table-column>
              <el-table-column
              prop="goodsId"
              label="数量"
              >
              </el-table-column>
              <el-table-column
              prop="transformNumber"
              label="总金额"
              >
              </el-table-column>
              <el-table-column
              prop="payTime"
              label="下单时间"
              >
              </el-table-column>
              <el-table-column
              prop="isGet"
              label="订单状态"
              >
              </el-table-column>
          </el-table>
          </div>
          <el-pagination         
          layout="prev, pager, next,jumper" 
          @current-change="handleCurrentChange"
           :total="pageBean.totalData"
           :pageSize="pageBean.pageSize"
           :current-page.sync="pageBean.currentPage"
           style ="text-align: end;"
           >
          
        </el-pagination>
      
  </body>
  </div>
    </div>
  
  </template>
  
  <script>
  import { getOrder } from '@/api/shop';
  import { orderpagefind } from '@/api/shop';
import bread_Crumb from './bread_Crumb.vue';
  
      export default {
    data() {
        return {
            tableData: [],//订单信息
            pageBean: {
                currentPage: 1,
                pageSize: 10,
                totalData: 0,
                totalPage: 0
            },//分页信息
        };
    },
    methods: {
        //获取所有的订单
        getOrders() {
            //调用接口
            getOrder(this.pageBean).then(res => {
                console.log("订单详情" + res);
                this.tableData = res.data.data;
                console.log(this.tableData);
            });
        },
        //获取分页信息
        handleCurrentChange(val) {
            console.log(val);
            this.pageBean.currentPage = val;
            // 调用分页接口
            orderpagefind(this.pageBean).then(res => {
                this.tableLoading = false;
                console.log(res);
                this.pageBean = res.data.data;
                this.tableData = res.data.data.rows;
            });
            // this.$bus.$emit("page",val)
        }
    },
    created() {
        this.getOrders(),
        this.handleCurrentChange();//刷新获取分页信息和订单信息
    },
    components: { bread_Crumb }
}
  </script>
  
  <style lang="css" scoped>

  .w{
      width: 1080px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
  }
  .link{
      color: #999;
      cursor: pointer;
      text-decoration: none;
  }
  .table {
          display: flex; 
          justify-content: center; 
          align-items: center;
          padding: 10px;
          margin-bottom: 30px;
      }
  .buju{
      height: 700px;
  }
  </style>
