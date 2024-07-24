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
    if (isMobile()) {
        resize_size(document.documentElement.clientWidth);
    } else {
        resize_size(375);
    }
}
window.addEventListener('resize', resize_page, false);
resize_page();