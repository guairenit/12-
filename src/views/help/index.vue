<template>
    <div class="contain">
            
        <el-row>
            <el-col :span="24">
                <h2>帮助中心</h2>
            </el-col>
            <div class="helps">
                
                <el-col :span="24" v-for="(o, index) in helps" :key="index" class="help" >
                    <div @click="to(o)">
                        <el-card :body-style="{ padding: '0px'}" >
                        <div style="padding-left: 100px;">
                            <div>{{o.helpName}}</div>
                        </div>
                        </el-card>
                    </div>
                </el-col>
            </div>
            <el-col :span="24">
                <!-- 分页 style="display:flex; justify-content:flex-end"-->
                <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
                @current-change="getPagedata" background layout="prev, pager, next" style="text-align:center;padding: 20px;"></el-pagination>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import {getHelpList} from '@/api/help'
export default {
  data() {
    return {
      helps:[
            {
                "helpId": 5,
                "helpName": "操作流程"
            }
        ],
        pageBean: {
            currentPage: 1,
            pageSize: 12,
            totalData: 0,
            totalPage: 0
        },
    };
  },
  methods: {
    getList(){
        // 调用接口
        getHelpList(this.pageBean).then(res => {
            console.log(res)
            this.pageBean = res.data.data
            this.helps = res.data.data.rows
        })
    },
    to(item){
        localStorage.setItem("helpId",JSON.stringify(item.helpId))
        localStorage.setItem("helpName",JSON.stringify(item.helpName))
        this.$router.push('/helpInfos')
    },
    getPagedata(val){
        this.pageBean.currentPage = val
        // 调用接口
        this.getList()
    },

  },
  created(){
    this.getList();
  }
}
</script>

<style>
.contain{
    width: 980px;
    display: flex;
    justify-self:center;
}
.helps{
    /* padding-bottom: 250px; */
    height: 350px;
}
.help{
    width: 480px;
    padding: 10px;
}
.help .el-card{
    height: 100px;
    background-color:#55aaff;
    color: aliceblue;
    font-size: large;
    line-height: 100px;
}
</style>