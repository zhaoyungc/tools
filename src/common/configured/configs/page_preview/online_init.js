// 初始化页面基本信息， 背景等等
// 初始化分享相关信息

import { getBackGroundColor } from '../utils/ActTools.js';

function init(config, evtId) {
    const propsData = config.all.propsData;

    // 配置页面样式
    document.getElementById('app').style.setProperty('background', getBackGroundColor(config));

    // 设置标题
    document.title = propsData.page_title.value || '';

    // 配置 分享
}

export default {
    init
};