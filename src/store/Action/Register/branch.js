import api from '../../api';
import { ACTION_BRANCH_TYPES } from '../../Constant/Register/constant'


export const GetData = () => dispatch => {
    api.Context().getAll('Branch/api/Branch/GetAllList/').then((res) => {
   
        dispatch({
            type: ACTION_BRANCH_TYPES.FETCH_ALL_BRANCH,
            payload: res.data
        })
        console.log("GetData", res.data)
    }).catch((err) => {
        console.log(err)
    })

}

export const Create = (data) => dispatch => {
    api.Context().saveData('Branch/api/Branch/CreateClient', data).then((res) => {
        // console.log("Create data", data);
        // console.log("Create res.data", res.data);
        dispatch({
            type: ACTION_BRANCH_TYPES.CREATE_BRANCH,
            payload: res.data
        })

    }).catch((err) => {
        console.log(err)
    })
}

export const Update = (data) => dispatch => {
    api.Context().updateData('Branch/api/Branch/UpdateClient', data).then((res) => {
        dispatch({
            type: ACTION_BRANCH_TYPES.UPDATE_BRANCH,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}



export const Delete = (id) => dispatch => {
    api.Context().deleteData('Branch/api/Branch/DeleteClient/', id).then((res) => {

        dispatch({
            type: ACTION_BRANCH_TYPES.DELETE_BRANCH,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

