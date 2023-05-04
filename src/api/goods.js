import request from '@/utlis/request'

/* 通过分页查询显示题目列表 */
export function getGoods(pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/goods/3/1/1',
        /* url: '/goods/3/' + pageBean.pageSize + '/' + pageBean.currentPage, */
        method: 'get',
        data:pageBean ,
    })
}

/* 查询 */
export function searchGoods(name,pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/goods/1/1/1/1',
        /* url: '/goods/1/' + name +pageBean?.pageSize + '/' + pageBean?.currentPage, */
        method: 'get',
        // data ,
    })
}
/* 新增 */
export function addGoods() {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/goods',
        /* url: '/goods', */
        method: 'post',
        // data ,
    })
}

/* 修改 */
export function alterGoods() {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/goods',
        /* url: '/goods', */
        method: 'put',
        // data ,
    })
}

/* 删除 */
export function deleteGoods(id) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/goods/1',
        /* url: '/goods/' + id, */
        method: 'delete',
        // data ,
    })
}