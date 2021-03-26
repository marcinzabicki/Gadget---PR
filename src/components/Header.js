import React, { useState, useEffect } from "react";
import {API} from '../utils/API'
import InMemoryJwt from '../utils/Authentication/InMemoryJwt'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        setIsLoggedIn(InMemoryJwt.getToken()!=null)
    })

    const testClick = ()=>{
        API.refreshToken().then((response)=>{
            console.log(response);
        })
    }
    const logout = ()=>{
        InMemoryJwt.ereaseToken();
       
    }

    return (
        <header>
            {/* <Link to={"/"}> </Link> */}
                <div className="logo">
                    <img src={'/assets/logo.png'} />
                    <h1>Gadget - PR</h1>
                </div>
           
            {/* <div className="log-button">
                <p onClick={testClick}>Test</p>
            </div> */}
            <div className="log-button">
                   <p onClick={logout}>Log out</p>
            </div>
    
        </header>
    );
}

export default Header;
