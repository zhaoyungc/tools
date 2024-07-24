<template>
    <div>
        <div
            v-if="!editType"
            class="bottom_bar_pos"
            :class="{ iphonex_safe: isIphoneX }"
            :style="{ height: posHeight }"
        ></div>
        <div class="bottom_bar_container" :class="{ iphonex_safe: isIphoneX }" :style="styles">
            <div
                class="solt_ct"
                :style="{
                    backgroundImage: bgImage ? 'url(' + bgImage + ')' : '',
                    padding: padding
                }"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script type="es6">
import { isIphoneX } from '@/common/utils';

export default {
    name: 'BottomBar',
    props: {
        bgColor: {
            type: String,
            default: () => {
                return '#ffffff';
            }
        },
        bgImage: {
            type: String,
            default: () => {
                return '';
            }
        },
        padding: {
            type: String,
            default: () => {
                return '0.16rem 0.28rem';
            }
        },
        editType: {
            type: String,
            default: () => {
                return '';
            }
        },
        posHeight: {
            type: String,
            default: () => {
                return '1.2rem';
            }
        }
    },
    data: () => {
        return {
            isIphoneX: isIphoneX(),
        };
    },
    computed: {
        styles() {
            const sty = {
                backgroundColor: this.bgColor,
            };
            if (this.editType) {
                sty.position = 'sticky';
            }
            return sty;
        }
    }
};
</script>

<style lang="scss"  scoped>
.bottom_bar_pos {
    width: 7.5rem;
    max-width: 100%;
    height: auto;
    height: 1.2rem;
}
.bottom_bar_container {
    width: 7.5rem;
    max-width: 100%;
    height: auto;
    // padding: 0.16rem 0.28rem;
    // 此处删除，谁用谁去加（组件）
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -3.75rem;
    z-index: 69;

    .solt_ct {
        width: 100%;
        height: auto;
        background-position: right;
        background-size: cover;
        background-repeat: no-repeat;
        box-sizing: border-box;
    }
}
.iphonex_safe {
    padding-bottom: 0.4rem;
}
</style>
