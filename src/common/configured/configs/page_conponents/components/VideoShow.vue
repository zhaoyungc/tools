<template>
    <div class="video_show_container" :class="{edit: !!editType}" @click.stop="">
        <video
            class="the_video"
            ref="video"
            muted
            autoplay
            x5-playsinline="true"
            x5-video-player-type="h5"
            playsinline="true"
            webkit-playsinline="true"
            :src="videoUrl"
        />

        <div class="loading" v-if="showLoading">
            <Icon class="icon" type="loading" :isRun="true"></Icon>
        </div>
    </div>
</template>

<script>
import Icon from './icon/IconIndex.vue';

export default {
    name: 'VideoShow',
    props: {
        videoUrl: {
            type: String,
            default: () => {
                return '';
            }
        },
        editType: {
            type: String,
            default: () => {
                return '';
            }
        }
    },
    data() {
        return {
            showLoading: true,
            loadTimeOut: 0
        };
    },
    components: {
        Icon
    },
    methods: {
        clearLoadTimeOut() {
            if (this.loadTimeOut) {
                clearTimeout(this.loadTimeOut);
            }
        }
    },
    mounted() {
        const video = this.$refs.video;
        if (this.videoUrl) {
            video.addEventListener('canplay', () => {
                this.showLoading = false;
                this.clearLoadTimeOut();
                video.play();
            });
            video.addEventListener('ended', () => {
                this.$emit('over');
            });
            // 超时处理
            this.loadTimeOut = setTimeout(() => {
                this.$emit('over');
            }, 5000);
        }
    }
};
</script>

<style lang="scss" scoped>
.video_show_container {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 100;
    user-select: none;
    background: #000000;
    max-width: 7.5rem;
    transform: translate(-50%);

    &.edit {
        position: absolute;
    }

    .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;

        .icon {
            width: 0.4rem;
            height: 0.4rem;
        }
    }

    video {
        width: 100%;
        height: 100%;
        pointer-events: none;
        mix-blend-mode: screen;
        object-fit: contain;

        .media-controls-container {
            visibility: hidden;
        }
    }
}
</style>
