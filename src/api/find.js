import request from '@/utlis/request'


export function pagefind(params){
    return request({
        url: '/books/{id}',
        method: 'get',
        params
    })
} 

export function pagefindone(params){
    return request({
        url: '/books/{id}',
        method: 'get',
        params
    })
} 