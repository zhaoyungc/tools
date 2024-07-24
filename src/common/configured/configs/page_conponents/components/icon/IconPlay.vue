<template>
    <div class="icon_play" @click="onClick">
        <img src="http://www.metwo.cn/resource/gc/11.png">
    </div>
</template>
<script type="es6">
export default {
    name: 'IconPlay',
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>
<style lang="scss"  scoped>

.icon_play {
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        Object-fit: contain;
    }
}
</style>
