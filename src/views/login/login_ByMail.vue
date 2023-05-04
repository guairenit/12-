<template>
    <div class="login">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">程序猿服务系统</h3>
        <el-form-item prop="mail">
          <el-input v-model="loginForm.mail" type="text" auto-complete="off" placeholder="邮箱">
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode" v-if="captchaEnabled">
          <el-input
            v-model="loginForm.checkCode"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <div class="login-code">
            <el-button
              :loading="loading"
              size="medium"
              type="text"
              @click.native.prevent="getCode"
            >
              <span v-if="!codeLoading">点击获取</span>
              <span v-else-if="codeLoading" disabled>获 取 中...</span>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else disabled>登 录 中...</span>
          </el-button>
          <div v-if="register">
            <router-link style="float:left;" class="link-type" :to="'/register'">立即注册</router-link>
            <router-link style="float:right;" class="link-type" :to="'/login'">使用已有账户登录</router-link>
          </div>
        </el-form-item>
      </el-form>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright</span>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import http from'@/utlis/request'
  import { MessageBox, Message } from 'element-ui'
  
  export default {
    name: "Login",
    data() {
      var checkEmail = (rule, value, cb) => {
        //验证邮箱的正则表达式
        const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (regEmail.test(value)) {
          //合法的邮箱
          return cb();
        }
        cb(new Error("请输入合法的邮箱"));
      };

      return {
        uuid: "",
        loginForm: {
          mail:"",
          checkCode: ""
        },
        loginRules: {
          mail: [
            { required: true, trigger: "blur", message: "请输入您的邮箱" },
            { validator: checkEmail, min:9, max: 18, message: '邮箱格式错误', trigger: 'blur' }
          ],
          checkCode: [{ required: true, trigger: "change", message: "请输入验证码" }]
        },
        codeLoading: false,
        loading: false,
        // 验证码开关
        captchaEnabled: true,
        // 注册开关
        register: true,
        redirect: undefined
      };
    },
    created() {},
    methods: {
      getCode() {
        this.$refs.loginForm.validateField('mail',valid => {
          if(valid != "请输入您的邮箱"){
            this.codeLoading = true;
            http.get('/login/getCheckCodeByMail?mail=' + this.loginForm.mail).then((response) => {
              Message.success(response.data.msg);
              this.uuid = response.data.data.uuid;
              console.log(this.uuid);
              this.$message(response.data.msg);
              this.codeLoading = false;
            })
          }
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            http.post('/login/loginByMail?uuid=' + this.uuid,this.loginForm) .then(
					      response => {
                  if(response.data.code == 200){
                    console.log(response.data)
                    //本地存储返回的用户数据（包括token）
                    localStorage.setItem("userId",response.data.data.userId)
                    localStorage.setItem("username",response.data.data.username)
                    localStorage.setItem("icon",response.data.data.icon)
                    localStorage.setItem("plus",response.data.data.plus)
                    localStorage.setItem("mail",response.data.data.mail)
                    localStorage.setItem("token",response.data.data.token)
                    localStorage.setItem("role",response.data.data.role)
                    if(response.data.data.role === 'admin'){
                      this.$router.push({ path: this.redirect || "/admin" }).catch(()=>{});
                    }else{
                      this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
                    }
                  }else{
                    console.log(response.data)
                    this.loading = false;
                  }
                }).catch(
	                error => {
	                  console.log(error.message)
                })
          }
        });
      }
    }
  };
  </script>
  
  <style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
        width: 100%;
        height: 100vh;
    background-image: url("../../assets/images/login-background.jpg");
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
  
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .login-code-img {
    height: 38px;
  }
  </style>