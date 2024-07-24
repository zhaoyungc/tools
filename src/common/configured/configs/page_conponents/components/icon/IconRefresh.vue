<template>
    <div class="icon_loading" :class="{'run': isRun}">
        <img src="http://www.metwo.cn/resource/gc/refresh.png">
    </div>
</template>
<script type="es6">
export default {
    name: 'IconRefresh',
    props: {
        isRun: {
            type: Boolean,
            default() {
                return false;
            }
        },
    }
};
</script>
<style lang="scss"  scoped>
@keyframes run {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.icon_loading {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        Object-fit: contain;
    }

    &.run {
        animation-name: run;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
}
</style>
