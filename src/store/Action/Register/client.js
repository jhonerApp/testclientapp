import api from '../../api';
import { ACTION_CLIENT_TYPES } from '../../Constant/Register/constant'


export const GetData = () => dispatch => {
    api.Context().getAll('Client/api/Client/GetAllList/').then((res) => {
   
        dispatch({
            type: ACTION_CLIENT_TYPES.FETCH_ALL_CLIENT,
            payload: res.data
        })
        console.log("GetData", res.data)
    }).catch((err) => {
        console.log(err)
    })

}

export const Create = (data) => dispatch => {
    api.Context().saveData('Client/api/Client/CreateClient', data).then((res) => {
        // console.log("Create data", data);
        // console.log("Create res.data", res.data);
        dispatch({
            type: ACTION_CLIENT_TYPES.CREATE_CLIENT,
            payload: res.data
        })

    }).catch((err) => {
        console.log(err)
    })
}

export const Update = (data) => dispatch => {
    api.Context().updateData('Client/api/Client/UpdateClient', data).then((res) => {
        dispatch({
            type: ACTION_CLIENT_TYPES.UPDATE_CLIENT,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}



export const Delete = (id) => dispatch => {
    api.Context().deleteData('Client/api/Client/DeleteClient/', id).then((res) => {

        dispatch({
            type: ACTION_CLIENT_TYPES.DELETE_CLIENT,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

