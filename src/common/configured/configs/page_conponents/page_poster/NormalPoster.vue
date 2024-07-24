<template>
    <div class="poster_container" :style="posterStyle">
        <img class="poster__img" :src="propsData.posterDown" />
        <div class="poster__extra">
            <div class="poster_run" v-if="propsData.posterCenter">
                <img :src="propsData.posterCenter" />
            </div>
            <div class="poster_top" v-if="propsData.posterTop">
                <img :src="propsData.posterTop" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NormalPoster',
    props: {
        url: {
            type: String,
            default: ''
        },
        propsData: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        posterStyle() {
            let result = {};
            if (this.propsData.minHeight) {
                result.minHeight = (this.propsData.minHeight / 100) + 'rem';
            }
            return result;
        }
    }
};
</script>

<style lang="scss"  scoped>
.poster_container {
    overflow: hidden;
    position: relative;
    width: 100%;

    .poster__img {
        width: 100%;
        object-fit: contain;
    }

    .poster__extra {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 100%;
    }

    .poster_run,
    .poster_top {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .poster_top {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
    }
}
</style>
