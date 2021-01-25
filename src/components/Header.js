import React, { useState } from "react";
import Modal from 'react-modal';
import LoginModal from './LoginModal'

const Header = () => {
    Modal.defaultStyles.overlay.backgroundColor = '#2B3139';

    const [showModal, setShowModal] = useState(false);
    const showModalHandler = ()=>{
        let isShowing = showModal;
        setShowModal(!isShowing);
      };

    return (
        <header>
            <div className="logo">
                <img src={'/assets/logo.png'} />
                <h1>Gadget - PR</h1>
            </div>
            <div className="log-button">
                <p onClick={showModalHandler}>Log in</p>
            </div>
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
