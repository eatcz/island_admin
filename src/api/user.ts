import type { AxiosPromise } from "axios";
import request from "../utils/request";

// 注册
export const userRegister = (data:any):AxiosPromise<any> => request({
    url: '/user/register',
    method: 'POST',
    data
})
// 登录
// export const userLogin = (params) => post('/user/login', params)
export const userLogin = (data:any):AxiosPromise<any> => request({
    url: '/user/login',
    method: 'POST',
    data
})
// 退出登录

// 获取用户个人信息
// export const userInfoService = () => get('/user/userInfo')
export const userInfoService = ():AxiosPromise<any> => request({
    url: '/user/userInfo',
    method: 'GET',
})