<template>
    <el-container>
        <el-aside width="200px">
            <Menu />
        </el-aside>
        <el-container>
            <el-header>海岛信息管理系统</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import Menu from '../components/Menu.vue';
</script>

<style scoped lang='scss'>
.el-container {
    height: 100%;

    .el-header {
        border-bottom: 1px solid #e9e9e9;
        line-height: 60px;
    }
}
</style>