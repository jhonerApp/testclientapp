import React from 'react'

import { ACTION_STAFF_TYPES } from '../../Constant/Register/constant'

const initialState = {
    list: []
}


export const StaffReducer = (state = initialState, action) => {
    switch (action.type) {


        case ACTION_STAFF_TYPES.FETCH_ALL_STAFF:
            // console.log("ACTION_STAFF_TYPES action.payload", action.payload);
            // console.log(" ACTION_STAFF_TYPES state.list", state.list);
            // console.log(" ACTION_STAFF_TYPES state", state);
            return {
                ...state,
                list: [...action.payload]

            }
        case ACTION_STAFF_TYPES.CREATE_STAFF:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_STAFF_TYPES.UPDATE_STAFF:
            return {
                ...state,
                list: state.list.map(x => x.stafftid == action.payload.stafftid ? action.payload : x)
            }
        case ACTION_STAFF_TYPES.DELETE_STAFF:
            return {
                ...state,
                list: state.list.filter(x => x.stafftid != action.payload)
            }
        default:
            return state

    }

}
