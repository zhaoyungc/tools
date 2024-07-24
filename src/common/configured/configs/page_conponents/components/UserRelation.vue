<template>
    <Button v-if="m_uid !== uid" v-bind="$attrs" :bgColor="(relation == 0 || relation == 2) ? bgColor : ''"
        :fontColor="(relation == 0 || relation == 2) ? fontColor : bgColor" :borderColor="bgColor"
        @click="handleClickFollowButton">
        <span>{{ relationText }}</span>
    </Button>
</template>
<script>
import Mixin from '../../../../components/follow/Mixin';
import Button from './Button.vue';
export default {
    name: 'UserRelation',
    components: {
        Button
    },
    data() {
        return {
            relationIcon: '',
            relationText: ''
        };
    },
    props: {
        textOnly: {
            type: Boolean,
            default: false
        },
        uid: {
            type: String
        },
        bgColor: {
            type: String,
            default: () => {
                return '#699af0';
            }
        },
        fontColor: {
            type: String,
            default: () => {
                return '#ffffff';
            }
        }
    },
    mixins:[Mixin],
    watch: {
        relation: {
            immediate: true,
            handler(newVal) {
                if (newVal === 0 || newVal === 2) {
                    this.relationIcon = 'follow';
                    this.relationText = 'フォロー';
                } else if (newVal === 3) {
                    this.relationIcon = 'mutual_follow';
                    this.relationText = '相互フォロー';
                } else {
                    this.relationIcon = 'unfollow';
                    this.relationText = 'フォロー中';
                }
            }
        }
    },
    methods: {
        handleClickFollowButton() {
            [0, 2].indexOf(this.relation) !== -1 ? this.follow() : this.unfollow();
        }
    }
};
</script>