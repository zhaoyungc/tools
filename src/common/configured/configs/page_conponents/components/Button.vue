<template>
    <div class="btn_container" :style="btnStyle" @click="onClick">
        <slot></slot>
    </div>
</template>
<script type="es6">

export default {
    name: 'Button',
    props: {
        bgColor: {
            type: String,
            default: ''
        },
        borderColor: {
            type: String,
            default: ''
        },
        fontColor: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '60'
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    components: {
        
    },
    computed: {
        btnStyle() {
            const data = {
                height: this.height/100 + 'rem',
                lineHeight: (this.height - 4)/100 + 'rem',
                color: this.fontColor,
                backgroundColor: this.bgColor,
                borderColor: this.borderColor || this.bgColor || '',
                pointerEvents: this.disable ? 'none' : 'auto',
                opacity: this.disable ? '0.5' : '1'
            };
            if (this.width > 0) {
                data.width = this.width/100 + 'rem';
            }
            return data;
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss"  scoped>
.btn_container {
    position: relative;
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 0.6rem;
    border-width: 0.02rem;
    border-style: solid;
    box-sizing: border-box;
    line-height: 0.56rem;
    border-radius: 0.1rem;
}
</style>