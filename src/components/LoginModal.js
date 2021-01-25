import React from 'react'
import {API} from '../utils/API'
import closeImage from './Home/close.png'

const LoginModal = (props)=>{
    return (
        <div className="login-wrapper">
            <div className="login-modal">
                <img className="closeImage" src={closeImage} onClick={props.decline}/>
                <input type="text" className="login-input" placeholder="login"></input>
                <input type="text" className="login-input" placeholder="password"></input>
                <div className="log-button">
                <p onClick={()=>API.login()}>Log in</p>
                </div>
            </div>
        </div>
        
    )
}

export default LoginModal;