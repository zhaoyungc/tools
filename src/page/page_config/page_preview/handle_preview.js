// 操作时使用
import components from "@/common/configured/configs/page_conponents/index";
import { getValueToKey } from '@/common/configured/configs/utils/ParamSwitch.js';
import HandleModules from './handle_modules.vue';
import BtnAdd from './btn_add.vue';

export default {
    name: "HandlePreview",
    props: {
        config: {
            type: Array,
            default: () => {
                return [];
            },
        },
        editType: {
            type: String,
            default: () => {
                return '';
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
        },
    },
    components: {
        ...components,
        HandleModules,
        BtnAdd,
    },
    data: () => {
        return {};
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
        // 获取编辑按钮组件
        getHandleBtns(h, child, type, selectCallBack) {
            return h('HandleModules', {
                slot: 'handle',
                props: {
                    type: type,
                    moduleName: child.name,
                    editType: this.editType,
                    treeSelectMask: child.treeSelectMask || false,
                },
                on: {
                    select: selectCallBack,
                }
            });
        },
        getSelectedStyle(child) {
            if (child.treeSelectMask) {
                return {
                    outline: '2px solid red',
                    margin: '2px',
                };
            } else {
                return {};
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
        getChilds(h, children, moduleKeyIndex ) {
            if (children && children.length > 0) {
                const list = [];
                children.forEach((child, index) => {
                    if (child.kind == 'tab') { // 配置tab
                        const tabList = [];
                        tabList.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                                style: this.getSelectedStyle(child),
                                attrs: {
                                    key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                },
                                nativeOn: {
                                    click: (e) => {
                                        e.stopPropagation();
                                        this.$emit('select', 'select', children, index);
                                    },
                                },
                                on: {
                                    input: (i) => {
                                        if (i != child.disableData.normalIndex) {
                                            child.disableData = {
                                                ...child.disableData,
                                                normalIndex: i,
                                            };
                                        }
                                    }
                                }
                            }, [
                                this.getHandleBtns(h, child, '', (kind) => {
                                    this.$emit('select', kind, children, index);
                                }),
                            ])
                        );

                        const tabChildIndex = child.disableData.normalIndex;
                        const tabChilds = child.propsData.tabsConfig.value;
                        const newChildrens = tabChilds[tabChildIndex].children.value;
                        tabList.push(this.getChilds(h, newChildrens, tabChildIndex));
                        list.push(
                            h('div', {}, tabList)
                        );
                    } else if (child.kind == 'container') {
                        list.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                                style: this.getSelectedStyle(child),
                                attrs: {
                                    key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                },
                                nativeOn: {
                                    click: (e) => {
                                        e.stopPropagation();
                                        this.$emit('select', 'select', children, index);
                                    },
                                }
                            }, [
                                this.getChilds(h, child.propsData.children.value, 0),
                                this.getHandleBtns(h, child, 'container', (kind) => {
                                    this.$emit('select', kind, children, index);
                                }),
                            ])
                        );
                    } else if (child.componentsName) { // 配置规则
                        list.push(
                            h(child.componentsName, {
                                key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                props: this.getChildProps(child),
                                style: this.getSelectedStyle(child),
                                attrs: {
                                    key: child.kind + '_' + child.type + '_' + moduleKeyIndex + '_' + index,
                                },
                                nativeOn: {
                                    click: (e) => {
                                        e.stopPropagation();
                                        this.$emit('select', 'select', children, index);
                                    },
                                }
                            }, [
                                this.getHandleBtns(h, child, '', (kind) => {
                                    this.$emit('select', kind, children, index);
                                }),
                            ])
                        );
                    } else {
                        if (this.editType && this.editType === 'handle') {
                            console.log('错误组件', children, index);
                            list.push(
                                h('div', {}, "错误组件" + child.type)
                            );
                        }
                    }
                });
                return list;
            } else {
                if (this.editType && this.editType === 'handle') {
                    return h('BtnAdd', {
                        on: {
                            select: (kind) => {
                                console.log('kind', kind);
                                this.$emit('select', 'after', children, 0);
                            }
                        }
                    });
                } else {
                    return h('div', {}, [],);
                }
            }
        }
    },

    render(h) {
        return h('div', {},
            [
                this.getChilds(h, this.config, 0)
            ],
        );
    },
};