// 通用的一些配置
// 暂时收集 
// 二次确认弹窗，  static/cli/tool/common/configured/configs/page_conponents/components/HandleConfirmDialog.vue
// 奖励弹窗       static/cli/tool/common/configured/configs/page_conponents/components/RewardDialog.vue
// 考虑到value默认值的问题，先暂时保留，此配置仅供参考
import { getActiveNormalTimesString } from '../../../utils/TimeSwitch';

// 基础单个属性配置
const normalBaseOptions = {
    bolder: [
        { label: '加粗', value: 'bolder' },
        { label: '不加粗', value: 'normal' },
    ],
    siteType: [
        { label: '浮动', value: 'absolute' },
        { label: '正常位置', value: 'static' }
    ],
    showType: [
        { label: '不显示', value: '0' },
        { label: '显示', value: '1' }
    ],
    alignType: [
        { label: '居中', value: 'center' },
        { label: '居左', value: 'left' }
    ],
    userKindType: [
        { label: '主播', value: 'anchor' },
        { label: '用户', value: 'user' }
    ],
};

// 基础单个字段配置
const normalBasePropsConfig = {
    groupId: {
        tip: 'groupId',
        type: 'group',
        value: '0'
    },
    radius: {
        tip: '圆角',
        type: 'number',
        info: '单位是px',
        value: 0
    },
    beginTime: {
        tip: '开始时间',
        type: 'date', // 时间格式
        value: getActiveNormalTimesString(),
    },
    endTime: {
        tip: '结束时间',
        type: 'date', // 时间格式
        value: getActiveNormalTimesString('end')
    },
    fontSize: {
        tip: '文案字号',
        type: 'number',
        value: 28
    },
    bolder: {
        tip: '加粗',
        type: 'radio',
        options: normalBaseOptions.bolder,
        value: 'normal'
    },
    siteType: {
        tip: '展示位置',
        info: '',
        type: 'radio',
        options: normalBaseOptions.siteType,
        value: 'static'
    },
    showType: {
        tip: '是否显示',
        type: 'radio',
        options: normalBaseOptions.showType,
        value: '0'
    },
    alignType: {
        tip: '对齐方式',
        type: 'radio',
        options: normalBaseOptions.alignType,
        value: 'left'
    },
    paddingTop: {
        tip: '上边距',
        type: 'number',
        value: 28
    },
    paddingBottom: {
        tip: '下边距',
        type: 'number',
        value: 28
    },
    paddingLeft: {
        tip: '左边距',
        type: 'number',
        value: 0
    },
    paddingRight: {
        tip: '右边距',
        type: 'number',
        value: 0
    },
};

// 二次确认弹窗
const normalHandleConfirm = {
    dialogShowType: {
        ...normalBasePropsConfig.showType,
        tip: '二次确认弹窗展示',
        info: '不展示时，以下弹窗相关的内容不需要配置',
        value: '1'
    },
    dialogTitle: {
        tip: '弹窗标题文字',
        value: '開封'
    },
    dialogDesc: {
        tip: '弹窗描述文字',
        type: 'area',
        value: '开启盒子需要8星星，确认开启盒子？'
    },
    dialogTitleColor: {
        tip: '弹窗标题颜色',
        type: 'color',
        value: '#ffffff'
    },
    dialogTitleBgColor: {
        tip: '弹窗标题背景颜色',
        type: 'color',
        value: 'keys_main'
    },
    dialogBtnOk: {
        tip: '弹窗按钮成功文案',
        value: '確認'
    },
    dialogBtnCancle: {
        tip: '弹窗按钮取消文案',
        value: '取り消す'
    },
    dialogBtnBgColor: {
        tip: '弹窗按钮背景颜色',
        type: 'color',
        value: 'keys_btn'
    },
    dialogBtnFontColor: {
        tip: '弹窗按钮文字颜色',
        type: 'color',
        value: '#ffffff'
    },
};

// 奖励弹窗
const normalRewardDialog = {
    rewardDialogShowType: {
        ...normalBasePropsConfig.showType,
        tip: '奖励弹窗展示',
        info: '不展示时以下弹窗相关的内容不需要配置, 只展示toast提示信息',
        value: '1'
    },
    rewardDialogTitle: {
        tip: '奖励弹窗标题文字',
        value: '特典獲得'
    },
    rewardDialogTitleColor: {
        tip: '奖励弹窗标题颜色',
        type: 'color',
        value: '#ffffff'
    },
    rewardDialogTitleBgColor: {
        tip: '奖励弹窗标题背景',
        type: 'color',
        value: 'keys_main'
    },
    rewardDialogImageBgColor: {
        tip: '奖励图背景',
        type: 'color',
        value: '#f1f1f1'
    },
    rewardDialogRewardNameColor: {
        tip: '奖励名字颜色',
        type: 'color',
        value: '#000000'
    },
    rewardDialogBtnOk: {
        tip: '奖励弹窗确认按钮',
        value: '確認'
    },
    rewardDialogBtnCancle: {
        tip: '取消按钮文案',
        value: '取り消す'
    },
    rewardDialogBtnBgColor: {
        tip: '按钮背景颜色',
        type: 'color',
        value: 'keys_btn'
    },
    rewardDialogBtnFontColor: {
        tip: '按钮文字颜色',
        type: 'color',
        value: '#ffffff'
    },
};

export {
    normalHandleConfirm,
    normalRewardDialog,
    normalBasePropsConfig,
    normalBaseOptions,
};