import React from 'react'

import { ACTION_CLIENT_TYPES } from '../../Constant/Register/constant'

const initialState = {
    list: []
}


export const ClientReducer = (state = initialState, action) => {
    switch (action.type) {


        case ACTION_CLIENT_TYPES.FETCH_ALL_CLIENT:
            // console.log("ACTION_STUDENT_REGISTER action.payload", action.payload);
            // console.log(" ACTION_STUDENT_REGISTER state.list", state.list);
            // console.log(" ACTION_STUDENT_REGISTER state", state);
            return {
                ...state,
                list: [...action.payload]

            }
        case ACTION_CLIENT_TYPES.CREATE_CLIENT:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_CLIENT_TYPES.UPDATE_CLIENT:
            return {
                ...state,
                list: state.list.map(x => x.clientid == action.payload.clientid ? action.payload : x)
            }
        case ACTION_CLIENT_TYPES.DELETE_CLIENT:
            return {
                ...state,
                list: state.list.filter(x => x.clientid != action.payload)
            }
        default:
            return state

    }

}
