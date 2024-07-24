<template>
    <div class="btn_normla_container" :class="{ 'btn_in_edit': editType }" :style="btnContainerStyle">
        <div class="btn_normal_btn" :style="btnStyle" @click="toJump">
            {{ propsData.font || '' }}
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'BtnNormal',
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
    computed: {
        btnContainerStyle() {
            const result = {};
            const {
                paddingTop = 0,
                paddingBottom = 0,
                paddingLeft = 0,
                paddingRight = 0,
                btnAlign = 'center'
            } = this.propsData;

            result.paddingTop = paddingTop / 100 + 'rem';
            result.paddingBottom = paddingBottom / 100 + 'rem';
            result.paddingLeft = paddingLeft / 100 + 'rem';
            result.paddingRight = paddingRight / 100 + 'rem';
            result.textAlign = btnAlign;

            return result;
        },
        btnStyle() {
            const sty = {};
            if (this.propsData.btnWidth) {
                sty.width = this.propsData.btnWidth / 100 + 'rem';
                sty.padding = '0';
            }
            if (this.propsData.btnHeight) {
                sty.height = this.propsData.btnHeight / 100 + 'rem';
                sty.lineHeight = this.propsData.btnHeight / 100 + 'rem';
            }
            if (this.propsData.btnColor) {
                sty.backgroundColor = this.propsData.btnColor;
            }
            if (this.propsData.btnImg) {
                sty.backgroundImage = `url(${this.propsData.btnImg})`;
            }
            if (this.propsData.fontSize) {
                sty.fontSize = this.propsData.fontSize / 100 + 'rem';
            }
            if (this.propsData.fontColor) {
                sty.color = this.propsData.fontColor;
            }
            if (this.propsData.radius) {
                sty.borderRadius = this.propsData.radius / 100 + 'rem';
            }
            if (this.propsData.borderColor) {
                sty.border = `1px solid ${this.propsData.borderColor}`;
            }
            return sty;
        },
        barStyle() {
            if (this.editType) {
                return {
                    position: ''
                };
            } else {
                return {
                    position: 'fixed'
                };
            }
        }
    },
    methods: {
        toJump() {
            if (this.editType) {
                return;
            }
            console.log('跳转');
        }
    }
};
</script>

<style lang="scss"  scoped>
.btn_normla_container {
    width: 100%;
    height: auto;
    text-align: center;
}

.btn_in_edit {
    pointer-events: none;
}

.btn_normal_btn {
    // background: rgb(255, 94, 230);
    display: inline-block;
    padding: 0 0.28rem;
    text-align: center;
    font-weight: bolder;
    box-sizing: border-box;
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 0.72rem;
    line-height: 0.72rem;
}
</style>
