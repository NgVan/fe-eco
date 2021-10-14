import React, {useState} from 'react';
//import {useParams} from 'react-router-dom';
//import PropTypes from 'prop-types';
import axios from 'axios'

import {isLength, isMatch} from "../utils/validation/Validation"
import {showErrMsg, showSuccessMsg} from "../utils/notification/Notification"

ResetPassword.propTypes = {
    
};

const initialState = {
    password: "",
    cf_password:'',
    err:'',
    success:''
}

const server_URL = "https://be-store.herokuapp.com"

function ResetPassword(props) {
    const [data, setData] = useState(initialState);
    //const token = useParams();
    const token = props.match.params.token;

    const {password, cf_password, err, success} = data;

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err:"", success:""})
    }
    
    const resetPassword = async () => {
        console.log("PASSWORD check: ", password)

        if(isLength(password))
            return setData({...data, err:"Password must be at least 6 characters.", success:""})
        
        if(!isMatch(password, cf_password))
            return setData({...data, err:"Password did not match.", success:""})

        try {
            const res = await axios.post(`${server_URL}/users/resetPassword/${token}`, {password}, {
                    headers: {Authorization: token}
                }
            )
            console.log("RES RESET: ", res)
            setData({...data, err:"", success: res.data.success })
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }    
    }

    return (
        <div className='forgot_password'>
            <h2>Reset password</h2>

            <div className="row">
                {err ? showErrMsg(err) : null}
                {success ? showSuccessMsg(success): null}
                

                <label >Password </label>
                <input type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />

                <label >Confirm password </label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                    onChange={handleChangeInput} />

                <button onClick={resetPassword}>Reset Password</button>
        </div>
        </div>
    );
}

export default ResetPassword;