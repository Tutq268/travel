import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import LoadingReducer from './LoadingReducer'
import TourReducer from './TourReducer'
import WorkReducer from './WorkReducer'


export default combineReducers({
    auth: AuthReducer,
    loading: LoadingReducer,
    tour: TourReducer,
    work: WorkReducer
})