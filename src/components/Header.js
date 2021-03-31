import React, { useState, useEffect } from "react";
import {API} from '../utils/API'
import InMemoryJwt from '../utils/Authentication/InMemoryJwt'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        setIsLoggedIn(localStorage.getItem('userLogged').toString()==='true')
    })

    const logout = ()=>{
        InMemoryJwt.ereaseToken();
        setIsLoggedIn(false);
        API.logout();
    }

    return (
        <header>
            {/* <Link to={"/"}> </Link> */}
                <div className="logo">
                    <img src={'/assets/logo.png'} />
                    <h1>Gadget - PR</h1>
                </div>
            {
                isLoggedIn? (<div className="log-button"><p onClick={logout}>Log out</p></div>): null
            }
        </header>
    );
}

export default Header;
