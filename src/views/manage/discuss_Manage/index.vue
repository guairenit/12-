<template>
    <div class="questionPage">
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogTableVisible" :title="dialogTitle" :before-close="beforeClose">
            <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
                <el-row :gutter="10">
                    <!-- <el-col :span="10">
                        <el-form-item label="讨论的ID" prop="discussionId">
                            <el-input v-model="dialogForm.discussionId"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="20">
                        <el-form-item label="讨论的题目" prop="title">
                            <el-input v-model="dialogForm.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="发起讨论的时间" prop="createTime">
                            <el-input v-model="dialogForm.createTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="点击量" prop="click">
                            <el-input v-model="dialogForm.click"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="点赞数" prop="likes">
                            <el-input v-model="dialogForm.likes"></el-input>
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
                        <el-input v-model="searchContent" placeholder="讨论的题目" suffix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchBtn">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
            <!-- 主体表格 -->
            <el-table :data="tableData" style="width: 100%" height="450">
                <!-- <el-table-column prop="discussionId" label="讨论的ID" ></el-table-column> -->
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="title" label="讨论的题目" ></el-table-column>
                <el-table-column prop="createTime" label="发起讨论的时间" ></el-table-column>
                <el-table-column prop="click" label="点击量" ></el-table-column>
                <el-table-column prop="likes" label="点赞数" ></el-table-column>
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
import {getDiscussions,addDiscuss,alterDiscuss,deleteDiscuss,searchDiscuss} from '@/api/discussions'
    export default {
        data() {
            return {
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
                    discussionId :'',
                    title :'',
                    createTime :'',
                    click :'',
                    likes :'',
                },
                //对话框的校验规则
                dialogRules: {
                    discussionId: [{
                        required: true,
                        message: '请输入题目',
                        trigger: 'blur'
                    }, ],
                    title: [{
                        required: true,
                        message: '请输入题目',
                        trigger: 'blur'
                    }, ],
                    createTime: [{
                        required: true,
                        message: '请输入创建时间',
                        trigger: 'blur'
                    }, ],
                    click: [{
                        required: true,
                        message: '请输入点击量',
                        trigger: 'blur'
                    }, ],
                    likes: [{
                        required: true,
                        message: '请输入点赞数',
                        trigger: 'blur'
                    }, ]
                },
                //对话框的可见与否
                dialogTableVisible:false,
                // 表格数据
                tableData: [{
                    discussionId:'',
                    title :'',
                    createTime:'',
                    click :'',
                    likes :'',
                }]
            }
        },
        methods: {
            getPagedata(val){
                this.pageBean.currentPage = val
                this.tableLoading = true
                // 调用接口
                getDiscussions(this.pageBean).then(res => {
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
                getDiscussions(this.pageBean).then(res => {
                    console.log('所有讨论接口'+res);
                    this.tableData = res.data.data.rows
                    console.log(this.tableData);
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
                            addDiscuss(this.dialogForm).then(res =>{
                                console.log('新增请求');
                                console.log(res);
                                if(res.data.code < 200){
                                    //关闭对话框
                                    this.dialogTableVisible = false
                                    //更新题目数据
                                    this.getList()
                                    //新增成功
                                    this.$message.success('新增成功！')
                                    //清楚脏数据
                                    this.dialogForm={}
                                }else {
                                    //新增失败
                                    this.$message.error('新增失败！')
                                }
                            })//调用编辑的接口
                        }else if(this.dialogTitle === '编辑'){
                            //调用修改题目接口
                            alterDiscuss().then(res=>{
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
                    searchDiscuss(this.searchContent,this.pageBean).then(res => {
                        console.log('开始调用查询接口');
                        if(res.data.code < 200){
                            this.tableData = res.data.data.rows
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
                    deleteDiscuss(row.discussionId).then(res => {
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