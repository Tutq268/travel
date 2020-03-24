import {all} from 'redux-saga/effects'
import {postCreateAccount,postSignInAccount} from './AuthSaga'

export default function* rootSaga(){
    yield all([
        postCreateAccount(),
        postSignInAccount()
    ])
}