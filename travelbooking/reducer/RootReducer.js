import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import LoadingReducer from './LoadingReducer'
import TourReducer from './TourReducer'
export default combineReducers({
    auth: AuthReducer,
    loading: LoadingReducer,
    tour: TourReducer
})