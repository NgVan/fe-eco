import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios'

import "./auth.css"
import {isEmail} from "../utils/validation/Validation"
import {showErrMsg, showSuccessMsg} from "../utils/notification/Notification"

ForgotPassword.propTypes = {
    
};

const initialState = {
    email:"",
    err:"",
    success: ""
}

const server_URL = "https://be-store.herokuapp.com"

function ForgotPassword(props) {
    const [ data, setData ] = useState(initialState)
    const {email, err, success} = data;
    console.log("EMAIL: ", email)
    
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err:"", success:""})
    }
    
    const forgotPassword = async () => {
        console.log("EMAIL check: ", email)

        if(!isEmail(email))
            return setData({...data, err:"Invalid email.", success:""})
        try {
            const res = await axios.post(`${server_URL}/users/forgotPassword`, {email})
            console.log("RES FORGOT: ", res)
            setData({...data, err:"", success: res.data.success })
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }    
    }

    return (
        <div className='forgot_password'>
            <h2>Forgot password</h2>

            <div className="row">
                {err ? showErrMsg(err) : null}
                {success ? showSuccessMsg(success): null}
                
                <label >Enter your email address </label>
                <input type="email" name="email" id="email" value={email}
                    onChange={handleChangeInput} />

                <button onClick={forgotPassword}>Verify email</button>
            </div>
        </div>
    );

}

export default ForgotPassword;