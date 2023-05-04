<template>
    <div class="container">
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="昵称" prop="name">
              <el-input v-model.number="ruleForm.name"></el-input>
            </el-form-item>
  
            <el-form-item label="头像" prop="name">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-button v-else slot="trigger" size="mini" type="danger"
                  >点击上传</el-button
                >
              </el-upload>
            </el-form-item>
  
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input type="password" v-model="ruleForm.oldpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <style lang="scss">
  .container {
    width: 1200px;
  }
  .avatar-uploader {
    .el-upload {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
    .el-upload__input {
      position: absolute;
      left: -99999em;
    }
  }
  </style>
  
  <script>
  /* import { updateAvatar } from "@/api/userApi"; */
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("昵称不能为空"));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入新密码"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: "",
          checkPass: "",
          name: "",
          oldpassword: "",
        },
        rules: {
          oldpassword: [
            { message: "请输入旧密码", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          ],
          pass: [{ validator: validatePass, trigger: "blur" }],
          checkPass: [{ validator: validatePass2, trigger: "blur" }],
          name: [{ validator: checkName, trigger: "blur" }],
        },
        imageUrl: "",
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res, file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      async beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        const paramsform = new FormData();
  
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
          return;
        }
  
        paramsform.append("file", file); //传文件
  
        const res = await updateAvatar(1, paramsform);
        this.$message.success("用户头像上传成功");
        this.imageUrl = res?.data?.icon;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  