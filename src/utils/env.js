
// 配置编译环境和线上环境之间的切换

// baseUrl:域名地址
// router Mode：路由模式
// baseImgPath：图片存放地址

let baseUrl='';
let routerMode='hash';
let baseImgPath;

if(process.env.NODE_ENV=='development'){
    baseUrl='https://www.huohuo90.com:3002';
    baseImgPath='https://www.huohuo90.com:3002';
}else{
    baseUrl='https://www.huohuo90.com:3002';
    baseImgPath='https://www.huohuo90.com:3002';
}

export{
    baseUrl,
    routerMode,
    baseImgPath
}