<template>
    <div class="component_uploader">
        <i v-if="loading" class="el-icon-loading icon"></i>
        <i v-else class="el-icon-upload icon"></i>
    </div>
</template>
<script type="es6">

export default {
    name: 'UploadImage',
    data: () => {
        return {
            loading: false, //
            size: 0,
        };
    },
    props: {},
    components: {},
    methods: {

    },
    mounted() {

    }
};
</script>

<style lang="scss"  scoped>
.component_uploader {
    display: block;
    box-sizing: border-box;
    height: 28px;
    width: 40px;
    background: #409eff;
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    .icon {
        padding: 4px 10px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        pointer-events: none;
    }

    .uplaod_point {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;

        input {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            cursor: pointer;
        }
    }

    .u_loading {
        width: 100%;
        height: 100%;

        .loading {
            width: 0.3rem;
            height: 0.3rem;
        }
    }
}
</style>