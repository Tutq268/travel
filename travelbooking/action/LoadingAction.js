import * as loading from './../constant/Loading'

export const showLoading = (creenName) =>{
    return {
        type: loading.SHOW_LOADING,
        payload: creenName
    }
}
export const hideLoading = () =>{
    return {
        type: loading.HIDE_LOADING
    }
}