<template>
    <div style="text-align:center">
        <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next">
        </el-pagination>
    </div>
    
</template>

<script>
    export default {
        props:{
            pageBean:{
                currentPage:{
                    type:Number,
                },
                pageSize:{
                    type:Number,
                },
                totalData:{
                    type:Number,
                },
                totalPage:{
                    type:Number,
                },
            }
        },
        methods: {
            getPagedata(val){
                this.pageBean.currentPage = val
                this.tableLoading = true
                // 调用接口
                getBooks(this.pageBean).then(res => {
                    console.log('所有的信息'+res);
                    this.tableData = res.data.data.rows
                    this.pageBean = res.data.data
                    console.log(this.pageBean);
                    console.log(this.tableData);
                })
            },
        },
    }
</script>

<style lang="less" scoped>

</style>