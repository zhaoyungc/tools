<template>
    <div class="page_module_handle_container page_rule_container">
        <slot name="handle"></slot>
        <TableLine v-if="type == 'tableLine'" :data="staticData.propsData" />
        <AutoText v-else-if="type == 'autoText'" :data="staticData.propsData" />
        <LineDivider v-else-if="type == 'divider'" :data="staticData.propsData" />
    </div>
</template>
<script type="es6" lang="js">
import TableLine from './TableLine.vue';
import AutoText from './AutoText.vue';
import LineDivider from './LineDivider.vue';

export default {
    name: 'PageRule',
    props: ['type', 'editType', 'staticData'],
    data: () => {
        return {
            titleStyle: {
                lineHeight: '0.4rem',
            },
            style: {
                lineHeight: '0.36rem',
            },
        };
    },
    components: {
        TableLine,
        AutoText,
        LineDivider,
    },
    methods: {

    },
    computed: {
        ruleDataList() {
            return (this.staticData.propsData.list || []).map((r) => {
                return {
                    props: r
                };
            });
        }
    },
};
</script>

<style lang="scss"  scoped>
.page_rule_container {
    .rule_point_text {
        ::v-deep span {
            top: 0.13rem;
        }
    }
}
</style>
