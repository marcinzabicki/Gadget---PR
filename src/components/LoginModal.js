import React from 'react'
import {API} from '../utils/API'
import closeImage from './Home/close.png'

const LoginModal = (props)=>{
    return (
            <div className="login-modal">
                <div className="login-modal-close-wrapper">
                        <img className="closeImage" src={closeImage} onClick={props.decline}/>   
                </div>
                <div className="login-modal-content-wrapper">
                    <input type="text" className="login-input" placeholder="login"></input>
                    <input type="text" className="login-input" placeholder="password"></input>
                    <div className="log-modal-button">
                    <p onClick={()=>API.login()}>Log in</p>
                    </div>
                </div>
            </div>    
    )
}

export default LoginModal;