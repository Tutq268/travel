import * as work from './../constant/Work'

export const addWorkSuccess = data =>{
    return {
        type: work.ADD_WORK_SUCCESS,
        payload: data
    }
}

export const getListWork = data =>{
    return{
        type: work.GET_ALL_WORK,
        payload: data
    }
}

export const updateDeadlineSuceess = data =>{
    return{
        type: work.UPDATE_DEADLINE_SUCCESS,
        payload: data
    }
}