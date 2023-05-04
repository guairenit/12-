import request from '@/utlis/request'

/* 通过分页查询显示题目列表 */
export function getQuestions(pageBean) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions/3/1/1',
        /* url: '/questions/3/' + pageBean.pageSize+"/"+ pageBean.currentPage, */
        method: 'get',
        data:pageBean ,
    })
}

/* 通过点击行获取题目信息 */
export function getDescription(data) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions/1',
        /* url: '/questions/' + data, */
        method: 'get',
        // data ,
    })
}

/* 通过分类查询题目 */
export function typeGet(pageBean) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/questions/2/1/1/1',
        /* url: '/questions/2/' + pageBean.type + "/" + pageBean.pageSize + "/" + pageBean.currentPage, */
        method: 'get',
        // data ,
    })
}

/* 查询问题 */
export function searchQues(title,pageBean) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions/1/1/1/1',
        /* url: '/questions/1/' + title + "/" + pageBean.pageSize + "/" + pageBean.currentPage, */
        method: 'get',
        // data ,
    })
}
/* 新增问题 */
export function addQues() {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions',
        /* url: '/questions', */
        method: 'post',
        data ,
    })
}

/* 修改问题 */
export function alterQues() {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions',
        /* url: '/questions', */
        method: 'put',
        data ,
    })  
}

/* 删除问题 */
export function deleteQues(id) {
    return request({
        url: 'http://127.0.0.1:4523/m1/1593226-0-default/questions/1',
        /* url: '/questions/' + id, */
        method: 'delete',
        // data ,
    })
}