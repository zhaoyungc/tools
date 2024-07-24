// container 组件
import { normalBasePropsConfig } from './common/common';

// const eventData = {
//     onEvent: {
//         tip: '接收控制弹窗',
//         info: '接收值是0/1, 0去关闭弹窗， 1去打开弹窗',
//         value: 'container_last_pop_set_status'
//     },
//     emitEvent: {
//         tip: '抛出弹窗状态',
//         info: '抛出的事件名称，参数为0/1， 0关闭弹窗， 1打开弹窗',
//         value: 'container_last_pop_get_status'
//     }
// };

const childrenConfig = {
    tip: '容器字内容',
    noDisplay: true, // 不显示配置
    type: 'array',
    value: []
};

const container1 = {
    type: 'container1', // 子类型
    moduleName: '基本容器组件',
    disableData: { // 页面用到，但是不展示出来配置信息

    },
    propsData: {
        siteType: normalBasePropsConfig.siteType,
        top: {
            tip: '区域距上',
            info: '浮动生效，一个top值',
            type: 'number',
            value: 0
        },
        paddingTop: {
            ...normalBasePropsConfig.paddingTop,
            value: 60
        },
        paddingBottom: {
            ...normalBasePropsConfig.paddingBottom,
            value: 60
        },
        paddingLeft: normalBasePropsConfig.paddingLeft,
        paddingRight: normalBasePropsConfig.paddingRight,
        minHeight: {
            tip: '最小高度',
            type: 'number',
            info: '单位是px',
            value: 0
        },
        bgColor: {
            tip: '背景颜色',
            type: 'color',
            info: '当部分页面需要更改背景色时添加，删除颜色之后就是保持当前页面背景颜色',
            value: ''
        },
        radius: normalBasePropsConfig.radius,
        children: childrenConfig,
    },
    requestData: {

    }
};

// 关于静态的组件，也给其他活动类组件使用，所以propsData下的名字一定要加上组件的kind， 其他的的能标识唯一即可
const container_title = {
    type: 'container_title', // 子类型
    moduleName: '标题容器组件',
    disableData: { // 页面用到，但是不展示出来配置信息

    },
    propsData: {
        containerTitleTitleBgColor: {
            tip: '容器-标题背景颜色',
            type: 'color',
            value: 'keys_main'
        },
        containerTitleFontColor: {
            tip: '容器-标题字体颜色',
            type: 'color',
            value: '#000000'
        },
        containerTitleFont: {
            tip: '容器-标题文案',
            value: '标题'
        },
        containerTitlePaddingTop: {
            tip: '容器-上边距',
            type: 'number',
            value: 28
        },
        containerTitlePaddingBottom: {
            tip: '容器-下边距',
            type: 'number',
            value: 28
        },
        containerTitlePaddingLeft: {
            tip: '容器-左边距',
            type: 'number',
            value: 28
        },
        containerTitlePaddingRight: {
            tip: '容器-右边距',
            type: 'number',
            value: 28
        },
        containerTitleBgColor: {
            tip: '容器-背景颜色',
            type: 'color',
            info: '删除颜色之后就是保持背景颜色',
            value: '#f1f1f1'
        },
        containerTitleRadius: {
            tip: '容器-圆角',
            type: 'number',
            info: '圆角的单位是px',
            value: 0
        },
        children: childrenConfig,
    },
    requestData: {

    }
};

function getConfig() {
    return {
        name: '容器组件',
        info: '这个是容器组件，当需要边距之类的内容时可以使用, 特殊场景可以充当背景填充颜色',
        componentsName: 'PageContainer',
        kind: 'container',
        childs: {
            container1,
            container_title,
        }
    };
}

export default {
    getConfig,
};