import {all} from 'redux-saga/effects'
import {postCreateAccount,postSignInAccount} from './AuthSaga'
import {getListTour,getListUserTour,updateBookedTour} from './TourSaga'

export default function* rootSaga(){
    yield all([
        postCreateAccount(),
        postSignInAccount(),
        getListTour(),
        getListUserTour(),
        updateBookedTour()
    ])
}