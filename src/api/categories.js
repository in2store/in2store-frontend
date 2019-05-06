import request from '@/utils/request'

export const getCategories = function () {
    return request({
        url: '/v0/categories',
        method: 'get',
    })
}
