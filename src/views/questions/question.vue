<template>
    <div>
        <returnGo/>
        <el-card class="card" >
            <div class="question">
                <h1 class="title">题目：{{this.question.title}}</h1>
                <p class="describe">{{this.questionContent.description}}</p>
                <router-view></router-view>
            </div>
        </el-card>

        <div class="answer">
            <div>
                <el-select v-model="value" class="btn">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span @click="clear" ><i class="el-icon-refresh-right"></i></span>
            </div>
            
            <el-input
            class="userAnswer"
            type="textarea"
            :rows="14"
            resize='none'
            placeholder="请输入你的答案"
            v-model="textarea">
            </el-input>
            <el-button type="primary" class="btn" @click="sumbit">提交</el-button>
        </div>
    </div>
</template>

<script>
import returnGo from '@/components/return_Go'
import {getDescription} from '@/api/questions'
    export default {
        components:{
            returnGo
        },
        data() {
            return {
                question: {},
                questionContent:{},
                title:'',
                textarea: '',
                description:'',
                options: [{
                    value: '选项1',
                    label: 'python'
                    }, {
                    value: '选项2',
                    label: 'Java'
                    }, {
                    value: '选项3',
                    label: 'C'
                    }, {
                    value: '选项4',
                    label: 'C++'
                    }, {
                    value: '选项5',
                    label: 'JavaScript'
                    }],
                    value: 'python'
            }
        },
        methods: {
            sumbit(){
                /* console.log(this.textarea),
                console.log(localStorage.getItem('title')); */
                if(this.textarea !== ''){
                    this.$message({
                        message:'提交成功,请等待系统测评',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message:'请输入您的答案后再提交',
                        type:'error'
                    })
                }
            },
            clear(){
                this.textarea = ''
            },
            back(){
                /* console.log(123); */
                /* 返回上一级 */
                this.$router.go(-1)
            },
            //通过点击的对应行，查询对应的题目信息
            getDescription(){
                //调用接口
                console.log(this.question.questionId);
                getDescription(this.question.questionId).then(res => {
                    this.question = res.data.data
                    this.questionContent = res.data.data.questionContent
                    // console.log(this.description);
                })
            }
        },
        mounted() {
            /* this.question.questionId = JSON.parse(localStorage.getItem('questionId')) */
            this.question.questionId = JSON.parse(sessionStorage.getItem('questionId'))
            this.getDescription()
        },
    }
</script>

<style lang="less" scoped>
    .question {
        width: 1000px;
        height: 200px;
    }
    .btn {
        margin: 30px 0 10px 0;
    }
    .return {
        font-size: 30px;
        cursor: pointer;
    }
    .clear {
        margin: 70px 0 10px 10px;
        cursor: pointer;
    }
    .title {
        margin: 20px;
        color: rgb(38, 142, 234);
    }
    .describe {
        margin: 20px;
    }
    .card {
        height: 200px;
    }
    
</style>