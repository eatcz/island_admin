export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const setUserInfo = (userInfo: any) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
}

export const removeUserInfo = () => {
    localStorage.removeItem('userInfo')
}