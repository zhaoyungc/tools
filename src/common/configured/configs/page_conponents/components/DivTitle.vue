<!-- 带有title的 容器类组件 -->
<template>
    <div class="div_title_container" :style="ctStyle">
        <div class="pop_title overflow-ellipsis" :style="{
                backgroundColor: propsData.containerTitleTitleBgColor,
                color: propsData.containerTitleFontColor,
            }">
            {{ propsData.containerTitleFont || "" }}
        </div>
        <div class="content" :style="contentStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script type="es6">

export default {
    name: 'DivTitle',
    props: {
        propsData: {
            type: Object,
            default: () => {
                return {};
            }
        },
    },
    computed: {
        ctStyle() {
            if (this.propsData) {
                const data = {};
                if (this.propsData.containerTitleBgColor) {
                    data.backgroundColor = this.propsData.containerTitleBgColor;
                }
                if (this.propsData.containerTitleRadius) {
                    data.borderRadius = this.propsData.containerTitleRadius / 100 + 'rem';
                }
                return data;
            } else {
                return {};
            }
        },
        contentStyle() {
            if (this.propsData) {
                const data = {};
                if (this.propsData.containerTitlePaddingTop) {
                    data.paddingTop = this.propsData.containerTitlePaddingTop / 100 + 'rem';
                }
                if (this.propsData.containerTitlePaddingBottom) {
                    data.paddingBottom = this.propsData.containerTitlePaddingBottom / 100 + 'rem';
                }
                if (this.propsData.containerTitlePaddingLeft) {
                    data.paddingLeft = this.propsData.containerTitlePaddingLeft / 100 + 'rem';
                }
                if (this.propsData.containerTitlePaddingRight) {
                    data.paddingRight = this.propsData.containerTitlePaddingRight / 100 + 'rem';
                }
                return data;
            }
            return {};
        }
    }
};
</script>

<style lang="scss"  scoped>
.div_title_container {
    width: 100%;
    height: auto;
    text-align: center;

    .overflow-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .pop_title {
        width: 4.2rem;
        height: 0.64rem;
        padding: 0.14rem 0.1rem;
        border-bottom-left-radius: 0.16rem;
        border-bottom-right-radius: 0.16rem;
        line-height: 0.36rem;
        font-size: 0.36rem;
        text-align: center;
        display: inline-block;
        font-weight: bolder;
        box-sizing: border-box;
    }

    .content {
        box-sizing: border-box;
        text-align: left;
    }
}
</style>
