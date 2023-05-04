<template>
    <div class="content">
        <h2>讨论</h2>
        <div class="title">
            <el-card shadow="hover" class="cardOne">
                <div>技术交流</div>
                <img src="@/assets/images/填写.png" alt="" class="logo">
            </el-card>

            <el-card shadow="hover" class="cardTwo">
                <div>求职面试</div>
                <img src="@/assets/images/谈话面试.png" alt="" class="logo">
            </el-card>

            <el-card shadow="hover" class="cardThree">
                <div>职场内推</div>
                <img src="@/assets/images/面试邀请.png" alt="" class="logo">
            </el-card>
        </div>
        <div class="discussions" >
            


            <el-row>
                <el-col :span="24" v-for="(item,index) in discussionList" :key="index" class="discussion">
                <div @click="toComment(item)">
                    <el-card :body-style="{ padding: '12px'}">
                            <!-- <el-button type="text" class="button" @click="toComment(item)"> -->
                        <div  class="discussionFirst">
                            <!-- <el-avatar size="medium" fit="none" :src="item.userIcon"></el-avatar> -->
                            <el-image style="width: 35px; height: 35px; border-radius: 50%;" :src="item.userIcon" fit="cover"></el-image>
                            <span class="discussionTitle" ><strong>{{item.title}}</strong>
                                <el-tag size="mini" style="margin-left:15px">{{item.type}}</el-tag>
                            </span>
                            
                        </div>
                        <div class="discussionDiscription">{{item.content}}</div>
                         <div style="margin:15px">
                            <i class="fa fa-thumbs-o-up" aria-hidden="true" style="margin-left:25px"> {{item.likes}}</i>
                            <i class="fa fa-eye" aria-hidden="true"  style="margin-left:25px"> {{item.click}}</i>
                            <i class="fa fa-commenting-o" aria-hidden="true" style="margin-left:25px"> {{item.commentNumber}}</i>
                         </div>   
                        <div class="bottom clearfix">
                            <time class="time" style="margin-left:15px">{{item.createTime}}</time>
                        </div>
                    </el-card>
                    
                </div>
                </el-col>

                <el-col>
                    <!-- 分页 -->
                    <el-pagination
                        background :current-page="pageBean.currentPage" 
                        :pageSize="pageBean.pageSize" 
                        :total="pageBean.totalData"
                        @current-change="getPagedata" 
                        layout="prev, pager, next" 
                        style="display:flex; justify-content:flex-end">
                    </el-pagination>
                </el-col>
            </el-row>


        </div>
    </div>
    
</template>

<script>
    import {
        getDiscussions,
        getUserAvatarByUserId
    } from '@/api/discussions'
    import axios from "axios"
    export default {
        data(){
            return{
                currentDate: new Date(),
                description:"桥水（中国）投资管理有限公司（“桥水中国”）是美国桥水投资公司在中国设立的全资子公司。美国桥水是一家全球宏观资产管理公司，由瑞·达利欧于1975年创立。桥水专注于建立对世界如何运转的根本性理解"
            
                ,
                pageBean: {
                    currentPage: 1,
                    pageSize: 5,
                    totalData: 0,
                    totalPage: 0
                },
                discussionList:[]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            goTo(){
                this.$router.push('/discussion')
            },
            toComment(item){
                localStorage.setItem("currentDiscussion",JSON.stringify(item))
                this.$router.push('/discussion')
            },
            // 获取数据
            getList() {
                getDiscussions(this.pageBean).then(res => {
                    this.pageBean = res.data.data
                    this.discussionList = res.data.data.rows
                    console.log(res)
                    console.log(this.discussionList);
                    // for(var i = 0; i<this.discussionList.length;i++){
                    //     this.discussionList[i].userIcon = "http://192.168.225.131" + this.discussionList[i].userIcon;
                    // }
                })
            },
            // 获取当前点击的第几页
            // 分页组件传来点击的第几页pageNo
            getPagedata(val){
                this.pageBean.currentPage = val
                this.getList()
            },
        }
    }
</script>

<style lang="less" scoped>

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }


  .discussions {
    width: 800px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 100px;
}
.discussion {
    margin: 7px;
    height: auto;
    // cursor: pointer;
    // background-color: #fff;
}

 .discussionFirst{
    height: 50px;
    width: auto;
    padding: 4px;
    padding-left: 14px;
    display: flex;
    // justify-self: center;
    // align-content: center;
 }
.discussionTitle{
    // height: 60px;
    display:inline-block;
    text-align: center;
    line-height: 50px;
    padding-left: 12px;
 }

.discussionDiscription{
    margin:10px;
    color:#606266;;
    height: 42px;
    width: 680px;
    overflow: hidden;
    line-height: 42px;
    white-space:nowrap;
    text-overflow:ellipsis;
}
.content {
    width: 1000px;
}
.title {
    width: 800px;
    height: 160px;
    display: flex;
    border: 1px solid rgb(209, 209, 209);
    border-radius: 20px;
    justify-content: space-between;
    margin: auto;
}
.title .el-card {
    width: 200px;
    height: 120px;
    margin: 20px;
}
.cardOne {
    font-size: 22px;
    color: aliceblue;
    background-color: #4095e5;
}
.cardTwo {
    font-size: 22px;
    color: rgb(9, 9, 9);
    background-color: #fff;
}
.cardThree {
    font-size: 22px;
    color: rgb(9, 9, 9);
    background-color: #cecece;
}
.icon {
    width: 30px;
    height: 30px;
}
.head {
    padding: 10px;
}
.discription {
    padding: 10px;
}
.logo {
    float: right;
}
</style>