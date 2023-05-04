<template>
    <div>
        <router-view></router-view>
        <div v-show="$route.meta.showfater2">
            <bread_Crumb/>
<html lang="en">
<body>
    <div class ="buju">
        <div class="cart-wrap w">
            <div class="cart-header">
                <table calss="cart-table" id="cart-table">
                    <tbody>
                        <tr>
                            <td class="cart-cell cell-check">
                                <label>
                                    <el-checkbox v-model="allChecked" @change="handleAllChecked">全选</el-checkbox>
                                </label>
                                
                            </td>
                            <th class="cart-cell cell-info">商品信息</th>
                            <th class="cart-cell cell-price tiaozheng">单价</th>
                            <th class="cart-cell cell-count tiaozheng1">数量</th>
                            <th class="cart-cell cell-total tiaozheng1">合计</th>
                            <th class="cart-cell cell-opera tiaozheng">操作</th>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div class="cart-list">
                <table class="cart-table" data-product-id="26" data-checked="1">
                    
                <tbody >
                    
                    <tr v-for=" item in carList" :key="item.id">
                        
                        <td class="cart-cell cell-check">
                            <el-checkbox v-model="item.isChecked" @change="handleChecked(item,$event)"></el-checkbox>
                        </td>
                        <td class="cart-cell cell-img">
                            <a><img class="p-img" :src="item.img" alt=""></a>
                        </td>
                        <td class="cart-cell cell-info">
                            <a class="link p-name" href="">{{item.goodsname}}</a>
                        </td>
                        <td class="cart-cell cell-price">
                            ￥{{item.price}}
                        </td>

                        <td class="cart-cell cell-count">
                            <span class="count-btn" data-opera-type="minus"><a class="reduce" @click="rec(item)">-</a></span>
                            <input class="count-input" type='number' oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" name="choose_amount" id="buy-num" v-model="item.num">
                            <span class="count-btn" data-opera-type="plus"><a class="add" @click="add(item)">+</a></span>
                        </td>
                        <td class="cart-cell cell-total">￥{{(item.price*item.num)}}</td>
                        <td class="cart-cell cell-opera"><a class="link cart-delete" ><el-button type="text" @click="deleted(item.id)">删除</el-button></a></td>
                    </tr>
                </tbody>
               
                </table>
                </div>
                <div class="cart-footer clear" id="cart-footer">
                    <div class="block">
                </div>
                    <div class="delete-con">
                        <a class="cart-delete-seleced link">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        <el-button type="text" @click="deletedAll">删除选中</el-button>
                        </a>
                    </div>
                    
        
                    <div class="submit-con">
                        <span>总价：</span>
                        <span class="submit-total" >￥{{total}}</span>
                        <button class="btn submit-btn"  :disabled="checkstate" @click="addOrder">去结算</button>
                        <!-- <input type="checkbox" @change="isCheck"> -->
                    </div>
                </div>
                <!-- <el-pagination         
          layout="prev, pager, next,jumper" 
          @current-change="handleCurrentChange"
           :total="pageBean.totalData"
           :pageSize="pageBean.pageSize"
           :current-page.sync="pageBean.currentPage"
            style = "text-align: center;" >
          
        </el-pagination> -->
                
            </div>
            
                </div>
        <!--footer-->

<!--footer-->
    </body>
</html>
    </div>
</div>
</template>

