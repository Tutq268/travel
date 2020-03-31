import * as tour from './../constant/Tour'
import {put,takeEvery,select} from 'redux-saga/effects'
import { getListUserSuccess,getListUserFailed,getListTourSuccess,updateBookedTourSuccess } from './../action/TourAction'
import API from './../services/API'
import _ from 'lodash'

function* listTour(){
    const res = yield API.getListTour()
    const data = res.data
    if(data.result === "ok"){

        const sortTour = data.data.sort((a,b) =>{
            return b.isStar - a.isStar
        })
        yield put(getListTourSuccess(sortTour))
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
    const data = res.data
    if(data.result ==="ok"){
        yield put(updateBookedTourSuccess(data.data))
    }
    else{
        alert(data.message)
    }
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