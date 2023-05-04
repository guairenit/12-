/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-29 11:40:12
 * @LastEditors: yuu 18082756656@163.com
 * @LastEditTime: 2022-10-19 18:50:44
 * @FilePath: \“程序员”进阶服务站\demo\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/monitoring";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utlis/request'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/icon/iconfont.css'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios';

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


