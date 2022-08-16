import {combineReducers} from 'redux'
import home_reducer from '../reducer/home_reducer'
import navigation_reducer from '../reducer/navigation_reducer'
import accom_reducer from '../reducer/accom_reducer'
import map_reducer from '../reducer/map_reducer'
import assigning_reducer from '../reducer/assigning_reducer'
import realtimeReducer from '../reducer/realtime_reducer'
import filterReducer from '../reducer/filter_reducer'
import trackAccomDateFilter from '../reducer/trackAccom/filter_date_reducer'
import trackAndTraceReducer from '../reducer/trackAndTraceReducer'

export default combineReducers({
    home_reducer: home_reducer,
    navigation_reducer:navigation_reducer,
    accom_reducer:accom_reducer,
    map_reducer:map_reducer,
    assigning_reducer:assigning_reducer,
    realtimeReducer:realtimeReducer,
    filterReducer:filterReducer,
    trackAccomDateFilter:trackAccomDateFilter,
    trackAndTraceReducer:trackAndTraceReducer
})