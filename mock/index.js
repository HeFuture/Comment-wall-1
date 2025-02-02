
// 引入 mock
// let Mock=require('mockjs')
import Mock from 'mockjs'

// 留言 note
export const note=Mock.mock({
    "data|20":[{
        // 创建时间
        "moment":new Date(),
        // id
        "id|+1":1,
        "userId|+1":10,
        // 内容
        "message|24-96":"@cword",
        // lable
        "lable|0-10":0,
        // name
        "name":"@cname",
        // like
        "like|0-120":0,
        // 评论
        "comment|0-120":0,
        // 背景色
        "imgurl|0-4":0,
        // 是否撤销
        "revoke|0-20":0,
        // 是否举报
        "report|0-20":0,
        // 类型
        "type":0,
    }]
})

// 评论
export const comment=Mock.mock({
    "data|20":[{
        // 创建时间
        "moment":new Date(),
        // id
        "id|+1":1,

        "userId|+1":10,
        // 内容
        "message|24-96":"@cword",
        // name
        "name":"@cname",
        // 背景色
        "imgurl|0-13":0,

    }]
})


// 照片 photo
export const photo=Mock.mock({
    "data|19":[{
        // 创建时间
        "moment":new Date(),
        // id
        "id|+1":1,
        "userId|+1":10,
        // 内容
        "message|24-96":"@cword",
        // lable
        "lable|0-10":0,
        // name
        "name":"@cname",
        // like
        "like|0-120":0,
        // 评论
        "comment|0-120":0,
        // 背景色--图片
        "imgurl|2-5":2,
        // 是否撤销
        "revoke|0-20":0,
        // 是否举报
        "report|0-20":0,
        // 类型
        "type":1,
    }]
})
// Mock.mock('/goods/goodAll/','post',()=>{
//     return note
// })