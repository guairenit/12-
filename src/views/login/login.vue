<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">程序猿服务系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
          prefix-icon="el-icon-user"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
          prefix-icon="el-icon-view"
        >
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
      
      <el-form-item prop="checkCode" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.checkCode"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
          prefix-icon="el-icon-magic-stick"
        >
        </el-input>

        <div class="login-code">
          <img  v-if="flag" :src="'data:image/gif;base64,'+ codeImg" @click="getCode" class="login-code-img"/>
          <span v-else-if="!flag" @click="getCode">点击获取</span>
        </div>
      </el-form-item>
      
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
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
          <router-link style="float:right;" class="link-type" :to="'/register'">立即注册</router-link>
          <router-link style="float:left;" class="link-type" :to="'/loginByMail'">使用邮箱登录</router-link>
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
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utlis/jsencrypt';
import { MessageBox, Message } from 'element-ui'
import {getCheckcode, login} from '@/api/login'
export default {
  name: "Login",
  data() {
    return {
      codeImg: "",
      uuid: "",
      flag:false,
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        checkCode: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        checkCode: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: true,
      redirect: undefined
    };
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCode() {
      this.flag = true;
      getCheckcode().then((response) => {
        Message.success(response.data.msg);
        console.log(response)
        this.codeImg = response.data.data.img;
        this.uuid = response.data.data.uuid;
        console.log(this.uuid);
      })
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          //更具remeberMe判断是否存储cookie
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          var data = this.loginForm;
          data.uuid = this.uuid;
          login(data) .then(
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
                  if (this.captchaEnabled) {
                    this.getCode();
                  }
                }
              }).catch(
                error => {
                  console.log(error.message)
                  console.log("error.message")
              }).finally(
                this.loading = false
              )
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