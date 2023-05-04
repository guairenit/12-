import request from "@/utlis/request"

//获得全部用户
export function getInfoList(pageBean) {
    return request({
        url: '/users/3/' + pageBean.pageSize+"/"+ pageBean.currentPage,
        method: 'get',
        // data ,
    })
}
// 管理员新增用户
export function addRowInfo(params) {
    // console.log("====================================")
    return request({
        url: '/users',
        method: 'post',
        data: params,
    })
}
// 修改用户信息
export function editRowInfo(params) {
    // console.log(params)
    return request({
        url: '/users',
        method: 'put',
        data: params,
    })
}
// 删除用户
export function delRowInfo(data) {
    return request({
        url: '/users/' + data,
        method: 'delete',
        data,
    })
}

// 重置用户密码
export function resetPassword(data) {
    return request({
        url: '/users/3/' + data,
        method: 'put',
        data,
    })
}

// 通过用户名查询
export function getUserByUsername(data) {
    return request({
        url: '/users/1/' + data.pageSize+"/"+ data.currentPage + '/' +  data.username,
        method: 'get',
        data,
    })
}

//上传用户头像
export function uploadIcon(data){
    return request({
        url: '/users/icon/' + data.get("userId"),
        method: 'post',
        data,
        //上传文件需要设置header
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}
