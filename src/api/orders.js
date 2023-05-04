import request from '@/utlis/request'

/* 通过分页查询显示题目列表 */
export function getOrders(pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/orders/3/1/1',
        /* url: '/orders/3/' + pageBean.pageSize + '/' + pageBean.currentPage, */
        method: 'get',
        data:pageBean ,
    })
}

/* 订单id查询 */
export function searchOrder(id) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/orders/1',
        /* url: '/orders/' + id, */
        method: 'get',
        // data ,
    })
}
/* 新增 */
export function addOrder() {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/orders',
        /* url: '/orders', */
        method: 'post',
        // data ,
    })
}

/* 修改 */
export function alterOrder() {
    return request({
        url: '/orders',
        method: 'put',
        // data ,
    })
}

/* 删除 */
export function deleteOrder(id) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/orders',
        /* url: '/orders/' + id, */
        method: 'delete',
        // data ,
    })
}