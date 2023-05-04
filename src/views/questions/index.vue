<template>
    <div class="content">
        <h1>题库</h1>
        <!-- 标签选项 -->
        <el-row class="titles">
            <el-col :span="4">
                <div class="title grid-content bg-purple" @click="getQuestionsList">
                    <span class="iconfont">&#xe606</span>
                    <span class="name">全部题目</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title grid-content bg-purple-light" @click="getType('算法')">
                    <span class="iconfont">&#xe63a</span>
                    <span class="name" :data-type="type1">算法</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title grid-content bg-purple" @click="getType('数据库')">
                    <span class="iconfont">&#xe940</span>
                    <span class="name" :data-type="type2">数据库</span>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title grid-content bg-purple-light" @click="getType('shell')">
                    <span class="iconfont">&#xe61a</span>
                    <span class="name" :data-type="type3">Shell</span>
                </div>
            </el-col>
        </el-row>
        <!-- 题目列表 -->
        <div class="table">
            <el-table
            :data="tableData"
            stripe
            border
            @row-click="clickRow"
            style="width: 80%">
            <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center">
            </el-table-column>
            <el-table-column
            prop="title"
            label="题目"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="level"
            label="难度"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="type"
            label="种类"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="rate"
            label="通过率"
            align="center"
            >
            </el-table-column>
        </el-table>
        </div>
        <!-- 分页器 -->
        <div class="pagination">
            <!-- 分页 -->
            <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next" style="display:flex; justify-content:flex-end">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import { getQuestions,typeGet } from '@/api/questions';

    export default {
        data() {
            return {
                type1:'算法',
                type2:'数据库',
                type3:'Shell',
                type:'',
                tableData: [],
                pageBean: {
                    currentPage: 1,
                    pageSize: 10,
                    totalData: 0,
                    totalPage: 0
                },
                quesType:''
            }
        },
        methods: {
            clickRow(row, column, event) {
                console.log(row);
                console.log(row.title);
                //获取到点击的行信息，并且存入浏览器中方便后续调用
                localStorage.setItem('questionId', JSON.stringify(row.questionId))
                sessionStorage.setItem('questionId', JSON.stringify(row.questionId))
                this.$router.push('/question')
            },// 获取当前点击的第几页
            // 分页组件传来点击的第几页pageNo
            getPagedata(val){
                this.pageBean.currentPage = val
                this.getQuestionsList()
            },
            //获取所有的题库
            getQuestionsList(){
                //调用接口
                getQuestions(this.pageBean).then(res => {
                    console.log('所有题目接口'+res);
                    this.pageBean = res.data.data
                    this.tableData = res.data.data.rows
                    console.log(this.tableData);
                        for(var i = 0; i<this.tableData.length;i++){
                            var a = this.tableData[i].type[0]
                            for(var j = 1; j<this.tableData[i].type.length;j++){
                                a = a + " , " + this.tableData[i].type[j];
                            }
                            console.log(a);
                            this.tableData[i].type = a
                        }
                })
            },
            /* 查询不同类别的题目 */
            getType(event){
                /* 调用接口 */
                this.pageBean.type = event
                typeGet(this.pageBean).then(res => {
                    console.log('调用type接口成功'+res);
                    this.pageBean = res.data.data
                    this.tableData = res.data.data.rows
                        for(var i = 0; i<this.tableData.length;i++){
                            var a = this.tableData[i].type[0]
                            for(var j = 1; j<this.tableData[i].type.length;j++){
                                a = a + " , " + this.tableData[i].type[j];
                            }
                            console.log(a);
                            this.tableData[i].type = a
                        }
                })
            }
        },
        created() {
            this.getQuestionsList()
        },
    }
</script>

<style lang="less" scoped>
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 25px;
        font-style:normal;
        padding-right: 10px;
    }
    .content{
        width: 1000px;
        height: auto;
    }
    .titles {
        padding: 20px 20px 40px 20px;
        display:flex;
        justify-content:space-between;
        padding-left: 100px;
    }
    .grid-content {
        border-radius: 30px;
        min-height: 36px;
    }
    .title {
        display: flex; 
        justify-content: center; 
        align-items: center;
        cursor: pointer;
        box-shadow: 4px 4px 15px rgb(186, 180, 180);
    }
    .title:hover
    .name {
        padding-left: 5px;
    }
    .table {
        display: flex; 
        justify-content: center; 
        align-items: center;
        padding: 10px;
        padding-left: 150px;
        margin-bottom: 30px;
    }
    .pagination {
        float: right;
    }
</style>