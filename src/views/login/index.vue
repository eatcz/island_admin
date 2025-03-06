<template>
    <div class="login_form flex item-center mx-auto">
        <el-form ref="ruleFormRef" :model="form" label-width="120px" class="demo-ruleForm" status-icon>
            <el-form-item prop="name">
                <el-input prefix-icon="UserFilled" size="large" v-model="form.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="name">
                <el-input type="password" :show-password="true" prefix-icon="Lock" size="large" v-model="form.password"
                    placeholder="请输入密码" />
            </el-form-item>
            <!-- <el-form-item prop="name">
                <el-input prefix-icon="InfoFilled" size="large" v-model="form.verification_code" placeholder="请输入验证码" />
            </el-form-item> -->
        </el-form>
        <footer class="flex px-5 mt-5">
            <el-button type="primary" size="large" @click="toLogin">登录</el-button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '../../store/modules/user'

const userStore = useUserStore()

interface LoginInfo {
    username: string,   // 用户名
    password: string,   // 密码
}

let form = reactive<LoginInfo>({
    username: 'admin',
    password: 'admin',
})

const toLogin = async () => {
    try {
        userStore.login(form)

    } catch (err) { console.log(err) }



    // const res = await login(form)
    // console.log(res)
}
</script>

<style lang="scss" scoped>
.login_form {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    width: 30%;
    max-height: 420px;
    padding: 20px;
    background-color: '#fff';
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px 2px;
    ;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .5);
}

.code {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;

}

footer {
    width: 100%;
    gap: 1.25rem
        /* 20/16 */
    ;
    justify-content: space-around;
}

.sso-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    .sso-form-btn {
        color: #007BFF;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
<style scoped>
.el-form {
    width: 100%;
}

:deep(.el-form-item__content) {
    width: 100%;
    margin-left: 0 !important;
}

:deep(.el-button) {
    width: 100%;
    border-radius: 20px;
}
</style>