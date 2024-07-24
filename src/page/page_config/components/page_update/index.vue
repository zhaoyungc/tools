
<template>
    <div class="page_update_container">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
            <template slot="content">
                <div v-for="(instr, index) in instructions" :key="index">{{ instr }}</div>
            </template>
            <el-link type="primary">使用说明</el-link>
        </el-tooltip>
        <el-divider content-position="left"></el-divider>

        <el-form label-position="top" label-width="200px">
            <el-form-item label="选择组件以及修改的字段值">
                <el-cascader class="cascader" popper-class="position-select-card" size="mini" v-model="selectList"
                    :options="optionsList" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="选择想要修改的字段值">
                <BaseForm :data="editData" @change="onChange" :pageAllStyle="getConfigAll"></BaseForm>
            </el-form-item>
            <el-button type="primary" size="mini" @click="toUpdate">同步所有组件</el-button>
        </el-form>
    </div>
</template>
<script type="es6">
import normalProps from '@/common/configured/configs/normal_props/page_config/index.js';
import BaseForm from '../../edit_form/baseForms.vue';

export default {
    name: 'PageUpdate',
    props: {
        configData: { // 全局的默认配置
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data: () => {
        return {
            instructions: [
                '1, 左侧输入数据，能把页面上的所有的内容同步更新成这个数据',
                '2, 做此操作前，先保存数据',
                '3, 配置有联动数据的不能改',
                '4, 适合场景， 多榜单页面复用上线时更新榜单的时间，倒计时时间等等'
            ],
            normalProps: normalProps.getConfig(),
            selectList: [],
            optionsList: [],
            editData: {},
        };
    },
    components: {
        BaseForm,
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
        onChange(new_data) {
            this.editData.value = new_data.value;
        },
        handleChange(vals) {
            if (vals && vals.length >= 3) {
                const kind = vals[0] || '';
                const type = vals[1] || '';
                const key = vals[2] || '';
                this.editData = ((this.normalProps[kind] || {}).childs[type] || {}).propsData[key] || {};
            } else {
                this.editData = {};
            }
        },
        toUpdate() {
            if (this.selectList && this.selectList.length >= 3) {
                const kind = this.selectList[0] || '';
                const type = this.selectList[1] || '';
                const key = this.selectList[2] || '';
                this.toUpdateDom(this.configData.pageConfig, kind, type, key);
                this.$notify.success({
                    title: '批量更新',
                    message: '同步完成'
                });
            } else {
                this.$notify.info({
                    title: '批量更新',
                    message: '先选择要更新的组件'
                });
            }
        },
        toUpdateDom(conf, kind, type, key) {
            if (conf && conf.length > 0) {
                conf.forEach((element) => {
                    if (element && element.kind && element.type) {
                        if (element.kind == kind && element.type == type) {
                            element.propsData[key].value = this.editData.value;
                        }
                        if(element.kind == 'tab') {
                            const tabList = element.propsData.tabsConfig.value;
                            this.toUpdateDom(tabList, kind, type, key);
                        } else if (element.kind == 'container') {
                            const tabList = element.propsData.children.value;
                            this.toUpdateDom(tabList, kind, type, key);
                        }
                    } else {
                        // 只有tab一种情况
                        this.toUpdateDom(element.children.value, kind, type, key);
                    }
                });
            }
        }
    },
    mounted() {
        const list = [];
        for (const key in this.normalProps) {
            if (Object.hasOwnProperty.call(this.normalProps, key)) {
                const normalPropsKey = this.normalProps[key];

                const list1 = [];
                for (const key1 in normalPropsKey.childs) {
                    if (Object.hasOwnProperty.call(normalPropsKey.childs, key1)) {
                        const normalPropsKey1 = normalPropsKey.childs[key1];

                        const list2 = [];
                        for (const key2 in normalPropsKey1.propsData) {
                            if (Object.hasOwnProperty.call(normalPropsKey1.propsData, key2)) {
                                const normalPropsKey2 = normalPropsKey1.propsData[key2];
                                if (!normalPropsKey2.noDisplay && !normalPropsKey2.checkChange) {
                                    list2.push({
                                        label: normalPropsKey2.tip,
                                        value: key2,
                                        data: normalPropsKey2
                                    });
                                }
                            }
                        }
                        list1.push({
                            label: normalPropsKey1.moduleName,
                            value: normalPropsKey1.type,
                            children: list2,
                        });
                    }
                }

                list.push({
                    label: normalPropsKey.name,
                    value: normalPropsKey.kind,
                    children: list1,
                });
            }
        }
        this.optionsList = list;
    }
};
</script>

<style lang="scss"  scoped>
.cascader {
    width: 400px;
}
</style>
