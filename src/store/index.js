import { ClientReducer } from './Reducer/Register/ClientReducer'
import { StaffReducer } from './Reducer/Register/StaffReducer'
import { BranchReducer } from './Reducer/Register/BranchReducer'

import Pagereducer from './Reducer/Menu/Pagereducer';
import { combineReducers } from 'redux'

export const reducers = combineReducers({
    page: Pagereducer,

    staff: StaffReducer,
    client: ClientReducer,
    branch: BranchReducer
})


// export const reducers = Pagereducer
