import request from '@/utlis/request.js'

//用户添加收藏书籍
export function addbook({ uid, bookid }) {
    return request({
        url: `/save/book/${uid}/${bookid}`,
        method: 'post',
    })
}
//用户删除收藏书籍
export function delbook({ uid, bookid }) {
    return request({
        url: `/save/book/${uid}/${bookid}`,
        method: 'delete',
    })
}
//查看用户收藏书籍
export function getbook({ uid, currentPage }) {
    return request({
        url: `/save/book/3/${uid}/${currentPage}`,
        method: 'get'
    })
}
