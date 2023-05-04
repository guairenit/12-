<template>
    <div class="homeFooter">
        <div class="text">
            <div>copyright</div>
            <div>本产品由本产品的创建人制作</div>
            <div><router-link to="/helps" style="color:yellow">帮助中心</router-link></div>
            <div>110119120</div>
        </div>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.homeFooter{
    width: 100%;
    // height: 200px;
    background-color: #595959;
    color: #fff;
    text-align: center;
    .text{
        padding: 20px;
        line-height: 50px;
    }
}
</style>