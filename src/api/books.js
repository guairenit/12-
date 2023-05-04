import request from '@/utlis/request'

/* 通过分页查询显示题目列表 */
export function getBooks(pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books/3/1/1', 
        /* url: '/books/3/' + pageBean?.pageSize + '/' + pageBean?.currentPage, */
        method: 'get',
        data: pageBean,
    })
}

/* 查询 */
export function searchBook(name,pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books/1/1/1/1',
        /* url: '/books/1' + name +pageBean?.pageSize + '/' + pageBean?.currentPage, */
        method: 'get',
        // data ,
    })
}
/* 新增 */
export function addBook(data) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books',
        /* url: '/books', */
        method: 'post',
        data ,
    })
}

/* 修改 */
export function alterBook() {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books',
        /* url: '/books', */
        method: 'put',
        // data ,
    })
}

/* 删除 */
export function deleteBook(id) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books/1',
        /* url: '/books/' + id, */
        method: 'delete',
        // data ,
    })
}

// 通过分页获取最新书籍
export function getPageBook(params) {
    return request({
        url: `/books/3/${params?.pagesize}/${params?.currentpage}`,
        method: 'get',
    })
}

// 通过id获取书籍信息
export function findBooks(id) {
    return request({
        url: `/books/${id}`,
        method: 'get',
    })
}

//上传书籍封面
export function uploadIcon(data){
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/books/cover/1',
        /* url: '/books/cover/' + data.get("bookId"), */
        method: 'post',
        data,
        //上传文件需要设置header
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}