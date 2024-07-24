<template>
    <PAN :mock="mock" :color="color" :click-submit="clickSubmit" :config="config" />
</template>
<script>
import PAN from '@/common/components/picker/PreAndNext';

export default {
    name: 'PreAndNext',
    props: {
        config: {
            type: Object,
            default: () => {
                return {
                    pre: '前の日',
                    next: '後の日',
                    options: [{ name: 'name', value: 1 }],
                    current: 0
                };
            }
        },
        color: {
            type: String,
            default: () => {
                return '#ffffff';
            }
        },
        mock: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    methods: {
        clickSubmit(option) {
            this.$emit('clickSubmit', option);
        }
    },
    components: {
        PAN
    }
};
</script>
