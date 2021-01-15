import React from 'react'
import {API} from '../utils/API'

const LoginModal = ()=>{
    return (
        <div className="login-modal">
                <input type="text" className="login-input" placeholder="login"></input>
                <input type="text" className="login-input" placeholder="login"></input>
                <div className="log-button">
                <p onClick={()=>API.login()}>Log in</p>
            </div>
        </div>
    )
}

export default LoginModal;