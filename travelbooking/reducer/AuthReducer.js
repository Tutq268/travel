import * as auth from './../constant/Auth'

const initialState = {
    statusSignUp: null,
    errorSignIn: null,
    loginSuccess: false
}

const AuthReducer = (state = initialState,action) =>{
    switch(action.type){
        case auth.CREATE_ACCOUNT :
            return state
        
        case auth.RESET_STATUS_SIGNUP:
            return {...state,statusSignUp:null,errorSignIn: null}
        
        case auth.CREATE_ACCOUNT_SUCCESS:
            return {...state,statusSignUp: action.payload }
        
        case auth.CREATE_ACCOUNT_ERRROR:
            return {...state,statusSignUp: action.payload }
        
        case auth.SIGNIN_ACCOUNT_SUCCESS:
            return {...state,loginSuccess: true}
        
        case auth.SIGNIN_ACCOUNT_FAILED:
            return {...state,errorSignIn: action.payload}

        default:
            return state
    }
}

export default AuthReducer