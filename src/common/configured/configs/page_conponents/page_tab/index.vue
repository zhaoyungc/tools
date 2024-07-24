<template>
    <div class="page_module_handle_container page_tab_container" :style="ctStyle">
        <slot name="handle"></slot>
        <div class="tab_ct" :style="tabCtStyle">
            <NormalTabs v-model="newValue" :propsData="staticData.propsData" :eventData="staticData.eventData"
                :type="type" :tabs="tabs" :tabWidths="tabWidths" />
        </div>
    </div>
</template>
<script type="es6">
import NormalTabs from './normal_tabs/index.vue';
export default {
    name: 'PageTab',
    props: ['type', 'editType', 'staticData'],
    components: {
        NormalTabs,
    },
    computed: {
        ctStyle() {
            if (this.staticData.propsData.isFixedTop && this.staticData.propsData.isFixedTop == '1') {
                return {
                    position: 'sticky'
                };
            } else {
                let sty = {};
                if (this.staticData.propsData.siteType && this.staticData.propsData.siteType == 'absolute') {
                    sty = {
                        position: 'absolute',
                        top: (this.staticData.propsData.top || 0) / 100 + 'rem',
                        zIndex: 10,
                    };
                } else {
                    sty = {
                        position: 'relative',
                        zIndex: '1',
                    };
                }
                if (this.staticData.propsData.width > 0) {
                    sty.width = (this.staticData.propsData.width || 0) / 100 + 'rem';
                }
                if (this.staticData.propsData.left > 0) {
                    sty.left = (this.staticData.propsData.left || 0) / 100 + 'rem';
                }
                return sty;
            }
        },
        tabCtStyle() {
            const sty = {};
            if (this.staticData.propsData.fixedPaddingShu) {
                sty.paddingTop = this.staticData.propsData.fixedPaddingShu / 100 + 'rem';
                sty.paddingBottom = this.staticData.propsData.fixedPaddingShu / 100 + 'rem';
            }
            if (this.staticData.propsData.fixedPaddingHeng) {
                sty.paddingLeft = this.staticData.propsData.fixedPaddingHeng / 100 + 'rem';
                sty.paddingRight = this.staticData.propsData.fixedPaddingHeng / 100 + 'rem';
            }
            if (this.staticData.propsData.fixedBgColor) {
                sty.background = this.staticData.propsData.fixedBgColor;
            }
            return sty;
        },
        newValue: {
            get: function () {
                if (this.staticData.disableData.normalIndex >= this.tabs.length) {
                    return 0;
                } else {
                    return this.staticData.disableData.normalIndex;
                }
            },
            set: function (val) {
                this.$emit('input', val);
            }
        },
        tabs() {
            if (this.staticData.propsData && this.staticData.propsData.tabsConfig) {
                return (this.staticData.propsData.tabsConfig || []).map((tab) => {
                    return tab.tabName || tab.normalImage;
                });
            } else {
                return [];
            }
        },
        tabWidths() {
            if (this.staticData.propsData && this.staticData.propsData.tabsConfig) {
                return (this.staticData.propsData.tabsConfig || []).map((tab) => {
                    return tab.tabWidth || 0;
                });
            } else {
                return [];
            }
        }
    },
    methods: {
        changeIndex(ind) {
            this.newValue = ind;
        }
    },
    mounted() {
        if (this.staticData.eventData && this.staticData.eventData.onEvent) {
            console.log('事件', this.staticData.eventData.onEvent);
        }
    },
    beforeDestroy() {
        if (this.staticData.eventData && this.staticData.eventData.onEvent) {
            console.log('销毁事件', this.staticData.eventData.onEvent);
        }
    },
};
</script>

<style lang="scss" scoped>
.page_tab_container {
    position: sticky;
    position: -webkit-sticky; //  兼容safari
    z-index: 17;
    top: 0;

    .tab_ct {
        box-sizing: border-box;
    }
}
</style>
