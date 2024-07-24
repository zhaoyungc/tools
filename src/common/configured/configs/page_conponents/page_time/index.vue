<template>
    <div class="page_time_container page_module_handle_container">
        <slot name="handle"></slot>
        <div class="normal_msg" v-if="showTimeDesc" :style="messageStyle">{{ showTimeDesc }}</div>
        <TimeDeath v-else :deathTime="endTime" :message="staticData.propsData.message" :unitList="unitList"
            :messagePosition="staticData.propsData.messagePosition" :messageStyle="messageStyle" :timeStyle="timeStyle"
            :unitStyle="unitStyle" @activeOver="activeOver"></TimeDeath>
    </div>
</template>
<script type="es6">
import TimeDeath from "../components/TimeDeath.vue";
export default {
    name: 'PageTime',
    props: ['type', 'editType', 'staticData'],
    components: {
        TimeDeath,
    },
    methods: {
        activeOver(isOver) {
            if (isOver) {
                // 处理逻辑，此处只有文案自动变化，无需处理
                if (this.staticData.eventData.emitEvent) {
                    console.log('结束');
                }
            }
        }
    },
    computed: {
        showTimeDesc() {
            let showTimeDesc = '';
            const end_time_str = new Date(this.staticData.propsData.endTime).getTime();
            const begin_time_str = new Date(this.staticData.propsData.beginTime).getTime();
            const nowTime = new Date().getTime();
            if (begin_time_str > nowTime) {
                showTimeDesc = this.staticData.propsData.beginDesc;
            }
            if (nowTime >= end_time_str) {
                showTimeDesc = this.staticData.propsData.endDesc;
            }
            return showTimeDesc;
        },
        endTime() {
            return new Date(this.staticData.propsData.endTime).getTime();
        },
        unitList() {
            const unitStr = this.staticData.propsData.unitList;
            return unitStr.split(',').map((str) => {
                if (str == 'null') {
                    return null;
                } else {
                    return str;
                }
            });
        },
        messageStyle() {
            return {
                color: this.staticData.propsData.messageColor,
                fontSize: this.staticData.propsData.messageSize / 100 + 'rem',
                lineHeight: this.staticData.propsData.messageSize / 100 + 'rem',
                fontWeight: this.staticData.propsData.messageBolder,
            };
        },
        unitStyle() {
            return {
                color: this.staticData.propsData.unitColor,
                fontSize: this.staticData.propsData.unitSize / 100 + 'rem',
                lineHeight: this.staticData.propsData.unitSize / 100 + 'rem',
                marginRight: this.staticData.propsData.unitRightSpace / 100 + 'rem',
                fontWeight: this.staticData.propsData.unitBolder,
            };
        },
        timeStyle() {
            return {
                color: this.staticData.propsData.timeColor,
                fontSize: this.staticData.propsData.timeSize / 100 + 'rem',
                lineHeight: this.staticData.propsData.timeSize / 100 + 'rem',
                marginRight: this.staticData.propsData.timeRightSpace / 100 + 'rem',
                fontWeight: this.staticData.propsData.timeBolder,
            };
        }
    }
};
</script>

<style lang="scss"  scoped>
.page_time_container {
    .normal_msg {
        text-align: center;
    }
}
</style>
