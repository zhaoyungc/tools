
<template>
    <div class="edit_template_label_container">
        <span>{{ data.tip }}</span>
        <el-tooltip v-if="data.info" effect="dark" :content="data.info" placement="top">
            <div slot="content" v-html="data.info"></div>
            <i class="el-icon-question"></i>
        </el-tooltip>
    </div>
</template>
<script type="es6">

export default {
    name: 'EditTemplateLabel',
    props: {
        data: {
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

    },
    methods: {

    },
    computed: {

    },
    mounted() {

    },
};
</script>

<style lang="scss"  scoped>
.edit_template_label_container {
    color: #000000;
    width: 120px;
    margin: auto;
}
</style>
