import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import Cookies from 'js-cookie'
import { encrypt } from './jsencrypt'

// const TokenKey = 'token'

// 设置请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const http = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: 'http://192.168.225.131:8082/',
  baseURL: 'http://127.0.0.1:8080/',
  // 超时 由于在获取邮件验证码时时间较长，设置此属性可能导致功能不可用
  // timeout: 10 * 1000
})
// 请求拦截器
http.interceptors.request.use(config => {
  // let token = Cookies.get(TokenKey);
  console.log("进入拦截器")
  console.log(config)
  if(config.url.match('\w*login/register\w*') || config.url.match('\w*login/loginByUserName\w*')){
    //当数据中有password参数时，对此参数进行加密
    var password = config.data.password;
    if (password !== null) {
      //如果密码不为空，进行加密
      config.data.password = encrypt(password);
      console.log("数据加密：" + password + "  " + config.data.password)
    }
  }
  if(!config.url.match("\w*login\w*")){
    //获取本地token
    let token = localStorage.getItem("token");
    console.log("token:" + token)
    if (token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['token'] = token;
    }
  }
  
  if (config.method === 'post' || config.method === 'put' ) {
    console.log("进入post处理方法")
    //对post和put提交表单，
    //防止表单重复提交
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = Cookies.get('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      Cookies.set('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                  // 请求地址
      const s_data = sessionObj.data;                // 请求数据
      const s_time = sessionObj.time;                // 请求时间
      const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        Cookies.set('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(res => {
    console.log("进入响应拦截器")
    console.log(res)
    const code = res.data.code;
    const msg = res.data.msg;
    console.log(msg)

    if (code <200) {
      return res;
    } else if (code === '401') {
      MessageBox.confirm('登录状态已过期，请您重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //token过期，删除当前的用户信息及token
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
        localStorage.removeItem("icon")
        localStorage.removeItem("plus")
        localStorage.removeItem("mail")
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        location.href = '/login';
      })
    } else {
      Message.error(msg);
      return Promise.reject(msg)
    }
  },
  error => {
    console.log("" + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message.error(message)
    return Promise.reject(error)
  }
)

export default http