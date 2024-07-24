function resize_size(_width) {
    const rem = _width / 7.5;
    document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
};

function isMobile() {
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
}

function resize_page() {
    console.log("1111");
    if (isMobile()) {
        console.log("2222");
        resize_size(document.documentElement.clientWidth);
    } else {
        console.log("3333");
        resize_size(375);
    }
}
window.addEventListener('resize', resize_page, false);
resize_page();