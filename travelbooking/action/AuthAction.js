import * as auth from './../constant/Auth'

export const createAccount = (username,phone,password) =>{
    const data = {username,phone,password}
    return{
        type: auth.CREATE_ACCOUNT,
        payload: data
    }
}

export const createAccountSuccess = (data) =>{
    return{
        type: auth.CREATE_ACCOUNT_SUCCESS,
        payload: data
    }
}

export const createAccountError = err =>{
    return{
        type: auth.CREATE_ACCOUNT_ERRROR,
        payload: err
    }
}

export const resetStatusSignUp = () =>{
    return{
        type: auth.RESET_STATUS_SIGNUP
    }
}

export const signInAccount = (username,password) =>{
    const data = {username,password}
    return {
        type: auth.SIGNIN_ACCOUNT,
        payload: data
    }
}

export const signInAccountSuccess = data =>{
    return{
        type: auth.SIGNIN_ACCOUNT_SUCCESS,
        payload: data
    }
}

export const signInAccountFailed = data =>{
    return {
        type: auth.SIGNIN_ACCOUNT_FAILED,
        payload: data
    }
}