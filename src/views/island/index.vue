<template>
    <div class="view-container">
        <el-card style="width: 100%">
            <!-- 搜索 -->
            <div class="search-container">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-input v-model="query.introduction" placeholder="请输入简介" />
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="handleSearch">查询</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData.data">
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="introduction" label="简介" align="center" />
                <el-table-column prop="type" label="类型" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scoped">
                        <el-link :underline="false">修改</el-link>
                        <el-link :underline="false" style="margin: 0 20px;">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增/修改 -->

        <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
            <el-form :model="form">
                <el-form-item label="Promotion name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Zones" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import { getIsland } from '../../api/island'

const tableData = reactive({
    data: []
})

const query = reactive({
    introduction: null
})

const initData = async () => {
    const res: any = await getIsland(query)
    if (res.code == 0) {
        tableData.data = res.data
    }

}

// 搜索
const handleSearch = () => {
    initData()
}

const handleReset = () => {
    query.introduction = null
    initData()
}

// 弹出框显示隐藏
const dialogFormVisible = ref(false)

// 表单信息
const form = reactive({

})

onMounted(() => {
    initData()
})
</script>

<style scoped lang='scss'></style>