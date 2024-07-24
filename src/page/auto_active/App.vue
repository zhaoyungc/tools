
<template>
    <AutoPage @eventLoadedFunc="eventLoadedFunc">
        <template slot="test-props" slot-scope="prop">
            <TestProps :msg="prop.props"></TestProps>
        </template>
        <template slot="test-normal" slot-scope="prop">
            <TestNormal :msg="prop.props"></TestNormal>
        </template>
    </AutoPage>
</template>
<script type="es6">

import AutoPage from '@/common/configured/index.vue';
import TestProps from './components/testProps.vue';
import TestNormal from './components/testNormal.vue';

export default {
    name: 'App',
    components: {
        AutoPage,
        TestProps,
        TestNormal,
    },
    data: () => {
        return {

        };
    },

    methods: {
        eventLoadedFunc(eventInfo) {
            console.log('活动配置信息(json处理过的)：', eventInfo);
        }
    },
    mounted() {

    },
};
</script>

<style lang="scss">
@import url(../../common/base.css);

#page {
    width: 100%;
}

</style>

<style lang="scss" scoped>

</style>