<template>
    <div class="view-container">
        <el-card style="width: 100%">
            <!-- 搜索 -->
            <div class="search-container" style="margin-bottom: 20px;">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-button @click="handleAdd">新增</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData.data" row-key="id" border :prop="{ label: 'name', children: 'children' }">
                <el-table-column prop="name" label="名称" align="center" />
                <el-table-column prop="introduction" label="简介" align="center">
                    <template #default="scope">
                        <div class="introduction" v-html="scope.row.introduction"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scoped">
                        <el-link :underline="false" @click="handleEdit(scoped.row)">修改</el-link>
                        <el-link :underline="false" style="margin: 0 20px;"
                            @click="handleDelete(scoped.row.id)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 新增/修改 -->

        <el-dialog v-model="dialogFormVisible" :title="title" width="500" destroy-on-close center
            @before-close="handleClose" @close="handleClose">
            <el-form ref="formRuleRef" :model="form" :rules="rules">
                <el-form-item label="名称" :label-width="80" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="简介" :label-width="80" prop="introduction">
                    <el-input v-model="form.introduction" autocomplete="off" />
                </el-form-item>
                <!-- <el-form-item label="价格" :label-width="80" prop="cost">
                    <el-input-number v-model="form.cost" autocomplete="off" />
                </el-form-item> -->
                <el-form-item label="等级" :label-width="80" prop="grade">
                    <el-input-number v-model="form.grade" autocomplete="off" />
                </el-form-item>

                <el-form-item label="类型" :label-width="80" prop="type">
                    <el-select v-model="form.type" placeholder="类型">
                        <el-option v-for="item in typeOptions" :label="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item v-if="form.type != '海岛' && form.type != ''" label="所属海岛" :label-width="80">
                    <el-select v-model="form.pid" placeholder="所属海岛" prop="pid">
                        <el-option v-for="item in tableData.data" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" :label-width="80" prop="photosPath">
                    <el-upload ref="upload" v-model:file-list="fileList" class="upload-demo" :headers="headers"
                        :action="action" multiple :before-upload="handleBeforeUpload" :on-success="handleSuccess"
                        :limit="10">
                        <el-button type="primary">上传图片</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                建议图片小于 500KB.
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit">
                        确定
                    </el-button>
                    <el-button @click="handleClose">取消</el-button>

                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, ref } from 'vue'
import { addIsland, deleteIsland, updateIsland, getIslandTree } from '../../api/island'
import { nanoid } from 'nanoid'
import { useUserStore } from '../../store/modules/user'
import { ElMessage, ElMessageBox, type FormRules, type UploadInstance, type UploadProps, type UploadUserFile } from 'element-plus'
import { BASE_URL } from '../../config'
import { getToken } from '../../utils'
const userStore = useUserStore()

const typeOptions = [{
    id: nanoid(),
    value: '酒店',
}, {
    id: nanoid(),
    value: '海岛'
}, {
    id: nanoid(),
    value: '美食'
},
{
    id: nanoid(),
    value: '交通'
}

]

const tableData = reactive<any>({
    data: []
})

const initData = async () => {
    const res: any = await getIslandTree()
    if (res.code == 0) {
        tableData.data = res.data.records
    }

}

// 新增
const handleAdd = () => {
    dialogFormVisible.value = true
}

// 修改
const handleEdit = (row: any) => {
    current.value = 2
    dialogFormVisible.value = true
    Object.assign(form, row)
    form.grade = Number(row.grade)
}

// 删除
const handleDelete = (id: any) => {
    ElMessageBox.confirm(
        '是否删除?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const res: any = await deleteIsland({ idList: id })
        if (res.code == 0) {
            ElMessage.success('删除成功')
            initData()
        }
    })
}

const current = ref(1)

//弹窗标题
const title = computed(() => current.value == 1 ? '新增' : '修改')

// 弹出框显示隐藏
const dialogFormVisible = ref(false)

const formRuleRef = ref<null | HTMLFormElement>()

// 表单信息
const form = reactive<RuleForm>({
    name: '',
    type: '',
    introduction: '',
    // cost: 0,
    grade: 0,
    photosPath: '',
    create_by: userStore.userInfo.nickName,
    update_by: userStore.userInfo.nickName,
    userId: userStore.userInfo.userId,
})

// 上传文件

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const action = BASE_URL + 'information/upload'
const headers = {
    'Authorization': getToken()
}

const handleSuccess: UploadProps['onSuccess'] = (_response, _uploadFile, _uploadFiles) => {
    ElMessage.success('上传成功')
    if (fileList.value.length > 0) {
        const paths = fileList.value.map(item => item.response)
        form.photosPath = paths.join(',')
    }
}

const handleBeforeUpload = (file: any) => {
    const fileName = Date.now() + '-' + file.name
    const newFile = new File([file], fileName, { type: file.type })
    return newFile
}

// 提交
const handleSubmit = () => {

    formRuleRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            if (current.value == 1) {
                const res: any = await addIsland(form)
                if (res.code == 0) {
                    ElMessage.success('新增成功')
                    handleClose()
                    initData()
                    dialogFormVisible.value = false
                }

            } else {
                const res: any = await updateIsland(form)
                if (res.code == 0) {
                    ElMessage.success('修改成功')
                    handleClose()
                    initData()
                    dialogFormVisible.value = false
                }
            }
        }
    })
}



// 关闭
const upload = ref<any>(null)
const handleClose = () => {
    dialogFormVisible.value = false
    form.name = ''
    // form.cost = 0
    form.introduction = ''
    form.type = ''
    form.grade = 0
    form.photosPath = ''
    fileList.value = []
    uploadRef.value?.clearFiles()
}

onMounted(() => {
    initData()
})

interface RuleForm {
    userId?: number
    name: string
    // cost: number
    introduction: string
    type: string
    grade: number
    pid?: number
    photosPath: string
    create_by?: string
    update_by?: string
}

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '输入名称', trigger: 'blur' }
    ],
    // cost: [
    //     { required: true, message: '输入价格', trigger: 'blur' }
    // ],
    grade: [
        { required: true, message: '输入等级', trigger: 'blur' }
    ],
    introduction: [
        {
            required: true,
            message: '输入简介',
            trigger: 'change',
        },
    ],
    type: [
        {
            required: true,
            message: '选择类型',
            trigger: 'change',
        },
    ],
    pid: [
        {
            required: true,
            message: '选择所属海岛',
            trigger: 'change',
        },
    ],
    photosPath: [
        {
            required: true,
            message: '上传图片',
            trigger: 'change',
        },
    ],
})
</script>