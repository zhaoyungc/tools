
function getPreviewUrl(evt_id, evt_sub) {
    const hostname = location.hostname;
    if (hostname == 'www.metwo.cn') { // 线上的
        return 'http://www.metwo.cn/pages/tool/auto_active.html?id=' + evt_id + '&sub=' + evt_sub;
    }
    return './auto_active?id=' + evt_id + '&sub=' + evt_sub;
}

function getConfig(evt_id, evt_sub) {
    return {
        name: '全局页面配置',
        styleData: {
            pageBackageColor: {
                tip: '页面背景颜色',
                info: '控制页面背景颜色',
                type: 'color',
                value: 'keys_bg'
            },
            colorList: {
                tip: '全局颜色配置',
                info: '颜色基本配置，能在其他用颜色的地方把颜色选择出来, '+
                      '<br>以自定义名字作为选择标识，不能重复'+
                      '<br>若配置被删除之后页面上的颜色会被清空,'+
                      '<br>前五个是固定的不能删，改颜色和名字就好,第六个是模板, 新增时以它为基础',
                type: 'array',
                disableStaticNum: 5, // 最前的五个不能删除，也不能在这中间添加
                value: [
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '背景颜色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys', // 作为一个独立的标识，命名方式，改字段key+下划线+毫秒时间戳
                            value: 'keys_bg'
                        },
                        color: {
                            tip: '色值',
                            type: 'color',
                            base: true,
                            value: '#00113f'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '主颜色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys', // 作为一个独立的标识，命名方式，改字段key+下划线+毫秒时间戳
                            value: 'keys_main'
                        },
                        color: {
                            tip: '色值',
                            type: 'color',
                            base: true,
                            value: '#f64282'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '副颜色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys', // 作为一个独立的标识，命名方式，改字段key+下划线+毫秒时间戳
                            value: 'keys_second'
                        },
                        color: {
                            tip: '色值',
                            type: 'color',
                            base: true,
                            value: '#380282'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '按钮背景颜色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys', // 作为一个独立的标识，命名方式，改字段key+下划线+毫秒时间戳
                            value: 'keys_btn'
                        },
                        color: {
                            tip: '色值',
                            type: 'color',
                            base: true,
                            value: '#ff5ee6'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '全局文字颜色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys',
                            value: 'keys_font'
                        },
                        color: {
                            tip: '色值',
                            type: 'color',
                            base: true,
                            value: '#ffffff'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '白色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys',
                            value: 'keys_1'
                        },
                        color: {
                            tip: '自定义色值',
                            type: 'color',
                            base: true,
                            value: '#ffffff'
                        },
                    },
                    {
                        name: {
                            tip: '基本颜色名字',
                            value: '黑色'
                        },
                        keys: {
                            tip: '颜色的标识',
                            noDisplay: true,
                            type: 'keys',
                            value: 'keys_2'
                        },
                        color: {
                            tip: '自定义色值',
                            type: 'color',
                            base: true,
                            value: '#000000'
                        },
                    }
                ]
            },
        },
        propsData: { // 需要通过配置去改
            page_title: {
                tip: '页面的标题',
                info: '展示在页面的title标签上使用的，说明一下这个页面做的事',
                value: ''
            },
            pageUrl: {
                tip: '本次活动的链接',
                info: '页面的链接地址',
                disable: false,
                type: 'url',
                value: getPreviewUrl(evt_id, evt_sub),
            },
        },
    };
}

export default {
    getConfig,
};