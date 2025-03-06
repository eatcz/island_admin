import { defineStore } from "pinia";
import { ref } from "vue";
import { userInfoService, userLogin } from "../../api/user";
import { getToken, setToken, setUserInfo, getUserInfo as getInfo } from "../../utils";
import router from "../../router";
export const useUserStore = defineStore("user", () => {
    // 用户信息
    const userInfo = ref(getInfo() || {})

    // token
    const token = ref(getToken() || '')

    const login = async (userInfo: any) => {
        const res = await userLogin(userInfo) as any
        if (res.code === 200) {
            token.value = res.data.token
            setToken(res.data.token)
            getUserInfo()
        }
    }

    const getUserInfo = async () => {
        const res = await userInfoService() as any
        if (res.code === 200) {
            userInfo.value = res.data
            setUserInfo(res.data)
            router.push('/')
        }
    }

    return {
        userInfo,
        login,
        token
    }
});