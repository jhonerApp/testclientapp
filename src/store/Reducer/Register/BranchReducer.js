import React from 'react'

import { ACTION_BRANCH_TYPES } from '../../Constant/Register/constant'

const initialState = {
    list: []
}


export const BranchReducer = (state = initialState, action) => {
    switch (action.type) {


        case ACTION_BRANCH_TYPES.FETCH_ALL_BRANCH:
            // console.log("ACTION_STUDENT_REGISTER action.payload", action.payload);
            // console.log(" ACTION_STUDENT_REGISTER state.list", state.list);
            // console.log(" ACTION_STUDENT_REGISTER state", state);
            return {
                ...state,
                list: [...action.payload]

            }
        case ACTION_BRANCH_TYPES.CREATE_BRANCH:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_BRANCH_TYPES.UPDATE_BRANCH:
            return {
                ...state,
                list: state.list.map(x => x.BRANCHid == action.payload.BRANCHid ? action.payload : x)
            }
        case ACTION_BRANCH_TYPES.DELETE_BRANCH:
            return {
                ...state,
                list: state.list.filter(x => x.BRANCHid != action.payload)
            }
        default:
            return state

    }

}
