import request from '@/utils/request'

export const getChannels = function () {
    return request({
        url: '/v0/channels',
        method: 'get',
    })
}

export const getAuthURL = function (channelID) {
    return request({
        url: '/v0/channels/' + channelID + '/auth-url',
        method: 'get',
    })
}

export const authorize = function (code, state) {
    return request({
        url: '/v0/channels/0/authorize',
        method: 'get',
        params: {
            code,
            state,
        },
    })
}