<script>
import { getcart,deletecart,addOrder,cartpagefind} from '@/api/shop';
import axios from 'axios';
import bread_Crumb from './bread_Crumb.vue';
    export default {
    data() {
        return {
            carList: [
            /* { id: 1, imgSrc: '', price: '4399', name: '华为', isChecked: false, num: 1 },
            { id: 2, imgSrc: '', price: '2199', name: 'iPhone11', isChecked: false, num: 1 },
            { id: 3, imgSrc: '', price: '3299', name: '荣耀', isChecked: false, num: 1 },
            { id: 4, imgSrc: '', price: '6299', name: 'iPad', isChecked: false, num: 1 },
            { id: 5, imgSrc: '', price: '5699', name: '小米', isChecked: false, num: 1 } */
            ],
            pageBean: {
                    currentPage: 1,
                    pageSize: 10,
                    totalData: 0,
                    totalPage: 0
                },
            orderlist: [],
            allChecked: false,
            total: 0,
            checkstate: true,
        };
    },
    watch: {
        carList: {
            handler(val) {
                var i = 0;
                this.total = 0;
                this.carList.forEach(item => {
                    if (item.isChecked === true) {
                        i++;
                    }
                    if (item.isChecked === true) {
                        this.total += item.price * item.num;
                        //计算总价
                    }
                    if (i != 0) {
                        this.checkstate = false;
                    }
                    if (i === 0) {
                        this.checkstate = true;
                    }
                    if (i === this.carList.length) {
                        this.allChecked = true;
                    }
                    else {
                        this.allChecked = false;
                    }
                });
            },
            deep: true
        }
    },
    /* computed: {
    //价格总数
    totalPrice() {
        for (i in this.carList) {
            if(this.carList[i].isChecked==true){
                total += this.carList[i].price * this.carList[i].num
            }
        }
        return this.total
    },
}, */
    methods: {
        //获取订单信息
        getcart() {
            //调用接口
            //调用接口
            /* getcart(this.pageBean).then(res => {
                console.log("购物车信息" + res);
                this.carList = res.data.data;
            }); */
            /* 本地服务器node.js简单获取购物车列表请求 */
            axios.get('/api/getdata').then(
                    response => {
                        console.log('获取购物车信息请求成功了',response)
                        this.carList =response.data
                    },
                    error => {
                        console.log('获取购物车信息请求失败了',error.message)
                    }
                )
        },
     //req.query.id

        /* getcart(){
            getcart(this.pageBean).then(res =>{
                    console.log('订单详情'+res);
                    this.tableData = res.data.data
                    console.log(this.tableData);
            })
        }, */
        handleAllChecked(v) {
            this.carList.map(item => {
                item.isChecked = v;
            });
        },
        handleChecked(item, e) {
            item.isChecked = e;
        },
        //增加商品数量
        add(goods) {
            goods.num++;
        },
        //减少商品数量
        rec(goods) {
            if (goods.num > 1) {
                goods.num--;
            }
            else {
                goods.num = 1;
            }
        },
        deleted(id) {
            this.$confirm("是否要删除该商品信息", "警告", {
                type: "warning"
            }).then(() => {
                console.log(id);
                console.log("删除接口");
                //调用删除接口
                deletecart(id).then(res => {
                    console.log("删除接口返回信息");
                    console.log(res);
                    this.getcart();
                });
                this.$message.success("删除成功！");
            });
        },
        deletedAll() {
            //删除所选择列表
            
                var i = 0;
                this.carList.forEach(item => {
                    if (item.isChecked === true) {
                        i++;
                    }
                if(i==0){
                    this.$confirm("你还没有选择你需要删除的商品", "提示", {
                type:"info"
            })
                }
                if(i!=0){
                    this.$confirm("是否要删除所选择的商品信息", "确认", {
                type: "warning"
            }).then(() => {
                this.carList.forEach(item => {
                    console.log("删除接口");
                    if (item.isChecked === true) {
                        deletecart(item.id).then(res => {
                            console.log("删除接口返回信息");
                            console.log(res);
                        });
                    }
                });
                this.getcart();
                this.$message.success("删除成功！");
        })
        }
            
        })
    },
        /* handleCurrentChange(val) {
            console.log(val);
            this.pageBean.currentPage = val;
            // 调用分页接口
            cartpagefind(this.pageBean).then(res => {
                this.tableLoading = false;
                console.log(res);
                this.pageBean = res.data.data;
                this.carList = res.data.data.rows;
            });
            // this.$bus.$emit("page",val)
        }, */
        addOrder() {
            this.orderlist.forEach(item => {
                deletecart(item.id).then(res => {
                    console.log("删除接口返回信息");
                    console.log(res);
                });
            });
            addOrder(this.orderlist + this.total).then(res => {
                console.log("新增订单");
                console.log(res);
                if (res.data.code < 200) {
                    //新增成功
                    this.$message.success("生成订单成功，请尽快支付！");
                    //清除脏数据
                    this.orderlist = this.carList;
                    this.$router.push({ path: "/shoppage/cart/pay" });
                }
                else {
                    //新增失败
                    this.$message.error("购买失败！");
                }
            });
        }
    },
    created() {
        this.getcart();
        /* this.handleCurrentChange(); */
        this.carList.forEach(item => { // 处理后端传过来的数据,如果没有可以判断是否勾选复选框的字段,则需给数据作处理,加上一个isChecked字段,判断复选框勾选
            this.$set(item, 'isChecked', false) // 添加判断的字段
        })
    },
    components: { bread_Crumb }
}
</script>

