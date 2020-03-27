import * as tour from './../constant/Tour'
import {put,takeEvery,select} from 'redux-saga/effects'
import { getListUserSuccess,getListUserFailed,getListTourSuccess,updateBookedTourSuccess } from './../action/TourAction'
import API from './../services/API'

function* listTour(){
    const res = yield API.getListTour()
    const data = res.data
    if(data.result === "ok"){
        yield put(getListTourSuccess(data.data))
    }else{
        alert(data.message)
    }
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

function* updateBooked({payload}){
    const res = yield API.bookedTour(payload)
}

export function* getListTour(){
    yield takeEvery(tour.GET_LIST_TOUR,listTour)
}
export function* getListUserTour(){
    yield takeEvery(tour.GET_LIST_USER,getListUser)
}

export function* updateBookedTour(){
    yield takeEvery(tour.UPDATE_BOOKED_TOUR,updateBooked)
}