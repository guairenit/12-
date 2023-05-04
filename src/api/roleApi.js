import request from "@/utlis/request"

//获得全部角色
export function getAllRoleInfoList(data) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/roles',
        /* url: '/roles', */
        method: 'get',
        data ,
    })
}

//获得全部权限
export function getMenuList(data) {
    return request({
        url: '/menus',
        method: 'get',
        data ,
    })
}
//获得单个角色权限
export function getMenuListByRoleId(data) {
    return request({
        url: '/menus/'+data,
        method: 'get',
        data ,
    })
}
// 新增角色
export function addRowInfo(params) {
    // console.log("====================================")
    return request({
        url: '/roles',
        method: 'post',
        data: params,
    })
}
// 修改角色
export function editRowInfo(params) {
    console.log(params)
    return request({
        url: '/roles/1',
        method: 'put',
        data: params,
    })
}
// 删除角色
export function delRowInfo(data) {
    return request({
        url: '/roles/' + data,
        method: 'delete',
        data,
    })
}

// 通过角色关键字查询角色
// export function getRoleByRoleKey(data) {
//     return request({
//         url: '/roles/' + data,
//         method: 'delete',
//         data,
//     })
// }



export function getRoleByRoleKey(data) {
    return request({
        url: '/roles/1/' + data.pageSize+"/"+ data.currentPage + '/' + data.roleKey,
        method: 'get',
        data,
    })
}


//分页获得角色
export function getRoleInfoList(data) {
    return request({
        url:'http://127.0.0.1:4523/m1/1593226-0-default/roles/3/1/1',
        /* url: '/roles/3/' + data.pageSize+"/"+ data.currentPage, */
        method: 'get',
        data ,
    })
}
