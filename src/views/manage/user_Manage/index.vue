<template>
    <div class="userManage">
        
        <el-card class="box-card">
            <!-- 查询区域 -->
            <div class="search">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.username" placeholder="用户名" suffix-icon="el-icon-search"></el-input>
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
                <!-- <el-table-column prop="date" label="序号" width="120"></el-table-column> -->
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="username" label="用户名" width="180"></el-table-column>
                <el-table-column prop="mail" label="邮箱" width="280"></el-table-column>
                <el-table-column prop="role" label="角色" width="180"></el-table-column>
                <el-table-column  label="头像" :show-overflow-tooltip = true  width="200">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAvatar(scope.$index, scope.row)">查看头像</el-button>
                        <el-button type="text" @click="uploadAvatar(scope.$index, scope.row)">上传头像</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--查看头像-->
            <el-dialog
            title="查看头像"
            :visible.sync="avatarVisible"
            width="20%"
            center>
            <!-- <span>{{avatarUrl}}</span> -->
            <div class="block">
                <el-image :src="avatarUrl" fit="cover" 
                style="width: 250px; height: 250px"></el-image>
            </div>
            </el-dialog>
            <!--上传头像-->
            <el-dialog
            title="上传头像"
            :visible.sync="uploadAvatarVisible"
            width="30%"
            center
            :before-close="handleClose"
            >
            <div class="newtxt-txt" style="display:flex; justify-content:space-around">
                <el-button size="mini" class="chooseFile" @click="chooseFile" v-if="fileName==''">选择文件</el-button>
                <input style="display: none" type="file"  name="file" id="unloadFile" @change="getFile($event)">
                <span v-if="fileName!=''">{{fileName}}</span>
                <el-button class="uploadFile" type="primary" size="mini" @click="uploadFile">上传</el-button>
            </div>
            <span style="color:#909399; margin: 50px;" class="tips">*仅支持bmp、jpg、png、svg格式</span>
            </el-dialog>
            <!-- 分页 style="display:flex; justify-content:flex-end"-->
            <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next" style="text-align:center">
            </el-pagination>
            <!-- 模态框 -->
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
            
              <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogRules">
                    <el-row :gutter="10">
                        <el-col :span="20">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="dialogForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="邮箱" prop="mail">
                                <el-input v-model="dialogForm.mail"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角色" prop="role">
                                <!-- placeholder 提示信息 -->
                                <el-select v-model="dialogForm.role" v-if="dialogTitle=='新增'" disabled placeholder="默认普通用户">
                                    <el-option v-for="(item,index) in roles" 
                                    :key="index" 
                                    :label="item.name" 
                                    :value="item.roleKey" ></el-option>
                                </el-select>
                                <el-select v-model="dialogForm.role" v-else placeholder="默认普通用户">
                                    <el-option v-for="(item,index) in roles" 
                                    :key="index" 
                                    :label="item.name" 
                                    :value="item.roleKey" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-tooltip v-if="dialogTitle == '编辑'" class="item" effect="dark" content="重置后密码为123456" placement="top">
                    <el-button type="danger" @click="resetPassword">重置密码</el-button>
                </el-tooltip>
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
    getInfoList,
    addRowInfo,
    editRowInfo,
    delRowInfo,
    resetPassword,
    getUserByUsername,
    uploadIcon
} from '@/api/userApi.js';
import {
    getAllRoleInfoList
} from '@/api/roleApi.js';

