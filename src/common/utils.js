//是否iphonex 以及以上
function isIphoneX() {
    let ratio = window.devicePixelRatio || 1;
    let screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
    };
    const is =
        /iphone/gi.test(navigator.userAgent) && (screen.height >= 2436 || screen.height === 1792);
    return is;
}

//取得网页query 参数
function getUrlStrs(href) {
    let queryString = '';
    if (!href) {
        href = location.href;
    }
    const urls = href.split('?');
    queryString = urls[1] ? '?' + urls[1] : '';
    const data = {}, reg = new RegExp('([^?=&]+)(=([^&]*))?', 'g');
    queryString.replace(reg, function ($0, $1, $2, $3) {
        data[$1] = $3;
    });
    return data;
}

function isUserLogin() {
    return true;
}

export {
    isIphoneX,
    getUrlStrs,
    isUserLogin,
};
