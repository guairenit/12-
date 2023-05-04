<template>
    <div class="buju">
        <div class="crumb">
            <div class="w">
                <bread_crumb/>
                
            </div>
        </div>
<div class="pay-wrap w">
    <p class="pay-tips">订单提交成功，请您尽快支付！ 订单号：{{ orderId }}</p>
    <p class="pay-tips enhance">请使用支付宝/微信扫描如下二维码进行支付：</p>
    <div class="img-con">
    <div class="sg-qrcode">
        
  
        <vue-qr 
            :text="qrcodeText"
            :correctLevel="3"
            :size="300"
            :margin="10"
            colorDark="#000"
            colorLight="white"
            backgroundColor="white"
            backgroundDimming="white"
            :logoSrc="require('@/assets/img/erweima.png')"
            :logoScale=".2"
            :logoMargin="5"
            logoBackgroundColor="white"
        ></vue-qr>

</div>
    </div>
    <router-link to="/shoppage/cart/order"><button class="button"  @click="isConfirmed = true">我已支付成功</button></router-link>
</div>
    </div>
    
</template>

<script>
  
  import vueQr from "vue-qr"; // 引入二维码生成组件
  import { getOrder} from '@/api/shop';
import bread_crumb from "./bread_Crumb.vue";
  
  export default {
  
    components: {
    vueQr,
    bread_crumb
},
  
    data() {
  
      return {
        
        qrcodeText:"",//二维码内容（扫码识别后需要访问的网址）
        orderId:"" ,//订单号
        isConfirmed:false
      }
  
    },
    beforeRouteLeave(to, from, next) {
        if(this.isConfirmed){
            next();
        }else {
            if (confirm('您还未支付成功，确定要离开吗？')){
                next();
            }else{
                next(false);
            }
        }
    },
    methods: {
        //获取订单信息
        getOrders(){
                //调用接口
                getOrder(this.pageBean).then(res => {
                    console.log('订单详情'+res);
                    this.qrcodeText = '请支付'+res.data.data[0].orderId+'元'
                    this.orderId = res.data.data[0].orderId
                    console.log(this.tableData);
                })
            },
    },
    created() {
        this.getOrders()
    }
}
</script>

<style lang="css" scoped>
.pay-wrap {
    padding: 10px 0 25px;
    background: #fff
}
.pay-wrap .pay-tips {
    padding: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #4fc08d;
    text-align: center
}
.pay-wrap .pay-tips.enhance {
    color: #c69100
}
.pay-wrap .img-con {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #ddd
}
.pay-wrap .img-con .qr-code {
    width: 100%;
    height: 100%
}
.w{
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}
.button{
	width: 345px;
    height: 36px;
    background: #4fc08d;
    border-radius: 8px;
    color: #ffffff;
    display:block;
    margin:60px auto;
    border: #4fc08d;
}
.buju{
    height: 700px;
}
</style>
