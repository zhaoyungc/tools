// 倒计时 组件
import { normalBasePropsConfig } from './common/common';

const eventData = {
    emitEvent: {
        tip: '抛出倒计时结束',
        info: '倒计时完成的时候抛出事件, 无参数',
        value: ''
    }
};

function getTime1() {
    return {
        type: 'time1', // 子类型
        moduleName: '倒计时',
        disableData: {

        },
        propsData: {
            beginDesc: {
                tip: '开始前文案',
                info: '未开始前显示的文案',
                value: 'イベントはまだ開始していません。'
            },
            message: {
                tip: '进行中的文案',
                info: '进行中显示的文案',
                value: 'イベント終了まであと：'
            },
            endDesc: {
                tip: '结束的文案',
                info: '结束时间时显示的文案',
                value: 'イベントは終了しています'
            },
            messagePosition: {
                tip: '文案展示位置',
                type: 'radio',
                options: [
                    { label: '上边', value: 'top' },
                    { label: '左边', value: 'left' },
                    { label: '下边', value: 'down' },
                    { label: '右边', value: 'right' },
                ],
                value: 'left'
            },
            beginTime: normalBasePropsConfig.beginTime,
            endTime: normalBasePropsConfig.endTime,
            messageColor: {
                tip: '文案颜色',
                type: 'color',
                value: 'keys_font'
            },
            messageSize: {
                tip: '文案字号',
                type: 'number',
                value: '28'
            },
            messageBolder: {
                ...normalBasePropsConfig.bolder,
                tip: '文案加粗',
            },
            timeColor: {
                tip: '倒计时颜色',
                type: 'color',
                value: 'keys_font'
            },
            timeSize: {
                tip: '倒计时字号',
                type: 'number',
                value: '28'
            },
            timeRightSpace: {
                tip: '倒计时右间距',
                type: 'number',
                value: '10'
            },
            timeBolder: {
                ...normalBasePropsConfig.bolder,
                tip: '倒计时加粗',
            },
            unitColor: {
                tip: '时间单位颜色',
                type: 'color',
                value: 'keys_font'
            },
            unitSize: {
                tip: '时间单位字号',
                type: 'number',
                value: '28'
            },
            unitRightSpace: {
                tip: '时间单位右间距',
                type: 'number',
                value: '10'
            },
            unitBolder: {
                ...normalBasePropsConfig.bolder,
                tip: '时间单位加粗',
            },
            unitList: {
                tip: '时间单位配置', // 使用时知道就行
                info: '秒，分，时，日的顺序，不想要的时间可以写成null,要时间不要单位的空着就行',
                value: '秒,分,時,日',
            },
        },
        eventData,
        requestData: {

        }
    };
}

function getConfig() {
    return {
        name: '倒计时组件',
        kind: 'time',
        componentsName: 'PageTime',
        childs: {
            time1: getTime1()
        }
    };
}

export default {
    getConfig,
};
