import type { AxiosPromise } from "axios";
import request from "../utils/request";

export const informationChart = ():AxiosPromise<any> => request({
    url: '/information/informationNumAll',
    method:'GET'
})

export const isLandChart = ():AxiosPromise<any> => request({
    url: '/browse/browseNumAll',
    method:'GET'
})