export default {
    data() {
        var checkEmail = (rule, value, cb) => {
            //验证邮箱的正则表达式
            const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (regEmail.test(value)) {
            //合法的邮箱
            return cb();
            }
            cb(new Error("请输入合法的邮箱"));
        };
        return {
            // 搜索表单
            searchForm: {
                username:''
            },
            // 表格数据
            tableData: [],
            // 表格加载
            tableLoading: false,
            //头像模态框
            avatarVisible: false,
            uploadAvatarVisible: false,
            //当前显示头像的链接
            avatarUrl:'',
            fileData: new FormData(),
            fileName: '',
            // 模态框
            dialogVisible: false,
            // 模态框标题
            dialogTitle: '',
            // 模态框的表单
            dialogForm: {
                userId: 0,
                username: '',
                mail: '',
                role: '',
                icon: ''
            },
            pageBean: {
                currentPage: 1,
                pageSize: 10,
                totalData: 0,
                totalPage: 0
            },
            // 模态框表单验证
            dialogRules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                mail: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: ['blur']
                },
                { 
                    validator: checkEmail,
                    min:9, max: 18, 
                    message: '邮箱格式错误',
                    trigger: 'blur' 
                } ]
                
            },
            //所有角色信息
            roles:[
                {
                    roleId: 0,
                    name: '',
                    roleKey: ''
                }
            ]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        //通过用户名搜索
        search:throttle(function(){
            //若搜索框为空，查全部
            if(this.searchForm.username == ''){
                this.getList()
                return
            }
            this.tableLoading = true
            //点击搜索，重置页大小的当前页数
            this.pageBean.pageSize = 10
            this.pageBean.currentPage = 1
            this.searchForm.pageSize = this.pageBean.pageSize
            this.searchForm.currentPage = this.pageBean.currentPage
            getUserByUsername(this.searchForm).then(res => {
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
                // console.log("aaaaaaaaaaaa" + this.searchForm.username)
            if(this.searchForm.username != ''){
                //当搜索框不为空
                this.search()
            }else{
                //当搜索框中为空，查全部
                this.getList()
            }
        },
        // 获取表格数据
        getList() {
            this.tableLoading = true
            // 调用接口
            getInfoList(this.pageBean).then(res => {
                this.tableLoading = false
                console.log(res)
                this.pageBean = res.data.data
                this.tableData = res.data.data.rows
            })
        },
        //获取所有角色
        getRoles(){
            getAllRoleInfoList().then(res =>{
                if (res.data.code < 200) {
                    // 更新角色信息
                    console.log(res.data.data)
                    this.roles = res.data.data
                } else {
                    console.log(res)
                }
            })
        },
        //重置用户密码
        resetPassword(){
            this.$confirm('此操作将重置用户名是'+  this.dialogForm.username +'的密码，是否继续?', '警告', {
                type: 'warning'
            }).then(() => {
                resetPassword(this.dialogForm.userId).then(res => {
                    if (res.data.code < 200) {
                        
                        this.dialogVisible = false
                        // 提示重置成功
                        this.$message.success(res.data.msg)
                    } else {
                        this.$message.error(res.data.msg)
                        console.log(res)
                    }
                })
            })
        },
        // 新增按钮
        handleAdd() {
            // 清除脏数据
            this.dialogForm = {}
            this.dialogForm.role = 'user';
            this.dialogTitle = '新增'
            this.dialogVisible = true
            this.getRoles()
        },
        //查看头像
        showAvatar(index, row){
            console.log("查看头像");
            this.avatarUrl = row.icon;
            this.avatarVisible = true;
        },
        uploadAvatar(index, row){
            this.uploadAvatarVisible = true;
            this.fileData.append("userId",row.userId)
            // console.log(row);
        },
        chooseFile(){
            let btn = document.getElementById('unloadFile')
            btn.click()
        },
        getFile(event) {
            this.fileData.append("file", event.target.files[0]);
            this.fileName = event.target.files[0].name;
            // console.log(event.target.files[0]);
            // console.log(event.target.files[0].name);
            console.log(this.fileData.get("userId"));
        },
        uploadFile(){
            uploadIcon(this.fileData).then(res =>{
                console.log(res)
                if (res.data.code < 200) {
                    this.fileName = '';
                    // this.fileData = new FormData();
                    this.fileData.delete("userId");
                    this.fileData.delete("file");
                    // formData
                    // 更新列表
                    this.getList();
                    // 关闭模态框
                    this.uploadAvatarVisible = false;
                    // 提示新增成功
                    this.$message.success(res.data.msg)
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        //关闭拟态框清空数据
        handleClose(){
                this.fileName = '',
                this.uploadAvatarVisible = false
            },
        //  编辑按钮
        handleEdit(index, row) {
            console.log(index)
            console.log(row)
            // 数据回显
            this.dialogForm = {
                ...row
            } // ...扩展运算符
            this.dialogTitle = '编辑'
            this.dialogVisible = true
            this.getRoles()
        },
        //  删除按钮
        handleDelete(index, row) {
            this.$confirm('此操作将删除用户名是'+  row.username +'，是否继续?', '警告', {
                type: 'warning'
            }).then(() => {
                delRowInfo(row.userId).then(res => {
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