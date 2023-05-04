
import request from '@/utlis/request.js'

//用户名登录
export function login(data){
    return request({
        url: '/login/loginByUserName?uuid=' + data.uuid,
        method: 'post',
        data
    })
}
//获取验证码图片
export function getCheckcode(params){
    return request({
        url: '/login/getCheckCode?time=' + new Date(),
        method: 'get',
        params
    })
}

//邮箱登录
export function loginByMail(params){
    return request({
        url: '/login/getCheckCodeByMail?uuid=' + params,
        method: 'post',
        params
    })
}

//邮箱登录获取验证码
export function getCheckCodeByMail(params){
    return request({
        url: '/login/getCheckCodeByMail',
        method: 'get',
        params
    })
}

//用户注册
export function register(data){
    return request({
        url: '/login/register?uuid=' + data.uuid,
        method: 'post',
        data
    })

}
//退出登录
export function logoutNew(data){
    return request({
        url: '/logoutNow',
        method: 'get',
        data
    })
}



