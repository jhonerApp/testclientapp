import axios from 'axios'
const baseUrl = "https://localhost:44371/"

export default {

    Context(url = baseUrl + '') {
        return {
            getAll: (method) => axios.get(url + method),
            getById: (method, id) => axios.get(url + method + id),
            saveData: (method, data) => axios.post(url + method, data),
            updateData: (method, data) => axios.put(url + method, data),
            deleteData: (method, id) => axios.delete(url + method + id)
        }
    }
}