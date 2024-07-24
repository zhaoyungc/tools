// container 组件

const auto1 = {
    type: 'auto1', // 子类型
    moduleName: '自定义插槽',
    disableData: { // 页面用到，但是不展示出来配置信息

    },
    propsData: { // 需要通过配置去改
        componentName: {
            tip: '插槽自定义名称',
            info: 'slot的名字',
            value: 'Test1'
        }
    },
    extraData: {
        extra: {
            tip: '自定义配置属性',
            info: '这个是固定格式，不要乱加其他的，不好做兼容',
            type: 'array',
            value: [
                {
                    key: {
                        tip: '属性名',
                        value: 'key'
                    },
                    cusInfo: {
                        tip: '提示文案',
                        info: '提示数据，不需要动',
                        value: ''
                    },
                    cusType: {
                        tip: '数据类型',
                        checkChange: true,
                        type: 'radio',
                        options: [
                            { label: '默认', value: 'normal' },
                            { label: '颜色', value: 'color' },
                            { label: '图片', value: 'image' },
                            { label: '时间', value: 'date' },
                            { label: '输入框', value: 'area' },
                            { label: 'json', value: 'json' },
                        ],
                        value: 'normal'
                    },
                    value: {
                        tip: '属性值',
                        type: 'normal',
                        rebaseTypeKeys: 'cusType',
                        value: ''
                    },
                },
            ]
        },
        // 以下配置暂留，用不着
        // extraData: {
        //     tip: '自定义配置属性',
        //     value: {
        //         key: {
        //             tip: '属性名',
        //             value: 'key'
        //         },
        //         cusInfo: {
        //             tip: '提示文案',
        //             value: '这个数据展示在哪'
        //         },
        //         cusType: {
        //             tip: '数据类型',
        //             checkChange: true,
        //             type: 'radio',
        //             options: [
        //                 { label: '默认', value: 'normal' },
        //                 { label: '颜色', value: 'color' },
        //                 { label: '图片', value: 'image' },
        //                 { label: '时间', value: 'date' },
        //                 { label: '输入框', value: 'area' },
        //                 { label: 'json', value: 'json' },
        //             ],
        //             value: 'normal'
        //         },
        //         value: {
        //             tip: '属性值',
        //             type: 'normal',
        //             rebaseTypeKeys: 'cusType',
        //             value: ''
        //         },
        //     },
        // }
    },
    requestData: {

    }
};

function getConfig() {
    return {
        name: '自定义插槽',
        info: '这个只能是技术这边使用',
        kind: 'auto',
        componentsName: 'PageAuto',
        childs: {
            auto1,
        },
        contactChange: (data) => {
            const list = data.extra.value || [];
            list.forEach(element => {
                if (element.value.type != element.cusType.value) {
                    element.value.type = element.cusType.value;
                    element.value.value = '';
                }
            });
            // const extraData = data.extraData.value || {};
            // if (extraData.value.type != extraData.cusType.value) {
            //     extraData.value.type = extraData.cusType.value;
            //     extraData.value.value = '';
            // }
        }
    };
}

export default {
    getConfig,
};