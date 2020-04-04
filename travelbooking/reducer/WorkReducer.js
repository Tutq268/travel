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
        default:
            return state
    }
}

export default WordReducer