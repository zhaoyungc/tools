import { normalBasePropsConfig } from './common/common';

const btnHeight = {
    tip: '按钮高度',
    info: '不添加时按照padding为28计算',
    type: 'number',
    value: 0
};

const btnColor = {
    tip: '按钮背景颜色',
    type: 'color',
    value: 'keys_btn'
};

const btnImg = {
    tip: '按钮背景图片',
    type: 'image',
    value: ''
};

const fontColor = {
    tip: '文字颜色',
    type: 'color',
    value: 'keys_font'
};

const font = {
    tip: '文字描述',
    value: '跳转'
};

const jumpKind = {
    tip: '跳转类型',
    info: '一般此处都是打开主H5页面',
    type: 'radio',
    options: [{ label: '自定义', value: 'auto' }, { label: 'url', value: 'url' }],
    value: 'url'
};
const jumpUrl = {
    tip: '跳转链接',
    type: 'url',
    value: ''
};


function getNormalBtn() {
    return {
        type: 'normal', // 子类型
        moduleName: '正常按钮',
        disableData: {},
        propsData: {
            paddingTop: normalBasePropsConfig.paddingTop,
            paddingBottom: normalBasePropsConfig.paddingBottom,
            paddingLeft: normalBasePropsConfig.paddingLeft,
            paddingRight: normalBasePropsConfig.paddingRight,
            btnAlign: {
                tip: '按钮位置',
                type: 'radio',
                options: [
                    { label: '左边', value: 'left' },
                    { label: '中间', value: 'center' },
                    { label: '右边', value: ' right' }
                ],
                value: 'center'
            },
            btnWidth: {
                tip: '按钮宽度',
                info: '不添加时按照文字宽度计算',
                type: 'number',
                value: 0
            },
            btnHeight,
            btnColor,
            btnImg,
            font,
            fontColor,
            fontSize: {
                ...normalBasePropsConfig.fontSize,
                value: '32'
            },
            radius: {
                ...normalBasePropsConfig.radius,
                value: 12
            },
            borderColor: {
                tip: '按钮边框颜色',
                info: '配置颜色就会展示边框，不配置则无边框',
                type: 'color',
                value: ''
            },
            jumpKind,
            jumpUrl,
            trackLabel: {
                tip: '统计标签',
                info: '需要先在「活动配置」里配置「统计event」项',
                value: ''
            }

        },
        requestData: {}
    };
}

function getFixedBtn() {
    return {
        type: 'fixed', // 子类型
        moduleName: '吸底按钮',
        disableData: {},
        propsData: {
            paddingHeng: {
                tip: '外框左右间距',
                type: 'number',
                value: 28
            },
            paddingShu: {
                tip: '外框上下间距',
                type: 'number',
                value: 16
            },
            btnHeight,
            backageColor: {
                tip: '背景颜色',
                type: 'color',
                value: 'keys_main'
            },
            btnColor,
            fontSize: {
                ...normalBasePropsConfig.fontSize,
                value: 32
            },
            fontColor,
            font,
            radius: normalBasePropsConfig.radius,
            jumpKind,
            jumpUrl,
        },
        requestData: {}
    };
}

function getConfig() {
    return {
        name: '按钮组件',
        info: '这个是按钮组件，点击按钮只能是跳转到其他地方',
        kind: 'btn',
        componentsName: 'PageBtn',
        childs: {
            fixed: getFixedBtn(),
            normal: getNormalBtn(),
        }
    };
}

export default {
    getConfig
};
