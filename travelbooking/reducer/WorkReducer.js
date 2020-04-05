import * as work from './../constant/Work'

const initialState = {
    listWord: null,
    userWork : []
}

const WordReducer = (state = initialState,action) =>{
    switch(action.type){
        case work.ADD_WORK_SUCCESS:
            if(!state.listWord){
                return {...state,listWord: [action.payload]}
            }else{
                return {...state,listWord: [action.payload].concat(state.listWord)}
            }
        
        case work.GET_ALL_WORK:
            return {...state,listWord: action.payload}

        case work.UPDATE_DEADLINE_SUCCESS:
            const dataUpdateDeadline = action.payload
            const newListWorkAfterUpdateDeadline = state.listWord.map(work =>{
            if(work._id === dataUpdateDeadline._id){
                return{
                    ...work,
                    deadline: dataUpdateDeadline.deadline
                }
            }
            return work
        }   )
        return {...state,listWord: newListWorkAfterUpdateDeadline}

        case work.ADD_SUB_TASK_SUCCESS:
            const subtask = action.payload
            const newListWorkAfterAddSubtask = state.listWord.map(work =>{
                if(work._id === subtask.work){
                    return{
                        ...work,
                        subs: work.subs.concat(subtask)
                    }
                }
                return work
            })
        return {...state,listWord: newListWorkAfterAddSubtask}

        case work.CHANGE_STATUS_WORK_SUCCESS:
            const changeStatusWork = action.payload
            const newListWorkAfterChangeStatus = state.listWord.map(work =>{
                if(work._id === changeStatusWork._id){
                    return{
                        ...work,
                        status_work: changeStatusWork.status_work
                    }
                }
                return work
            })
            return {...state,listWord: newListWorkAfterChangeStatus}
        
        case work.CHANGE_STATUS_SUB_TASK:
            const changeStatusSubtask = action.payload
            const newListWordAfterChangeSubtask = state.listWord.map(work =>{
                if(work._id === changeStatusSubtask._id){
                    return changeStatusSubtask
                }
                return work
            })
            return {...state,listWord:newListWordAfterChangeSubtask}

        default:
            return state
    }
}

export default WordReducer