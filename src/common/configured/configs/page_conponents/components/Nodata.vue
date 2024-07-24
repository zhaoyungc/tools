<template>
    <div class="nodata" :class="{ nodata_limit: type === 1 }">
        <div class="nodata_icon"></div>
        <p class="nodata_text" :style="{
                color: color,
            }">{{ null_text }}</p>
    </div>
</template>
<script type="es6">
export default {
    name: 'Nodata',
    props: {
        null_text: {
            type: String,
            default: () => {
                return 'データはありません';
            }
        },
        type: {
            type: Number,
            default: () => {
                return 1; //0全屏 1 局部
            }
        },
        color: {
            type: String,
            default: () => {
                return '#ffffff';
            }
        }
    }
};
</script>

<style lang="scss"  scoped>
.nodata {
    width: 2.97rem;
    position: fixed;
    overflow: hidden;
    @include center();

    .nodata_icon {
        background-image: url('http://www.metwo.cn/resource/gc/nodata_cu.png');
        background-size: contain;
        width: 2.97rem;
        height: 2.11rem;
    }

    .nodata_text {
        font-size: 0.3rem;
        color: #fff;
        margin-top: 0.2rem;
        text-align: center;
        line-height: 0.36rem;
    }
}

.nodata_limit {
    position: inherit;
    transform: inherit;
    margin: 0.5rem auto 0.2rem;
    top: auto;
    left: auto;
}
</style>
