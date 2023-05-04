<template>
    <div class="questionPage">
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogTableVisible" :title="dialogTitle" :before-close="beforeClose">
            <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="购买用户" prop="userName">
                            <el-input v-model="dialogForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input v-model="dialogForm.goodsName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <!-- <el-col :span="10">
                        <el-form-item label="商品Id" prop="goodsId">
                            <el-input v-model="dialogForm.goodsId"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="20">
                        <el-form-item label="订单编号" prop="transformNumber">
                            <el-input v-model="dialogForm.transformNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="支付时间" prop="payTime">
                            <el-input v-model="dialogForm.payTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否收到货" prop="isGet">
                            <el-input v-model="dialogForm.isGet"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-card class="box-card">
            <!-- 顶部的搜索栏 -->
            <div class="search">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchContent" placeholder="订单号" suffix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchBtn">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
            <!-- 主体表格 -->
            <el-table :data="tableData" style="width: 100%" height="450">
                <!-- <el-table-column prop="orderId" label="订单的ID" ></el-table-column>
                <el-table-column prop="userId" label="用户的ID" ></el-table-column>
                <el-table-column prop="goodsId" label="商品的ID" ></el-table-column> -->
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="userName" label="购买用户" ></el-table-column>
                <el-table-column prop="goodsName" label="商品名称" ></el-table-column>
                <el-table-column prop="transformNumber" label="快递单号" ></el-table-column>
                <el-table-column prop="payTime" label="支付时间" ></el-table-column>
                <el-table-column prop="isGet" label="是否到货" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next" style="text-align:center">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {getOrders,addOrder,alterOrder,deleteOrder,searchOrder} from '@/api/orders'
    export default {
        data() {
            return {
                goodsName:'',
                userName:'',
                pageBean: {
                    currentPage: 1,
                    pageSize: 10,
                    totalData: 0,
                    totalPage: 0
                },
                //查询的内容
                searchContent:'',
                //对话框的标题
                dialogTitle:'',
                //对话框的数据
                dialogForm:{
                    orderId :'',
                    goodsName:'',
                    userName:'',
                    transformNumber:'',
                    payTime :'',
                    isGet :false,
                },
                //对话框的校验规则
                dialogRules: {
                    goodsName:[{
                        required: true,
                        message: '请输入商品名',
                        trigger: 'blur'
                    }],
                    userName: [{
                        required: true,
                        message: '请输入购买用户',
                        trigger: 'blur'
                    }],
                    transformNumber: [{
                        required: true,
                        message: '请输入快递单号',
                        trigger: 'blur'
                    }, ],
                    payTime: [{
                        required: true,
                        message: '请输入支付时间',
                        trigger: 'blur'
                    }, ],
                    isGet: [{
                        required: true,
                        message: '请输入是否收货',
                        trigger: 'blur'
                    }, ]
                },
                //对话框的可见与否
                dialogTableVisible:false,
                // 表格数据
                tableData: [{
                    orderId:'',
                    userId :'',
                    goodsId:'',
                    payTime :'',
                    isGet :false,
                }]
            }
        },
        methods: {
            getPagedata(val){
                this.pageBean.currentPage = val
                this.tableLoading = true
                // 调用接口
                getOrders(this.pageBean).then(res => {
                    console.log('所有的信息'+res);
                    this.tableData = res.data.data.rows
                    this.pageBean = res.data.data
                    console.log(this.pageBean);
                    console.log(this.tableData);
                })
            },
            //获取所有的列表
            getList(){
                //调用接口
                getOrders(this.pageBean).then(res => {
                    console.log('所有的信息'+res);
                    this.tableData = res.data.data.rows
                    this.pageBean = res.data.data
                    console.log(this.tableData);
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].get == true){
                            this.tableData[i].isGet = '是'
                        }else{
                            this.tableData[i].isGet = '否'
                        }
                    }
                })
            },
            //新增按钮
            handleAdd(){
                this.dialogTitle='新增'
                this.dialogTableVisible = true
            },
            dialogCancel(){
                //清除之前写的数据
                this.dialogForm={},
                this.dialogTableVisible = false
            },
            //关闭对话框之前的回调函数
            beforeClose(){
                this.dialogTableVisible = false
                this.dialogForm = {}
            },
            //对话框的确定按钮
            dialogSubmit(){
                //校验规则
                this.$refs['dialogForm'].validate((val)=>{
                    if(val){
                        if(this.dialogTitle === '新增'){
                            //调用新增的接口
                            addOrder(this.dialogForm).then(res =>{
                                console.log('新增请求');
                                console.log(res);
                                //关闭对话框
                                this.dialogTableVisible = false
                                //更新题目数据
                                this.getList()
                                //新增成功
                                this.$message.success('新增成功！')
                                //清楚脏数据
                                this.dialogForm={}
                            })//调用编辑的接口
                        }else if(this.dialogTitle === '编辑'){
                            //调用修改题目接口
                            alterOrder().then(res=>{
                                console.log('编辑请求');
                                console.log(res);
                                if(res.data.code < 200){
                                    this.dialogTableVisible = false
                                    this.getList()
                                    this.$message.success('编辑成功！')
                                    this.dialogForm={}
                                }else {
                                    this.$message.error('编辑失败！')
                                }
                            })
                        }
                    }
                })
            },
            //查询按钮
            searchBtn:throttle(function(){
                if(this.searchContent.trim() != ''){
                    //调用查询接口
                    searchOrder(this.searchContent).then(res => {
                        console.log('开始调用查询接口');
                        if(res.data.code < 200){
                            //避免类型错误，不用this.tableData = res.data.data
                            this.tableData.push(res.data.data) 
                            console.log(res.data.data);
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
            },500),
            //编辑按钮
            handleEdit(index,row){
                console.log(index);
                console.log(row);
                //该行的数据回显出来
                this.dialogForm = {...row}
                //弹出对话框
                this.dialogTitle = '编辑'
                this.dialogTableVisible = true
            },
            //删除按钮
            handleDelete(index,row){
                this.$confirm('是否要删除该信息','警告',{
                    type:'warning'
                }).then(()=>{
                    this.$message.success('删除成功！')
                    console.log(index,row);
                    console.log('删除接口');
                    //调用删除接口
                    deleteOrder(row.orderId).then(res => {
                        console.log('删除接口返回信息');
                        console.log(res);
                        this.getList()
                    })
                }).catch(()=>{this.$message.success('已取消删除！')})
            }
        },
        created() {
            this.getList()
        },
    }
</script>

<style scoped>

</style>