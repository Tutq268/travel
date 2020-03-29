import { put,select,takeEvery } from 'redux-saga/effects'
import * as auth from './../constant/Auth'
import API from './../services/API'
import * as RequestCode from "./../common/RequestCode"
import {createAccountSuccess,createAccountError,signInAccountSuccess,signInAccountFailed} from './../action/AuthAction'
import {showLoading,hideLoading} from './../action/LoadingAction'
import AsyncStorage from '@react-native-community/async-storage'


function* createAccount({payload}){
    yield put(showLoading("SignUp"))
    const { username,phone,password } = payload
    const res = yield API.createAccount(username,phone,password)
    const data  = res.data
    if(data.result === "ok"){
        yield put(createAccountSuccess({status: "success",message: data.message}))
        yield put(hideLoading())
    }else{
        yield put(createAccountError({status: "failed",message: data.message}))
        yield put(hideLoading())
    }

}

function* signInAccount({payload}){
    const {username,password} = payload
    yield put(showLoading("SignIn"))
    const res = yield API.signIn(username,password)
    const data = res.data
    if(data.result === "ok"){
        const token = data.data.token
        const userId = data.data.userId
        yield AsyncStorage.setItem("userToken",token)
        yield AsyncStorage.setItem("userId",userId)
        yield put(signInAccountSuccess())
        yield put(hideLoading())
    }else{
        yield put(signInAccountFailed(data.message))
        yield put(hideLoading())
    }
    
}
export function* postCreateAccount(){
    yield takeEvery(auth.CREATE_ACCOUNT,createAccount)
}

export function* postSignInAccount(){
    yield takeEvery(auth.SIGNIN_ACCOUNT,signInAccount)
}