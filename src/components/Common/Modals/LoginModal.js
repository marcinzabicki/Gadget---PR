import React from 'react'
import {API} from '../../../utils/API'
import InMemoryJwt from '../../../utils/Authentication/InMemoryJwt'
import closeImage from '../../Home/close.png'
import { useState } from 'react'

let loginInput = React.createRef();
let passwordInput = React.createRef();
 
const LoginModal = (props)=>{
const [loginFailed, setLoginFailed] = useState(false);
  const  loginClickHandle = ()=>{
        let user  =loginInput.current.value;
        let pass = passwordInput.current.value;
          const response = API.login(user, pass)
            .catch(()=>{
               setLoginFailed(true);
            });
            console.log(response);
            if (response?.status ===200) {
                InMemoryJwt.setToken(response.data);
                props.decline();
            }
    }
    return (
            <div className="login-modal">
                <div className="login-modal-close-wrapper">
                        <img className="closeImage" src={closeImage} onClick={props.decline}/>   
                </div>
                <div className="login-modal-content-wrapper">
                    {
                        loginFailed? (<p className="login-wrong-trial">Wrong user name or password</p>) :null
                    }
                    
                    <input type="text" ref={loginInput} className="login-input" placeholder="login"></input>
                    <input type="password" ref={passwordInput} className="login-input" placeholder="password"></input>
                    <div className="log-modal-button">
                    <p onClick={()=>loginClickHandle()}>Log in</p>
                    </div>
                </div>
            </div>    
    )
}

export default LoginModal;