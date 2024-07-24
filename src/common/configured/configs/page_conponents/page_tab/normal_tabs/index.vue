<template>
    <div :ref="type" :class="['tabs', 'tabs__' + type]" :style="getTabsStyle()">
        <div v-for="(item, index) in tabs" :key="index" :style="getTabStyle(type, index)" @click="clickTab(index)"
            :class="['tab', { 'tab_active': index === value }]">
            <span v-html="item"></span>
            <i v-if="(type == 'tab1' || type == 'tab2') && index && index != value && index != value + 1" class="tab_divider"
                :style="{ backgroundColor: propsData.fontColor }">
            </i>
            <i v-if="type === 'tab1' && index == value" class="tab_border_fix"
                :style="{ backgroundColor: propsData.backgroundActiveColor }">
            </i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NormalTabs',
    props: {
        type: {
            type: String,
            required: false,
            default: 'tab1',
            validator: (val) => ['tab1', 'tab2', 'tab3'].indexOf(val.toLowerCase()) !== -1
        },
        value: {
            type: Number,
            default: 0
        },
        tabs: {
            type: Array,
            default: () => []
        },
        tabWidths: {
            type: Array,
            default: () => []
        },
        propsData: {
            type: Object,
            require: true
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(n) {
                this.$nextTick(() => {
                    let scrollTab = this.$refs[this.type];
                    let tabItems = scrollTab.querySelectorAll('.tab');
                    let totalTabOffsetAttrs = scrollTab.getBoundingClientRect();
                    let nowTabOffsetAttrs = tabItems[n].getBoundingClientRect();
                    //当前元素位于超出屏幕时，自动滑动到可视区
                    if (nowTabOffsetAttrs.right > totalTabOffsetAttrs.right) {
                        // scrollTab.scrollTo({
                        //     left:nowTabOffsetAttrs.right-totalTabOffsetAttrs.right+totalTabOffsetAttrs.width/3
                        // })
                        scrollTab.scrollLeft = nowTabOffsetAttrs.right - totalTabOffsetAttrs.right + totalTabOffsetAttrs.width / 3;
                    }
                });
            }
        }
    },
    methods: {
        clickTab(index) {
            this.$emit('input', index);
        },
        getTabsStyle() {
            if (this.type === 'tab1') {
                return {
                    backgroundColor: this.propsData.backgroundColor
                };
            } else if (this.type === 'tab2') {
                return {
                    borderColor: this.propsData.borderColor
                };
            }
            return {};
        },
        getTabStyle(type, index) {
            const tabStyle = {
                color: index === this.value ? this.propsData.fontActiveColor : this.propsData.fontColor,
                backgroundColor: index == this.value
                    ? this.propsData.backgroundActiveColor || 'rgba(0,0,0,0)'
                    : this.propsData.backgroundColor
            };
            if (this.tabWidths[index]) {
                tabStyle.width = this.tabWidths[index] / 100 + 'rem';
                tabStyle.flex = 'none';
            }
            if ((type === 'tab3' || type === 'tab4') && this.propsData.borderColor) {
                tabStyle.borderColor =
                    index === this.value ? 'transparent' : this.propsData.borderColor;
            }
            return tabStyle;
        }
    },
    mounted() { }
};
</script>

<style lang="scss"  scoped>
.tabs {
    display: flex;
    flex-wrap: nowrap;

    .tab {
        height: 0.88rem;
        box-sizing: border-box;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 0.32rem;

        &.tab_active {
            font-weight: bolder;
        }

        .tab_divider {
            display: inline-block;
            position: absolute;
            width: 0.01rem;
            height: 0.21rem;
            left: -0.01rem;
            top: 50%;
            transform: translateY(-50%);
            background-color: #ff4b38;
        }

        .tab_border_fix {
            display: inline-block;
            width: 100%;
            height: 0.02rem;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }

    &.tabs__tab1,
    &.tabs__tab4 {
        overflow-x: scroll;
        overflow-y: hidden;
        /*解决ios上滑动不流畅*/
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;
        /* IE10+ */
        overflow: -moz-scrollbars-none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &.tabs__tab1 {
        padding-top: 0.04rem;

        .tab {
            flex: 1;

            &.tab__active {
                font-size: 0.36rem;
            }
        }
    }

    &.tabs__tab2 {
        border: 1px solid transparent;
        border-radius: 0.16rem;
        overflow: hidden;

        .tab {
            flex: 1;
        }
    }

    &.tabs__tab3 {
        .tab {
            border: 1px solid transparent;
            border-radius: 0.16rem;
            flex: 1;
            height: 0.64rem;

            &+.tab {
                margin-left: 0.14rem;
            }
        }
    }

    &.tabs__tab4 {
        .tab {
            border: 1px solid transparent;
            border-radius: 0.16rem;
            height: 0.64rem;
            margin-right: 0.2rem;
            padding: 0 0.2rem;
            font-size: 0.28rem;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }
    }
}</style>