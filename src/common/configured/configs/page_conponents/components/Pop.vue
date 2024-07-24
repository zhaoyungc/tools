<template>
    <div class="new_pop_dialog_container">
        <div class="pop_dialog">
            <!-- <div class="close" @click="onClose">
                <img src="http://www.metwo.cn/resource/gc/1.png">
            </div> -->
            <Icon type="close" class="close" :showBorder="true" @click="onClose" color="#848484"></Icon>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script type="es6">

import Icon from './icon/IconIndex.vue';

export default {
    name: 'Pop',
    components: {
        Icon,
    },
    methods: {
        onClose() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss"  scoped>
.new_pop_dialog_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;

    .pop_dialog {
        position: relative;
        width: 6rem;
        height: auto;
        background: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.2rem;
        padding: 0.65rem 0.28rem 0.35rem 0.28rem;
        box-sizing: border-box;
    }

    .close {
        width: 0.6rem;
        height: 0.61rem;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;

        img {
            width: 100%;
            height: 100%;
            Object-fit: cover;
            filter: brightness(0.5);
        }
    }
}
</style>