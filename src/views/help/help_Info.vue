<template>
    <div class="contain">
        <el-row style="width:980px">
            <el-col :span="24">
                <h2>帮助中心</h2>
                <h4 class="helpName">{{helpName}} </h4>
            </el-col>
            <div class="helpInfos">
                
                <el-col :span="24" v-for="(o, index) in helpInfos" :key="index" class="helpInfo" >
                    <div @click="to(o)">
                        <el-card >
                        <el-descriptions :title="o.question">
                            <el-descriptions-item label="解答">{{o.answer}}</el-descriptions-item>
                        </el-descriptions>
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
import {getInfoList} from '@/api/help'
export default {
  data() {
    return {
        helpId: 0,
        helpName:'',
        helpInfos:[
            {
            },
        ],
        pageBean: {
            helpId: 0,
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
        this.pageBean.helpId = this.helpId
        getInfoList(this.pageBean).then(res => {
            console.log(res)
            this.pageBean = res.data.data
            this.helpInfos = res.data.data.rows
        })
    },
    getPagedata(val){
        this.pageBean.currentPage = val
        // 调用接口
        this.getList()
    },

  },
  created(){
    this.helpId = JSON.parse(localStorage.getItem("helpId")) 
    this.helpName = JSON.parse(localStorage.getItem("helpName"))
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
.helpInfos{
    /* padding-bottom: 250px; */
    height: 400px;
}
.helpInfo{
    padding: 10px;
}
.helpName{
    padding: 20px;
    margin: 14px;
}
</style>