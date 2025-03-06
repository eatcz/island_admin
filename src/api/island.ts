import type { AxiosPromise } from "axios";
import request from "../utils/request";

// 查询
export const getIsland = (params: any):AxiosPromise<any> => request({
    url: '/information/infoAll',
    method:'GET',
    params,
})

// 新增
export const addIsland = (data: any):AxiosPromise<any> => request({
    url: '/information',
    method:'POST',
    data,
})

// 删除
export const deleteIsland = (id: number):AxiosPromise<any> => request({
    url: `/information/${id}`,
    method:'DELETE',
})

// 更新
export const updateIsland = (id: number,data: any):AxiosPromise<any> => request({
    url: `/information/${id}`,
    method:'PUT',
    data
})