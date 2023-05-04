<template>
    <div class="layout">
        <!-- 外层容器 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside style="width:200px">
                <el-menu default-active="2" class="el-menu-vertical-demo"
                    background-color="#0a3660" text-color="#fff" active-text-color="rgb(18, 150, 218)"
                    style="height: 100vh;" :router="true" :default-openeds="openeds">
                    <!-- vw 视图宽度 -->
                    <!-- vh 视图高度 -->
                    <h3 class="aside-title">程序员进阶服务</h3>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>主要功能</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/rolemanage">角色管理</el-menu-item>
                            <el-menu-item index="/usermanage">用户管理</el-menu-item>
                            <el-menu-item index="/goodsManage">商品管理</el-menu-item>
                            <el-menu-item index="/ordersmanage">订单管理</el-menu-item>
                            <el-menu-item index="/booksManage">书籍管理</el-menu-item>
                            <el-menu-item index="/questionsManage">题库管理</el-menu-item>
                            <el-menu-item index="/discussManage">讨论管理</el-menu-item>
                            <el-menu-item index="/commentsManage">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span>物流</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/goodsmanage">待发送订单</el-menu-item>
                            <el-menu-item index="/goodsmanage">待确认收货订单</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->
                </el-menu>
            </el-aside>
            <!-- 右侧内容区域 -->
            <el-container>
                <!-- 头部区域 -->
                <el-header class="common-header">
                    <div style="display:flex; justify-content:space-between; padding:30px ; line-height: 10px;">
                        <span style="">当前用户：{{username}}</span>
                        <el-button type="danger" @click="logout" size="mini" class="header-btn">退出</el-button>
                    </div>
                </el-header>
                <!-- 主要区域 -->
                <el-main>
                    <!-- 子路由的出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { logoutNew } from '@/api/login'
    export default {
        name: 'layoutPage',
        data() {
            return {
                openeds:['1'],
                username: localStorage.getItem('username') || '未登录'
            }
        },
        created() {
            // console.log('当前用户名'' + localStorage.getItem('username'))
        },
        methods: {
            logout(){
                logoutNew().then(res =>{
                    if (res.data.code == '200') {
                        localStorage.removeItem("userId")
                        localStorage.removeItem("username")
                        localStorage.removeItem("icon")
                        localStorage.removeItem("plus")
                        localStorage.removeItem("mail")
                        localStorage.removeItem("token")
                        localStorage.removeItem("role")
                        this.$message.success(res.data.msg)
                        this.$router.push('/login')
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            }
        }
    }
</script>
<!-- scoped css只在当前页面使用 防止css冲突 -->
<style lang="less" scoped>
.aside-title{
    font-weight: bolder;
    color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
}
.common-header{
    background-color: #1875c3;
    span{
        color: #fff;
        padding-left:20px;
    }
    
}
</style>
