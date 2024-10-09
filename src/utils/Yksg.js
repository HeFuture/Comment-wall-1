

// 时间方法
export const dateOne = (time) => {
    let d = new Date(time)
    let Y = d.getFullYear()
    let M = d.getMonth() + 1;//月份从零开始的，所以需要加一
    let D = d.getDate()
    M = M < 10 ? '0' + M : M;
    D = D < 10 ? '0' + D : D;
    let dates = Y + '.' + M + '.' + D;
    return dates
}


// 获取图片url
export const getObjectURL = (file) => {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url;
}