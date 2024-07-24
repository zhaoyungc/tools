<template>
    <div id="app" class="auto_page">
        <template v-if="loaded">
            <OnLinePreview :config="configData.pageConfig" :configData="configData" :evtId="$root.pageId">
                <template v-for="(val, key1, index) in $scopedSlots" :slot="key1" slot-scope="prop">
                    <div :key="index">
                        <!-- 一定要有一个过渡式的容器包裹才能作为桥梁接口参数 prop -->
                        <slot :name="key1" :props="getKeyVal(prop)"></slot>
                    </div>
                </template>
            </OnLinePreview>
        </template>
        <div v-else class="loading_ct">
            <Icons class="loading" type="loading"></Icons>
        </div>
    </div>
</template>
<script type="es6">
import OnLinePreview from './configs/page_preview/online_preview.js';
import PageInit from './configs/page_preview/online_init.js';
import { getData } from './configs/utils/ParamRequest.js';
import { getShowData } from './configs/utils/ParamSwitch.js';
import { getNormalColor } from './configs/utils/ActTools.js';
import Icons from './configs/page_conponents/components/icon/IconIndex.vue';
import { isUserLogin } from '@/common/utils.js';
export default {
    name: 'AutoPage',
    components: {
        OnLinePreview,
        Icons
    },
    data: () => {
        return {
            configData: {},
            loaded: false,
        };
    },

    methods: {
        async getConfig() {
            if (this.$root.pageId) {
                // 注意接口， 使用用户端的接口
                const data = await getData(this.$root.pageId);
                const configData = getShowData(data, this.$root.pageId);
                PageInit.init(configData, this.$root.pageId);
                this.configData = configData;
                this.$emit('eventLoadedFunc', JSON.parse(JSON.stringify(configData)));
                this.loaded = true;
            } else {
                window.alert('evt_id required!');
            }
        },
        getKeyVal(list) {
            const obj = {};
            list.forEach((item) => {
                if (item.cusType == 'json') {
                    let val = {};
                    try {
                        val = JSON.parse(item.value);
                        if (typeof val == 'string') {
                            val = JSON.parse(val);
                        }
                    } catch (error) {
                        val = {};
                    }
                    obj[item.key] = val;
                } else if (item.cusType == 'color') {
                    const colorList = (((this.configData || {}).all || {}).styleData || {}).colorList || [];
                    obj[item.key] = getNormalColor(item.value, colorList);
                } else {
                    obj[item.key] = item.value;
                }
            });
            return obj;
        }
    },
    created() {
        if (isUserLogin()) {
            this.$root.loginUserUid = '123';
        }
    },
    mounted() {
        this.getConfig();
    }
};
</script>

<style lang="scss">

.auto_page {
    color: #fff;
    min-height: 100%;
    font-size: 0.28rem;

    .loading_ct {
        width: 100%;
        height: 100%;
        position: relative;

        .loading {
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
            top: 50%;
            left: 50%;
            margin-left: -0.2rem;
            margin-top: -0.2rem;
        }
    }
}

.overflow-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.overflow-ellipsis2 {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    overflow: hidden;
    white-space: normal;
}
</style>
