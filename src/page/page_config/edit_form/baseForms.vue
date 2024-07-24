<!--
    类型：
    默认：文字输入框
    area： 输去区域
    color：颜色选择
    url： 链接
    date：日期选择
    radio：单选
    checkbox: 多选
    json：json文档

    默认
-->
<template>
    <div class="base_forms_container">
        <div class="ct">
            <template v-if="thisData.type == 'color'">
                <el-input class="color_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"></el-input>
                <el-color-picker v-if="!thisData.disable" class="color_sel" v-model="colorValue" size="mini">
                </el-color-picker>
                <el-select v-model="baseValue" v-if="!thisData.base && !thisData.disable && colorOption.length > 0"
                    placeholder="请选择全局颜色" size="mini">
                    <el-option v-for="item in colorOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </template>
            <template v-else-if="thisData.type == 'number'">
                <el-input-number v-model="thisData.value" :disabled="thisData.disable" :min="(thisData.ranges || [0, 10000])[0]"
                    :max="(thisData.ranges || [0, 10000])[1]" size="mini">
                </el-input-number>
            </template>
            <template v-else-if="thisData.type == 'area'">
                <el-input class="text_inp" type="textarea" :rows="2" :disabled="thisData.disable" v-model="thisData.value"
                    size="mini"></el-input>
            </template>
            <template v-else-if="thisData.type == 'url'">
                <el-input class="url_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini">
                    <template slot="prepend">{{ thisData.titleTip || '页面链接' }}</template>
                </el-input>
            </template>
            <template v-else-if="thisData.type == 'date'">
                <el-date-picker v-if="thisData.unit" class="date_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"
                    :type="thisData.unit || 'datetime'" :value-format="thisData.format || 'yyyy/MM/dd'" placeholder="选择日期">
                </el-date-picker>
                <el-date-picker v-else class="date_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"
                    type="datetime" :value-format="dateValueFormt" placeholder="选择日期时间">
                </el-date-picker>
            </template>
            <template v-else-if="thisData.type == 'time'">
                <el-time-select class="date_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"
                    placeholder="选择时间" :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }">
                </el-time-select>
            </template>
            <template v-else-if="thisData.type == 'radio'">
                <el-radio-group v-model="thisData.value" :disabled="thisData.disable">
                    <el-radio v-for="(option, optKey) in thisData.options" :key="optKey" :label="option.value">
                        {{ option.label }}
                    </el-radio>
                </el-radio-group>
            </template>
            <template v-else-if="thisData.type == 'checkbox'">
                <el-checkbox-group v-model="thisData.value" :disabled="thisData.disable">
                    <el-checkbox v-for="(option, optKey) in thisData.options" :key="optKey" :label="option.value">
                        {{ option.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </template>
            <template v-else-if="thisData.type == 'json'">
                <JsonEditor class="text_inp" :disabled="thisData.disable" :type="0" width="100%" v-model="thisData.value">
                </JsonEditor>
            </template>
            <template v-else-if="thisData.type == 'image'">
                <el-input class="url_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"></el-input>
                <UploadImage v-if="!thisData.disable" class="upload_btn" @success="uploadSuccess"></UploadImage>
            </template>
            <template v-else-if="thisData.type == 'group' || thisData.type === 'group_ids'">
                <el-input class="other_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"></el-input>
                <button class="pick" @click="doShowRankList(data)">选择</button>
            </template>
            <template v-else>
                <el-input class="other_inp" :disabled="thisData.disable" v-model="thisData.value" size="mini"></el-input>
            </template>
        </div>
        <div class="image_msg" v-if="thisData.type == 'image' && thisData.showSize">宽度: {{ width }}, 高度：{{ height }}</div>
        <el-alert v-if="errorMsg" :title="errorMsg" type="error"></el-alert>
    </div>
</template>
<script type="es6">
import UploadImage from './uploadImage.vue';
import JsonEditor from '@/common/JsonEditor.vue';

export default {
    name: 'BaseForms',
    props: ["data", "pageAllStyle"],
    data: () => {
        return {
            errorMsg: '',
            width: 0,
            height: 0,
            uploadUrl: '',
            size: 0,
            thisData: {},
        };
    },
    components: {
        JsonEditor,
        UploadImage,
    },
    methods: {
        doShowRankList(data) {
            console.log(data);
        },
        uploadSuccess(url, size) {
            this.thisData.value = url;
            this.uploadUrl = url;
            if (size && size > 0) {
                this.size = parseInt(size / 1024 + '');
            } else {
                this.size = 0;
            }
        },
        checkErrorMsg(imgDom) {
            this.width = imgDom.width;
            this.height = imgDom.height;
            if (this.thisData.widths && this.thisData.widths.length >= 2) {
                if (imgDom.width < this.thisData.widths[0] || imgDom.width > this.thisData.widths[1]) {
                    this.errorMsg = '宽度范围 ' + this.thisData.widths[0] + '～' + this.thisData.widths[1] + '(包含)';
                }
            }
            if (this.thisData.sizes && this.thisData.sizes.length >= 2 && !this.errorMsg) {
                if (this.size && this.size > 0 && this.uploadUrl == this.thisData.value) {
                    if (this.size < this.thisData.sizes[0] || this.size > this.thisData.sizes[1]) {
                        this.errorMsg = '大小范围 ' + this.thisData.sizes[0] + '～' + this.thisData.sizes[1] + '(包含), 请压缩图片, 建议地址 https://tinypng.com/';
                    }
                }
            }
        },
        getImageSize(url) {
            if (url) {
                const imgDom = new Image();
                imgDom.src = url;
                this.errorMsg = '';
                imgDom.onerror = () => {
                    this.errorMsg = '链接错误';
                };
                if (imgDom.complete) {
                    this.checkErrorMsg(imgDom);
                } else {
                    imgDom.onload = () => {
                        this.checkErrorMsg(imgDom);
                    };
                }
            } else {
                this.width = 0;
                this.height = 0;
                this.size = 0;
            }
        }
    },
    computed: {
        dateValueFormt() {
            if (this.thisData.format) {
                return this.thisData.format;
            } else if (this.thisData.unit == 'year') {
                return 'yyyy';
            } else if (this.thisData.unit == 'month') {
                return 'yyyy/MM';
            } else if (this.thisData.unit == 'date') {
                return 'yyyy/MM/dd';
            } else {
                return 'yyyy/MM/dd HH:mm:ss';
            }
        },
        colorValue: {
            get() {
                if (this.thisData.value.indexOf('#') < 0) {
                    let item = {};
                    for (let index = 0; index < this.colorOption.length; index++) {
                        const element = this.colorOption[index];
                        if (element.value == this.thisData.value) {
                            item = element;
                            break;
                        }
                    }
                    return item.color;
                } else {
                    return this.thisData.value;
                }
            },
            set(val) {
                this.thisData.value = val;
            }
        },
        baseValue: {
            get() {
                if (this.thisData.value.indexOf('#') < 0) {
                    return this.thisData.value;
                } else {
                    return '';
                }
            },
            set(val) {
                this.thisData.value = val;
            }
        },
        colorOption() {
            if (
                this.pageAllStyle &&
                this.pageAllStyle.colorList &&
                this.pageAllStyle.colorList.value &&
                this.pageAllStyle.colorList.value.length > 0
            ) {
                return this.pageAllStyle.colorList.value.map((col) => {
                    return {
                        label: col.name.value,
                        value: col.keys.value,
                        color: col.color.value,
                    };
                });
            } else {
                return [];
            }
        },
    },
    mounted() {
        this.thisData = {
            ...this.data
        };
        if (this.thisData.type == 'image') {
            this.getImageSize(this.thisData.value);
        }
        this.$watch('data', (newVal, oldVal) => {
            this.thisData = newVal;
        });
        this.$watch('thisData.value', (newVal, oldVal) => {
            this.errorMsg = '';
            if (this.thisData.type == 'image') {
                this.getImageSize(newVal);
            }
            if (newVal != this.data.value) {
                this.$emit('change', this.thisData);
            }
        });
    }
};
</script>

<style lang="scss"  scoped>
.base_forms_container {
    width: 100%;

    .ct {
        display: flex;
        align-items: center;
    }

    .color_inp {
        width: 100px;
    }

    .url_inp {
        width: 100%;
        max-width: 800px;
    }

    .date_inp {
        width: 200px;
    }

    .text_inp {
        width: 100%;
        max-width: 600px;
    }

    .text_inputarea {
        width: 500px;
        height: 100px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }

    .other_inp {
        width: 100%;
        max-width: 400px;
    }

    .image_msg {
        font-size: 12px;
        color: #606266;
    }

    .pick {
        margin-left: 10px;
        white-space: nowrap;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #409EFF;
        border-color: #409EFF;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
        padding: 7px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
}
</style>
