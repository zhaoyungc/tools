<template>
    <div class="table_line_container">
        <table class="table" border="1" rules="all" frame="box" :style="{
            width: data.isFull == '1' ? '100%' : 'auto',
            borderColor: data.borderColor,
        }">
            <tr v-for="(tr, trIndex) in data.rows" :key="trIndex">
                <td v-for="(td, tdIndex) in tr.msg.split(',')" :key="tdIndex" :style="{
                    color: tr.color,
                    fontSize: tr.fontSize / 100 + 'rem',
                    fontWeight: (tr.bolder == '1' ? 'bolder' : 'normal')
                }">
                    <div class="tab_text" v-html="td"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script type="es6">
export default {
    name: 'TableLine',
    props: ['data']
};
</script>

<style lang="scss"  scoped>
.table_line_container {
    width: 100%;
    color: #ffffff;

    .table {
        color: #ffffff;

        td {
            padding: 0.1rem 0.28rem;
            min-width: 1rem;
            text-align: center;

            .tab_text {
                padding-top: 0.12rem;
                word-break: break-word;

                &:first-child {
                    padding: 0;
                }
            }
        }
    }

}
</style>
