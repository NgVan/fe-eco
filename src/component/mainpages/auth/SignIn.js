import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {isEmail} from "../utils/validation/Validation"
import {showErrMsg} from "../utils/notification/Notification"

import {
    AUTH_SIGN_UP, 
    AUTH_SIGN_IN, 
    AUTH_ERROR, 
    } from '../../../actions/types'

const server_URL = "https://be-store.herokuapp.com"

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function SignIn(props) {    
    let history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState(initialState);
    const {email, password, err} = user;

     const auth = useSelector(state => state.auth);
     const {errorMessage} = auth;
    
    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {email, password}
            console.log("onSubmit is called")
            console.log('formData', formData)
            
            setUser({...user, err:"", success:""})

            if(!isEmail(email))
                return setUser({...user, err:"Invalid email.", success:""})

            //await dispatch(signIn(formData));
            try {
                console.log("[ActionCreator] signIn called")
                const res = await axios.post(`${server_URL}/users/signin`,formData)
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
                
                if(res.data.role === 0 ) {
                    history.push('/dashboard')
                }
                if(res.data.role === 1 ) {
                    history.push('/admin') 
                }
            } catch (error) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: "Email and password combination isn't valid"
                })
                console.error("Error of sign_in route: ", error);
            }  
        } catch (error) {
            alert(error.response.data.msg)
            setUser({...user, err: err.response.data.msg, success: ''})
        }  
    }

    const responseFacebook = async (response) => {
        console.log("responseFacebook",response);
        try {
            //await authFacebook(response.accessToken);
            console.log("[ActionCreator] Facebook signUp called")
            console.log("we received from FB", response.accessToken);
            const res = await axios.post(`${server_URL}/users/auth/facebook`,{access_token:response.accessToken})
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
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`
            //axios.defaults.headers.common['Authorization'] =res.data.token

            if(res.data.role === 0 ) {
                history.push('/dashboard')
            }
            if(res.data.role === 1 ) {
                history.push('/admin') 
            }
        } catch (error) {
            alert(error)
        }
    }

    const responseGoogle = async (response) => {
        console.log("responseGoogle",response);
        //await authGoogle(response.accessToken);
        try {
            console.log("[ActionCreator] Google signUp called")
            console.log("we received from  GG", response.accessToken);
            const res = await axios.post(`${server_URL}/users/auth/google`,{access_token:response.accessToken})
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

            if(res.data.role === 0 ) {
                history.push('/dashboard')
            }
            if(res.data.role === 1 ) {
                history.push('/admin') 
            }
        } catch (error) {
            alert(error)
        }
    }

    return(
        <div className ="row">
            <div className="col login_page"  style={{marginTop: "15px"}}>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label>Enter your email</label>
                        <input type='text' placeholder='Enter your email' id='email' 
                            value={email} name='email' onChange={handleChangeInput}/>
                    </div>

                    <div>
                        <label>Enter your password</label>
                        <input type='password' placeholder='Enter your password' id='password' 
                            value={password} name='password' onChange={handleChangeInput}/>
                    </div>

                    {err ? showErrMsg(err) : null}

                    {errorMessage? 
                    <div className = "alert alert-danger">
                        {errorMessage}
                    </div> : null}

                    <button type="submit" className = 'btn btn-primary'>Sign In</button>
                </form>

                <Link to={`/forgotPassword`} className="fas fa-unlock-alt" style={{marginTop:"50px"}}>Forgot password?</Link>
            </div>

            <div className="col">
                <div className = "text-center">
                    <div className = "alert alert-primary">
                        Sign in with third-party services
                    </div>
                    <FacebookLogin 
                        appId="981800162638146"
                        textButton="Facebook"
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="btn btn-outline-primary"
                    />
                    <GoogleLogin
                        clientId="809857162407-ln9r35b6ak4q0o52kdav5458fvur0o4d.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="btn btn-outline-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                            )}
                        buttonText="Google"
                        icon="false"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}  
                    />
                </div>
            </div>
        </div>
        
    );
}

export default SignIn
// export default reduxForm({
//     form: 'signin', // a unique identifier for this form
//   })(SignIn);