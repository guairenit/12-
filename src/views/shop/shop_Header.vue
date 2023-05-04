<template>
    <div>
        
        <header class="header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-1">
                    <div class="header_logo">
                        <h1><span>Leetcode</span>shop.</h1>
                    </div>
                </div>
                <div class="col-lg-7">
                    <nav class="header_text">
                        <ul>
                            <a href="#">更多好玩尽在<span>leetcode</span>商店.</a>
                          </ul>

                    </nav>
                </div>

                <div class="col-lg-3">
                    <div class="header_right">
                        <div class="header_right_auth">
                            <router-link to="/shoppage">首页</router-link>
                            <router-link to="/cart">购物车</router-link>
                            <router-link to="/order">我的订单</router-link>

                        </div>
                    </div>
                </div>


            </div>

        </div>

        </header>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="css" scoped>

.header{
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(91, 91, 91, 0.1);
}
.header_logo{
    padding: 26px 0;
    text-align: center;

}

.header_logo h1{
    display: inline-block;
    color: #000;
    font-size: 27px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 3px;
}

.header_logo h1 span{
    color: #ff7200;
    font-size: 32px;
    font-weight: 700;
}

.header_text ul a{
    display: inline-block;
    color: #000;
    font-size: 20px;
    text-transform: 700;
    letter-spacing: 5px;
    padding: 20px 0;
    margin-left: 250px;
    position: relative;
    text-decoration: none;
    outline: none;
}
.header_text ul a span{
    color: #ff7200;
    font-size: 30px;
    font-weight: 500;
}

.header_right{
    text-align: center;
    padding: 30px 0 20px;
}

.header_right{
    display: inline-block;
    margin-right: 30px;
}

.header_right .header_right_auth a{
    font-size: 27px;
    color: #000000;
    position: relative;
    padding: 20px 0;
    margin-right: 12px;
    text-decoration: none;
    outline: none;
}


</style>