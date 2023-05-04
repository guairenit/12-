<template>
    <div class="register">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
        <h3 class="title">程序猿服务系统</h3>
        <el-form-item prop="mail">
          <el-input v-model="registerForm.mail" type="text" auto-complete="off" placeholder="邮箱">
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号">
            <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleRegister"
          >
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
            @keyup.enter.native="handleRegister"
          >
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode" v-if="captchaEnabled">
          <el-input
            v-model="registerForm.checkCode"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleRegister"
          >
            <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
          </el-input>
          <div class="register-code">
            <img v-if="flag" :src="'data:image/gif;base64,'+ codeImg" @click="getCode" class="register-code-img"/>
            <span v-else-if="!flag" @click="getCode">点击获取</span>
          </div>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleRegister"
          >
            <span v-if="!loading">注 册</span>
            <span v-else disabled>注 册 中...</span>
          </el-button>
          <div>
            <router-link style="float:left;" class="link-type" :to="'/loginByMail'">使用邮箱登录</router-link>
            <router-link style="float:right;" class="link-type" :to="'/login'">使用已有账户登录</router-link>
          </div>
        </el-form-item>
      </el-form>
      <!--  底部  -->
      <div class="el-register-footer">
        <span>Copyright © 2022</span>
      </div>
    </div>
  </template>
  
  <script>
  // import axios from 'axios'
  // import { encrypt, decrypt } from '@/utlis/jsencrypt';
  // import http from'@/utlis/request'
import { MessageBox, Message } from 'element-ui'
import { getCheckcode, register } from '@/api/login';
  
  export default {
    name: "Register",
    data() {
      const equalToPassword = (rule, value, callback) => {
        //验证两次密码是否一样
        if (this.registerForm.password !== value) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      };
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
        codeImg: "",
        uuid: "",
        flag: false,
        registerForm: {
          username: "",
          password: "",
          confirmPassword: "",
          checkCode: ""
        },
        registerRules: {
          mail: [
            { required: true, trigger: "blur", message: "请输入您的邮箱" },
            { validator: checkEmail, min:9, max: 18, message: '邮箱格式错误', trigger: 'blur' }
          ],
          username: [
            { required: true, trigger: "blur", message: "请输入您的账号" },
            { min: 4, max: 20, message: '用户账号长度必须介于 4 和 20 之间', trigger: 'blur' }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" },
            { min: 4, max: 20, message: '用户密码长度必须介于 4 和 20 之间', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, trigger: "blur", message: "请再次输入您的密码" },
            { required: true, validator: equalToPassword, trigger: "blur" }
          ],
          checkCode: [{ required: true, trigger: "change", message: "请输入验证码" }]
        },
        loading: false,
        captchaEnabled: true
      };
    },
    created() {
    },
    methods: {
      getCode() {
        this.flag=true;
        getCheckcode.then((response) => {
          Message.success(response.data.msg);
          this.codeImg = response.data.data.img;
          this.uuid = response.data.data.uuid;
          console.log(this.uuid)
        })
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true;
            // http.post('/login/register?uuid=' + this.uuid,this.registerForm)
            var data = this.registerForm;
            data.uuid = this.uuid;
            register(data).then((response) => {
              if(response.data.code == 200){
                const username = this.registerForm.username;
                this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
                  dangerouslyUseHTMLString: true,
                  type: 'success'
                }).then(() => {
                  this.$router.push("/login");
                }).catch(() => {});
              }else{
                $message.$alert(response.data.message)
              }
            }).catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            })
            
          }
        });
      }
    }
  };
  </script>
  
  <!-- <style rel="stylesheet/scss" lang="scss"> -->
  <style rel="stylesheet/scss" lang="scss">
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
  
  .register-form {
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
  .register-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .register-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-register-footer {
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
  .register-code-img {
    height: 38px;
  }
  </style>