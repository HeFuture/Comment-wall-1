

import instance from '@/httpAxios/index'

// 新建walls
export const insertWall = (data) => {
    // data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl
    const { type, message, name, userId, moment, label, color, imgurl } = data
    return instance({
        url: '/wall/insertWall',
        method: 'POST',
        data: {
            type, message, name, userId, moment, label, color, imgurl
        }
    })
}

// 查询留言墙
export const findWallPage = (data) => {
    const { type, label, page } = data
    return instance({
        url: '/wall/findWallPage',
        method: 'POST',
        data: {
            type, label, page
        }
    })
}


// 获取ip地址
export const getUserIp = () => {
    return instance({
        url: '/wall/getUserIp',
        method: 'POST'
    })
}