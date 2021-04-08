import React, {useState} from 'react'
import {API} from '../../../utils/API'
import InMemoryJwt from '../../../utils/Authentication/InMemoryJwt'

let loginInput = React.createRef();
let passwordInput = React.createRef();
 
const LoginModal = (props)=>{
const [loginFailed, setLoginFailed] = useState(false);

const handleSubmit = async () => {
    let user  = loginInput.current.value;
    let pass = passwordInput.current.value;
    const response = await API.login(user, pass)
        .catch(()=>{
            setLoginFailed(true);
        });
        if (response?.status ===200) {
             InMemoryJwt.setToken(response.data);
                props.setDisplayLogin(false);
        }
    }

    return (
           <div className="login-modal-content-wrapper login-modal">
               {
                   loginFailed? (<p className="login-wrong-trial">Wrong user name or password</p>) :null
               }
               <input type="text" ref={loginInput} className="login-input" placeholder="login"></input>
               <input type="password" ref={passwordInput} className="login-input" placeholder="password"></input>
               <div className="log-modal-button">
               <p onClick={handleSubmit}>Log in</p>
               </div>
           </div> 
    )
}

export default LoginModal;