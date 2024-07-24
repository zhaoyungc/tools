<template>
    <div class="icon_container">
        <IconLoading v-if="type == 'loading'"></IconLoading>
        <IconRefresh v-else-if="type == 'refresh'" :isRun="isRun"></IconRefresh>
        <SelectCircle v-else-if="type == 'select-circle'" :selected="selected" :color="color"></SelectCircle>
        <SelectSquare v-else-if="type == 'select-square'" :selected="selected" :color="color"></SelectSquare>
        <IconClose v-else-if="type == 'close'" :showBorder="showBorder" :color="color" @click="onClick"></IconClose>
        <IconPlay v-else-if="type == 'play'" @click="onClick"></IconPlay>
    </div>
</template>
<script type="es6">

import IconLoading from './IconLoading.vue';
import IconRefresh from './IconRefresh.vue';
import SelectCircle from './SelectCircle.vue';
import SelectSquare from './SelectSquare.vue';
import IconClose from './IconClose.vue';
import IconPlay from './IconPlay.vue';

export default {
    name: 'IconIndex',
    props: {
        type: {
            type: String,
            default() {
                return '';
            }
        },
        isRun: {
            type: Boolean,
            default() {
                return false;
            }
        },
        showBorder: {
            type: Boolean,
            default() {
                return false;
            }
        },
        selected: {
            type: Boolean,
            default() {
                return false;
            }
        },
        color: {
            type: String,
            default() {
                return '#ffffff';
            }
        }
    },
    components: {
        IconLoading,
        IconRefresh,
        IconClose,
        SelectCircle,
        SelectSquare,
        IconPlay,
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss"  scoped>
.icon_container {
    width: 100%;
    height: 100%;
    min-height: 0.3rem;
    min-width: 0.3rem;
    cursor: pointer;
}
</style>
