// 预览与线上展示使用
import components from "../page_conponents/index";
import { getValueToKey } from '../utils/ParamSwitch.js';

export default {
    name: "OnLinePreview",
    props: {
        config: {
            type: Array,
            default: () => {
                return [];
            }
        },
        configData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        evtId: {
            type: String,
            default: () => {
                return '0';
            }
        }
    },
    components: {
        ...components,
    },
    data: () => {
        return {
        };
    },
    computed: {
        colorList() {
            if (this.configData.all) {
                return getValueToKey(this.configData.all.styleData.colorList.value);
            } else {
                return [];
            }
        }
    },
    methods: {
        getResetColorValue(conf) {
            const data = JSON.parse(JSON.stringify((conf)));
            if (data && typeof data == 'object') {
                if (data.constructor == Object) {
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            if (typeof data[key] == 'object') {
                                data[key] = this.getResetColorValue(data[key]);
                            }
                        }
                    }
                    if (data.type == 'color' && data.value.indexOf('#') < 0) {
                        let item = {};
                        for (let index = 0; index < this.colorList.length; index++) {
                            const element = this.colorList[index];
                            if (element.keys == data.value) {
                                item = element;
                                break;
                            }
                        }
                        if (item.color) {
                            data.value = item.color;
                        }
                    }
                } else if (data.constructor == Array) {
                    let list = [];
                    data.forEach(element => {
                        list.push(this.getResetColorValue(element));
                    });
                    return list;
                }
            }
            return data;
        },
        func(node) {
            // 此处不做任何处理，只针对import 做一下兼容，且不改变原来的异步格式
        },
        childLazyLoad(children) {
            if (children && children.length > 0) {
                children.forEach((child, index) => {
                    if (child.kind == 'tab') { // 配置tab
                        const tabChilds = child.propsData.tabsConfig.value || [];
                        tabChilds.forEach(element => {
                            this.childLazyLoad(element.children.value);
                        });
                    } else if (child.kind == 'container') {
                        this.childLazyLoad(child.propsData.children.value);
                    } else if (child.componentsName) { // 配置规则
                        if (components[child.componentsName] && components[child.componentsName].constructor == Function) {
                            components[child.componentsName](this.func);
                        }
                    }
                });
            }
        },
        getChildProps(child) {
            return {
                type: child.type,
                editType: this.editType,
                staticData: {
                    data: {
                        evt_id: this.evtId || '0',
                    },
                    disableData: child.disableData,
                    propsData: getValueToKey(this.getResetColorValue(child.propsData)),
                    eventData: getValueToKey(child.eventData),
                    requestData: getValueToKey(child.requestData),
                }
            };
        },
        // 子内容是否需要提前import组件
        getChilds(h, children, moduleKeyIndex) {
            if (children && children.length > 0) {
                const list = [];
                children.forEach((child, index) => {
                    if (child.kind == 'tab') { // 配置tab
                        const tabList = [];
                        tabList.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                                on: {
                                    input: (i) => {
                                        if (i != child.disableData.normalIndex) {
                                            child.disableData = {
                                                ...child.disableData,
                                                normalIndex: i,
                                            };
                                        }
                                    },
                                }
                            })
                        );

                        const tabChildIndex = child.disableData.normalIndex;
                        const tabChilds = child.propsData.tabsConfig.value;
                        const newChildrens = tabChilds[tabChildIndex].children.value;
                        tabList.push(this.getChilds(h, newChildrens, tabChildIndex));

                        // 把tab下的所有用到的组件都开始import,对于一个页面只有一个吸顶，其他重复情况先忽略
                        // 此问题只针对预览页面处理， 配置页面一般在pc端暂时不会复现此问题
                        if (child.propsData.isFixedTop && child.propsData.isFixedTop.value == '1') { // 吸顶特殊逻辑处理
                            tabChilds.forEach(element => {
                                this.childLazyLoad(element.children.value);
                            });
                        }
                        list.push(
                            h('div', {}, tabList)
                        );
                    } else if (child.kind == 'container') {
                        list.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                            }, [
                                this.getChilds(h, child.propsData.children.value, 0)
                            ])
                        );
                    } else if (child.kind == 'auto') {
                        if (child.propsData.componentName && child.propsData.componentName.value) {
                            const slotName = child.propsData.componentName.value;
                            const extraData = getValueToKey(child.extraData);

                            if (this.$scopedSlots[slotName]) { // 可能配置了但是不存在
                                list.push(
                                    h('div', {}, this.$scopedSlots[slotName](extraData.extra))
                                );
                            } else {
                                console.log(slotName + '- no slot modules');
                            }
                        } else {
                            console.log('no slot name');
                        }

                    } else if (child.componentsName) { // 配置规则
                        list.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                            })
                        );
                    }
                });
                return list;
            } else {
                return h('div', {}, [],);
            }
        }
    },
    render(h) {
        return h('div',
            {
                style: { width: '100%', height: 'auto', },
            },
            [
                this.getChilds(h, this.config, 0)
            ],
        );
    }
};