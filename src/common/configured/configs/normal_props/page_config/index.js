// 组件数据配置
import poster from './poster.js';
import container from './container.js';
import tab from './tab.js';
import auto from './auto.js';
import rule from './rule.js';
import time from './time';
import btn from './btn';

function getConfig() {
    return {
        poster: poster.getConfig(),
        tab: tab.getConfig(),
        container: container.getConfig(),
        rule: rule.getConfig(),
        auto: auto.getConfig(),
        time: time.getConfig(),
        btn: btn.getConfig(),
    };
}

export default {
    getConfig,
};