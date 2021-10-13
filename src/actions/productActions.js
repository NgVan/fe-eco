import axios from 'axios'
import { useDispatch } from 'react-redux'
import { 
    ADD_PRODUCT,
    EDIT_PRODUCT,
    GET_PRODUCT, 
    ACTIVE_PRODUCT,
    DELETE_PRODUCT } from './types'

const server_URL = "https://be-store.herokuapp.com"

export const getPros = (queryString) => async dispatch => {
    try {
        console.log("GET PROD: ")
        const res = await axios.get(`${server_URL}/api/product?${queryString}`)
        console.log("PRODUCT RES: ", res.data)
        const { products, paginatingProducts, pagination } = res.data
            dispatch({
                type: GET_PRODUCT,
                payload: paginatingProducts
            })
        // return pagination
    } catch (error) {
        console.log("ERROR: ", error)
    }
}

export const addProduct = (newProduct) => async dispatch => {
    try {
        console.log("ADD PROD")
        //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        const res = await axios.post(`${server_URL}/api/product`, newProduct, {
            headers: {
              'Authorization': localStorage.getItem("JWT_TOKEN")
            }
        })
        console.log("RES: ", res.data);
        
        dispatch({
            type: ADD_PRODUCT,
            payload: newProduct
        })
    }    
    catch (error) {
        console.log("ERROR: ", error)
    }
}

export const changeStatusProduct = (newProduct) => async dispatch => {
    try {
        console.log("ACTIVE PROD: ")
        //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        const res = await axios.patch(`${server_URL}/api/pro/${newProduct._id}`, newProduct, {
            headers: {
              'Authorization': localStorage.getItem("JWT_TOKEN")
            }
        })
        console.log("RES ACTIVE: ", res.data);
        
        dispatch({
            type: ACTIVE_PRODUCT,
            payload: newProduct
        })
    }    
    catch (error) {
        console.log("ERROR: ", error)
    }
}

export const editProduct = (productId, newProduct) => async dispatch => {
    try {
        console.log("EDIT PROD: ")
        const res = await axios.patch(`${server_URL}/api/product/${productId}`, newProduct, {
            headers: {
                  'Authorization': localStorage.getItem("JWT_TOKEN")
            }
        })
        console.log("RES EDIT: ", res.data);
    
        dispatch({
            type: EDIT_PRODUCT,
            payload: newProduct
        })
    }    
    catch (error) {
        console.log("ERROR: ", error)
    }
}

export const deleteProduct = (product) => async dispatch => {
    try {
        console.log("DELETE PROD: ")
        const res = await axios.delete(`${server_URL}/api/product/${product._id}`, {
            headers: {
                  'Authorization': localStorage.getItem("JWT_TOKEN")
            }
        })
        console.log("RES DELETE: ", res.data);
    
        dispatch({
            type: DELETE_PRODUCT,
            payload: product
        })
    }    
    catch (error) {
        console.log("ERROR: ", error)
    }
}


