<template>
    <div>
        <router-view></router-view><!-- 展示子组件 -->
    <div v-show="$route.meta.showfater"><!-- 展示子组件时不展示主页 -->
    <div class = 'buju'>
        <!-- 主要展示的商品（上半部分） -->
    <section class="categories">
                <div class="col-lg-6 p-0">
                    <div class="categories_item categories_large_item">
                        <img class="img_fluid" :src="importancegoodlist.img" alt="">

                        <ul class="product_hover1">
                            <li><router-link to ="/shoppage/goodsDetails" @click="getclick(importancegoodlist)">{{ importancegoodlist.name }}</router-link></li>
                        </ul>
                        <div class="categories_text">
                                <router-link to ="/shoppage/goodsDetails"  @click="getclick(importancegoodlist)">Buy now</router-link>
                        </div>
                    
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-12 p-0" v-for=" (item,index) in goodslist.slice(1,5)" :key="index" >
                            <div class="categories_item">
                                <img class="img_fluid" :src="item.img" alt="">
                                <ul class="product_hover1">
                                <li><router-link to ="/shoppage/goodsDetails" @click="getclick(item)">{{item.name}}</router-link></li>

                            </ul>
                            </div>
                            <div class="categories_text1">
                                <router-link to ="/shoppage/goodsDetails" @click="getclick(item)">Buy now</router-link>
                            </div>
                            
                                        
                        </div>

                       
                        
    

                    </div>
                    
                </div>
                

    </section>
    <!-- 新商品展示(下半部分) -->
    <div class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title text-center">
                        <h4>New Product</h4>

                    </div>
                </div>
            </div>

                <div class="col-lg-3 col-md-4 col-sm-6"  v-for="(item,index) in goodslist.slice(0,14)" :key='index'>
                    <div class="product_item">
                        <div class="product_item_pic">
                            <!-- <img :src="item.img" alt="">  style="width: 35px; height: 35px"-->
                            <el-image :src="item.img" fit="fill"></el-image>
                            <div class="label new">New</div>
                            <ul class="product_hover">
                                <li><router-link to ="/shoppage/goodsDetails" @click = 'getclick(item)'>购买</router-link></li>

                            </ul> 
                        </div>

                        <div class="product_item_text">
                            <h6><a href="#">{{item.name}}</a></h6>
                            <div class="product_price">￥ {{item.price}}</div>
                        </div>
                    </div>

                </div>
                <br>
                <router-link to="/shoppage/Allgoods"><div class ="gengduo">>>更多商品</div></router-link>
                

        </div>

    </div>
    </div>
    <div class="buttonbuju">
    <router-link to="/shoppage/cart"><button class = "button">购物车</button></router-link>
    <router-link to="/shoppage/cart/order"><button class = "button">我的订单</button></router-link>
    </div>
    <!-- <router-link to="/shoppage/cart/order"><button class = "button">我的订单</button></router-link>  -->
    </div>
    </div>
</template>

<script>
import { getinformation } from '@/api/shop';

    export default {
    components: {},
    data() {
        return {
            importancegoodlist:[],//主要首推商品
            goodslist:[],//商品信息
        }
    },
    methods: {
        //获取商品信息
        getinformation(){
            //调用接口
            getinformation().then(res => {
                console.log('商品信息'+res);
                this.goodslist = res.data.data
                this.importancegoodlist = res.data.data[0]
            })
        },
        //点击商品获取对应信息
        getclick(item) {
                console.log(item.name);
                console.log(item.goodsId);
                //获取到点击的信息，并且存入浏览器中方便后续调用
                sessionStorage.setItem('goodsId', JSON.stringify(item.goodsId))
                
            }
    },
    created() {
        //刷新时获取商品信息
        this.getinformation()
    },
}


 

</script>

<style lang="css" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200&family=Roboto:wght@400;700&display=swap'); */


