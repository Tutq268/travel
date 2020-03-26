import * as tour from './../constant/Tour'
import {put,takeEvery,select} from 'redux-saga/effects'
import { getListUserSuccess,getListUserFailed } from './../action/TourAction'
import API from './../services/API'

function* listTour(){
    const res = yield API.getListTour()
}

function* getListUser(){
    const res = yield API.getListUser()
    const data = res.data
    if(data.result === "ok"){
        yield put(getListUserSuccess(data.data))
    }else{
       yield put(getListUserFailed(data.message))
    }
}

export function* getListTour(){
    yield takeEvery(tour.GET_LIST_TOUR,listTour)
}
export function* getListUserTour(){
    yield takeEvery(tour.GET_LIST_USER,getListUser)
}