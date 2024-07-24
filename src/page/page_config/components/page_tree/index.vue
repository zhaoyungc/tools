<template>
    <div class="page_tree_container">
        <div class="edit_top">
            <div class="phone_container">
                <div class="phone_bg">
                    <img
                        src="//www.metwo.cn/resource/phone.png" />
                </div>
                <div class="phone_win">
                    <HandlePreview class="preview_content" :config="config" :configData="configData" editType="tree"
                        :style="pageStyle" @select="onPreviewSelect">
                    </HandlePreview>
                </div>
            </div>
            <div class="handle_edit">
                <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                    <template slot="content">
                        <div v-for="(instr, index) in instructions" :key="index">
                            {{ instr }}
                        </div>
                    </template>
                    <el-link type="primary">使用说明</el-link>
                </el-tooltip>
                <el-input class="input_dom" ref="input_dom" v-model="copyNodeStr" size="mini" type="textarea" :rows="2"
                    placeholder="此处粘贴复制过来的组件"></el-input>
                <el-divider content-position="left"></el-divider>
                <div class="edit_container">
                    <el-tree class="" :data="pageDomTree" node-key="id" default-expand-all :expand-on-click-node="false"
                        @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag"
                        @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node }" :class="{
                                select: node.data.currentDom.treeSelectMask,
                            }">
                            <span>{{ node.label }}</span>
                            <span v-if="node.data.labelTip" class="tip">({{ node.data.labelTip }})</span>
                            <span class="handle_ct">
                                <el-button type="text" size="mini" @click.stop="() => copyDom(node)">
                                    复制
                                </el-button>
                                <el-button type="text" size="mini" @click.stop="() => deleteDom(node)">
                                    删除
                                </el-button>
                                <el-button type="text" size="mini" @click.stop="() => jsonCopyDom(node)">
                                    剪切板复制
                                </el-button>
                                <el-button v-if="copyNodeStr" type="text" size="mini"
                                    @click.stop="() => jsonPasteDom(node)">
                                    剪切板粘贴(下部)
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
        </div>
        <input class="copy_area" ref="copy_input" type="text" value="" />
    </div>
</template>
<script type="es6">
import HandlePreview from '../../page_preview/handle_preview';
import { getBackGroundColor } from '@/common/configured/configs/utils/ActTools.js';

