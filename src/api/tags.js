import request from '@/utils/request'

export const getTags = function () {
    return request({
        url: '/v0/tags',
        method: 'get',
    })
}

export const createTag = function (name) {
    return request({
        url: '/v0/tags',
        method: 'post',
        data: {
            name,
        },
    })
}

export const getBooksByTagWithDetail = function (tag, size, offset) {
    return request({
        url: '/v0/tags/0/books-full',
        method: 'get',
        params: {
            name: tag,
            size,
            offset,
        },
    })
}
