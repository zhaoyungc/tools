<template>
    <div class="auto_text_container">
        <div :style="sty" v-html="data.font"></div>
    </div>
</template>
<script type="es6">
export default {
    name: 'AutoText',
    props: ['data'],
    computed: {
        sty() {
            return {
                color: this.data.color,
                fontSize: this.data.fontSize / 100 + 'rem',
                lineHeight: this.data.fontLineHeight / 100 + 'rem',
                textAlign: this.data.fontAlign,
                paddingLeft: this.data.paddingHeng / 100 + 'rem',
                paddingRight: this.data.paddingHeng / 100 + 'rem',
                paddingTop: this.data.paddingShu / 100 + 'rem',
                paddingBottom: this.data.paddingShu / 100 + 'rem',
                background: this.data.bgColor,
                borderRadius: this.data.radius / 100 + 'rem',
                fontWeight: this.data.fontWeight || 'normal',
            };
        }
    }
};
</script>
<style lang="scss"  scoped>
.auto_text_container {
    width: 100%;
}
</style>
