import * as tour from './../constant/Tour'
const initialState = {
    listTour: null,
    listUser: null,
    getUserError: null,
    userAdd : []
}
const TourReducer = (state = initialState,action) =>{
    switch(action.type){
        case tour.GET_LIST_TOUR:
            return state
        case tour.GET_LIST_USER:
            return state
        
        case tour.GET_LIST_USER_SUCCESS:
            return {...state,listUser: action.payload}

        case tour.GET_LIST_USER_FAILED:
            return {...state,getUserError: action.payload}
        
        case tour.ADD_USER:
            return {...state,userAdd: state.userAdd.concat(action.payload)}
        
        case tour.REMOVE_USER:
            const newUserAdd = state.userAdd.filter(user => user._id !== action.payload)
            return {...state,userAdd : newUserAdd}
        default:
            return state
    }
}
export default TourReducer