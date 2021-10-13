import axios from 'axios'
import {
    AUTH_REGISTER, 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN, 
    AUTH_ERROR, 
    DASHBOARD_GET_DATA } from './types'

const server_URL = "https://be-store.herokuapp.com"

export const authFacebook = (data) => {
    return async (dispatch) => {
        console.log("[ActionCreator] Facebook signUp called")
        console.log("we received from FB", data);
        const res = await axios.post(`${server_URL}/users/auth/facebook`,{access_token:data})
        console.log ('res ', res)

        console.log("[ActionCreator] Facebook_signUp dispatch an action!")
        dispatch({
            type:AUTH_SIGN_UP,
            payload: {
                token: res.data.token,
                isAdmin: res.data.role === 1 ? true : false
            }
        })

        localStorage.setItem('JWT_TOKEN', res.data.token);
        //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        //axios.defaults.headers.common['Authorization'] =res.data.token
    }
}

export const authGoogle = (data) => {
    return async (dispatch) => {
        console.log("[ActionCreator] Google signUp called")
        console.log("we received from  GG", data);
        const res = await axios.post(`${server_URL}/users/auth/google`,{access_token:data})
        console.log ('res', res)

        console.log("[ActionCreator] Google_signUp dispatch an action!")
        dispatch({
            type:AUTH_SIGN_UP,
            payload: {
                token: res.data.token,
                isAdmin: res.data.role === 1 ? true : false
            }
        })

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
        //axios.defaults.headers.common['Authorization'] =res.data.token
    }
}

export const signUp = (data) => {
    return async (dispatch) => {
        try {
            console.log("[ActionCreator] signUp called")
            const res = await axios.post(`${server_URL}/users/signup`,data)
            console.log ('res', res)

            console.log("[ActionCreator] signUp dispatch an action!")
            dispatch({
                type:AUTH_REGISTER,
                payload: res.data.token
            })
            //Test- can remove
            console.log("res.data.token", res.data.token)

            localStorage.setItem('JWT_TOKEN', res.data.token);
        
            //Test- can remove
            const jwtToken123 = localStorage.getItem("JWT_TOKEN")
            console.log("jwtToken123",jwtToken123)
            const Bearer = `Bearer ${jwtToken123}`
            console.log("Bearer: ",Bearer)

            axios.defaults.headers.common['Authorization'] = Bearer;

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "email is already in use"
            })
            console.error("Error of sign_up route: ", error);
        }
    }
}
//export const deleteProduct = (product) => async dispatch => {
export const signIn = (data) => async dispatch => {
        try {
            console.log("[ActionCreator] signIn called")
            const res = await axios.post(`${server_URL}/users/signin`,data)
            console.log ('res', res)

            console.log("[ActionCreator] signIn dispatch an action!")
            dispatch({
                type:AUTH_SIGN_IN,
                payload: {
                    token: res.data.token,
                    isAdmin: res.data.role === 1 ? true : false
                }
            })

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
            
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Email and password combination isn't valid"
            })
            console.error("Error of sign_in route: ", error);
        }
    
}

export const signOut = () => {
    return async (dispatch) => {
        localStorage.removeItem("JWT_TOKEN")
        axios.defaults.headers.common['Authorization'] =""
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ""
        })
    }
}


export const getSecret = () => {
    return async (dispatch) => {
        try {
            console.log("[ActionCreator] Call to BE's secret")
            const res = await axios.get(`${server_URL}/users/secret`)
            console.log ('res of getSecret action', res)

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })
        } catch (error) {
            console.log('Err of secret route: ', error)
        }
    }
}