export default {
    name: 'PageTree',
    props: {
        config: {
            type: Array,
            default: () => {
                return [];
            }
        },
        configData: { // 全局的默认配置
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data: () => {
        return {
            numIndex: 0,
            copyNodeStr: '',
            instructions: [
                '1, 左侧为预览页面，右侧为现有页面内部的组件层级树',
                '2, 复制：同步在下方复制出来一个相同的模块',
                '3, 删除：删除指定的模块',
                '4, 支持组件拖动排序等等，操作后看左边的效果是否成功',
                '5, 左侧组件点击选中后右侧对应组件会出现红色名称标识，方便快速定位',
                '6, 第三方组件逻辑，可能操作不成功，再重新操作一次',
                '7, 使用剪切板粘贴时一定要注意粘贴的位置，展示位置同复制产生的位置相同'
            ]
        };
    },
    components: {
        HandlePreview,
    },
    methods: {
        jsonCopyDom(node) {
            const addDomStr = JSON.stringify(node.data.currentDom);
            const input = this.$refs.copy_input;
            input.value = addDomStr;
            input.select();
            document.execCommand('copy');
            this.$notify({
                title: '复制成功',
                message: '去对应位置粘贴吧',
            });
        },
        jsonPasteDom(node) {
            try {
                const addDomData = JSON.parse(this.copyNodeStr);
                this.copyNodeStr = '';
                if (addDomData.treeSelectMask) {
                    addDomData.treeSelectMask = false;
                }
                node.data.parentDom.splice(node.data.currentDomIndex + 1, 0, addDomData);
            } catch (error) {
                this.$notify({
                    title: '出错',
                    message: '检查复制内容是否正确，或找技术',
                });
            }
        },
        copyDom(node) {
            const addDom = JSON.parse(JSON.stringify(node.data.currentDom));
            addDom.treeSelectMask = false;
            node.data.parentDom.splice(node.data.currentDomIndex + 1, 0, addDom); // 添加
        },
        deleteDom(node) {
            if (
                node.data.parentDom.length <= 1 &&
                !node.data.currentDom.kind &&
                JSON.stringify(node.data.currentDom) !== '{}' // 非错误组件
            ) {
                this.$notify({
                    title: '错误',
                    message: 'tab组件至少需要一个tab',
                    type: 'error'
                });
            } else {
                node.data.parentDom.splice(node.data.currentDomIndex, 1); // 添加
            }
        },
        getDomTree(conf) {
            const list = [];
            if (conf && conf.length > 0) {
                conf.forEach((element, index) => {
                    let children = [];
                    if (element && element.kind && element.type) {
                        if (element.kind == 'tab') {
                            const tabList = element.propsData.tabsConfig.value;
                            children = this.getDomTree(tabList);
                        } else if (element.kind == 'container') {
                            const tabList = element.propsData.children.value;
                            children = this.getDomTree(tabList);
                        }
                        list.push({
                            id: element.name + '_' + this.numIndex,
                            label: element.name,
                            labelTip: element.moduleName || '',
                            children,
                            parentDom: conf,
                            currentDom: element,
                            currentDomIndex: index,
                        });
                    } else {
                        // 只有tab一种情况
                        if (JSON.stringify(element) == '{}') { // 兼容错误组件
                            list.push({
                                id: 'error_' + this.numIndex,
                                label: '错误组件',
                                children: [],
                                parentDom: conf,
                                currentDom: element,
                                currentDomIndex: index,
                            });
                            this.numIndex = this.numIndex + 1;
                        } else {
                            let tabName = (element.tabName || {}).value || '';
                            if (!tabName) {
                                tabName = '图片tab_' + index;
                            }
                            list.push({
                                id: tabName + '_' + this.numIndex,
                                label: tabName,
                                children: this.getDomTree((element.children || {}).value || []),
                                parentDom: conf,
                                currentDom: element,
                                currentDomIndex: index,
                            });
                            this.numIndex = this.numIndex + 1;
                        }

                    }
                    this.numIndex = this.numIndex + 1;
                });
            }
            return list;
        },
        handleDrop(draggingNode, dropNode, dropType) {
            if (dropType == 'inner') { // 内部
                const addDom = JSON.parse(JSON.stringify(draggingNode.data.currentDom));
                if (dropNode.data.currentDom.kind == 'container') { // 容器内部粘贴
                    const children = dropNode.data.currentDom.propsData.children;
                    children.value.push(addDom);
                    dropNode.data.currentDom.propsData.children = children;
                    draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex, 1); // 删除
                } else if (dropNode.data.currentDom.children) { // tab内部粘贴
                    const children = dropNode.data.currentDom.children;
                    children.value.push(addDom);
                    dropNode.data.currentDom.children = children;
                    draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex, 1); // 删除
                } else {
                    console.error("出错！！！ --请尽快找技术看下--");
                }
            } else if (dropType == 'before') { // 上部
                const addDom = JSON.parse(JSON.stringify(draggingNode.data.currentDom));
                const parentDomLength = draggingNode.data.parentDom.length;
                dropNode.data.parentDom.splice(dropNode.data.currentDomIndex, 0, addDom); // 添加
                this.$nextTick(() => {
                    if (parentDomLength < draggingNode.data.parentDom.length && dropNode.data.currentDomIndex < draggingNode.data.currentDomIndex) {
                        draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex + 1, 1);
                    } else {
                        draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex, 1);
                    }
                });


            } else if (dropType == 'after') { // 下部
                const addDom = JSON.parse(JSON.stringify(draggingNode.data.currentDom));
                const parentDomLength = draggingNode.data.parentDom.length;
                dropNode.data.parentDom.splice(dropNode.data.currentDomIndex + 1, 0, addDom); // 添加
                this.$nextTick(() => {
                    if (parentDomLength < draggingNode.data.parentDom.length && dropNode.data.currentDomIndex < draggingNode.data.currentDomIndex) {
                        draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex + 1, 1);
                    } else {
                        draggingNode.data.parentDom.splice(draggingNode.data.currentDomIndex, 1);
                    }
                });
            }
        },
        allowDrop(draggingNode, dropNode, type) {
            if (draggingNode.data.currentDom.kind) { // 说明是正常组件
                if (!dropNode.data.currentDom.kind) { // 说明是榜单子容器
                    return type == 'inner';
                } else if (dropNode.data.currentDom.kind === "tab") { // 容器类型
                    return false;
                } else if (dropNode.data.currentDom.kind === "container") { // 容器类型
                    return true;
                } else {
                    return type !== 'inner';
                }
            } else { // tab下的子内容
                if (!dropNode.data.currentDom.kind) {
                    return type !== 'inner';
                } else {
                    return false;
                }
            }
        },
        allowDrag(draggingNode) {
            console.log(draggingNode);
            return true;
        },
        handleNodeClick(data, node) {
            console.log(node);
            const newDom = data.currentDom;
            if (newDom.kind && newDom.type) {
                if (this.$root.componentSelectedDom && this.$root.componentSelectedDom.treeSelectMask) {
                    this.$root.componentSelectedDom.treeSelectMask = false;
                }
                newDom.treeSelectMask = true;
                this.$root.componentSelectedDom = newDom;
            }
        },
        onPreviewSelect(kind, children, index) {
            if (this.$root.componentSelectedDom && this.$root.componentSelectedDom.treeSelectMask) {
                this.$root.componentSelectedDom.treeSelectMask = false;
            }
            const newDom = children[index];
            newDom.treeSelectMask = true;
            this.$root.componentSelectedDom = newDom;
        }
    },
    computed: {
        pageStyle() {
            const color = getBackGroundColor(this.configData);
            if (color) {
                return {
                    background: color,
                };
            }
            return {};
        },
        pageDomTree() {
            if (this.config && this.config.length > 0) {
                return this.getDomTree(this.config);
            } else {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.page_tree_container {
    width: 100%;
    height: auto;
    color: #000000;
    position: relative;
    overflow-x: auto;

    .edit_top {
        width: 100%;
        min-width: 1000px;
        max-height: 900px;
        display: flex;

        .phone_container {
            width: 400px;
            height: auto;

            .phone_bg {
                width: 100%;
                height: auto;

                img {
                    width: 100%;
                    height: auto;
                }
            }

            .phone_win {
                width: 375px;
                height: 668px;
                background: #ffffff;
                position: absolute;
                left: 13px;
                top: 78px;
                overflow-y: scroll;

                .preview_content {
                    width: 100%;
                    min-height: 100%;
                    position: relative;
                }
            }
        }

        .handle_edit {
            width: 100%;
            padding: 10px;
            height: auto;
            flex: 1;

            .edit_container {
                width: 100%;
                height: 100%;
                background: #ffffff;
                overflow-y: auto;

                ::v-deep .el-tree-node {
                    .is-drop-inner {
                        background-color: #dae9ff;
                    }
                }

                .custom-tree-node {
                    &.select {
                        color: red;
                    }

                    .tip {
                        padding-left: 0.1rem;
                        color: #a1a1a1;
                    }
                }
            }

            .handle_ct {
                margin-left: 20px;
            }

            .item {
                padding-bottom: 10px;
            }
        }
    }

    .handle_btn {
        width: 100%;
    }

    .copy_area {
        position: absolute;
        opacity: 0;
        user-select: none;
        pointer-events: none;
    }
}
</style>
