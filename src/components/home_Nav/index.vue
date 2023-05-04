<template>
    <div id="nav">
        <el-container>
            <el-header>
                <el-row class="nav">
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <router-link to="/">
                        <el-col :span="6">
                            <div >
                                <span class="title">程序员进阶服务</span>
                            </div>
                        </el-col>
                    </router-link>
                    
                    <router-link to="/study" active-class="active">
                        <el-col :span="2"><div class="font ">学习</div></el-col>
                    </router-link>

                    <router-link to="/questions">
                        <el-col :span="2"><div class="font ">题库</div></el-col>
                    </router-link>

                    <router-link to="/discussions">
                        <el-col :span="2"><div class="font ">讨论</div></el-col>
                    </router-link>

                    <router-link to="/shoppage">
                        <el-col :span="2"><div class="font ">商店</div></el-col>
                    </router-link>

                    <!-- <el-col :span="4">
                        <div class="">
                            <el-input
                                class="search"
                                placeholder="请输入内容"
                                suffix-icon="el-icon-search"
                                v-model="search">
                            </el-input>
                        </div>
                    </el-col> -->

                    <!-- <router-link to="/login" active-class="active">
                        <el-col :span="2"><div class="font ">登录Or注册</div></el-col>
                    </router-link> -->

                    
                    <el-col :span="6" v-if="username==null" >
                        <router-link :to="{path:'/login'}">登录</router-link>
                        <el-divider direction="vertical"></el-divider>
                        <router-link :to="{path:'/register'}">注册</router-link>
                    </el-col>
                        
                    <el-col :span="6" v-else>
                        <router-link :to="{path:'/user'}">
                            <!-- 用户名：{{username}} -->
                            <el-image style="width: 30px; height: 30px; margin-top:12px; border-radius: 50%;" :src="icon" fit="cover"></el-image>
                        </router-link>
                    </el-col>
                    
                    
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <!-- <router-link to="/user"><el-col :span="2"><i class="el-icon-user" style="font-size: 30px"></i></el-col></router-link> -->
                        </span>
                    </el-dropdown>

                    <el-col :span="2"><div class="grid-content "></div></el-col>
                </el-row>
            </el-header>
        </el-container>
    </div>
</template>

<script>
export default {
	name:'IndexNav',
	data() {
		return {
            username:localStorage.getItem("username"),
            // icon:"http://192.168.225.131" + localStorage.getItem("icon"),
            icon:localStorage.getItem("icon"),
            plus:localStorage.getItem("plus"),
            mail:localStorage.getItem("mail"),
            role:localStorage.getItem("role"),

			search:'',
		};
	},
};
</script>

<style scoped>
    .navBarWrap {
        position:fixed;
        top:0;
        z-index:999;
    }
    #nav {
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
        background-color: #fff;
        /* position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 100; */
    }
    .nav {
        text-align: center;
        line-height: 60px;
    }
    .logo {
        position: absolute;
        bottom: 15px;
        left: 270px;
    }
    .title {
        margin-left: 10px;
        font-style: oblique;
        font-weight: bolder;
        color: #0f32df;
    }
    .font {
        color: #81D3F8;
        font-weight: bolder;
    }
    .font:hover {
        color: #027DB4;
    }
    .search {
        width: 200px;
        border-radius: 20px;
        border: #027DB4 5px;
    }
    .active {
        color: chocolate;
    }
    .el-row {
    margin-bottom: 20px;    
    }
    .grid-content {
        border-radius: 0px;
        min-height: 60px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>