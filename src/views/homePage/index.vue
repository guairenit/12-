
<template>
    <div class="homePage">
        <!-- 快捷导航栏 -->
        <div class="shortcut">
            <div class="wrapper">
                <span class="menus">
                    <router-link :to="{path:'/studypage'}">学习</router-link>
                    <router-link :to="{path:'/questionpage'}">题库</router-link>
                    <router-link :to="{path:'/discussionpage'}">讨论</router-link>
                    <router-link :to="{path:'/shoppage'}">商店</router-link>
                </span>
                <ul v-if="username==null">
                    <li><router-link :to="{path:'/login'}">登录</router-link></li>
                    <li><router-link :to="{path:'/register'}">注册</router-link></li>
                </ul>
                <ul v-else>
                    <li><router-link :to="{path:'/userInfo'}">用户名：{{username}}</router-link></li>
                    <el-popover v-model="logoutButtonVisible" width="40px" style="min-width:40px">
                        <el-avatar slot="reference" shape="circle" size="large" fit="scale-down" :src="icon"></el-avatar>
                        <div class="info">
                            <div>用户名：{{username}}</div>
                            <div>邮箱:{{mail}}</div>
                            <div>角色:{{role}}</div>
                            <el-button type="danger" size="medium" @click="logout">登出</el-button>
                        </div>
                    </el-popover>
                </ul>
            </div>
        </div>
        <!-- 子路由出口 -->
        <div class="content">
            <router-view></router-view>
        </div>
        <!-- 尾部 版权区域 -->
        <div class="footer">
            <div class="wrapper">
                <div class="bottom">
                    <p>
                        <a href="#" v-for="(value,index) in datas" :key="index">{{value}}</a>
                    </p>
                    <p>
                        {{logo}}
                    </p>
                </div>

            </div>
        </div>
    </div>
    
</template>

<script>
import {logoutNew} from '@/api/login.js'
export default {
    data() {
        return {
        username:localStorage.getItem("username"),
        icon:localStorage.getItem("icon"),
        plus:localStorage.getItem("plus"),
        mail:localStorage.getItem("mail"),
        role:localStorage.getItem("role"),
        datas: {
            1: '  学习   | ',
            2: '题库练习 | ',
            3: 'plus会员 | ',
            4: '周边商城 | ',
            5: '帮助中心 | ',
            6: '商务合作'
        },
        logo: 'CopyRight @ 程序员进阶服务站',
        logoutButtonVisible: false,
        }
    },
    created(){
        console.log("username:" + localStorage.getItem("username"))

    },
    methods: {
            logout(){
                this.logoutButtonVisible = false
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
    },
}
</script>

<style scoped>
.el-popover {
    min-width: 0px;
}
.info div{
    margin-bottom: 10px;
}
/* 路由填充 */
.content{
    width:80vw;
    margin-left: 10vw;
}
.home_page{
    height: 90vh;
}
/* 快捷导航 */
.wrapper {
    width:80vw;
    margin: 0 auto;
}

.shortcut {
    height: 52px;
    background-color: #333;
}

.shortcut .wrapper {
    height: 52px;
}

.shortcut .wrapper ul {
    float: right;
}
.menus {
    line-height: 52px;
    padding: 0 30px;
}
.shortcut .wrapper li {
    float: left;
    line-height: 52px;
}
.el-avatar{
    margin-top: 6px;
}
.shortcut .wrapper a {
    padding: 0 16px;
    font-size: 14px;
    color: #dcdcdc;
}


.footer {
    height: 200px;
    background-color: #333;
}

.footer .bottom {
    padding-top: 40px;
    font-size: 14px;
    color: #999;
    text-align: center;
}

.footer .bottom a {
    font-size: 14px;
    color: #999;
}

.footer .bottom p {
    margin-bottom: 20px;
}
</style>