<template>
    <BottomBar
        class="bottom_btn_bar"
        :class="{ bottom_bars_in_edit: editType }"
        :editType="editType"
        :bgColor="propsData.backageColor"
        :padding="padding"
        :posHeight="posHeight"
    >
        <div class="sign_jump_btn" :style="btnStyle" @click="toJump">
            {{ propsData.font || '' }}
        </div>
    </BottomBar>
</template>
<script type="es6">
import BottomBar from '../components/BottomBar.vue';
export default {
    name: 'BtnFixed',
    props: {
        propsData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        editType: {
            type: String,
            default: () => {
                return '';
            }
        }
    },
    components: {
        BottomBar,
    },
    computed: {
        padding() {
            let paddTop = '0 ';
            let paddBottom = '0 ';
            let paddLeft = '0';
            let paddRight = '0 ';
            if (this.propsData.paddingHeng) {
                paddLeft = this.propsData.paddingHeng / 100 + 'rem';
                paddRight = this.propsData.paddingHeng / 100 + 'rem ';
            }
            if (this.propsData.paddingShu) {
                paddTop = this.propsData.paddingShu / 100 + 'rem ';
                paddBottom = this.propsData.paddingShu / 100 + 'rem ';
            }
            return paddTop + paddRight + paddBottom + paddLeft;
        },
        posHeight() {
            let hg = 0;
            if (this.propsData.btnHeight && this.propsData.btnHeight > this.propsData.fontSize) {
                hg = hg + this.propsData.btnHeight;
            } else {
                hg = hg + this.propsData.fontSize;
            }
            hg = hg + (this.propsData.paddingShu || 0) * 2;
            return hg/100 + 'rem';
        },
        btnStyle() {
            const sty = {};
            if (this.propsData.btnColor) {
                sty.background = this.propsData.btnColor;
            }
            if (this.propsData.fontSize) {
                sty.fontSize = this.propsData.fontSize / 100 + 'rem';
                sty.lineHeight = this.propsData.fontSize / 100 + 'rem';
            }
            if (this.propsData.fontColor) {
                sty.color = this.propsData.fontColor;
            }
            if (this.propsData.btnHeight && this.propsData.btnHeight > this.propsData.fontSize) {
                const padd = (this.propsData.btnHeight - this.propsData.fontSize) / 200;
                sty.padding = padd + "rem 0.28rem";
            } else {
                sty.padding ="0rem 0.28rem";
            }
            if (this.propsData.radius) {
                sty.borderRadius = this.propsData.radius / 100 + 'rem';
            }
            return sty;
        }
    },
    methods: {
        toJump() {
            console.log('跳转');
        }
    }
};
</script>

<style lang="scss"  scoped>

.bottom_bars_in_edit {
    // position: sticky !important;
    // bottom: 0 !important;
    pointer-events: none !important;
}

.sign_jump_btn {
    width: 100%;
    display: inline-block;
    padding: 0.16rem 0.28rem;
    border-radius: 0.12rem;
    text-align: center;
    box-sizing: border-box;
    font-weight: bolder;
}
</style>
