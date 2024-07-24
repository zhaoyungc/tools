import Vue from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';
import { getUrlStrs } from '@/common/utils.js';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'http://www.metwo.cn/resource/gc/user.png',
    loading: 'http://www.metwo.cn/resource/gc/user.png',
    attempt: 1
});

const { id = '1' } = getUrlStrs();

new Vue({
    data() {
        return {
            pageId: id,
            loginUserUid: ''
        };
    },
    method: {},
    created() {},
    render: h => h(App)
}).$mount('#app');
