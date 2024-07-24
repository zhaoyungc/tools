<template>
    <div class="page_see_add_container">
        <el-alert :title="title" type="success" :closable="false">
        </el-alert>
        <el-tabs class="card_tab" v-model="activeName" type="card">
            <template v-for="(normal, normalKey, normalIndex) in normalConfig">
                <el-tab-pane v-if="!normal.noDisplay"
                    :key="normalIndex" :label="normal.name" :name="normalKey">
                    <el-alert v-if="normal.info" :title="normal.info" :closable="false" type="warning">
                    </el-alert>
                    <template v-if="normalKey == activeName">
                        <div v-for="(child, childKey, childIndex) in normal.childs" :key="childIndex"
                            class="child_name">
                            <template v-if="!child.noDisplay">
                                <el-divider content-position="left">{{ child.moduleName }}</el-divider>
                                <div class="preview_ct" @click="toClick(normal, child)">
                                    <div class="preview_scale" :style="previewStyle">
                                        <AddPreview :componentsName="normal.componentsName" :config="child"
                                            :configData="configData"></AddPreview>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>
<script type="es6">
import normalConfig from '@/common/configured/configs/normal_props/page_config/index.js';
import {getBackGroundColor} from '@/common/configured/configs/utils/ActTools.js';
import AddPreview from "./addPreview.js";

export default {
    name: 'PageSeeAdd',
    props: ['title', 'configData', 'editModuleKind'],
    data: () => {
        return {
            activeName: 'rule',
        };
    },
    components: {
        AddPreview,
    },
    methods: {
        toClick(normal, child) {
            const data = {
                name: normal.name,
                kind: normal.kind,
                componentsName: normal.componentsName,
                type: child.type,
                moduleName: child.moduleName || '',
                disableData: child.disableData,
                propsData: child.propsData,
                extraData: child.extraData,
                eventData: child.eventData,
                requestData: child.requestData,
                treeSelectMask: false,
            };
            const newData = JSON.parse(JSON.stringify(data));
            newData.contactChange = normal.contactChange;

            if (newData.kind == 'tab' && newData.type == 'tab1') { // tab添加时，默认增加一个容器
                const tabChilds = newData.propsData.tabsConfig.value || [];
                const container = normalConfig.getConfig().container;
                tabChilds.forEach(tabChild => {
                    const newData1 = JSON.parse(JSON.stringify(({
                        name: container.name,
                        kind: container.kind,
                        componentsName: container.componentsName,
                        type: container.childs.container1.type,
                        moduleName: container.childs.container1.moduleName || '',
                        disableData: container.childs.container1.disableData,
                        propsData: container.childs.container1.propsData,
                        extraData: container.childs.container1.extraData,
                        eventData: container.childs.container1.eventData,
                        requestData: container.childs.container1.requestData,
                        treeSelectMask: false,
                    })));
                    newData1.contactChange = container.contactChange;
                    tabChild.children.value = [newData1];
                });
            }

            this.$emit('select', newData);
        }
    },
    computed: {
        previewStyle() {
            const color = getBackGroundColor(this.configData);
            if (color) {
                return {
                    background: color,
                };
            }
            return {};
        },
        normalConfig() {
            return normalConfig.getConfig();
        }
    },
    mounted() {
        if (this.editModuleKind) {
            this.activeName = this.editModuleKind;
        }
    }
};
</script>

<style lang="scss" scoped>
.page_see_add_container {
    width: 100%;
    color: #000000;
    position: relative;

    .com_name {
        font-size: 0.28rem;
        font-weight: bolder;
    }

    .child_name {
        font-size: 0.28rem;
        padding-left: 0.28rem;
    }

    .preview_ct {
        width: 375px;
        position: relative;
        cursor: pointer;

        .preview_scale {
            pointer-events: none;
            width: 375px;
            min-height: 2rem;
            background: #f1f1f1;

            ::v-deep * {
                // 禁用在这里添加的所有内容的事件
                pointer-events: none !important;
            }
        }
    }

    ::v-deep .el-tabs__nav-scroll{
        height: auto;
    }
    ::v-deep .el-icon-arrow-left{
        line-height: unset;
    }
    ::v-deep .el-icon-arrow-right{
        line-height: unset;
    }

}
</style>
