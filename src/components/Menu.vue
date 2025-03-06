<template>
    <el-menu active-text-color="#1caeac" background-color="#222832" text-color="#fff" router
        :default-active="route.path">

        <template v-for="item in menuList.data" :key="item.id">
            <!-- 一级菜单 -->
            <el-menu-item :index="item.path">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
            </el-menu-item>

            <!-- 二级菜单 -->
            <template v-if="item.children">
                <el-sub-menu index="1">
                    <template #title>
                        <span>Navigator One</span>
                    </template>
                </el-sub-menu>
            </template>

        </template>


    </el-menu>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { nanoid } from 'nanoid';
const route = useRoute()

interface MenuList {
    id: string,
    path: string,
    name: string,
    title: string,
    icon?: string,
    children?: Array<MenuList>
}

const menuList = reactive<{ data: MenuList[] }>({
    data: [
        {
            id: nanoid(),
            path: '/',
            name: 'home',
            title: '首页',
        },
        {
            id: nanoid(),
            path: '/island',
            name: 'island',
            title: '海岛管理',
        },
        // {
        //     id: nanoid(),
        //     path: '/hotel',
        //     name: 'hotel',
        //     title: '酒店管理',

        // }
    ]
})

</script>

<style scoped lang='scss'>
.el-menu {
    height: 100%;
}
</style>