<template>
    <div>
        <el-breadcrumb separator="/">
            <!-- 展示路径信息 -->
  <el-breadcrumb-item v-for="breadCrumbitem in breadCrumblist" :key="breadCrumbitem.path" :to="breadCrumbitem.path">{{ breadCrumbitem.meta.title }}</el-breadcrumb-item>
</el-breadcrumb>

    </div>
</template>

<script>
    export default {
        computed:{
            breadCrumblist(){
                return this.$route.matched;//返回路径信息
            }
        },
        mounted(){
            console.log(this.$route);
        }
    }
</script>

<style lang="sass" scoped>

</style>