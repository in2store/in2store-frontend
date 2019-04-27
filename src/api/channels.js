import request from '@/utils/request'

export const getChannels = function () {
    return request({
        url: '/v0/channels',
        method: 'get',
    })
}
