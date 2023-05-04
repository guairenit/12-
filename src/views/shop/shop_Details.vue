<template>
    <div>
        

<head>
    <meta charset="UTF-8">
    <title>商品详情页面</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>
    <div class="w">
        <bread_Crumb/>
            </div>
    <!-- 详情内容 -->
    <div class=" w">
        <div class="crumb_wrap">
            
        </div>
        <div class="product_intro clearfix">
            <div class="preview_wrap fl">
                <div class="preview_img">
                    <img :src="goodsinformation.img" alt="预览图">
                </div>

                <div class="preview_info">
                    <div class="left_btn fl">
                    </div>
                    
                </div>
            </div>
            <div class="iteminfo_wrap fr">
                
                <div class="news">
                    <dl class="choose_version">
                    <dt>商品名：</dt>
                    <dd2>
                    <h2>{{ goodsinformation.name }}</h2>
                    </dd2>
                </dl>
                </div>
                <br>
                <div class="summary">
                    <dl class="choose_version">
                        <dt>价格:</dt>
                        <dd>
                            <h2>{{ goodsinformation.price }}元</h2>
                        </dd>
                    </dl>
                    <dl class="choose_version">
                        <dt>运费:</dt>
                        <dd>
                        <h2>无需配送</h2>
                        </dd>
                    </dl>
                
                    <dl class="choose_version">
                        <dt>库存:</dt>
                        <dd>
                        <h2>69</h2>
                        </dd>
                    </dl>

                    <div class="choose_btns">
                        <div class="choose_amount">
                            <td >
                            <span class="count-btn" data-opera-type="minus"><a class="reduce" @click="numAdd()">+</a></span>
                            <input class="count-input" type='text' oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" name="choose_amount" id="buy-num" v-model="buyNum">
                            <span class="count-btn" data-opera-type="plus"><a class="add" @click="numRec()">-</a></span>
                        </td>
                        </div>
                        <button class="addcar" @click = "addRowInfo">加入购物车</button>
                        <button class="addcar" @click = "addOrder">直接购买</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="prodct_detail clearfix">
            
            <div class="detail fr">
                <div class="detail_tab_list">
                    <ul>
                        <li class="current">商品介绍</li>
                    </ul>
                    <br>
                </div>
                <div class="detail_tab_con">
                    <div class="item">
                        <ul class="item_info">
                            <br>
                            <li>{{ goodsinformation.information }}</li>
                            <!-- <li>本商品为电子兑换码，付款后通过 短信 一起发送至收货人手机，务必保证手机号准确畅通，及时查收。</li>
                            <li>2. 购买后，请在 2022 年 3 月 31 日前完成兑换，过期将无法兑换。</li>
                            <li>3. 力扣 90 天 PLUS 会员：兑换后可获得 90 天会员专属特权。极客时间 100 元充值卡（包含实币 65 元，长期有效；赠币 35 元，有效期 5 年）。</li>
                            <li>4. 本商品为虚拟电子商品，发货后不支持退款。</li>
                            <li>5. 购买后，请在活动页面底部查看兑换方式。</li>
                            <li>6. 购买成功后，商城跳出的 「卡券」二维码非本套餐的兑换码，请忽略。如有任何问题，请与力扣有赞商城客服联系</li>
                            <li>商品编号：1861098</li>
                            <li>商品毛重：0.51kg</li> -->

                        </ul>
                        <p><a href="#" class="item_info_more"></a></p>
                        <div class = "topimg"><img :src="goodsinformation.img" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 详情内容 end -->


    <!-- 页面底部 -->
    
</body>
    </div>
</template>

<script>
import { getinformationbyId } from '@/api/shop';
import { addRowInfo } from '@/api/shop';
import { addOrder } from '@/api/shop';
import bread_Crumb from './bread_Crumb.vue';

    export default {
    components: {  bread_Crumb },
    data() {
        return {
            goodsinformation:"",//商品的信息
            goodsId:'',//从其他页面获取的商品id
            buyNum:'1'
        }
    },
    methods: {
        numAdd(){
            this.buyNum++
        },
        numRec(){
            if (this.buyNum > 1) {
                this.buyNum--
            } else {
                this.buyNum= 1
            }
        },
        getinformationbyId(){
            //调用接口
            console.log(this.goodsId)
            getinformationbyId(this.goosId).then(res => {
                console.log(res.data.data);
                this.goodsinformation = res.data.data
            })
    },
    addRowInfo(){
            addRowInfo(this.importancegoodlist + this.buyNum).then(res =>{
                                console.log('新增购物车');
                                console.log(res);
                                if(res.data.code < 200){
                                    //新增成功
                                    this.$message.success('添加购物车成功！')
                                    //清除脏数据
                                    this.buyNum = '1'
                                    this.$router.push({ path: '/shoppage/cart' })
                                }else {
                                    //新增失败
                                    this.$message.error('添加购物车失败！')
                                }
                            })
                        },
    addOrder(){
            addOrder(this.importancegoodlist + this.buyNum*this.goodsinformation.price ).then(res =>{
                                console.log('新增订单');
                                console.log(res);
                                if(res.data.code < 200){
                                    //新增成功
                                    this.$message.success('生成订单成功，请尽快支付！')
                                    //清除脏数据
                                    this.buyNum = '1'
                                    this.$router.push({ path: '/shoppage/cart/pay' })
                                }else {
                                    //新增失败
                                    this.$message.error('购买失败！')
                                }
                            })
                        }
},
    mounted(){
        this.goodsId = JSON.parse(sessionStorage.getItem('goodsId'))
        this.getinformationbyId()
            
    }
}
</script>

