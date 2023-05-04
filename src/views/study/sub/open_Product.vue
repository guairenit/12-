<template>
  <div class="open">
    <div class="sales-board">
      <div class="sales-board-intro">
        <h2>LEETBOOK特色</h2>
        <p>
          <b>什么是动态规划？</b><br />
          动态规划是运筹学的一个分支，是求解决策过程最优化的过程，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。
        </p>
      </div>

      <div class="sales-board-form">
        <div class="sales-board-line-left">有效时间:</div>
        <div class="sales-board-line-right">
          <Timer :timerData="timerData" />
        </div>
      </div>

      <div class="sales-board-form">
        <div class="sales-board-line-left">产品类型:</div>
        <div class="sales-board-line-right">
          <Types :selecterData="selecterData" />
        </div>
      </div>

      <div class="sales-board-form">
        <div class="index-board-item-inner">
          <div class="index-board-button">
            <el-button style="flex: 1; margin-left: 5px; padding: 10px 20px"
              >试读
            </el-button>
            <el-button :disabled="second > 0" class="button" @click="sendSMS"
              >立即学习 <span v-if="second < 0">({{ second }})</span>
            </el-button>
            <el-button
              style="margin-left: 620px; padding: 10px 10px"
              class="el-icon-star-off"
              >收藏</el-button
            >
            <el-button
              style="margin-left: 5px; padding: 10px 10px"
              class="el-icon-s-promotion"
              >分享</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>
        本 LeetBook 是 LeetCode
        官方推出的动态规划精讲系列第一弹，第一弹将针对动态规划的基本概念、线性动态规划、前缀和以及区间动态规划进行介绍、讲解。
      </p>

      <h3>你将：</h3>
      <ul>
        <li>学习动态规划的基本概念与思路；</li>
        <li>学习如何利用动态规划解决 5 种线性问题；</li>
        <li>学习有关前缀和的 4 种问题；</li>
        <li>学习解决区间动态规划的算法题目。</li>
      </ul>

      <h3>你可以这样学：</h3>
      <ul>
        <li>通过知识讲解与题目练习结合的方式深入理解关键知识点</li>
        <li>通过练习 97 道力扣题掌握 11 种动态规划问题的应用</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Types from "@/components/home_Page/types";
import Timer from "@/components/home_Page/timer";

export default {
  data() {
    return {
      selecterData: [
        {
          value: "基础版",
          id: 1,
        },
        {
          value: "进阶版",
          id: 2,
        },
      ],
      timerData: [
        {
          value: "一季",
          id: 1,
        },
        {
          value: "半年",
          id: 3,
        },
        {
          value: "一年",
          id: 6,
        },
      ],
      second: 0,
    };
  },
  methods: {
    sendSMS() {
      this.second = 3;
      let interval = setInterval(() => {
        //注意 这个方法会一直干到死
        if (this.second > 0) {
          this.second--;
        } else {
          clearInterval(interval); //干到second=0为止
        }
      }, 1000);
    },
  },
  components: {
    Types,
    Timer,
  },
};
</script>

<style scoped>
.open {
  text-align: left;
}
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}

.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
