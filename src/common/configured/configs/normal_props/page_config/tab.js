// tab 组件

const commonTabsProps = {
    isFixedTop: {
        tip: '是否吸顶',
        info: '直播间弹窗等等需要吸顶',
        type: 'radio', // 单选
        options: [
            { label: '不吸顶', value: '0' },
            { label: '吸顶', value: '1' }
        ],
        value: '0'
    },
    fixedBgColor: {
        tip: '整个区域颜色',
        info: '若设置了间距，会有遮盖颜色',
        type: 'color', // 单选
        value: ''
    },
    fixedPaddingHeng: {
        tip: '左右间距',
        type: 'number', // 单选
        value: 0
    },
    fixedPaddingShu: {
        tip: '上下间距',
        type: 'number', // 单选
        value: 0
    }
};
const normalTabsConfig = {
    tabsConfig: {
        tip: '配置tab名称',
        type: 'array',
        value: [
            {
                tabName: {
                    tip: 'tab名称',
                    value: 'tab1'
                },
                tabWidth: {
                    tip: 'tab宽度',
                    info: '不填数字的时候为默认等分铺满,有数字时固定宽度',
                    type: 'number',
                    value: 0
                },
                children: {
                    tip: 'tab子内容',
                    noDisplay: true, // 不显示配置
                    type: 'array',
                    value: []
                }
            },
            {
                tabName: {
                    tip: 'tab名称',
                    value: 'tab2'
                },
                tabWidth: {
                    tip: 'tab宽度',
                    info: '不填数字的时候为默认等分铺满,有数字时固定宽度',
                    type: 'number',
                    value: 0
                },
                children: {
                    tip: 'tab子内容',
                    noDisplay: true, // 不显示配置
                    type: 'array',
                    value: []
                }
            }
        ]
    }
};

const backgroundColor = {
    tip: '背景颜色',
    type: 'color',
    value: 'keys_main'
};

const backgroundActiveColor = {
    tip: '选中时的背景颜色',
    type: 'color',
    value: 'keys_bg'
};

const fontColor = {
    tip: '字体颜色',
    type: 'color',
    value: 'keys_1'
};

const fontActiveColor = {
    tip: '选中时的字体颜色',
    type: 'color',
    value: 'keys_1'
};

const borderColor = {
    tip: '边框颜色',
    type: 'color',
    value: 'keys_main'
};

const eventData = {
    onEvent: {
        tip: '接收tab切换',
        info: '接收值是一个整数，接受到之后当前的tab切换到对应的内容,参数0/1/2',
        value: ''
    },
    emitEvent: {
        tip: '抛出切换完成',
        info: 'tab切换完成时抛出事件',
        value: ''
    }
};

function getTab1() {
    return {
        type: 'tab1',
        moduleName: '一级tab',
        disableData: {
            normalIndex: 0 // tab在页面上的展示位置
        },
        propsData: {
            // 需要通过配置去改
            ...commonTabsProps,
            backgroundColor,
            backgroundActiveColor,
            fontColor,
            fontActiveColor,
            ...normalTabsConfig
        },
        eventData,
    };
}

function getTab2() {
    return {
        type: 'tab2',
        moduleName: '二级tab',
        disableData: {
            normalIndex: 0 // tab在页面上的展示位置
        },
        propsData: {
            ...commonTabsProps,
            backgroundColor,
            backgroundActiveColor,
            fontColor,
            fontActiveColor,
            borderColor,
            ...normalTabsConfig
        },
        eventData,
    };
}

function getTab3() {
    return {
        type: 'tab3',
        moduleName: '三级tab',
        disableData: {
            normalIndex: 0 // tab在页面上的展示位置
        },
        propsData: {
            ...commonTabsProps,
            backgroundColor,
            backgroundActiveColor,
            fontColor,
            fontActiveColor,
            borderColor,
            ...normalTabsConfig
        },
        eventData,
    };
}

function getConfig() {
    return {
        name: 'Tab组件',
        kind: 'tab',
        componentsName: 'PageTab',
        childs: {
            tab1: getTab1(),
            tab2: getTab2(),
            tab3: getTab3(),
        }
    };
}

export default {
    getConfig
};
