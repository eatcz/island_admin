import type { AxiosPromise } from "axios";
import request from "../utils/request";

// 查询
export const getIsland = (params: any):AxiosPromise<any> => request({
    url: '/information/infoAll',
    method:'GET',
    params,
})

// 树形查询
export const getIslandTree = ():AxiosPromise<any> => request({
    url: '/information/getInfoPid',
    method:'GET',
})

// 新增
export const addIsland = (data: any):AxiosPromise<any> => request({
    url: '/information',
    method:'POST',
    data,
})

// 删除
export const deleteIsland = (params: any):AxiosPromise<any> => request({
    url: `/information`,
    params,
    method:'DELETE',
})

// 更新
export const updateIsland = (data: any):AxiosPromise<any> => request({
    url: `/information`,
    method:'PUT',
    data
})