<template>
    <el-container>
        <el-aside width="200px">
            <Menu />
        </el-aside>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="6">
                        <h3>海岛信息管理系统</h3>
                    </el-col>

                    <el-col :span="2" :offset="16">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link" style="cursor: pointer;">
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="userStore.loginOut()">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import Menu from '../components/Menu.vue';
import { useUserStore } from '../store/modules/user';
const userStore = useUserStore()
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