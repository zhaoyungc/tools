<template>
    <div class="icon_loading">
        <div class="circle" :class="{'selected': selected}" :style="{
            border: '0.04rem solid ' + color,
            background: selected ? color : '',
        }">
            <img src="http://www.metwo.cn/resource/gc/check.png">
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'SelectCircle',
    props: {
        selected: {
            type: Boolean,
            default() {
                return false; // 勾选
            }
        },
        color: {
            type: String,
            default() {
                return 'red'; // 勾选
            }
        }
    }
};
</script>
<style lang="scss"  scoped>
.icon_loading {
    width: 100%;
    height: 100%;

    .circle {
        width: 100%;
        height: 100%;
        padding: 5%;
        border: 0.04rem solid red;
        border-radius: 50%;
        box-sizing: border-box;

        img{
            width: 100%;
            height: 100%;
            Object-fit: contain;
            display: none;
        }

        &.selected{
            background: red;
            display: inline-block;
            img{
                display: inline-block;
            }
        }
    }
}
</style>
