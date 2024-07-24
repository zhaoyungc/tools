<template>
    <div class="time_death_container" :class="messagePosition">
        <div class="times_msg" v-if="messagePosition == 'left' || messagePosition == 'top'" :style="messageStyle">
            {{ message }}
        </div>
        <div class="times_container" v-if="deathDesc.secDesc">
            <span class="time" :style="timeStyle" v-if="unitList[3] != null">
                {{ deathDesc.dayDesc }}
            </span>
            <span class="unit" :style="unitStyle" v-if="unitList[3] != null">
                {{  unitList[3] || " " }}
            </span>
            <span class="time" :style="timeStyle" v-if="unitList[2] != null">
                {{ deathDesc.houDesc }}
            </span>
            <span class="unit" :style="unitStyle" v-if="unitList[2] != null">
                {{ unitList[2] || ":" }}
            </span>
            <span class="time" :style="timeStyle" v-if="unitList[1] != null">
                {{ deathDesc.minDesc }}
            </span>
            <span class="unit" :style="unitStyle" v-if="unitList[1] != null">
                {{ unitList[1] || ":" }}
            </span>
            <span class="time" :style="timeStyle" v-if="unitList[0] != null">
                {{ deathDesc.secDesc }}
            </span>
            <span class="unit" :style="unitStyle" v-if="unitList[0] != null">
                {{ unitList[0] || "" }}
            </span>
        </div>
        <div class="times_msg" v-if="messagePosition == 'down' || messagePosition == 'right'" :style="messageStyle">
            {{ message }}
        </div>
    </div>
</template>
<!-- 组件使用过程中切换页面必须销毁 -->
<!-- 或者此组件在页面中一直保留， -->
<script type="es6">
export default {
    name: 'TimeDeath',
    props: {
        messagePosition: { // 多行展示
            type: String,
            default() { return 'left';
            }
        },
        isFullZero: { // 单位数补0
            type: Boolean,
            default() { return true;
            }
        },
        message: {
            type: String,
            default() { return "";
            }
        },
        deathTime: {
            type: Number,
            default() { return 0;
            }
        },
        unitList: {
            type: Array,
            default() { return ["", ":", ":", " "]; // 秒，分，时， 天
            }
        },
        messageStyle: {
            type: Object,
            default() { return {};
            }
        },
        unitStyle: {
            type: Object,
            default() { return {};
            }
        },
        timeStyle: {
            type: Object,
            default() { return {};
            }
        }
    },
    data: () => {
        return {
            countdownTimeout: 0,
            deathDesc: {},
            time: 0,
        };
    },
    methods: {
        resetCountdownDesc(time) {
            let day = 0;
            let hou = 0;
            let min = 0;
            let sec = 0;
            if (time > 0) { if (this.unitList[3] != null) { day = parseInt(time / (3600 * 24)); time = time % (3600 * 24); } if (this.unitList[2] != null) { hou = parseInt(time / 3600); time = time % 3600; } if (this.unitList[1] != null) { min = parseInt(time / 60); time = time % 60; } if (this.unitList[0] != null) { sec = time; }
            }
            const deathDesc = { secDesc: sec + '', minDesc: min + '', houDesc: hou + '', dayDesc: day + '',
            };
            if (sec < 10 && this.isFullZero) { deathDesc.secDesc = '0' + sec;
            }
            if (min < 10 && this.isFullZero) { deathDesc.minDesc = '0' + min;
            }
            if (hou < 10 && this.isFullZero) { deathDesc.houDesc = '0' + hou;
            }
            if (day < 10 && this.isFullZero) { deathDesc.dayDesc = '0' + day;
            }
            return deathDesc;
        },
        setAvtiveOver(isOver) {
            this.$emit('activeOver', isOver);
        },
        startTimeProgress() {
            if (this.deathTime > 1e12) { this.time = parseInt(this.deathTime / 1000);
            } else { this.time = this.deathTime;
            }
            const nowTime = parseInt(new Date().getTime() / 1000);
            const time = this.time - nowTime;
            this.deathDesc = this.resetCountdownDesc(time);

            if (this.countdownTimeout) { clearTimeout(this.countdownTimeout);
            }
            this.setAvtiveOver(time <= 0);
            if (time > 0) { this.countdownTimeout = setTimeout(() => { this.startTimeProgress(); }, 1000);
            }
        },
    },
    watch: {
        deathTime(newVal, oldVal) {
            if (newVal != oldVal) { this.startTimeProgress();
            }
        }
    },
    beforeDestroy() {
        if (this.countdownTimeout) {
            clearInterval(this.countdownTimeout);
        }
    },
    mounted() {
        this.startTimeProgress();
    }
};
</script>

<style lang="scss"  scoped>
.time_death_container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;

    .times_msg {
        color: #ffffff;
        font-size: 0.32rem;
        line-height: 0.32rem;
    }

    .times_container {
        display: flex;
        flex-direction: row;
        align-items: center;

        .time {
            color: #ffde00;
            font-size: 0.32rem;
            line-height: 0.32rem;
        }

        .unit {
            color: #ffffff;
            font-size: 0.32rem;
            line-height: 0.32rem;
        }
    }

    &.left {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .times_msg {
            padding-right: 0.1rem;
        }
    }

    &.right {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .times_msg {
            padding-left: 0.1rem;
        }
    }

    &.top {
        .times_msg {
            padding-bottom: 0.28rem;
        }
    }

    &.down {
        .times_msg {
            padding-top: 0.28rem;
        }
    }
}
</style>
