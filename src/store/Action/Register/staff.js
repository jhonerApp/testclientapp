import api from '../../api';
import { ACTION_STAFF_TYPES } from '../../Constant/Register/constant'


export const GetData = () => dispatch => {
    api.Context().getAll('Staff/api/Staff/GetAllList/').then((res) => {
        dispatch({
            type: ACTION_STAFF_TYPES.FETCH_ALL_STAFF,
            payload: res.data
        })
        console.log("GetData", res.data)
    }).catch((err) => {
        console.log(err)
    })

}

export const Create = (data) => dispatch => {
    api.Context().saveData('Staff/api/Staff/CreateStaff', data).then((res) => {
        // console.log("Create data", data);
        // console.log("Create res.data", res.data);
        dispatch({
            type: ACTION_STAFF_TYPES.CREATE_STAFF,
            payload: res.data
        })

    }).catch((err) => {
        console.log(err)
    })
}

export const Update = (data) => dispatch => {
    api.Context().updateData('Staff/api/Staff/UpdateClient', data).then((res) => {
        dispatch({
            type: ACTION_STAFF_TYPES.UPDATE_STAFF,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}



export const Delete = (id) => dispatch => {
    api.Context().deleteData('Staff/api/Staff/DeleteStaff/', id).then((res) => {

        dispatch({
            type: ACTION_STAFF_TYPES.DELETE_STAFF,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

