import * as loading from './../constant/Loading'
const initialState = {
    isLoading : false,
    screenName : null
}
const loadingReducer = (state = initialState,action) =>{
    switch(action.type){
        case loading.SHOW_LOADING:
            return {...state,isLoading: true,screenName: action.payload}
        
        case loading.HIDE_LOADING:
            return {...state,isLoading: false,screenName: null}
        
        default:
            return state
    }
}

export default loadingReducer