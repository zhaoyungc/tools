<template>
     <div class="page_module_handle_container">
        <slot name="handle"></slot>
        <NormalPoster :propsData="staticData.propsData"></NormalPoster>
    </div>
</template>
<script type="es6">
import NormalPoster from './NormalPoster.vue';
export default {
    name: 'PagePoster',
    props: ['type', 'editType', 'staticData'],
    components: {
        NormalPoster,
    }
};
</script>
