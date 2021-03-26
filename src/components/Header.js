import React, { useState } from "react";
import Modal from 'react-modal';
import LoginModal from './Common/LoginModal'
import {API} from '../utils/API'
import InMemoryJwt from '../utils/Authentication/InMemoryJwt'
import { useEffect } from "react/cjs/react.development";

const Header = () => {
    Modal.defaultStyles.overlay.backgroundColor = '#2B3139';

    const [showModal, setShowModal] = useState(false);
    const showModalHandler = ()=>{
        let isShowing = showModal;
        setShowModal(!isShowing);
      };
    //   const [isLoggedIn, setIsLoggedIn] = useState(false);

    const testClick = ()=>{
        API.refreshToken().then((response)=>{
            console.log(response);
        })
    }

    // useEffect(()=>{
    //     setIsLoggedIn(InMemoryJwt.getToken()!=null)
    // })

    const logout = ()=>{
        InMemoryJwt.ereaseToken();
       
    }

    return (
        <header>
            <div className="logo">
                <img src={'/assets/logo.png'} />
                <h1>Gadget - PR</h1>
            </div>
            <div className="log-button">
                <p onClick={testClick}>Test</p>
            </div>
            {/* <div className="log-button">
               {
                   isLoggedIn?<p onClick={logout}>Log out</p>:  <p onClick={showModalHandler}>Log in</p>
               }
            </div> */}
            <Modal
            className="agent-modal"
             isOpen={showModal}
             ariaHideApp={false}
            >
                <LoginModal decline={showModalHandler}></LoginModal>
            </Modal>
        </header>
    );
}

export default Header;
