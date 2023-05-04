/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-18 16:04:55
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-18 16:05:04
 * @FilePath: \“程序员”进阶服务站\demo\src\monitoring\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from "@/store";//引入Vuex的store
//获取当前浏览器的Storage大小
function get_cache_size(t){
    t = t == undefined ? "l" : t;
    var obj = "";
    if(t==='l'){
        if(!window.localStorage) {
            return "当前不支持localStorage存储"
        }else{
            obj = window.localStorage;
        }
    }else{
        if(!window.sessionStorage) {
            return "当前不支持sessionStorage存储"
        }else{
            obj = window.sessionStorage;
        }
    }
    var size = 0;
    if(obj!==""){
        for(let item in obj) {
            if(obj.hasOwnProperty(item)) {
                size += obj.getItem(item).length;
            }
        }
    }
    return size
}
//存储当前Storage大小
store.commit("setMonitoring",{
    title:`当前Location大小:${get_cache_size('l')};当前Session大小:${get_cache_size('s')}`
})
store.commit("setMonitoring",{
    title:`浏览器cookie设置:${navigator.cookieEnabled==true?'开启':'禁用'};当前Cookie:${document.cookie || "暂无"}`
})
//监听页面隐藏或者打开
window.addEventListener("visibilitychange",()=>{
    if(document.hidden){
        store.commit("setMonitoring",{
            title:"离开/隐藏页面"
        })
    }else{
        store.commit("setMonitoring",{
            title:"进入页面"
        })
    }
})
//监听鼠标点击事件
window.addEventListener('mouseup',(event)=>{
    store.commit("setMonitoring",{
        title:"用户点击",
        Element:event.path[0].outerHTML
    })
})
//监听报错信息
window.addEventListener("error",(err)=>{
    store.commit("setMonitoring",{
        title:"报错",
        errorMsg:err.message
    })
})
//在页面刷新、关闭前发送记录的数据，fetch能保证浏览器结束进程前发送请求
window.addEventListener('beforeunload',()=>{
    let arr=JSON.stringify(store.state.monitoring);
    fetch('http://192.168.10.170:8081/sendData', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:arr,
        keepalive: true
        });
    })
