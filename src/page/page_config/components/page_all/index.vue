
<template>
    <div class="page_all_container page_container">
        <div class="page_all">
            <h3>{{ configData.all.name }}</h3>
            <template v-if="configData.all.styleData && Object.keys(configData.all.styleData).length > 0">
                <EditForms :config="configData.all.styleData" title="全局样式配置" @add="addChild" @delete="deleteChild" :configData="configData"></EditForms>
            </template>
            <template v-if="configData.all.propsData && Object.keys(configData.all.propsData).length > 0">
                <EditForms :config="configData.all.propsData" title="页面属性配置"></EditForms>
            </template>
        </div>
    </div>
</template>
<script type="es6">

import EditForms from '../../edit_form/index.vue';

export default {
    name: 'PageAll',
    props: {
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
        EditForms,
    },
    methods: {
        addChild(data, index) {
            const list = data.value || [];
            const item = JSON.parse(JSON.stringify(list[index]));
            for (const key in item) {
                if (Object.hasOwnProperty.call(item, key)) {
                    const element = item[key];
                    if (element.type == "keys") {
                        element.value = key + '_' + (new Date().getTime());
                    }
                    if (element.type == "color" && !element.base) {
                        element.base = true; // 固定格式，不使用基础颜色配置
                    }
                }
            }
            list.splice(index + 1, 0, item);
            data.value = list;
        },
        deleteChild(data, index) {
            const list = data.value || [];
            list.splice(index, 1);
            data.value = list;
        },
    },
    computed: {

    },
    mounted() {

    },
};
</script>

<style lang="scss"  scoped>
.page_all_container {}
</style>
