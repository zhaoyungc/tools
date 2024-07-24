
<template>
    <div class="page_see_edit_container">
        <el-alert title="title" type="success" :closable="false">
            <template slot="title">选中内容：{{ editData.name }}</template>
        </el-alert>
        <el-popover placement="top" width="240" v-model="visible" class="del_btn">
            <p>删除以后不可恢复，并且包含内部的内容会一块删除，但是可以重新添加，确定删除吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button size="mini" type="text" @click="toDelete">确定</el-button>
            </div>
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
        </el-popover>
        <br>
        <template v-if="editData.propsData && Object.keys(editData.propsData).length > 0">
            <EditForms :config="editData.propsData" title="参数配置" :configData="configData" @add="addChild"
                @delete="deleteChild" @change="onChange(editData.propsData)"></EditForms>
        </template>
        <template v-if="editData.extraData && Object.keys(editData.extraData).length > 0">
            <EditForms :config="editData.extraData" title="自定义参数配置" :configData="configData" @add="addChild"
                @delete="deleteChild" @change="onChange(editData.extraData)"></EditForms>
        </template>
        <template v-if="editData.eventData && Object.keys(editData.eventData).length > 0">
            <EditForms :config="editData.eventData" title="组件内部交互数据配置" :configData="configData" @add="addChild"
                @delete="deleteChild" @change="onChange(editData.eventData)"></EditForms>
        </template>
        <template v-if="editData.requestData && Object.keys(editData.requestData).length > 0">
            <EditForms :config="editData.requestData" title="请求配置" :configData="configData" @add="addChild"
                @delete="deleteChild"></EditForms>
        </template>
    </div>
</template>
<script type="es6">

import EditForms from '../../../edit_form/index.vue';

export default {
    name: 'PageSeeEdit',
    props: ['editData', 'configData'],
    data: () => {
        return {
            visible: false,
        };
    },
    components: {
        EditForms,
    },
    methods: {
        getCleanDom(currentDom) {
            if (currentDom.kind == 'container') {
                currentDom.propsData.children.value.map((child) => {
                    return this.getCleanDom(child);
                });
            } else if (currentDom.kind == 'tab') {
                const tabsConfig = currentDom.propsData.tabsConfig.value || [];
                tabsConfig.forEach((tabs) => {
                    tabs.children.value.map((child) => {
                        return this.getCleanDom(child);
                    });
                });
            } else if (currentDom.children) {
                currentDom.children.value.map((child) => {
                    return this.getCleanDom(child);
                });
            }
            return currentDom;
        },
        addChild(data, index) {
            const list = data.value || [];
            const item = JSON.parse(JSON.stringify(list[index]));
            list.splice(index + 1, 0, this.getCleanDom(item)); // 主要清理一下tab的复制功能
            data.value = list;
        },
        deleteChild(data, index) {
            const list = data.value || [];
            list.splice(index, 1);
            console.log(data, '==', this.editData);
            if (this.editData.disableData.normalIndex >= 0 && this.editData.disableData.normalIndex >= list.length) {
                this.$emit('deletechildList');
            }
            data.value = list;
        },
        toDelete() {
            //删除当前
            this.visible = false;
            this.$emit('delete');
        },
        onChange(contactData) {
            // propsData 内部数据联动
            if (this.editData && this.editData.contactChange) {
                this.editData.contactChange(contactData);
            }
        }
    },
};
</script>

<style lang="scss"  scoped>
.page_see_edit_container {
    width: 100%;
    padding-bottom: 3rem;
    position: relative;
}
</style>
