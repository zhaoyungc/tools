<template>
    <div class="page_container_handle_container page_container_container" :style="ctStyle">
        <slot name="handle"></slot>
        <DivTitle v-if="type == 'container_title'" :propsData="staticData.propsData" :eventData="staticData.eventData">
            <slot></slot>
        </DivTitle>
        <div v-else :style="style">
            <slot></slot>
        </div>
    </div>
</template>
<script type="es6">

import DivTitle from '../components/DivTitle.vue';

export default {
    name: 'PageContainer',
    props: ['type', 'editType', 'staticData'],
    components: {
        DivTitle,
    },
    computed: {
        ctStyle() {
            if (this.staticData.propsData.siteType && this.staticData.propsData.siteType == 'absolute') {
                return {
                    position: 'absolute',
                    top: (this.staticData.propsData.top || 0) / 100 + 'rem',
                    left: 0,
                    zIndex: 10,
                };
            } else {
                return {};
            }
        },
        style() {
            if (this.staticData.propsData) {
                const data = {};
                if (this.staticData.propsData.paddingTop) {
                    data.paddingTop = this.staticData.propsData.paddingTop / 100 + 'rem';
                }
                if (this.staticData.propsData.paddingBottom) {
                    data.paddingBottom = this.staticData.propsData.paddingBottom / 100 + 'rem';
                }
                if (this.staticData.propsData.paddingLeft) {
                    data.paddingLeft = this.staticData.propsData.paddingLeft / 100 + 'rem';
                }
                if (this.staticData.propsData.paddingRight) {
                    data.paddingRight = this.staticData.propsData.paddingRight / 100 + 'rem';
                }
                if (this.staticData.propsData.bgColor) {
                    data.background = this.staticData.propsData.bgColor;
                }
                if (this.staticData.propsData.radius) {
                    data.borderRadius = this.staticData.propsData.radius / 100 + 'rem';
                }
                if (this.staticData.propsData.minHeight) {
                    data.minHeight = this.staticData.propsData.minHeight / 100 + 'rem';
                }
                return data;
            }
            return {};
        }
    }
};
</script>
<style lang="scss" scoped>
.page_container_container {
    width: 100%;
    box-sizing: border-box;
}
</style>