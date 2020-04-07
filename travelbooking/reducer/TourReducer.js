import * as tour from './../constant/Tour'
const initialState = {
    listTour: null,
    listUser: null,
    getUserError: null,
    userAdd : [],
    listTourSearch : null
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
        case tour.GET_LIST_TOUR_SEARCH_SUCCESS:
            return {...state,listTourSearch: action.payload}
        
        case tour.CLEAR_LIST_TOUR_SEARCH:
            return {...state,listTourSearch: null}
        
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
                        tourBooked: tour.tourBooked.concat(data.bookedId),
                        tourHold: data.tourHold
                    }
                }
                return tour
            })
            return {...state,listTour: newTourBooked}
        case tour.UPDATE_HOLD_TOUR_SUCCESS:
            const datahold = action.payload
            const newTourHold = state.listTour.map((tour,index) =>{
                if(tour._id === datahold.tour){
                    return{
                        ...tour,
                        tourHold: tour.tourHold.concat(datahold._id)
                    }
                }
                return tour
            })
            return {...state,listTour:newTourHold}
        case tour.UPDATE_TOUR_DELETE_AND_BOOKMARK:
            const tourId = action.payload
            const newTourRemove = state.listTour.filter(tour => tour._id !== tourId)
            return {...state,listTour: newTourRemove}
        
        case tour.REMOVE_HOLD_TOUR:
            const dataHoldRemove = action.payload
            const newTourAfterRemoveHold = state.listTour.map((tour,index) =>{
                if(tour._id === dataHoldRemove.tourId){
                    return {
                        ...tour,
                        tourHold: dataHoldRemove.tourHold
                    }
                }
                return tour
            })
            return {...state,listTour:newTourAfterRemoveHold}

        case tour.GET_USER_IN_WORK: 
            return{...state,userAdd: action.payload}
        default:
            return state
    }
}
export default TourReducer