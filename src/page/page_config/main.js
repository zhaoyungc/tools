import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import 'element-ui/lib/theme-chalk/index.css';
import { getUrlStrs } from '../../common/utils';
import request from '@/common/request';

Vue.prototype.$request = request;
Vue.use(ElementUI);

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
            componentSelectedDom: {},
        };
    },
    method: {},
    created() {
    },
    render: h => h(App)
}).$mount('#app');

