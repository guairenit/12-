import request from "@/utlis/request"

// 获取首页轮播图
export function getHomeBanner() {
  return request({
    url: '/books/show',
    method: 'get',
  })
}
