import request from '@/utils/request'
import * as axios from 'axios'

export const createBook = function (params) {
    return request({
        url: '/v0/books',
        method: 'post',
        data: params,
    })
}

export const getBooksMeta = function (userID, status, size, offset) {
    return request({
        url: '/v0/books/0/meta',
        method: 'get',
        params: {
            userID,
            status,
            size,
            offset,
        },
    })
}

export const getBookByBookID = function (bookID) {
    return request({
        url: '/v0/books/' + bookID,
        method: 'get'
    })
}

export const getBookSummary = function (bookInfo) {
    let entryURL = bookInfo.entryFullUrl + '/' + bookInfo.summaryPath
    return axios({
        baseURL: '',
        url: entryURL,
        method: 'get',
    })
}

export const getBookContent = function (bookInfo, path) {
    let entryURL = bookInfo.entryFullUrl + '/' + path
    return axios({
        baseURL: '',
        url: entryURL,
        method: 'get',
    })
}

export const getBookMetas = function () {
    return request({
        url: '/v0/metas/book',
        method: 'get'
    })
}
