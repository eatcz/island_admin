<template>
    <div class="home">
        <h3 class="title">欢迎使用海岛信息管理系统</h3>
        <el-row :gutter="20">
            <el-col :span="12">
                <Pie />
            </el-col>
            <el-col :span="12">
                <Bar />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>

import Pie from '../../components/Pie.vue';
import Bar from '../../components/Bar.vue';
import { informationChart, isLandChart } from '../../api/chart'
</script>

<style scoped lang='scss'>
.title {
    text-align: center;
    margin-bottom: 20px;
}
</style>