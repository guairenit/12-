<template>
    <div class="background">
      <div class="box">
        <div class="warp">
          <div class="table">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed prop="name" label="书籍名称" width="150" />
              <el-table-column prop="writer" label="作者" width="120" />
              <el-table-column
                prop="content"
                label="内容"
                width="500"
                position:center
              />
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="handleDelete(scope.index, scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            @current-change="onChangeCurrent"
            :total="total"
          />
        </div>
      </div>
      <div class="position">
      </div>
    </div>
  </template>
  <script>
  import { getbook, delbook } from "@/api/userCollection.js";
  
  export default {
    name: "APP",
    data() {
      return {
        gotop: false,
        currentPage: 1,
        total: 0,
        tableData: [],
      };
    },
    mounted() {
      //         this.getList
      //   // 此处true需要加上，不加滚动事件可能绑定不成功
      //       window.addEventListener("scroll", this.handleScroll, true);
    },
    methods: {
      async getList() {
        const res = await getbook({ uid: 1, currentPage: this.currentPage });
        //   this.currentPage = res.data.currentPage + 1;
        this.total = res.data?.totalData;
        this.tableData = res.data.data.rows;
      },
      onChangeCurrent(currentindex) {
        this.currentPage = currentindex;
        this.getList();
      },
      handleScroll() {
        let scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
        scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
      },
      toTop() {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        // 实现滚动效果
        const timeTop = setInterval(() => {
          document.body.scrollTop =
            document.documentElement.scrollTop =
            top -=
              50;
          if (top <= 0) {
            clearInterval(timeTop);
          }
        }, 10);
      },
      handleClick(row) {
        console.log(row);
        localStorage.setItem("title", JSON.stringify(row.title));
        this.$router.push("/specificDisscuss");
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm("此操作将删除用户名是" + row.name + "，是否继续?", "警告", {
          type: "warning",
        }).then(() => {
          delbook({
            uid: 1,
            bookid: row.bookId,
          }).then((res) => {
            if (res.userid == "200") {
              // 更新列表
              this.getList();
              // 提示新增成功
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
              console.log(res);
            }
          });
        });
      },
    },
    created() {
      this.getList();
    },
  };
  </script>
  <style lang="css" scoped>
  .background {
    margin: 0;
    padding: 0;
    height: 940px;
    width: 1920px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74, #8e44ad);
    background-size: 500%;
    animation: bgAnimation 15s linear infinite;
  }
  @keyframes bgAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .box {
    width: 900px;
    height: 940px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
  }
  .wrap {
    width: 1200px;
    min-height: 100px;
    display: grid;
    grid-template-columns: 300px 300px 300px;
    justify-content: space-between;
  }
  /* .card {
        width: 100%;
        border-radius: 20px;
        background: #fff;
        box-shadow: -1px 15px 30px;
        transform-style: preserve-3d;
    }
    .des {
        margin-bottom: 20px;
        text-align: center;
        transform: translateZ(50px);
    }
    .des h1 {
        padding: 10px;
        font-size: 26px;
    }
    .des p {
        text-align: left;
        font-size: 20px;
        padding: 0 16px;
        color: #918b8b;
        margin-bottom: 20px;
    }
    .img {
        width: 100%;
        height: 130px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background: url(@/assets/img/user/banner.png);
        position: relative;
    } */
  .table {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-bottom: 30px;
  }
  </style>
  