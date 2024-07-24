<template>
    <div>
        <JsonEditorVue mode="text" v-model="result" :style="{ width: width }"></JsonEditorVue>
    </div>
</template>
<script type="es6">
import JsonEditorVue from 'json-editor-vue';

export default {
    name: 'JsonEditor',
    data: () => {
        return {
            result: {}
        };
    },
    props: {
        value: null,
        type: {
            type: Number,
            default() {
                return 0;//0 str 1 json
            }
        },
        width: {
            type: String,
            default() {
                return "600px";
            }
        }
    },
    watch: {
        result(val) {
            try {
                if (val && typeof val === 'string') {
                    if (this.type === 0) {
                        this.$emit('input', val.replace(/\n/g, ''));
                    } else {
                        this.$emit('input', JSON.parse(val));
                    }
                }
            } catch (e) {
                // --
            }
        },
        value(val) {
            try {
                if (val) {
                    if (typeof val === 'string') {
                        this.result = JSON.parse(val);
                    } else {
                        this.result = val;
                    }
                } else {
                    this.result = {};
                }
            } catch (e) {
                // --
            }
        }
    },
    components: {
        JsonEditorVue
    },
    mounted() {
        try {
            if (typeof this.value === 'string') {
                this.result = JSON.parse(this.value);
            } else {
                this.result = this.value;
            }
        } catch (e) {
            // --
        }
    }
};
</script>

