<template>
    <div>
        <returnGo/>
        <div class="content">
            <el-card class="cardOne">
                <div class="head">
                    <img src="@/assets/logo.png" class="icon">
                    <span>阿里巴巴 | 运营 | 面试 | 2022</span>
                </div>
                <div class="discription">
                    <p>
                        【一面】
                        第一轮，8人小组群面。我们组最后是淘汰了2人，那两人是几乎没怎么说话的。<br><br>
                        【二面】
                        第二轮，二对一主管面。主要针对简历上的内容以及校园经历提问。面试问题:
                        1.自我介绍2.实习经历深挖
                        3.在你实习过的公司中选一个，你会选择哪个，为什么?
                        4.由于我之前的实习都是产品运营和销售，所以还问道我的实习经历不相关为什么选择物流运营?5.你认为城市运营是做什么的?
                        6.你的缺点有哪些?
                        整个面试过程两位面试官一位一直笑嘻嘻，另一位面试官超级严肃，面完等了2分钟通知进入到了下一轮面试。这个过程我们组又淘汰了2人。<br><br>
                        【三面】
                        第三轮，大区总经理和HR面，也是二对一。主要是针对一些个人经历，具体如下:1.拿了那几个公司的offer?
                        ⒉.最近一段时间最开心的事是什么?3.职业规划是什么?
                        4.你的优点是什么?5.你为什么选择菜鸟?6.你最遗憾的事是什么?7.遇到的最大的困难以及你是怎么做的?
                    </p>
                </div>
                <div class="click">
                    <span class="like"><i class="el-icon-thumb"></i> 点赞</span>
                    <span class="collect"><i class="el-icon-star-off"></i> 收藏</span>
                </div>
            </el-card>
            <div class="spilt"></div>
            <h2 class="comments">评论</h2>
                <div class="remarks">
                    <div class="remark">
                        <div class="head">
                            <img src="@/assets/logo.png" alt="" class="icon">
                            <span>以往之不谏</span>
                        </div>
                        <div class="dscp">
                            <p>8人小组群面。我们组最后是淘汰了2人</p>
                        </div>
                    </div>
                </div>
                <div class="remarks">
                    <div class="remark">
                        <div class="head">
                            <img src="@/assets/logo.png" alt="" class="icon">
                            <span>以往之不谏</span>
                        </div>
                        <div class="dscp">
                            <p>8人小组群面。我们组最后是淘汰了2人</p>
                        </div>
                    </div>
                </div>
                <div class="remarks">
                    <div class="remark">
                        <div class="head">
                            <img src="@/assets/logo.png" alt="" class="icon">
                            <span>以往之不谏</span>
                        </div>
                        <div class="dscp">
                            <p>8人小组群面。我们组最后是淘汰了2人</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import returnGo from '@/components/return_Go'
    export default {
        components: {
            returnGo
	    },
        
    }
</script>

<style lang="less" scoped>
.content {
    width: 900px;
    height: auto;
    border: 1px solid blue;
    
    padding-bottom: 50px;
    margin-bottom: 50px;
}
.icon {
    width: 30px;
    height: 30px;
}
.cardOne {
    width: 700px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 1px solid #cfcfcf;
}
.discription {
    font-size: 15px;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid #cfcfcf;
}
.click {
    margin-top: 20px;
    cursor: pointer;
}
.like {
    padding: 40px;
    margin-top: 30px;
}
.spilt {
    margin-top: 60px;
    border: 1px solid #cfcfcf;
}
.comments {
    margin: 20px;
}
.cardTow {
    width: 700px;
    margin: auto;
    margin-top: 30px;
}
.remarks {
    margin: 20px;
    width: 700px;
    margin: auto;
    /* border: 1px sandybrown solid; */
}
.remark {
    cursor: pointer;
    background-color: #fff;
}
.head {
    padding-top: 10px;
    margin: 20px;
}
.dscp {
    padding-bottom: 10px;
    margin: 10px;
}
.icon {
    margin-right: 10px;
    width: 30px;
    height: 30px;
}
</style>