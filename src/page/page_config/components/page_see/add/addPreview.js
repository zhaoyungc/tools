import components from '@/common/configured/configs/page_conponents/index';
import {getValueToKey} from '@/common/configured/configs/utils/ParamSwitch.js';

export default {
    name: 'AddPreview',
    props: {
        config: {
            type: Object,
            default: {}
        },
        componentsName: {
            type: String,
            default: ''
        },
        configData: {
            type: Object,
            default: {}
        }
    },
    components: {
        ...components
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
    data: () => {
        return {};
    },
    methods: {
        getResetColorValue(conf) {
            const data = JSON.parse(JSON.stringify(conf));
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
        }
    },

    render(h) {
        if (this.componentsName) {
            return h(this.componentsName, {
                props: {
                    type: this.config.type,
                    editType: 'select',
                    staticData: {
                        data: {
                            evt_id: this.evtId || '0',
                        },
                        disableData: this.config.disableData,
                        propsData: getValueToKey(this.getResetColorValue(this.config.propsData)),
                        eventData: getValueToKey(this.config.eventData),
                        requestData: getValueToKey(this.config.requestData),
                    }
                },
                style: {
                    // width: '375px',
                }
            });
        } else {
            return null;
        }
    }
};
