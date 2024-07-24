<template>
    <PopTitle :style="popStyle" :title="propsData.dialogTitle" :titleBgColor="propsData.dialogTitleBgColor"
        :titleColor="propsData.dialogTitleColor" @close="onClose">
        <div class="dialog_container">
            <div class="dialog_desc" v-html="propsData.dialogDesc"></div>
            <div class="btn_group">
                <div class="button" v-if="propsData.dialogBtnCancle" @click="onClose" :style="{
                    color: propsData.dialogBtnBgColor,
                    borderColor: propsData.dialogBtnBgColor,
                }">
                    {{ propsData.dialogBtnCancle }}
                </div>
                <div class="button" @click.stop="okSuccess" :style="{
                    background: propsData.dialogBtnBgColor,
                    color: propsData.dialogBtnFontColor,
                    borderColor: propsData.dialogBtnBgColor,
                }">
                    {{ propsData.dialogBtnOk }}
                </div>
            </div>
        </div>
    </PopTitle>
</template>
<script type="es6">
import PopTitle from './PopTitle.vue';

export default {
    name: 'HandleConfirmDialog',
    props: ['propsData', 'editType'],
    data: () => {
        return {

        };
    },
    components: {
        PopTitle,
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        okSuccess() {
            this.$emit('success');
        },
    },
    computed: {
        popStyle() {
            return {
                position: this.editType ? "absolute" : "fixed",
            };
        },
    },
    mounted() {

    },
};
</script>

<style lang="scss"  scoped>
.dialog_container {
    color: #000000;

    .dialog_desc {
        width: 100%;
        font-size: 0.28rem;
        text-align: center;
        padding: 0.3rem 0 0.5rem;
        word-break: break-word;
    }

    .btn_group {
        width: 100%;
        display: flex;

        .button {
            width: 100%;
            text-align: center;
            font-size: 0.32rem;
            line-height: 0.32rem;
            padding: 0.27rem 0;
            border-radius: 0.16rem;
            border: 0.01rem solid #ffffff;

            &:nth-child(2) {
                margin-left: 0.2rem;
            }
        }
    }
}
</style>
