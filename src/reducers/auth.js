import { 
    AUTH_REGISTER,
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN, 
    AUTH_ERROR } from "../actions/types"

const DEFAULT_STATE = {
    isAdmin: false,
    isAuthenticated:false,
    token:"",
    errorMessage: "",
    successMessage: ""
    
}

// Step 1: Define a reducer

const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case AUTH_REGISTER:
            console.log("[AuthReducer] got an AUTH_REGISTER action")
            return {...state, isAuthenticated: false, token: action.payload, errorMessage: '', successMessage: 'Congratulation!, Your account is created, please check and confirm in your register email.'}
        
        case AUTH_SIGN_UP:
            console.log("PAYLOAD REDUCER SIGN UP: ", action.payload)
            console.log("[AuthReducer] got an AUTH_SIGN_UP action")
            return {...state, isAdmin: action.payload.isAdmin, isAuthenticated: true, token: action.payload.token, errorMessage: '', successMessage: ''}
        
        case AUTH_SIGN_IN:
            console.log("PAYLOAD REDUCER SIGNIN: ", action.payload)
            console.log("[AuthReducer] got an AUTH_SIGN_IN action")
            return {...state, isAdmin: action.payload.isAdmin, isAuthenticated: true, token: action.payload.token, errorMessage: '', successMessage: ''}    
        
        case AUTH_SIGN_OUT:
            return {...state, isAuthenticated: false, isAdmin: false, token: action.payload, errorMessage: '', successMessage: ''}    
        
        case AUTH_ERROR:
            console.log("[AuthReducer] got an AUTH_ERROR action")
            return {...state, errorMessage: action.payload, successMessage: ''}

        default:
            return state;    
    }
}

export default authReducer;