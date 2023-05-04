import request from "@/utlis/request"

//获得帮助模块
export function getHelpList(pageBean) {
    return request({
        url: '/helps/1/' + pageBean.pageSize+"/"+ pageBean.currentPage,
        method: 'get',
        // data ,
    })
}
//获取帮助模块下的问答
export function getInfoList(pageBean) {
    return request({
        url: '/helps/1/' + pageBean.helpId+"/"+  + pageBean.pageSize+"/"+ pageBean.currentPage,
        method: 'get',
        // data ,
    })
}