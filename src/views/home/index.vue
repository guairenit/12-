<template>
    <div>
        <el-container>
            <!-- 头部导航 -->
            <el-header>
                <home_Nav/>
            </el-header>
            
            <!-- 主体部分 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            
            <!-- Footer -->
            <el-footer class="footer">
                <home_Footer/>
            </el-footer>

        </el-container>
        <el-backtop>UP</el-backtop>
    </div>
</template>

<script>
import home_Nav from '@/components/home_Nav'
import home_Footer from '@/components/home_Footer'
    export default {
        components:{
            home_Nav,
            home_Footer
        },
        
    }
</script>

<style lang="less" scoped>
.el-footer,.el-header,.el-main{
    padding: 0;
}
.el-header {
    margin-bottom: 20px;
}
.el-main {
    margin: auto;
}
.footer {
    width: 100%;
}

</style>