<template>
    <div class="line_divider_container" :style="ctStyle">
        <div class="line" :style="lineStyle">
            <div class="content" v-if="(data.imageLeft || data.font || data.imageRight)" :style="contentStyle">
                <div class="image" v-if="data.imageLeft" :style="imgStyle">
                    <img :src="data.imageLeft">
                </div>
                <div class="font" v-if="data.font" :style="fontStyle">{{ data.font }}</div>
                <div class="image" v-if="data.imageRight" :style="imgStyle">
                    <img :src="data.imageRight">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
export default {
    name: 'LineDivider',
    props: ['data'],
    computed: {
        ctStyle() {
            return {
                paddingLeft: this.data.paddingHeng / 100 + 'rem',
                paddingRight: this.data.paddingHeng / 100 + 'rem',
                paddingTop: this.data.paddingShu / 100 + 'rem',
                paddingBottom: this.data.paddingShu / 100 + 'rem',
            };
        },
        lineStyle() {
            const sty = {
                background: this.data.lineColor,
            };
            if (this.data.font || this.data.imageLeft || this.data.imageRight) {
                sty.marginTop = this.data.fontSize / 200 + 'rem';
                sty.marginBottom = this.data.fontSize / 200 + 'rem';
            }
            if (this.data.lineColor && this.data.lineColorEnd) {
                sty.background = "linear-gradient(to right," + this.data.lineColorEnd + ", " + this.data.lineColor + ", " + this.data.lineColorEnd + ")";
            } else {
                sty.background = this.data.lineColor || this.data.lineColorEnd || '';
            }
            return sty;
        },
        contentStyle() {
            return {
                background: this.data.fontBgColor,
            };
        },
        imgStyle() {
            const sty = {
                height: this.data.fontSize / 100 + 'rem',
            };
            return sty;
        },
        fontStyle() {
            return {
                color: this.data.fontColor,
                fontSize: this.data.fontSize / 100 + 'rem',
                lineHeight: this.data.fontSize / 100 + 'rem',
            };
        }
    }
};
</script>

<style lang="scss"  scoped>
.line_divider_container {
    width: 100%;
    box-sizing: border-box;

    .line {
        width: 100%;
        height: 1px;
        position: relative;
        text-align: center;

        .content {
            padding: 0 0.2rem;
            transform: translateY(-50%);
            display: inline-flex;
            flex-wrap: nowrap;
            align-items: center;

            .image {
                display: inline-block;

                img {
                    width: auto;
                    height: 100%;
                }
            }

            .font {
                display: inline-block;
                margin: 0 0.1rem;
            }
        }
    }
}
</style>
