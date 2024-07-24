<script type="es6">

import EditTemplateLabel from './editTemplateLabels.vue';
import BaseForms from './baseForms.vue';

export default {
    name: 'EditForms',
    props: {
        title: {
            type: String,
            default: () => {
                return '配置项';
            }
        },
        config: {
            type: Object,
            default: () => {
                return {};
            }
        },
        configData: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data: () => {
        return {

        };
    },
    components: {
        BaseForms,
        EditTemplateLabel,
    },
    computed: {
        getConfigAll() {
            if (this.configData.all && this.configData.all.styleData) {
                return JSON.parse(JSON.stringify(this.configData.all.styleData));
            } else {
                return {};
            }
        }
    },
    methods: {
        addChild(data, index) {
            this.$emit('add', data, index);
        },
        deleteChild(data, index) {
            this.$emit('delete', data, index);
        },
        dataChange() {
            this.$emit('change');
        },
        getChilds(h, data) {
            if (data) {
                if (!data.noDisplay) {
                    if (Object.hasOwnProperty.call(data, 'tip')) { // 说明是一个配置对象
                        const list = [h('EditTemplateLabel', { props: { data: data } })];
                        if (data.type == 'array' || data.type == 'arrayObject') {
                            const valList = data.value;
                            const childList = [];
                            valList.forEach((val, index) => {
                                const valList = [this.getChilds(h, val)];
                                if (!data.noMore && (!data.disableStaticNum || (data.disableStaticNum > 0 && index >= data.disableStaticNum))) {
                                    const btnList = [];
                                    if (data.value.length > ((data.disableStaticNum || 0) + 1)) {
                                        btnList.push(h(
                                            'el-button',
                                            {
                                                props: {
                                                    type: "primary",
                                                    icon: "el-icon-minus",
                                                    circle: true,
                                                    size: "mini",
                                                },
                                                on: {
                                                    click: () => {
                                                        this.deleteChild(data, index);
                                                    }
                                                }
                                            })
                                        );
                                    }
                                    btnList.push(h(
                                        'el-button',
                                        {
                                            props: {
                                                type: "primary",
                                                icon: "el-icon-plus",
                                                circle: true,
                                                size: "mini",
                                            },
                                            on: {
                                                click: () => {
                                                    this.addChild(data, index);
                                                }
                                            }
                                        })
                                    );
                                    valList.push(h('div', { class: 'handle' }, btnList));
                                }
                                childList.push(
                                    h('div', { class: 'content_item' }, [valList])
                                );
                            });
                            list.push(h('div', { class: 'content' }, childList));
                        } else {
                            if (data.value && typeof data.value == 'object') {
                                list.push(h('div', { class: 'content' }, [this.getChilds(h, data.value)]));
                            } else {
                                list.push(h('div', { class: 'content' }, [
                                    h(
                                        'BaseForms',
                                        {
                                            props: { data: data, pageAllStyle: this.getConfigAll },
                                            on: {
                                                change: (new_data) => {
                                                    data.value = new_data.value;
                                                    if (data.checkChange) {
                                                        this.dataChange();
                                                    }
                                                }
                                            }
                                        }
                                    )
                                ]));
                            }
                        }
                        return [h('div', { class: 'content_item' }, list)];
                    } else { // 说明是一个对象值
                        const list = [];
                        for (const key in data) {
                            if (Object.hasOwnProperty.call(data, key)) {
                                const element = data[key];
                                list.push(this.getChilds(h, element));
                            }
                        }
                        return list;
                    }
                }
            } else {
                return [];
            }
        }
    },

    render(h) {
        return h('div',
            {
                class: 'edit_forms_container',
            },
            [
                h(
                    'el-divider',
                    { props: { contentPosition: 'left' } },
                    [this.title]
                ),
                h(
                    'div',
                    { class: 'content' },
                    [...this.getChilds(h, this.config)]
                ),
            ],
        );
    },
};
</script>

<style lang="scss" scoped>
.edit_forms_container {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;

    .content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
    }

    .content_item {
        width: 100%;
        display: flex;
        padding-bottom: 4px;
        flex-wrap: wrap;
    }

    .label {
        color: #000000;
        width: 120px;
        margin: auto;
    }

    .handle {
        width: 100px;
    }

    ::v-deep .el-icon-minus {
        line-height: unset;
    }
    ::v-deep .el-icon-plus {
        line-height: unset;
    }
}
</style>
