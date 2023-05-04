import request from "@/utlis/request"

export function getOrder() {
    return request({
        //获取所有订单
        /* url: '/orders', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/orders',
        method: 'get',
    })
}

export function orderpagefind(params){
    return request({
        //分页查询订单
        /* url: '/orders/3/{pagesize}/{currentpage}', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/orders/3/1/1',
        method: 'get',
        params,
    })
} 

export function getinformation() {
    return request({
        //获取商品信息
        /* url: '/goods', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/goods',
        method: 'get',
    })
}
export function getinformationbyId(data) {
    return request({
        //通过商品id获取商品信息
        /* url: '/goods/{id}', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/goods/1',
        method: 'get',
    })
}
export function getcart() {
    return request({
        //获取购物车信息
        /* url: '/orders', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/goods',
        method: 'get',
    })
}
export function cartpagefind(params){
    return request({
        //分页查询购物车
        /* url: '/orders/3/{pagesize}/{currentpage}', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/goods/3/1/1',
        method: 'get',
        params,
    })
} 
export function deletecart(data) {
    return request({
        //购物车删除
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/orders/1',
        method: 'delete',
        data ,
    })
}

export function addRowInfo() {
    // 新增购物车商品
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/orders',
        method: 'post',
        /* data: params, */
    })
}
export function addOrder() {
    return request({
        //新增订单
        /* url: '/orders', */
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/orders',
        method: 'post',
        // data ,
    })
}
export function payimg(params){
    return request({
        //获取支付二维码图片
        url: '' + new Date(),
        method: 'get',
        params
    })
} 
export function checkcode(params){
    return request({
        //修改购物车数量
        url: '' + new Date(),
        method: 'post',
        params
    })
} 