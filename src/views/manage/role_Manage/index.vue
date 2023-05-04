<template>
    <div class="roleManage" style="height:550px">
        <el-card class="box-card" >
            
            <!-- 查询区域 -->
            <div class="search">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.roleKey" placeholder="角色关键字" suffix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 新增 -->
            <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%" height="450">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="角色名">
                </el-table-column>
                <el-table-column prop="roleKey" label="角色关键字">
                </el-table-column>
                
                <el-table-column label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 style="display:flex; justify-content:flex-end" -->
            <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next" style="text-align:center">
            </el-pagination>
            <!-- 模态框 -->
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%">
            
                <el-form ref="dialogForm" :model="dialogForm" label-width="100px" :rules="dialogRules">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="角色名" prop="name">
                                <el-input v-model="dialogForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="角色关键字" prop="roleKey">
                                <el-input v-model="dialogForm.roleKey"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="50">
                            <el-form-item label="权限">
                                <el-checkbox-group v-model="menuChecked">
                                    <el-checkbox v-for="(item,index) in menus" 
                                    :label="item.menuId" 
                                    :key="index" 
                                    name="checked" 
                                    class="favour_checkbox" 
                                    >{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit">确 定</el-button>
            </span>
            </el-dialog>
            
        </el-card>
    </div>
  </template>
  
<script>
import throttle from 'lodash/throttle'
    import {
        getAllRoleInfoList,
        addRowInfo,
        editRowInfo,
        delRowInfo,
        getMenuList,
        getMenuListByRoleId,
        getRoleInfoList,
        getRoleByRoleKey
    } from '@/api/roleApi.js'

    export default {
      data() {
        return {
            // 搜索表单
            searchForm: {
                roleKey: ''
            },
            // 表格数据
            tableData: [
                {
                    roleId: 0,
                    name: '',
                    roleKey: '',
                }
            ],
            pageBean: {
                currentPage: 1,
                pageSize: 10,
                totalData: 0,
                totalPage: 0
            },
            // 表格加载
            tableLoading: false,
            // 模态框
            dialogVisible: false,
            // 模态框标题
            dialogTitle: '',
            // 模态框的表单
            dialogForm: {
                roleId: 0,
                name: '',
                roleKey: '',
                menuChecked: []
            },
            //所有的权限信息
            menus:[
                {
                    menuId: 0,
                    name: '',
                    menuKey: ''
                }
            ],
            //模态框中选中的信息
            menuChecked:[],
            // 模态框表单验证
            dialogRules: {
                name: [{
                    required: true,
                    message: '请输入角色名',
                    trigger: ['blur']
                }, ],
                roleKey: [{
                    required: true,
                    message: '请输入角色关键字',
                    trigger: 'blur'
                }, ]
            }
        }
    },
    created() {
        this.getList()

    },
    methods: {
        //搜索
        search:throttle(function(){
            this.tableLoading = true
            if(this.searchForm.roleKey == ''){
                this.getList()
                return
            }
            this.pageBean.pageSize = 10
            this.pageBean.currentPage = 1
            this.searchForm.pageSize = this.pageBean.pageSize
            this.searchForm.currentPage = this.pageBean.currentPage
            getRoleByRoleKey(this.searchForm).then(res => {
                this.tableLoading = false
                console.log(res)
                this.pageBean = res.data.data
                this.tableData = res.data.data.rows
            })
        },500),
        // 获取当前点击的第几页
        // 分页组件传来点击的第几页pageNo
        getPagedata(val){
            this.pageBean.currentPage = val
            this.tableLoading = true
            // 调用接口
            if(this.searchForm.roleKey != ''){
                //当搜索框不为空
                search()
            }else{
                //当搜索框中为空，查全部
                getList()
            }
            
        },
        // 获取表格数据
        getList() {
            this.tableLoading = true
            // 调用接口获取
            getRoleInfoList(this.pageBean).then(res => {
                this.tableLoading = false
                console.log(res)
                this.pageBean = res.data.data
                this.tableData = res.data.data.rows
            })
        },
        // 新增按钮
        handleAdd() {
            // 清除脏数据
            this.dialogForm = {}
            this.menuChecked = []

            this.dialogTitle = '新增'
            this.dialogVisible = true
            // 调用接口获取权限信息
            getMenuList().then(res => {
                this.tableLoading = false
                console.log(res)
                this.menus = res.data.data
            })
        },
        //  编辑按钮
        handleEdit(index, row) {
            console.log(index)
            console.log(row)
            
            this.menuChecked = [],
            // 数据回显
            this.dialogForm = {
                ...row
            } // ...扩展运算符
            
            // 调用接口获取所有权限信息
            getMenuList().then(res => {
                this.tableLoading = false
                console.log(res)
                this.menus = res.data.data
            })
            // 调用接口获取当前角色权限信息
            getMenuListByRoleId(row.roleId).then(res => {
                this.tableLoading = false
                console.log(res)
                var menusRes = res.data.data
                var menuIdsRes = []
                for (let index = 0; index < menusRes.length; index++) {
                    menuIdsRes[index] = menusRes[index].menuId;
                    
                }
                this.menuChecked = menuIdsRes
            })
            this.dialogTitle = '编辑'
            this.dialogVisible = true
        },
        //  删除按钮
        handleDelete(index, row) {
            this.$confirm('此操作将删除角色名是'+  row.name +'，是否继续?', '警告', {
                type: 'warning'
            }).then(() => {
                delRowInfo(row.roleId).then(res => {
                    if (res.data.code < 200) {
                        // 更新列表
                        this.getList()
                        // 提示新增成功
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error('删除失败')
                        console.log(res)
                    }
                })
            })
        },
        // 数据提交
        dialogSubmit() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    if (this.dialogTitle == '新增') {
                        // this.$message.error(this.dialogForm)
                        // 调用新增的接口
                        this.dialogForm.menuChecked = this.menuChecked;
                        addRowInfo(this.dialogForm).then(res => {
                            console.log(res)
                            if (res.data.code < 200) {
                                // 关闭模态框
                                this.dialogVisible = false
                                // 更新列表
                                this.getList()
                                // 提示新增成功
                                this.$message.success('新增成功')
                            } else {
                                this.$message.error('新增失败')
                            }
                        })
                    } else if (this.dialogTitle == '编辑') {
                        this.dialogForm.menuChecked = this.menuChecked;
                        editRowInfo(this.dialogForm).then(res => {
                            if (res.data.code < 200) {
                                // 关闭模态框
                                this.dialogVisible = false
                                // 更新列表
                                this.getList()
                                // 提示新增成功
                                this.$message.success('修改成功')
                            } else {
                                this.$message.error('修改失败')
                            }
                        })
                    }
                }
            });
        }

    }
}
</script>

<style>

.box-card {
  /* min-height: 100%; */
  height: 600px;
}
</style>