<style lang="css" scoped>
*{
    margin: 0;
    padding: 0;
}
body{
    background: #f6f6f6;
    font: 12px/1.5 tahoma, arial, Microsoft YaHei, sans-serif;
}
li{
    list-style: none;
}
img{
    display: block;
    border: none;
}
label{
    cursor: pointer;
}
input[type='checkbox']{
    cursor: pointer;
}

/* 定宽布局 */
.w{
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}

/* panel */
/* 超链样式 */
.link{
    color: #999;
    cursor: pointer;
    text-decoration: none;
}
.link:hover{
    color: #c66a00;
}
/* btn */
.btn{
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    border: none;
    background: #4fc08d;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    outline: none;
    cursor: pointer;
    text-decoration: none;
}

/* 面包屑导航 */
.cart-wrap {
    margin-top: 20px !important;
    text-align: left;
}

.cart-wrap .cart-header {
    background: #eee;
}

.cart-wrap .cart-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin-bottom: 10px;
}

.cart-wrap .cart-header .cart-cell {
    height: 40px;
    line-height: 40px;
}

.cart-wrap .cart-table .cell-check {
    width: 30px;
    padding-left: 20px;
    text-align: center;
}

.cart-wrap .cart-header .cell-check {
    width: 130px;
}

.cart-wrap .cart-list .cart-table .cell-img {
    width: 80px;
    padding: 10px;
}

.cart-wrap .cart-list .cart-table .cell-img .p-img {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
}
.cell-info{
    width: 200px;
    padding: 0 10px;
    text-align: center;
}
.cell-price{
    width: 200px;
    text-align: left;
}
.cell-count{
    width: 200px;
    text-align: left;
}
.cell-total{
    width: 100px;
    text-align: left;
}
.cell-opera{
    width: 110px;
    text-align: left;
    
}

.cart-wrap .cart-table .cell-info {
    width: 400px;
    padding: 0 10px;
}
.cell-info {
    width: 460px;
}
.cell-price {
    width: 145px;
}
.cart-wrap .cart-table .cell-info .p-name {
    line-height: 18px;
}
.cell-count {
    width: 160px;
}
.cell-total {
    width: 120px;
}
.cell-opera {
    width: 100px;
}
.cart-wrap .cart-table .cell-price {
    width: 100px;
    text-align: center;
}

.cart-wrap .cart-table .cell-count {
    width: 200px;
    text-align: center;
}

.cart-wrap .cart-table .cell-count .count-input {
    width: 60px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ddd;
    text-align: center;
    vertical-align: middle;
    outline: none;
}

.cart-wrap .cart-table .cell-count .count-btn {
    display: inline-block;
    width: 20px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ddd;
    vertical-align: middle;
    cursor: pointer;
    background: #fff;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.cart-wrap .cart-table .cell-total {
    width: 100px;
    text-align: center;
}

.cart-wrap .cart-list .cart-table .cell-total {
    color: #000;
    font-weight: 700;
}

.cart-wrap .cart-table .cell-opera {
    width: 110px;
    text-align: center;
}

.cart-wrap .cart-footer {
    position: relative;
    line-height: 50px;
    background: #eee;
}

.cart-wrap .cart-footer .select-con {
    float: left;
    padding-left: 20px;
}

.cart-wrap .cart-footer .delete-con {
    float: left;
    margin-left: 20px;
}

.cart-wrap .cart-footer .submit-con {
    float: right;
}

.cart-wrap .cart-footer .submit-con .submit-total {
    font-size: 18px;
    color: #c66a00;
    font-weight: 700;
    margin-right: 30px;
    vertical-align: middle;
}

.cart-wrap .cart-footer .submit-con .submit-btn {
    height: 50px;
    line-height: 50px;
}

.cart-wrap .err-tip {
    padding: 20px 0;
    font-size: 16px;
    color: #f60;
    font-weight: 700;
    background: #eee;
    text-align: center;
}
.w{
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}
.link{
    color: rgb(141, 134, 134);
    cursor: pointer;
    text-decoration: none;
}
.link:hover{
    color: #c66a00;
}
.link-text{
    color: #999;
    text-decoration: none;
}

 .reduce {
    bottom: 0;
}
.block{
    padding-left: 830px;
    padding-top: 3px;
}
.buju{
    height: 700px;
}
.fenye{
    float: right;
}
.tiaozheng{
    padding-left: 25px;
}
.tiaozheng1{
    padding-left: 35px;
}
</style>