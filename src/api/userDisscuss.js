import request from '@/utlis/request.js'

//用户添加收藏讨论
export function adddisscuss({ uid, discussionId }) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/save/discussion/1/1/1',
        method: 'post'
    })
}
//用户删除收藏讨论
export function deldisscuss({ uid, discussionId }) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/save/discussion/2/1/1',
        method: 'delete'
    })
}
//用户查看收藏讨论
export function getdisscuss({ uid, currentPage }) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/save/discussion/3/1/1',
        method: 'get'
    })
}
