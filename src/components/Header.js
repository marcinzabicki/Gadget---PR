import React from "react";
import {API} from '../utils/API'
import InMemoryJwt from '../utils/Authentication/InMemoryJwt'

const Header = (props) => {

    const logout = async ()=>{
        InMemoryJwt.ereaseToken();
        const response = await API.logout();
        if (response?.status ===200) {
            props.setDisplayLogin(true);
       }
    }

    return (
        <header>
            {/* <Link to={"/"}> </Link> */}
                <div className="logo">
                    <img src={'/assets/logo.png'} />
                    <h1>Gadget - PR</h1>
                </div>
            {
                <div className="log-button"><p onClick={logout}>Log out</p></div>
            }
        </header>
    );
}

export default Header;
