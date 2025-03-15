<template>
    <div id="pie2Chart" class="chart"> </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
import { isLandChart } from '../api/chart';

const option = ref({
    tooltip: {
        trigger: 'item'
    },

    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

const getOption = async () => {

    const res: any = await isLandChart()
    option.value.series[0].data = res
}

onMounted(() => {
    getOption()
    setTimeout(() => {
        const echart = echarts.init(document.getElementById('pie2Chart'))
        echart.setOption(option.value)
    }, 500);
})
</script>

<style scoped lang='scss'></style>