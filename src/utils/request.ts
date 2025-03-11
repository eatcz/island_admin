import axios from 'axios'
import { getToken, removeToken } from '.'
const request = axios.create({
    baseURL: 'http://9857731ku9.zicp.fun',
    timeout: 3000
})

request.interceptors.request.use(config => {
    config.headers.Authorization = getToken()
    return config   
})

request.interceptors.response.use(response => {
    return response.data
}, error => {
    if(error.status == 401) {
        removeToken()
        location.reload()
    }
    return Promise.reject(error)
})

export default request