<template>
    <div id="app" class="page">
        <el-tabs tab-position="left" v-model="tabName" @tab-click="tabChange" v-if="loaded">
            <el-tab-pane name="tab1" label="基础配置">
                <PageAll v-if="tabName == 'tab1'" :configData="configData" />
            </el-tab-pane>
            <el-tab-pane name="tab2" label="页面搭建">
                <PageSee v-if="tabName == 'tab2'" :config="configData.pageConfig" :configData="configData" />
            </el-tab-pane>
            <el-tab-pane name="tab3" label="高级功能">
                <PageTree v-if="tabName == 'tab3'" :config="configData.pageConfig" :configData="configData" />
            </el-tab-pane>
            <el-tab-pane name="tab8" label="批量更新">
                <PageUpdate v-if="tabName == 'tab8'" :configData="configData" />
            </el-tab-pane>
            <el-tab-pane name="tab4" label="json">
                <PageWrite v-if="tabName == 'tab4'" :config="configData" @change="configChange" />
            </el-tab-pane>
        </el-tabs>
        <div class="page_handle_btn">
            <div class="row">
                <el-button type="primary" size="mini" @click="toPreview()">预览</el-button>
            </div>
            <div class="row">
                <el-button type="primary" size="mini" @click="toSave()">保存</el-button>
            </div>
            <div class="row">
                <input class="copy_input" ref="copy_input" type="text" value="">
                <el-button type="success" size="mini" @click="toCopyLink()">复制链接</el-button>
            </div>
        </div>
        <LoginDialog v-if="showLoginDialog" @ok="loginSuccess" @cancel="toCancel"></LoginDialog>

    </div>
</template>
<script type="es6">
import PageAll from './components/page_all/index.vue';
import PageSee from './components/page_see/index.vue';
import PageTree from './components/page_tree/index.vue';
import PageUpdate from './components/page_update/index.vue';
import PageWrite from './components/page_write/index.vue';
import { getData, setData } from '@/common/configured/configs/utils/ParamRequest.js';
import { getCheckData, getShowData, getRepairData, getSaveData } from '@/common/configured/configs/utils/ParamSwitch.js';
import login from '@/common/login';
import LoginDialog from '@/components/LoginDialog.vue';

export default {
    name: 'App',
    data: () => {
        return {
            loaded: false,
            configData: {},
            tabName: 'tab1',
            showLoginDialog: false,

        };
    },
    components: {
        PageAll,
        PageWrite,
        PageTree,
        PageUpdate,
        PageSee,
        LoginDialog,
    },
    methods: {
        async getConfig() {
            if (this.$root.pageId) {
                const data = await getData(this.$root.pageId);
                console.log('download data, this is can edit for developer', data);
                this.configData = getShowData(data, this.$root.pageId);
            } else {
                this.configData = getShowData({}, this.$root.pageId);
            }
            this.loaded = true;
        },
        toSave() {
            // 获取提示
            const tipList = getCheckData(this.configData);
            if (tipList && tipList.length > 0) {
                const msg = '<div>' + tipList.join('<br>') + '</div>';
                this.$confirm(msg, '请确认以下配置不完整内容', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '继续提交',
                    cancelButtonText: '返回编辑',
                    type: 'warning'
                }).then(() => {
                    this.toSendSaveData();
                }).catch(() => {
                    // --
                });
            } else {
                this.toSendSaveData();
            }

        },
        toSendSaveData() {
            // 取消本地所有选中
            this.$root.componentSelectedDom.treeSelectMask = false;

            // 自动修复数据
            getRepairData(this.configData, this.$root.pageId);

            const saveData = getSaveData(this.configData);
            console.log('save data, this is can edit for developer', this.configData);

            setData(this.$root.pageId, saveData).then((res)=>{
                this.configData.staticData = saveData.staticData;
                console.log(res);
            }).catch((res)=>{
                if (res) {
                    window.alert(res);
                }
            });
        },
        // 重新拼接一个编辑页面，不需要返回
        reloadPage() {
            if (this.$root.pageId) {
                window.location.reload();
            } else {
                alert('地址错误');
            }
        },
        toPreview() {
            if (!this.$root.pageId) {
                alert('页面错误，不能预览，缺少page_id');
                return;
            }
            const pageUrl = this.getPreviewUrl();
            window.open(pageUrl);
        },
        toCopyLink() {
            if (!this.$root.pageId) {
                alert('页面错误，不能复制，缺少page_id');
                return;
            }
            const pageUrl = this.getPreviewUrl();
            const input = this.$refs.copy_input;
            input.value = pageUrl;
            input.select();
            document.execCommand('copy');
            this.$notify({
                title: '复制链接成功',
                message: pageUrl
            });
        },
        getPreviewUrl() {
            if (this.$root.pageId) {
                if (
                    this.configData.all &&
                    this.configData.all.propsData &&
                    this.configData.all.propsData.pageUrl &&
                    this.configData.all.propsData.pageUrl.value
                ) {
                    if (this.configData.all.propsData.pageUrl.value.indexOf('id') > 0) {
                        return this.configData.all.propsData.pageUrl.value;
                    } else {
                        return this.configData.all.propsData.pageUrl.value + '?id=' + this.$root.pageId;
                    }
                } else {
                    return './auto_active.html?id=' + this.$root.pageId;
                }
            } else {
                return '';
            }
        },
        configChange(newConfig) {
            if (newConfig) {
                this.configData = newConfig;
            }
        },
        tabChange(tab, event) {
            console.log(tab, event);
        },
        loginSuccess(status, info) {
            if (status == 1) {
                // 自动登陆成功， 算是验证
                this.showLoginDialog = false;
                this.getConfig();
            } else {
                this.showLoginDialog = true;
            }
        },
        toCancel() {
            this.showLoginDialog = false;
        }
    },
    mounted() {
        this.tabName = this.$root.tabName || 'tab1';
        login.autoLogin(this.loginSuccess);
    }
};
</script>
<style lang="scss">
@import url(../../common/base.css);

#page {
    width: 100%;
}

.page {
    width: 100% !important;
    font-size: 0.28rem;
}

.page_container {
    width: 100%;
    height: auto;
    min-height: 500px;
}

.page_handle_btn {
    text-align: center;
    position: fixed;
    width: 100px;
    bottom: 30px;
    left: 0;

    .row {
        margin-bottom: 30px;
    }
}

.page_module_handle_container {
    position: relative;

    &:hover {
        .btns_module {
            display: block;
        }
    }
}

.page_container_handle_container {
    position: relative;

    &:hover {
        .btns_container {
            display: block;
        }
    }
}

.overflow-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.overflow-ellipsis2 {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    overflow: hidden;
    white-space: normal;
}

.copy_input {
    position: absolute;
    opacity: 0;
    user-select: none;
    pointer-events: none;
}

.position-select-card {
    .el-scrollbar__view {
        max-height: 500px;
        overflow-y: scroll;
    }
}

</style>

<style lang="scss" scroped></style>