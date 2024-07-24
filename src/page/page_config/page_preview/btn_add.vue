<template>
    <div class="btn_add_container">
        <div class="page_no_position">
            <img src="http://www.metwo.cn/resource/gc/nodata_cu.png">
        </div>
        <el-button type="primary" @click.stop="onClick" size="mini">开始添加</el-button>
    </div>
</template>
<script type="es6" >
export default {
    name: 'BtnAdd',
    props: ['msg'],
    methods: {
        onClick(kind) {
            this.$emit('select', kind);
        }
    }
};
</script>

<style lang="scss"  scoped>
.btn_add_container {
    width: 100%;
    height: auto;
    background: #ffffff;
    text-align: center;
    padding: 0.4rem 0;

    .page_no_position {
        width: 100%;
        height: 2rem;
        padding-bottom: 0.6rem;

        img {
            width: 100%;
            height: 100%;
            Object-fit: contain;
        }
    }
}
</style>
