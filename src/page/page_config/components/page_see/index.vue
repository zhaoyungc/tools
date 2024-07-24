<template>
    <div class="page_see_container page_container">
        <div class="edit_top">
            <div class="phone_container">
                <div class="phone_bg">
                    <img
                        src="//www.metwo.cn/resource/phone.png" />
                </div>
                <div class="phone_win_mask">
                    <div class="phone_win">
                        <PagePreview class="preview_content" editType="handle" @select="handleSelect" :config="config"
                            :configData="configData" :style="pageStyle" :evtId="$root.pageId">
                        </PagePreview>
                    </div>
                </div>
            </div>
            <div class="handle_edit">
                <div class="edit_container">
                    <PageSeeEdit v-if="showKind == 'edit'" :editData="editData" :configData="configData" @delete="onDelete" @deletechildList="resetShowIndex">
                    </PageSeeEdit>
                    <PageSeeAdd v-if="showKind == 'add'" :title="addTitle" :configData="configData"
                        :editModuleKind="editModuleKind" @select="onAddComplate"></PageSeeAdd>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
import PageSeeEdit from './edit/index.vue';
import PageSeeAdd from './add/index.vue';
import PagePreview from '../../page_preview/handle_preview';
import { getBackGroundColor } from '@/common/configured/configs/utils/ActTools.js';
export default {
    name: 'PageSee',
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
            editData: {},
            addKind: '',
            showKind: '',
            children: [],
            childrenIndex: 0,
            addTitle: '',
            editModuleKind: 'rule'
        };
    },
    components: {
        PageSeeEdit,
        PageSeeAdd,
        PagePreview,
    },
    methods: {
        handleSelect(kind, children, index) {
            if (kind == 'select') {
                this.children = children;
                this.childrenIndex = index;
                this.editData = children[index];
                this.showKind = 'edit';
                if (!this.editData.treeSelectMask) {
                    if (this.$root.componentSelectedDom) {
                        this.$root.componentSelectedDom.treeSelectMask = false;
                    }
                    this.editData.treeSelectMask = true;
                    this.$root.componentSelectedDom = this.editData;
                }
            } else {
                this.addKind = kind;
                this.children = children;
                this.childrenIndex = index;
                this.editData = children[index];
                this.showKind = 'add';

                let t = (this.editData || {}).name || '占位';
                if (kind == 'before') {
                    t = t + '之前';
                } else if (kind == 'after') {
                    t = t + '之后';
                } else if (kind == 'in') {
                    t = t + '内部';
                }
                t = t + '添加组件';
                this.addTitle = t;
            }
        },
        onDelete(val) {
            console.log(val);
            this.editModuleKind = this.children[this.childrenIndex].kind;
            const list = this.children;
            list.splice(this.childrenIndex, 1);
            this.children = list;
            this.showKind = 'add';
        },
        resetShowIndex() {
            this.editData.disableData.normalIndex = 0;
        },
        onAddComplate(val) {
            const list = this.children;
            if (this.addKind == 'before') {
                list.splice(this.childrenIndex, 0, val);
            } else if (this.addKind == 'after') {
                list.splice(this.childrenIndex + 1, 0, val);
            } else if (this.addKind == 'in') {
                const children = list[this.childrenIndex];
                if (children.kind == 'tab') { // 特殊逻辑
                    const tabIndex = children.disableData.normalIndex;
                    const tabsChildren = children.propsData.tabsConfig.value[tabIndex].children.value;
                    tabsChildren.push(val);
                } else {
                    children.propsData.children.value = children.propsData.children.value || [];
                    children.propsData.children.value.push(val);
                }
            } else {
                list.splice(this.childrenIndex, 0, val);
            }
            this.childrenIndex = this.childrenIndex + 1;
            this.children = list;
        },
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
    }
};
</script>

<style lang="scss"  scoped>
.page_see_container {
    width: 100%;
    height: auto;
    position: relative;
    overflow-x: auto;

    .edit_top {
        width: 100%;
        height: 100%;
        min-width: 1000px;
        max-height: 900px;
        position: relative;

        .phone_container {
            width: 400px;
            height: auto;

            .phone_bg {
                width: 100%;
                position: relative;
                height: auto;

                .tips {
                    text-align: center;
                    color: red;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 40px;
                    font-weight: bolder;
                }

                img {
                    width: 100%;
                    height: auto;
                }
            }

            .phone_win_mask {
                width: 375px;
                height: 668px;
                position: absolute;
                left: 13px;
                top: 78px;
                overflow: hidden;

                .phone_win {
                    width: 450px;
                    height: 668px;
                    background: #ffffff;
                    overflow-y: scroll;

                    .preview_content {
                        width: 375px;
                        min-height: 100%;
                        position: relative;
                    }
                }
            }
        }

        .handle_edit {
            padding: 10px;
            height: auto;
            position: absolute;
            left: 400px;
            top: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;

            .edit_container {
                width: calc(100% - 20px);
                height: 100%;
                background: #ffffff;
                overflow-y: auto;
                padding-right: 20px;
            }
        }
    }

    .handle_btn {
        width: 100%;
    }
}
</style>
