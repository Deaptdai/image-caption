import request from '@/plugins/axios'

export function getNearestGraph(data) {
    return request({
        url: '/mock/getNearestGraph',
        method: 'get',
        data
    })
}

export function nodeFileUpLoad(data) {
    return request({
        url: '/upload/NodeData',
        method: 'post',
        data
    })
}


