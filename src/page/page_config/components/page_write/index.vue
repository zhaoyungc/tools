<template>
    <div class="page_write_container">
        <JsonEditor width="auto" :type="1" v-model="newValue"></JsonEditor>
    </div>
</template>
<script type="es6">
import JsonEditor from '@/common/JsonEditor.vue';
import { getRepairData } from '@/common/configured/configs/utils/ParamSwitch';
export default {
    name: 'PageWrite',
    props: ['config'],
    data: () => {
        return {};
    },
    components: {
        JsonEditor
    },
    computed: {
        newValue: {
            set(data) {
                getRepairData(data, this.$root.pageId);
                this.$emit('change', data);
            },
            get() {
                return this.config || {};
            }
        }
    },
    methods: {

    },
    mounted() { }
};
</script>

<style lang="scss"  scoped>
.page_write_container {
    width: 100%;
    height: 100%;
    max-height: 1200px;
    overflow-y: auto;
    padding: 10px 10px 10px 0;
    box-sizing: border-box;
}
</style>
