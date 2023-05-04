import request from '@/utlis/request'
import http from '@/utlis/request'

/* 通过分页查询显示题目列表 */
export  function getDiscussions(pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/discussions/3/1/1',
        /* url: '/discussions/3/' + pageBean.pageSize + '/' + pageBean.currentPage + "?time=" + new Date(), */
        method: 'get',
        data:pageBean ,
    })
}
/* 通过用户ID获取头像 */
export function getUserAvatarByUserId(userIds) {
    return http({
        url:"/users/2",
        method: "post",
        data:userIds
    })
}

/* 查询 */
export function searchDiscuss(name,pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/discussions/1/1/1',
        /* url: '/discussions/1' + name + '/' + pageBean?.currentPage, */
        method: 'get',
        // data ,
    })
}
/* 新增 */
export function addDiscuss() {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/discussions',
        /* url: '/discussions', */
        method: 'post',
        // data ,
    })
}

/* 修改 */
export function alterDiscuss() {
    return request({
        url: '/discussions/',
        method: 'put',
        // data ,
    })
}

/* 删除 */
export function deleteDiscuss(id) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/discussions/1',
        /* url: '/discussions/' + id, */
        method: 'delete',
        // data ,
    })
}