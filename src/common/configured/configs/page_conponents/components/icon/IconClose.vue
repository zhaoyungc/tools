<template>
    <div class="icon_close" @click="onClick">
        <div class="close" :class="{'border': showBorder}" :style="'border-color:' + color">
            <div class="after" :style="'background:' + color"></div>
            <div class="before" :style="'background:' + color"></div>
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'IconClose',
    props: {
        showBorder: {
            type: Boolean,
            default: ()=> {
                return false;
            }
        },
        color: {
            type: String,
            default: ()=> {
                return '#ffffff';
            }
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

.icon_close {
    width: 100%;
    height: 100%;
    cursor: pointer;

    .close{
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;

        &.border{
            border: 0.04rem solid #ffffff;
            border-radius: 50%;
            box-sizing: border-box;
        }

        .after {
            display: block;
            width: 0.06rem;
            height: 80%;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            background: #ffffff;
            position: absolute;
            top: 10%;
            left: 50%;
            margin-left: -0.03rem;
            border-radius: 0.03rem;
        }

        .before {
            display: block;
            width: 0.06rem;
            height: 80%;
            transform: rotate(-45deg);
            background: #ffffff;
            position: absolute;
            top: 10%;
            left: 50%;
            margin-left: -0.03rem;
            border-radius: 0.03rem;
        }
    }
}
</style>
