<template>
    <PopTitle :style="popStyle" :title="propsData.rewardDialogTitle" :titleBgColor="propsData.rewardDialogTitleBgColor"
        :titleColor="propsData.rewardDialogTitleColor" @close="onClose">
        <div class="dialog_container">
            <div class="dialog_scroll_ct">
                <BaseRewardCardItem :bgColor="propsData.rewardDialogImageBgColor"
                    :color="propsData.rewardDialogRewardNameColor" :list="rewardList"></BaseRewardCardItem>
            </div>
            <div class="btn_group">
                <div class="button" v-if="propsData.rewardDialogBtnCancle" @click="onClose" :style="{
                    color: propsData.rewardDialogBtnBgColor,
                    borderColor: propsData.rewardDialogBtnBgColor,
                }">
                    {{ propsData.rewardDialogBtnCancle }}
                </div>
                <div class="button" @click.stop="okSuccess" :style="{
                    background: propsData.rewardDialogBtnBgColor,
                    color: propsData.rewardDialogBtnFontColor,
                    borderColor: propsData.rewardDialogBtnBgColor,
                }">
                    {{ propsData.rewardDialogBtnOk }}
                </div>
            </div>
        </div>
    </PopTitle>
</template>
<!-- 奖励确认弹窗 -->
<script type="es6">
import PopTitle from './PopTitle.vue';
import BaseRewardCardItem from './base_card/RewardCardList.vue';
export default {
    name: 'RewardDialog',
    props: {
        propsData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        rewardList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        editType: {
            type: String,
            default: () => {
                return '';
            }
        }
    },
    data: () => {
        return {
        };
    },
    components: {
        PopTitle,
        BaseRewardCardItem,
    },
    computed: {
        popStyle() {
            return {
                position: this.editType ? "absolute" : "fixed",
            };
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
        okSuccess() {
            this.$emit('success');
        },
    },
    mounted() {
    }
};
</script>

<style lang="scss"  scoped>
.dialog_container {
    color: #000000;

    .dialog_scroll_ct {
        width: 100%;
        max-height: 3rem;
        overflow-y: scroll;
        margin-bottom: 0.2rem;
    }

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
