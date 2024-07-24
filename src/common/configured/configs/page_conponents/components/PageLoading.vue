<template>
    <div class="page_loading_ct">
        <div class="page_loading run">
            <img src="http://www.metwo.cn/resource/gc/loading.png">
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'PageLoading',
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

.page_loading_ct {
    width: 100%;
    height: 3rem;
    position: relative;
}

.page_loading {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    top: 50%;
    left: 50%;
    margin-left: -0.2rem;
    margin-top: -0.2rem;

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
