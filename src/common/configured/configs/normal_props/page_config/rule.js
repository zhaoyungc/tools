// poster 组件
import { normalBasePropsConfig } from './common/common';

function getAutoText() {
    return {
        type: 'autoText',
        moduleName: '自定义文本',
        disableData: {},
        propsData: { // 需要通过配置去改
            color: {
                tip: '文案颜色',
                type: 'color',
                value: 'keys_font'
            },
            font: {
                tip: '文案内容',
                type: 'area',
                value: '这个是 自定义文案'
            },
            fontSize: {
                ...normalBasePropsConfig.fontSize,
                value: 32
            },
            fontLineHeight: {
                tip: '文案行高',
                type: 'number',
                value: 36
            },
            fontWeight: {
                ...normalBasePropsConfig.bolder,
                tip: '文案加粗',
            },
            fontAlign: {
                ...normalBasePropsConfig.alignType,
                tip: '文案对齐方式',
                value: 'center'
            },
            paddingHeng: {
                tip: '左右间距',
                type: 'number',
                value: 28
            },
            paddingShu: {
                tip: '上下间距',
                type: 'number',
                value: 28
            },
            bgColor: {
                tip: '背景颜色',
                type: 'color',
                value: 'keys_main'
            },
            radius: normalBasePropsConfig.radius,
        },
        requestData: {}
    };
}

function getTableLine() {
    return {
        type: 'tableLine',
        moduleName: '真表格',
        disableData: {},
        propsData: { // 需要通过配置去改
            borderColor: {
                tip: '边框分割线颜色',
                type: 'color',
                value: '#cccccc'
            },
            isFull: {
                tip: '是否占满',
                info: '当文案占满宽度时失效',
                type: 'radio',
                options: [{ label: '占满', value: '1' }, { label: '自适应', value: '0' }],
                value: '1',
            },
            rows: {
                tip: '表格配置',
                info: '线配置表头，再配置每一行',
                type: 'array',
                value: [
                    {
                        msg: {
                            tip: '文案',
                            info: '多列英文逗号分隔',
                            type: 'area',
                            value: '等级,奖励'
                        },
                        color: {
                            tip: '颜色',
                            type: 'color',
                            value: 'keys_font'
                        },
                        fontSize: normalBasePropsConfig.fontSize,
                        bolder: {
                            ...normalBasePropsConfig.bolder,
                            tip: '是否加粗',
                            value: '1',
                        },
                    },
                    {
                        msg: {
                            tip: '文案',
                            info: '多列英文逗号分隔',
                            type: 'area',
                            value: '100,玫瑰花'
                        },
                        color: {
                            tip: '颜色',
                            type: 'color',
                            value: 'keys_font'
                        },
                        fontSize: normalBasePropsConfig.fontSize,
                        bolder: {
                            ...normalBasePropsConfig.bolder,
                            tip: '是否加粗',
                            value: '0',
                        },
                    }
                ]
            }
        },
        requestData: {}
    };
}

function getDivider() {
    return {
        type: 'divider',
        moduleName: '文案分割线',
        info: '此内容就是一个分割线,固定1px高度',
        disableData: {},
        propsData: { // 需要通过配置去改
            paddingHeng: {
                tip: '左右间距',
                type: 'number',
                value: 0,
            },
            paddingShu: {
                tip: '上下间距',
                type: 'number',
                value: 28,
            },
            lineColor: {
                tip: '线条颜色',
                type: 'color',
                value: 'keys_font'
            },
            lineColorEnd: {
                tip: '线条两端颜色',
                info: '增加此颜色是为渐变色，此颜色是线条两端颜色',
                type: 'color',
                value: 'keys_bg'
            },
            imageLeft: {
                tip: '图片',
                type: 'image',
                value: 'http://www.metwo.cn/resource/huli.jpeg',
            },
            imageRight: {
                tip: '图片',
                type: 'image',
                value: 'http://www.metwo.cn/resource/huli.jpeg',
            },
            font: {
                tip: '文案内容',
                value: '分割线',
            },
            fontSize: {
                ...normalBasePropsConfig.fontSize,
                value: 24,
            },
            fontColor: {
                tip: '文案颜色',
                type: 'color',
                value: 'keys_font'
            },
            fontBgColor: {
                tip: '文案背景颜色',
                type: 'color',
                info: '不设置时，不展示图片',
                value: 'keys_bg'
            },
        },
        requestData: {}
    };
}


function getConfig() {
    return {
        name: '规则组件',
        componentsName: 'PageRule',
        kind: 'rule',
        childs: {
            autoText: getAutoText(),
            tableLine: getTableLine(),
            divider: getDivider()
        }
    };
}

export default {
    getConfig,
};
