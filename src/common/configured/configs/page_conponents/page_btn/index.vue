<template>
    <div class="page_module_handle_container">
        <slot name="handle"></slot>
        <BtnFixed :editType="editType" v-if="type == 'fixed'" :propsData="staticData.propsData"></BtnFixed>
        <BtnNormal :editType="editType" v-if="type == 'normal'" :propsData="staticData.propsData"></BtnNormal>
    </div>
</template>
<script type="es6">
import BtnFixed from './BtnFixed.vue';
import BtnNormal from './BtnNormal.vue';

export default {
    name: 'PageBtn',
    props: ['type', 'editType', 'staticData'],
    components: {
        BtnFixed,
        BtnNormal,
    }
};
</script>
