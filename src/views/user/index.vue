
<template>
  <div>
  <div class="banner">
    <div class="wrapper">
        <div class="head">
          <div class="img_position">
            <router-link to="/usermodification"><img src="@/assets/img/user/user.png" width="100px" height="100px" onclick>
              </router-link><i class="username">雨安杰</i>
          </div>
        </div>
        <div class="body">
        <!-- <router-link to="/userdisscuss"><button class="btn btn1">讨论</button></router-link>
        <router-link to="/usercollection"><button class="btn btn1">收藏</button></router-link>
        <router-link to="/userorder"><button class="btn btn1">订单</button></router-link> -->
              <div class="container">
                <div class="padding">
                  <router-link to="/userdisscuss"><button class="btn btn_disscuss"><i class="fa fa-disscuss">讨论</i></button></router-link>
                </div>
                <div class="padding">
                  <router-link to="/usercollection"><button class="btn btn_collection"><i class="fa fa-collection">收藏</i></button></router-link>
                </div>
                <div class="padding">
                  <router-link to="/shoppage/cart/order"><button class="btn btn_order"><i class="fa fa-order">订单</i></button></router-link>
                </div>
          </div>
        </div>
    </div>
  </div>

  </div>
</template>
<script>
export default {
  name: 'APP',
  data () {
    return {
    }
  },
  methods: {
    
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="css" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .wrapper{
    width: 1600px;
    margin:0 auto;
}
* {
    text-decoration:none;
    padding: 0;
    text-decoration: none;
    box-sizing:border-box;
    font-family: 'Poppins',sans-serif;
   }
   li {
    list-style: none;
   /*  清除全部li前面的小圆点 */
}

/* 清除浮动 */
.clearfix:before,.clearfix:after{
    content: "";
    display: table;

}
.clearfix:after{
    clear: both;
}
h1{
    float: left;
}
.head{
  height: 200px;
  width: 880px;
  border-radius: 20px;
  box-shadow: -1px 10px 20px;
  margin-bottom: 30px;
  margin:0 auto;
  background-color: #9feafa;
}
 img {
  border-radius: 50%;
}
.img_position {
  padding-left: 50px;
  padding-top: 50px;
}
.username {
  padding-left:30px;
  font-size: 30px;
  font-weight: 600;
}
.body{
  height: 400px;
  width: 880px;
  border-radius: 20px;
  box-shadow: -1px 10px 20px;
  margin: 0 auto;
  margin-top: 30px;
}
.banner {
    height: 800px;
}
.banner .wrapper {
    height: 800px;
    width: 900px;
    background-color:#fff;
}
.banner .left{
    float: left;
    padding: 0 20px;
    width: 190px;
    height: 1080px;
    background-color: rgba(0,0,0,0.3);
    line-height: 44px;
}
.banner .left span{
    float: right;
}
.banner .left a{
    font-size: 14px;
    color: #fff;
}
.banner .left a:hover{
    color:#00b4ff   
}
.container {
	display: flex;
  margin:0 auto;
  height: 400px;
  width: 880px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.padding {
  padding-left: 50px;
  padding-right: 50px;
}
.container .btn {
	/* 溢出隐藏 */
	overflow: hidden;
	/* 相对定位 */
	position: relative;
	width: 90px;
	height: 90px;
	text-align: center;
	margin: 0 10px;
	border-radius: 25px;
	background-color: #fff;
	/* 盒子阴影 */
	box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
}
.container .fa {
	/* 字体图标可以直接使用字体大小来设置大小 */
	font-size: 38px;
	/* 缩放0.8倍 */
	transform: scale(0.8);
	/* 行高 让这个字体图标垂直居中于盒子内 */
	line-height: 90px;
	/* 设置一下过渡 */
	/* 第三个值是贝塞尔曲线 让运动曲线有无限可能 可以到官网自行探索 https://cubic-bezier.com/ */
	transition: all 2.4s cubic-bezier(0.31, -0.1, 0.43, 1.59);
}
.container .btn::before {
	content: "";
	/* 绝对定位 */
	position: absolute;
	top: 90%;
	left: -110%;
	width: 120%;
	height: 120%;
	/* 顺时针旋转45度 */
	transform: rotate(45deg);
	transition: all 0.4s cubic-bezier(0.31, -0.1, 0.43, 1.59);
}
.container .btn .fa-disscuss {
	color: #3b5988;
}
.container .btn_disscuss::before {
	background-color: #3b5988;
}
.container .btn .fa-collection {
	color: #00aff0;
}
.container .btn_collection::before {
	background-color: #00aff0;
}
.container .btn .fa-order {
	color: #dc4a38;
}
.container .btn_order::before {
	background-color: #dc4a38;
}
.container .btn:hover::before {
	top: -10%;
	left: -10%;
}
.container .btn:hover .fa {
	color: #fff;
	/* 鼠标移入 恢复到原来的大小 */
	transform: scale(1);
}
</style>
