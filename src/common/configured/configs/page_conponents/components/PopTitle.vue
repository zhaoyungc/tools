<!-- 带有title的 POP 组件 -->
<template>
    <div class="new_pop_title_dialog_container" @click.stop="onClose">
        <div class="pop_dialog" @click.stop="">
            <Icon type="close" class="close" :showBorder="true" @click="onClose" color="#ffffff"></Icon>
            <div class="pop_title overflow-ellipsis" :style="{
                backgroundColor: titleBgColor,
                color: titleColor,
            }">
                {{ title }}
            </div>
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
    props: {
        title: {
            type: String,
            default: () => {
                return '';
            }
        },
        titleBgColor: {
            type: String,
            default: () => {
                return '#ff4b38';
            }
        },
        titleColor: {
            type: String,
            default: () => {
                return '#ffffff';
            }
        }
    },
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
.new_pop_title_dialog_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;

    .overflow-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .pop_dialog {
        position: relative;
        width: 5.5rem;
        height: auto;
        background: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.2rem;
        padding: 1rem 0.28rem 0.35rem 0.28rem;
        box-sizing: border-box;

        .pop_title {
            width: 4.2rem;
            height: 0.36rem;
            padding: 0.14rem 0;
            border-bottom-left-radius: 0.16rem;
            border-bottom-right-radius: 0.16rem;
            line-height: 0.36rem;
            font-size: 0.36rem;
            position: absolute;
            top: 0;
            left: 0.65rem;
            text-align: center;
        }
    }

    .close {
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0;
        top: -1rem;

        img {
            width: 100%;
            height: 100%;
            Object-fit: cover;
        }
    }
}
</style>