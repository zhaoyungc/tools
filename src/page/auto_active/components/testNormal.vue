<template>
    <div class="slot_desc">
        normal:{{msg}}
    </div>
</template>
<script type="es6">

export default {
    name: 'TestNormal',
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
        console.log('--test-normal--', this.msg);
    },
};
</script>

<style lang="scss"  scoped>
</style>

