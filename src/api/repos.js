import request from '@/utils/request'
import * as axios from 'axios'

export const getRepos = function (channelID, size, page) {
    return request({
        url: '/v0/repos',
        method: 'get',
        params: {
            channelID,
            size,
            page
        }
    })
}

export const getBranches = function (channelID, repoFullName, size, page) {
    return request({
        url: '/v0/repos/0/branches',
        method: 'get',
        params: {
            channelID,
            repoFullName,
            size,
            page,
        },
    })
}

export const getRepoSummary = function(repoFullName, branchName) {
    let entryURL = 'https://raw.githubusercontent.com/' + repoFullName + '/' + branchName + '/SUMMARY.md'
    return axios({
        baseURL: '',
        url: entryURL,
        method: 'get',
    })
}