*{
    margin: 0;
    padding: 1px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

a, a:hover a:focus{
    text-decoration: none;
    outline: none;
}

li{
    list-style: none;
    display: inline-block;
}


.img_fluid{
    width: 101%;
    height: 100.5%;   
  
}
/* 上半部分设置 */
.categories{
    position: relative;
    overflow: hidden;
}

.categories .categories_item{
    position: relative;
    height: 260px;
    display: flex;
    margin-bottom: 0px;
}

.categories .categories_large_item{
    height: 525px;
}

.categories .categories_text{
    position: absolute;
    left: 50px;
    top: 400px;
}
/* buynow */
.categories .categories_text1{
    position: absolute;
    left: 50px;
    top: 150px;
}

.categories .categories_large_item .categories_text{
    position: absolute;
    left: 50px;max-width: 200px;
}
.categories .categories_large_item .categories_text p{
    margin-bottom: 15px;
}
.categories .categories_large_item .categories_text1{
    position: absolute;
    left: 50px;max-width: 200px;
}
.categories .categories_large_item .categories_text1 p{
    margin-bottom: 15px;
}

.categories .categories_text h1{
    color: #000;
    margin-bottom: 5px;
}

.categories .categories_text h4{
    color: #000;
    font-weight: 700;
}



.categories .categories_text p{
    margin-bottom: 10px;
}

.categories .categories_text a{
    font-size: 14px;
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    padding: 0 0 3px;
    display: inline-block;
    text-decoration: none;
    outline: none;
}

.categories .categories_text a:after{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #4fc08d;
    content: '';
}
.categories .categories_text1 a{
    font-size: 14px;
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    padding: 0 0 3px;
    display: inline-block;
    text-decoration: none;
    outline: none;
}

.categories .categories_text1 a:after{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #4fc08d;
    content: '';
}
/* new poroduct */
.product{
    padding-top: 60px;
    padding-bottom: 50px;
    padding-left:60px;
}

.product .section-title{
    margin-bottom: 45px;
}

.product .section-title h4{
    columns: #4fc08d;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
}

.product .section-title h4:after{
    position: absolute;
    content: '';
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 70px;
    background-color: #4fc08d;

}

.spad{
    padding-top: 80px;
    padding-bottom: 80px;
}

.product_item{
    margin-bottom: 35px;
}

.product_item_pic{
    height: 260px;
    position: relative;
    overflow: hidden;
}

.product_item_pic .label{
    position: absolute;
    font-size: 12px;
    color: #fff;
    font-weight: 500;
    display: inline-block;
    padding: 2px 8px;
    text-transform: uppercase;
    left: 10px;
    top: 10px;

}

.product_item_pic .label.new{
    background-color: #4fc08d;
}

.product_item_text{
    text-align: center;
    padding-top: 22px;

}

.product_item_text h6 a{
    font-size: 14px;
    color: #000;
}

.product_item_text .rating{
    line-height: 18px;
    margin-bottom: 5px;
}

.product_item_text .rating i{
    font-size: 10px;
    color: #4fc08d;
    margin-right: -4px;
}

.product_item_text .rating i:last-child{
    margin-right: 0;
}

.product_item_text .product_price{
    color: #000;
    font-weight: 600;
}

.product_hover{
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 30px;
    text-align: center;

}

.product_hover li{
    list-style: none;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    top: 100px;
    opacity: 0;
}

.product_hover li:last-child{
    margin-right: 0;
}

.product_hover li:hover a{
    background-color: #4fc08d;
}

.product_hover li:hover a span{
    color: #fff;
    transform: rotate(360deg);
}
.product_hover li a{
    font-size: 18px;
    color: #000;
    display: block;
    width: 45px;
    height: 45px;
    background-color: #fff;
    line-height: 45px;
    border-radius: 50px;
    box-shadow: 0 0 25px rgba(24, 24, 24, 0.4);
    transition: all 0.5s;
}

.product_hover li a i{
    position: relative;
    display: inline-block;
    transform: rotate(0);
    transition: all 0.3s;
}
/* 上半部分悬浮 */
.product_item:hover .product_hover li{
    opacity: 1;
    top: 0;
}
.categories_item:hover .product_hover1 li{
    opacity: 1;
    top: 0;
}

.product_hover1{
    position:absolute;
    left: 0;
    width: 100%;
    bottom: 0px;
    text-align:center;

}

.product_hover1 li{
    list-style: none;
    display: line;
    margin-right: 1;
    position: left;
    top: 100px;
    opacity: 0;
}

.product_hover1 li:last-child{
    margin-right: 0;
}

.product_hover1 li:hover a{
    background-color: #c7c2be;
}

.product_hover1 li:hover a span{
    color: #fff;
    transform: rotate(360deg);
}
.product_hover1 li a{
    font-size: 20px;
    color: #000;
    display: inline;
    background-color: #fff;
    line-height: 60px;
    border-radius: 6px;
    box-shadow: 0 0 33px rgba(24, 24, 24, 0.4);
}
.product_hover li:nth-child(1){
    transition: all 0.4s ease 0.1s;
}

/* .product_hover li:nth-child(2){
    transition: all 0.4s ease 0.15s;
}
.product_hover li:nth-child(3){
    transition: all 0.4s ease 0.2s;
}
.product_hover li:nth-child(4){
    transition: all 0.4s ease 0.25s;
} */
.buju{
    /* 页面布局 */
    width: 1300px;
    height: auto;   
    padding:15px;
}
.button{
    width: 50px;
    height: 50px;
    background: #4fc08d;
    border:none;
    border-radius: 50%;
    color: #ffffff;
    display:block;
    opacity:0.7;
    
}
.buttonbuju{
    position: fixed;

    left:1600px;
    top:80px

    ;
}
.gengduo{
    text-align: end;
}


</style>