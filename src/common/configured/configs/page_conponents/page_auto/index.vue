<template>
    <div class="page_module_handle_container">
        <slot name="handle"></slot>
        <div class="slot_desc">
            <div>自定义插槽名字：{{ staticData.propsData.componentName }}</div>
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'PageAuto',
    props: ['type', 'editType', 'staticData'],
};
</script>
<style lang="scss"  scoped>
.slot_desc {
    width: 100%;
    height: 1rem;
    background: #be86ff;
}
</style>
