<template>
    <div class="slot_desc">
        props:{{msg}}
    </div>
</template>
<script type="es6">

export default {
    name: 'TestProps',
    props: ['msg', 'data'],
    data: () => {
        return {
            
        };
    },
    components: {
    },
    methods: {
    },
    computed: {
    },
    mounted() {
        console.log('--test-props--', this.msg);
    },
};
</script>

<style lang="scss"  scoped>
</style>