<style lang="css" scoped>
/*清除元素默认的内外边距  */

* {
    margin: 0;
    padding: 0
}


/*让所有斜体 不倾斜*/

em,
i {
    font-style: normal;
}


/*去掉列表前面的小点*/

li {
    list-style: none;
}


/*图片没有边框   去掉图片底侧的空白缝隙*/

img {
    border: 0;
    
    /*ie6*/
    vertical-align: middle;
}


/*让button 按钮 变成小手*/

button {
    cursor: pointer;
}


/*取消链接的下划线*/

a {
    color: #666;
    text-decoration: none;
}

a:hover {
    color: #d4ba25;
}

button,
input {
    font-family: 'Microsoft YaHei', 'Heiti SC', tahoma, arial, 'Hiragino Sans GB', \\5B8B\4F53, sans-serif;
    /*取消轮廓线 蓝色的*/
    outline: none;
}

body {
    background-color: #fff;
    font: 12px/1.5 'Microsoft YaHei', 'Heiti SC', tahoma, arial, 'Hiragino Sans GB', \\5B8B\4F53, sans-serif;
    color: #666
}

.hide,
.topimg{
    text-align: center;
}

/*清除浮动*/

.clearfix:after {
    visibility: hidden;
    clear: both;
    display: block;
    content: ".";
    height: 0
}

.clearfix {
    *zoom: 1;
}
/* panel */
/* 超链样式 */


.crumb_wrap {
    height: 30px;/*距离面包屑高度*/
}

.crumb_wrap a {
    margin-right: 10px;
}


/* 预览区左侧 */

.preview_wrap {
    width: 500px;
    height: 500px;
}

.preview_img {

    height: 500px;
    width: 500px;
    text-align: center;
    /* background-color: rgb(221, 233, 237); */
}


/* 预览区右侧 */

.iteminfo_wrap {
    width: 570px;
    height: 500px;
    /* background-color: skyblue; */
}



.iteminfo_wrap .news {
    padding: 40px 0 0 5px;
}
.news dt,
.news dd {
    font-size: 25px;
    float: left;
}
.news dt{
    font-size: 25px;
    width:100px;
}
.iteminfo_wrap li {
    padding: 0 0 0 88px;
    font-size: 36px;
    color: #4fc08d;
    line-height: 56px;
}

.summary_price,
.summary dl {
    overflow: hidden;
}

.summary dt,
.summary dd {
    float: left;
    padding: 0px 0 0 5px;
}

.summary dt {
    width: 80px;
    line-height: 50px;
}






.summary a.current {
    border-color: #4fc08d;
}

.choose_version {
    margin: 15px 0;
}

.choose_version a,
.choose_version dt{
    width: 80px;
    font-size: 20px;
}
.choose_version dd{
    width: 300px;
    font-size: 20px;
    padding: 10px 0 0 5px;
}
.choose_type a {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    text-align: center;
    padding: 0 24px;
    background-color: #f7f7f7;
    border: 1px solid #ededed;
}
.choose_type dt{
    width: 120px;
    font-size: 20px;
}
.choose_btns {
    margin-top: 20px;
}

.choose_amount {
    position: relative;
    float: left;
    width: 50px;
    height: 46px;
    background-color:#4fc08d;
}

.choose_amount input {
    width: 33px;
    height: 44px;
    border: 1px solid #ccc;
    text-align: center;
}

.choose_amount .add,
.choose_amount .reduce {
    position: absolute;
    right: 0;
    width: 15px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    text-align: center;
    cursor: pointer;
}

.choose_amount .add {
    top: 0;
}

.choose_amount .reduce {
    bottom: 0;
}

.addcar {
    float: left;
    width: 142px;
    height: 46px;
    margin-left: 10px;
    background-color: #4fc08d;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}


/* 产品详细介绍模块 */

.prodct_detail {
    margin-bottom: 50px;
}


/* left */
.product_intro{
    width: 1100px;
}

/* right */

.detail {
    width: 1100px;
}

.detail_tab_list {
    height: 39px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

.detail_tab_list li {
    float: left;
    height: 39px;
    line-height: 39px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
}

.detail_tab_list li.current {
    color: #fff;
    background-color: #4fc08d;
}

.detail_tab_con .item_info {
    width: 1100px;
}

.detail_tab_con .item_info li {
    font-size: 30px;
    text-align: center;
    
}

.item_info_more {
    font-family: 'icomoon';
    margin:0 auto;
    display:inline-block;
    left:900px;
    font-weight: 1100px;
    
}
/*公共样式*/

.fl {
    float: left;
}

.fr {
    float: right;
}




.fr  {
    font-family: 'icomoon';
    font-size: 16px;
    line-height: 26px;
}


/*版心*/

.w {
    width: 1100px;
    margin: 0 auto;
}


/* 顶部导航栏 */

</style>