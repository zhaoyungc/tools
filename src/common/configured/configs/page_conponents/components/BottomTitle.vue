<template>
    <div class="bottom_title_container" @click.stop="close()" :style="baseStyle">
        <div class="bottom_title_ct" :style="cyStyle" @click.stop="">
            <div class="title_ct">
                <template v-if="propsData.titleBgColor">
                    <div class="title_bg" :style="titleStyle">{{ propsData.title || '' }}</div>
                    <div class="close bg" @click="close" :style="{ background: propsData.btnColor }"></div>
                </template>
                <template v-else>
                    <div class="title" :style="titleStyle">{{ propsData.title || '' }}</div>
                    <div class="close" @click="close" :style="{ background: propsData.btnColor }"></div>
                </template>
            </div>
            <div v-if="propsData.showBack" class="goback" @click.stop="goBack" :style="{ background: propsData.btnColor }">
            </div>
            <div class="content_ct" :style="contenStyle">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
export default {
    name: 'BottomTitle',
    props: ['propsData', 'mock'],
    data: () => {
        return {
            // height: 7.35
        };
    },
    computed: {
        baseStyle() {
            if (this.mock) {
                return {
                    position: 'static',
                    height: (this.propsData.height || 735) / 100 + 'rem',
                    width: '100%',
                    maxWidth: '7.5rem',
                };
            }
            return {};
        },
        cyStyle() {
            return {
                height: (this.propsData.height || 735) / 100 + 'rem',
                background: this.propsData.bgColor || '#ffffff',
                borderTopRightRadius: (this.propsData.radius || 0) / 100 + 'rem',
                borderTopLeftRadius: (this.propsData.radius || 0) / 100 + 'rem'
            };
        },
        titleStyle() {
            return {
                color: this.propsData.titleColor,
                background: this.propsData.titleBgColor
            };
        },
        contenStyle() {
            const data = {
                height: (this.propsData.height - 116) / 100 + 'rem',
                paddingTop: this.propsData.paddingTop,
                paddingBottom: this.propsData.paddingBottom,
                paddingLeft: this.propsData.paddingLeft,
                paddingRight: this.propsData.paddingRight
            };
            if (this.propsData.titleBgColor) {
                data.height = (this.propsData.height - 64) / 100 + 'rem';
            }
            return data;
        }
    },
    methods: {
        close() {
            this.$emit('close', true);
        },
        goBack() {
            this.$emit('back', true);
        }
    },
    mounted() {
        if (!this.mock) {
            document.body.style.overflow = 'hidden';
        }
    },
    destroyed() {
        document.body.style.overflow = 'auto';
    }
};
</script>

<style lang="scss"  scoped>

.bottom_title_container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;
}

.bottom_title_ct {
    width: 100%;
    max-width: 7.5rem;
    position: absolute;
    bottom: 0;
    border-top-right-radius: 0.14rem;
    border-top-left-radius: 0.14rem;
    background: #fff;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;

    .title_ct {
        width: 100%;
        text-align: center;
        position: relative;
    }

    .title {
        width: 4rem;
        height: 0.36rem;
        font-size: 0.36rem;
        color: #000000;
        text-align: center;
        line-height: 0.36rem;
        padding: 0.4rem 0;
        display: inline-block;
        font-weight: bolder;
    }

    .title_bg {
        width: 4rem;
        height: 0.36rem;
        padding: 0.14rem 0.1rem;
        border-bottom-left-radius: 0.16rem;
        border-bottom-right-radius: 0.16rem;
        line-height: 0.36rem;
        font-size: 0.36rem;
        text-align: center;
        display: inline-block;
        font-weight: bolder;
    }

    .content_ct {
        width: 100%;
        height: 100%;
        padding: 0.28rem;
        box-sizing: border-box;

        .content {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

    .close {
        width: 0.3rem;
        height: 0.3rem;
        mask-image: url('http://www.metwo.cn/resource/gc/9efa3ab1ae544b4d21cd2b3c69ef51ac_23-23-0.png');
        background: #000000;
        mask-repeat: no-repeat;
        mask-size: 0.3rem 0.3rem;
        position: absolute;
        top: 0.45rem;
        right: 0.42rem;
        z-index: 5;

        &.bg {
            top: 0.2rem;
        }
    }

    .goback {
        mask-image: url('http://www.metwo.cn/resource/gc/90da71bff22627ec4d8f5a21e3301fdc_18-28-0.png');
        background: #000000;
        mask-repeat: no-repeat;
        mask-size: 0.36rem 0.36rem;
        width: 0.36rem;
        height: 0.36rem;
        position: absolute;
        top: 0.22rem;
        left: 0.22rem;
        z-index: 5;
    }
}
</style>
