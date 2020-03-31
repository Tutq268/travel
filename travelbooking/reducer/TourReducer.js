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
        
        case tour.GET_LIST_TOUR_SUCCESS:
            return {...state,listTour:action.payload}
        case tour.GET_LIST_USER:
            return state
        
        case tour.ADD_TOUR:
            if(!state.listTour){
                return {...state,listTour: [action.payload]}
            }else{
                return {...state,listTour: [action.payload].concat(state.listTour)}
            }
        
        case tour.EDIT_TOUR:
            const dataEdit = action.payload
            const findIndexTour = state.listTour.findIndex(tour => tour._id === dataEdit._id)
            const newTourEdit = state.listTour.map((tour,index) =>{
                if(index === findIndexTour){
                    return dataEdit
                }
                return tour
            })
            return {...state,listTour: newTourEdit}
        case tour.GET_LIST_USER_SUCCESS:
            return {...state,listUser: action.payload}

        case tour.GET_LIST_USER_FAILED:
            return {...state,getUserError: action.payload}
        
        case tour.ADD_USER:
            return {...state,userAdd: state.userAdd.concat(action.payload)}
        
        case tour.REMOVE_USER:
            const newUserAdd = state.userAdd.filter(user => user._id !== action.payload)
            return {...state,userAdd : newUserAdd}
        
        case tour.CLEAR_ADD_USER:
            return {...state,userAdd: []}
        
        case tour.UPDATE_BOOKED_TOUR_SUCCESS:
            const data = action.payload
            const newTourBooked = state.listTour.map((tour,index) =>{
                if(tour._id === data.tourId){
                    return {
                        ...tour,
                        tourBookedCount: data.count,
                        tourBooked: tour.tourBooked.concat(data.bookedId)
                    }
                }
                return tour
            })
            return {...state,listTour: newTourBooked}
        default:
            return state
    }
}
export default TourReducer