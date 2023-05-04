<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>课程</h2>
        <div v-for="(product, index) in productList" :key="index">
          <h3>{{ product.title }}</h3>
          <ul>
            
            <li v-for="(item, index) in (product.list ?? [])" :key="index">
              <router-link :to="'/details/' + item.bookId">{{
                item.name
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <router-link to="/find"
        ><el-input
          class="demo-input-size"
          v-model="input"
          placeholder="搜索书籍"
        ></el-input
      ></router-link>
    </div>
    <div class="index-right">
      <div>
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="(slide, index) in bannerImg" :key="index">
            <img class="swiperimg" :src="slide.imgUrl" alt="书籍图片未能加载成功，请检查您的网络" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item, index) in buyData"
          :key="index"
        >
          <div class="index-board-item-inner">
          <el-image style="width: 100px; height: 125px" :src="item.cover" s fit="fill"></el-image>
            <h2 style="height:50px">{{ item.name }}</h2>
            <!-- <p>{{ item.description }}</p> -->
            <div class="index-board-button">
              <router-link :to="'/details/' + item.bookId" class="button"
                >立即学习</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeBanner } from "@/api/home.js";
import { getPageBook, getBooks } from "@/api/books";
import { getHistoryBook } from "@/utlis/history";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
      },
      bannerImg: [
        {
          id: 1,
          imgUrl: require("@/assets/slideShow/j1.jpg"),
        },
        {
          id: 2,
          imgUrl: require("@/assets/slideShow/j2.jpg"),
        },
        {
          id: 3,
          imgUrl: require("@/assets/slideShow/j3.jpg"),
        },
        {
          id: 4,
          imgUrl: require("@/assets/slideShow/j4.jpg"),
        },
      ],
      input: "",
      productList: [
        {
          title: "最近观看",
          list: [
            {
              id: 1,
              name: " 13天突破C语言",
              url: "",
            },
            {
              id: 2,
              name: "一本吃透数据结构",
              url: "",
            },
          ],
        },
        {
          title: "新品速递",
          list: [
            {
              id: 1,
              name: "2023 大厂前端面试攻略",
              url: "",
            },
            {
              id: 2,
              name: "链表",
              url: "",
            },
            {
              id: 3,
              name: "递归与分治",
              url: "",
            },
            {
              id: 4,
              name: "队列与栈",
              url: "",
            },
            {
              id: 5,
              name: "哈希表",
              url: "",
            },
            {
              id: 6,
              name: "排序算法",
              url: "",
            },
          ],
        },
      ],
      buyData: [
        {
          bookId: 1,
          name: "动态规划精讲（一）",
          description: "全站TOP力扣用户编著，入门动态规划必备",
          url: "openproduct",
        },
        {
          bookId: 2,
          name: "动态规划精讲（二）",
          description: "系列书籍之二，好评如潮的动态规划系统教学内容",
          url: "logo",
        },
        {
          bookId: 1,
          name: "大话必发",
          description: "趣味解读多线程，建立完整多线程世界观",
          url: "golife",
        },
        {
          bookId: 1,
          name: "深入浅出的设计模式",
          description: "详解的23种设计模式，轻松应对各种面试",
          url: "heigh",
        },
        {
          bookId: 1,
          name: "iOS 开发面试突击",
          description: "百大ios面试考点一网打尽，各种面试无忧",
          url: "nnew",
        },
        {
          bookId: 1,
          name: "前端通关手册：React",
          desc: "面试必备React知识册，梳理前端React考点",
          url: "nihao",
        },
        {
          bookId: 1,
          name: "概率题面试突击",
          desc: "资深算法工程师系统梳理面试中的概率问题",
          url: "nihaoya",
        },
        {
          bookId: 1,
          name: "C++ 面试突破",
          desc: "C++ 面试高频知识点详解，带你查缺补漏，轻松突破 C++ 面试",
          url: "hihihi",
        },
      ],
        pageBean: {
            currentPage: 1,
            pageSize: 12,
            totalData: 0,
            totalPage: 0
        },
    };
  },
  methods: {
    async getBook() {
      const res = await getBooks(this.pageBean);
      console.log(res);
      if(res) {
        console.log(res.data);
       this.buyData = res?.data.data.rows;
        // for(var i = 0; i<this.buyData.length;i++){
        //     this.buyData[i].cover = "http://192.168.225.131" + this.buyData[i].cover;
        // }
      }
    },
    async getnewBook() {
      const res = await getPageBook({ pagesize: 1, currentpage: 5 });
      this.productList[1] = {
        title: "新品速递",
        list: res?.data?.rows,
      };
    },
    getBanner() {
      getHomeBanner().then((res) => {
        this.bannerImg = res.data.data;
        console.log(res.data);
        // for(var i = 0; i<this.bannerImg.length;i++){
        //     this.bannerImg[i].imgUrl = "http://192.168.225.131" + this.bannerImg[i].imgUrl;
        // }
      });
    },
  },
  mounted() {
  },
  created() {
    this.getBanner();
    // this.getnewBook();
    this.getBook();
    const books = getHistoryBook();
    if (books.length > 0) {
      this.productList[0] = {
        title: "最近观看",
        /* list: getHistoryBook() ?? [], */
      };
    }
  },
};
</script>

<style scoped lang="less">
.search {
  margin-left: 100px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  margin-bottom: 0px;
}
.index-left-block .hr {
  margin-bottom: 20px;
  height: 1px;
  width: 100%;
  background: #ddd;
}
.index-left-block h2 {
  background: #81d3f8;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
  a {
    color: #222;
  }
}
.demo-input-size {
  padding: 13px;
  margin-top: 0px;
}
.swiperimg {
  width: 100%;
  height: 350px;
}

/* .swiper-size {
    margin-top: 15px;
} */

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.index-wrap {
  width: 1200px;
  margin: 0 auto;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-board-list {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
}
.index-board-item {
  width: 210px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-bottom: 20px;
  float: left;
}
.index-board-item-inner {
  text-align: center;
  min-height: 125px;
  // padding-left: 120px;
}
.index-board-openproduct .index-board-item-inner {
  background: url(@/assets/images/1.png) no-repeat;
}
.index-board-logo .index-board-item-inner {
  background: url(@/assets/images/2.png) no-repeat;
}
.index-board-golife .index-board-item-inner {
  background: url(@/assets/images/3.png) no-repeat;
}
.index-board-heigh .index-board-item-inner {
  background: url(@/assets/images/4.png) no-repeat;
}

.index-board-nnew .index-board-item-inner {
  background: url(@/assets/images/5.png) no-repeat;
}
.index-board-nihao .index-board-item-inner {
  background: url(@/assets/images/6.png) no-repeat;
}
.index-board-nihaoya .index-board-item-inner {
  background: url(@/assets/images/7.png) no-repeat;
}
.index-board-hihihi .index-board-item-inner {
  background: url(@/assets/images/8.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 350px;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
