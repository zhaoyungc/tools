<template>
    <div class="icon_loading">
        <img v-if="selected"
            src="http://www.metwo.cn/resource/gc/651e25ea281b1f155172dcefa2fe04cd_38-38-0.png">
        <img v-else
            src="http://www.metwo.cn/resource/gc/fe436fe46d34176c02ae359b5afaea36_44-44-0.png">
    </div>
</template>
<script type="es6">
export default {
    name: 'SelectSquare',
    props: {
        selected: {
            type: Boolean,
            default() {
                return false; // 勾选
            }
        }
    }
};
</script>
<style lang="scss"  scoped>
.icon_loading {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        Object-fit: contain;
    }
}
</style>
