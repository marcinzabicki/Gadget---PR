import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={'/assets/logo.png'} />
                <h1>Gadget - PR</h1>
            </div>
            <div className="log-button">
                <p>Log in</p>
            </div>
        </header>
    );
}

export default Header;
