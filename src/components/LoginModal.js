import React from 'react'
import {API} from '../utils/API'
import closeImage from './Home/close.png'
import { useState } from 'react'

let loginInput = React.createRef();
let passwordInput = React.createRef();



const LoginModal = (props)=>{
const [loginFailed, setLoginFailed] = useState(false);
  const  loginClickHandle = ()=>{
        let user ='lucek';// loginInput.current.value;
        let pass ='lucek'// passwordInput.current.value;
        if (user!=='' && pass!=='') {
            API.login(user, pass).then((response)=>{
                
                if (response.status >= 200 || response.status < 300) {
                    localStorage.setItem('accessToken', response.data)
                    console.log(response.data);
                    props.decline();
                }
            }).catch((error)=>{
               setLoginFailed(true);
            });
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
                    <p onClick={loginClickHandle}>Log in</p>
                    </div>
                </div>
            </div>    
    )
}

export default LoginModal;