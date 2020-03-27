import * as tour from './../constant/Tour'

export const getListTour = () =>{
    return{
        type: tour.GET_LIST_TOUR
    }
}

export const getListTourSuccess = (data) =>{
    return{
        type: tour.GET_LIST_TOUR_SUCCESS,
        payload: data
    }
}

export const getListUser = () =>{
    return {
        type: tour.GET_LIST_USER
    }
}

export const getListUserSuccess = (data) =>{
    return{
        type: tour.GET_LIST_USER_SUCCESS,
        payload: data
    }
}

export const getListUserFailed = data =>{
    return{
        type: tour.GET_LIST_USER_FAILED,
        payload: data
    }
}

export const addUser = data =>{
    return {
        type: tour.ADD_USER,
        payload: data
    }
}

export const removeUser = userId => {
    return {
        type: tour.REMOVE_USER,
        payload: userId
    }
}

export const clearAddUser = () =>{
    return {
        type: tour.CLEAR_ADD_USER
    }
}

export const postAddNewTour = (data) =>{
    return{
        type: tour.POST_ADD_NEW_TOUR,
        payload: data
    }
}

export const updateBookedTour = data =>{
    return {
        type: tour.UPDATE_BOOKED_TOUR,
        payload: data
    }
}

export const updateBookedTourSuccess = data =>{
    return {
        type: tour.UPDATE_BOOKED_TOUR_SUCCESS,
        payload: data
    }
}

