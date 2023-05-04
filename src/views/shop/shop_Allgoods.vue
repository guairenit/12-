<template>
    <div>
        <bread_Crumb/>
    <div class = 'buju'>

    <div class="product spad">
        <div class="container">
            <BreadCrumb/>
                
            <div class="col-lg-3 col-md-4 col-sm-6"  v-for="(item,index) in goodslist.slice(0,3)" :key='index'>
                    <div class="product_item">
                        <div class="product_item_pic">
                            <!-- <img :src="item.img" alt="">  style="width: 35px; height: 35px"-->
                            <el-image :src="item.img" fit="fill"></el-image>
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
                

        </div>

    </div>
    </div>
        </div>
</template>

<script>
import { getinformation } from '@/api/shop';
import bread_Crumb from './bread_Crumb.vue';

    export default {
    components: { bread_Crumb },
    data() {
        return {
            goodslist:[],
        }
    },
    methods: {
        //获取商品信息
        getinformation(){
            //调用接口
            getinformation().then(res => {
                console.log('商品信息'+res);
                this.goodslist = res.data.data
            })
        },
        getclick(item) {
            //点击商品获取响应信息，存入session缓存中
                console.log(item.name);
                console.log(item.goodsId);
                //获取到点击的信息，并且存入浏览器中方便后续调用
                sessionStorage.setItem('goodsId', JSON.stringify(item.goodsId))
                
            }
    },
    created() {
        this.getinformation()
    },
}


 

</script>

<style lang="css" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200&family=Roboto:wght@400;700&display=swap'); */


*{
    margin: 0;
    padding: 2px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}


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

.product_item:hover .product_hover li{
    opacity: 1;
    top: 0;
}

.buju{
    width: 1300px;
    height:0%;   
    padding:0px;
}
/* 购买悬浮动画 */
.product_hover li:nth-child(1){
    transition: all 0.4s ease 0.1s;
}

</style>