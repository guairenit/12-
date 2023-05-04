<template>
    <div>
        <span @click="back" class="return"><i class="el-icon-back"></i></span>
    </div>
</template>

<script>
    export default {
        methods: {
            back(){
                /* 返回上一级 */
                this.$router.go(-1)
            },
        },
    }
</script>

<style lang="less" scoped>
.return {
        font-size: 30px;
        cursor: pointer;
    }
</style>