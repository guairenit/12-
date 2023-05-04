<template>
    <div class="questionPage">
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogTableVisible" :title="dialogTitle" :before-close="beforeClose">
            <el-form :model="dialogForm" ref="dialogForm" :rules="dialogRules">
                <el-row :gutter="10">
                    <!-- <el-col :span="10">
                        <el-form-item label="书籍ID" prop="bookId">
                            <el-input v-model="dialogForm.bookId"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="20">
                        <el-form-item label="书籍的名字" prop="name">
                            <el-input v-model="dialogForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="价格" prop="goodsIpriced">
                            <el-input v-model="dialogForm.price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否免费" prop="isFree">
                            <el-input v-model="dialogForm.isFree"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="书籍的类型" prop="type">
                            <el-input v-model="dialogForm.type"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="书籍的封面" prop="cover">
                            <el-input v-model="dialogForm.cover"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <!--查看头像-->
        <el-dialog
            title="查看封面"
            :visible.sync="avatarVisible"
            width="20%"
            center>
            <!-- <span>{{avatarUrl}}</span> -->
            <div class="block">
                <el-image :src="avatarUrl" fit="cover" 
                style="width: 250px; height: 250px"></el-image>
            </div>
        </el-dialog>
        <!--上传封面-->
        <el-dialog
            title="上传封面"
            :visible.sync="uploadAvatarVisible"
            width="30%"
            center
            :before-close="handleClose"
            >
            <div style="display:flex; justify-content:space-around; margin-bottom: 20px;">
                <el-button size="mini" class="chooseFile" @click="chooseFile" v-if="fileName==''">选择文件</el-button>
                <input style="display: none" type="file"  name="file" id="unloadFile" @change="getFile($event)">
                <span v-if="fileName!=''">{{fileName}}</span>
                <el-button class="uploadFile" type="primary" size="mini" @click="uploadFile">上传</el-button>
            </div>
            <span style="color:#909399; margin: 50px;" class="tips">*仅支持bmp、jpg、png、svg格式</span>
        </el-dialog>
        <el-card class="box-card">
            <!-- 顶部的搜索栏 -->
            <div class="search">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchContent" placeholder="书籍的名字" suffix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchBtn">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
            <!-- 主体表格 -->
            <el-table :data="tableData" style="width: 100%" height="450">
                <!-- <el-table-column prop="bookId" label="书籍的ID" ></el-table-column> -->
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="name" label="书籍名字" ></el-table-column>
                <el-table-column prop="price" label="书籍价格" ></el-table-column>
                <el-table-column prop="isFree" label="是否免费" ></el-table-column>
                <el-table-column prop="type" label="书籍类型" ></el-table-column>
                <el-table-column  label="书籍封面" :show-overflow-tooltip = true  width="200">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAvatar(scope.$index, scope.row)">查看封面</el-button>
                        <el-button type="text" @click="uploadAvatar(scope.$index, scope.row)">上传封面</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  <myPagination :pageBean.currentPage="pageBean.currentPage" :pageBean.pageSize="pageBean.pageSize"
            :pageBean.totalData="pageBean.totalData" :pageBean.totalPage="pageBean.totalPage"/> -->
            <el-pagination :current-page="pageBean.currentPage" :pageSize="pageBean.pageSize" :total="pageBean.totalData"
            @current-change="getPagedata" background layout="prev, pager, next" style="text-align:center">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import throttle from 'lodash/throttle'
import my_Pagination from '@/components/my_Pagination'
import {getBooks,addBook,alterBook,deleteBook,searchBook,uploadIcon} from '@/api/books'
    export default {
        components:{
            my_Pagination
        },
        data() {
            return {
                fileData: new FormData,
                fileName: '',
                avatarUrl:'',
                //封面模态框
                avatarVisible: false,
                uploadAvatarVisible: false,
                tableLoading:false,
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
                    // bookId :'',
                    name :'',
                    price :'',
                    isFree:'',
                    type :[],
                    cover :'',
                    data: {
                        description: "样市易进院九连一义入离展话委。果省段格越音更易问员口为主或机别。得导反研具比解反导消象题太。调历置县打构育过斗各意立四里易六。划后三际以较验叫深队要层大其表义。作专设目术般力指先联集及治团。",
                        content: "dolor quis culpa",
                        catalog: "aliquip eu cupidatat ut eiusmod"
                    }
                },
                //对话框的校验规则
                dialogRules: {
                    bookId: [{
                        required: true,
                        message: '请输入书籍ID',
                        trigger: 'blur'
                    }, ],
                    name: [{
                        required: true,
                        message: '请输书籍的名字',
                        trigger: 'blur'
                    }, ],
                    price: [{
                        required: true,
                        message: '请输入书籍价格',
                        trigger: 'blur'
                    }, ],
                    isFree: [{
                        required: true,
                        message: '请输入书籍是否免费',
                        trigger: 'blur'
                    }, ],
                    type: [{
                        required: true,
                        message: '请输入书籍的种类',
                        trigger: 'blur'
                    }, ],
                    cover: [{
                        required: true,
                        message: '请输入书籍的封面',
                        trigger: 'blur'
                    }, ]
                },
                //对话框的可见与否
                dialogTableVisible:false,
                // 表格数据
                tableData: [{
                    bookId:'',
                    name:'',
                    price :'',
                    isFree:'',
                    type :[],
                    cover :'',
                }]
            }
        },
        methods: {
            showAvatar(index, row){
                console.log("查看");
                this.avatarUrl = row.cover;
                this.avatarVisible = true;
            },
            uploadAvatar(index, row){
            this.uploadAvatarVisible = true;
            this.fileData.append("bookId",row.bookId)
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
                console.log(this.fileData.get("bookId"));
            },
            uploadFile(){
                uploadIcon(this.fileData).then(res =>{
                    console.log(res)
                    if (res.data.code < 200) {
                        this.fileName = '';
                        // this.fileData = new FormData();
                        this.fileData.delete("bookId");
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
            //获取所有的列表
            getList(){
                //调用接口
                getBooks(this.pageBean).then(res => {
                    console.log('所有的信息'+res);
                    this.tableData = res.data.data.rows
                    this.pageBean = res.data.data
                    console.log(this.pageBean);
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
                            this.dialogForm.type = [this.dialogForm.type]
                            addBook(this.dialogForm).then(res =>{
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
                            alterBook().then(res=>{
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
                console.log(66);
                if(this.searchContent.trim() != ''){
                    //调用查询接口
                    searchBook(this.searchContent,this.pageBean).then(res => {
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
                    console.log(index,row);
                    console.log('删除接口');
                    //调用删除接口
                    deleteBook(row.bookId).then(res => {
                        console.log('删除接口返回信息');
                        console.log(res);
                        this.getList()
                    })
                    this.$message.success('删除成功！')
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>

<style scoped>

</style>