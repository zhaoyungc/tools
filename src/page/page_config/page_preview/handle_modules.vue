<template>
    <div v-if="editType != 'tree'" class="page_see_btns" :class="'btns_' + (type || 'module')">
        <el-button v-if="type == 'container'" class="button" size="mini" plain @click.stop="clickHandler('select')">
            {{ moduleName || '容器' }}
        </el-button>
        <el-button class="button" size="mini" type="primary" @click.stop="clickHandler('before')">前添加</el-button>
        <el-button v-if="type == 'container'" class="button" size="mini" type="primary" @click.stop="clickHandler('in')">
            内部
        </el-button>
        <el-button class="button" size="mini" type="primary" @click.stop="clickHandler('after')">后添加</el-button>
        <el-button v-if="type != 'container'" class="button" size="mini" plain @click.stop="clickHandler('select')">
            {{ moduleName || '组件' }}
        </el-button>
    </div>
</template>
<script type="es6">

export default {
    name: 'HandleModules',
    props: ['type', 'moduleName', 'editType', 'treeSelectMask'],
    methods: {
        clickHandler(kind) {
            this.$emit('select', kind);
        }
    }
};
</script>
<style lang="scss"  scoped>

.page_see_btns {
    position: absolute;
    top: 0;
    width: 100%;
    display: none;
    z-index: 50;
    pointer-events: none;

    &.btns_module {
        text-align: right;
    }

    .button {
        padding: 3px;
        margin-left: 5px;
        pointer-events: auto;
    }
}

.component_style_container_selected {
    outline: 1px solid red;
    margin: 1px;
}
</style>
