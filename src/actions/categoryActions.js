import axios from 'axios'
import { 
    ADD_CATEGORY,
    EDIT_CATEGORY} from './types'

const server_URL = "https://be-store.herokuapp.com"

export const addCategory = () => {
    return async (dispatch) => {
        console.log("ADD CATE")
        const res = await axios.post(`${server_URL}/users/`)
        console.log("RES: ", res);
        
        dispatch({
            type: ADD_CATEGORY,
            payload: "123"
        })
    }
}

export const editCategory = (id) => {
    return async (dispatch) => {
        console.log("EDIT PROD");
        const res = await axios.patch(`${server_URL}/users/`)
        console.log("RES: ", res);

        dispatch({
            type: EDIT_CATEGORY,
            payload: "123"
        })
    }
}

