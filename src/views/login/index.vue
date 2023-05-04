<template>
    <div class="userPage">
        <el-card class="box-card">
            <div class="search">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <!-- placeholder 提示信息 -->
                        <el-input v-model="searchForm.user" placeholder="序号/用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" size="small">新增</el-button>
            <el-table :data="tableData" style="width: 100%" height="250">
                <el-table-column prop="date" label="序号" width="120"></el-table-column>
                <el-table-column prop="username" label="用户名" width="100"></el-table-column>
                <el-table-column prop="password" label="密码" width="220"></el-table-column>
                <el-table-column prop="mail" label="邮箱" width="200"></el-table-column>
                <el-table-column prop="plus" label="会员" width="140"></el-table-column>
                <el-table-column prop="icon" label="头像" width="180"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="" style="display: flex;justify-content: flex-end;">
                <el-pagination background layout="prev, pager, next" :total="100">
                </el-pagination>

            </div>

        </el-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 搜索表单
                searchForm: {},
                // 表格数据
                tableData: [{
                    date: '1',
                    username: '2020',
                    password: '2020',
                    mail: '18082756656@163.com',
                    plus: '普通用户',
                    icon: ''
                }]
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>
