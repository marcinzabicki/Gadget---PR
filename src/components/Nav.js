import { NavLink } from 'react-router-dom';
const Nav = () => {
    return (
        <aside>
            <nav>
                <ul>
                    <NavLink exact={true} activeClassName='active' to="/">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><g><path fill="#e2394a" d="M18.017 20.912h-2.912v-4.368a2.912 2.912 0 1 0-5.824 0v4.368H6.368V7.932l5.825-4.16 5.824 4.16zm5.215-12.834L13.039.798a1.457 1.457 0 0 0-1.692 0L1.154 8.077a1.456 1.456 0 0 0 1.692 2.37l.61-.435v12.355c0 .805.651 1.457 1.456 1.457h14.562c.804 0 1.456-.652 1.456-1.457V10.013c.508.363.868.706 1.454.706a1.456 1.456 0 0 0 .848-2.641z" /></g></g></svg>
                            Home
                        </li>
                    </NavLink>
                    <NavLink activeClassName='active' to="/dashboards">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"><g><g><path fill="#e2394a" d="M1.437 23C.576 23 0 22.426 0 21.563v-5.75c0-.863.576-1.438 1.437-1.438h2.875c.863 0 1.439.575 1.439 1.438v5.75c0 .863-.576 1.437-1.439 1.437zm8.626 0c-.863 0-1.438-.574-1.438-1.437V1.437C8.625.576 9.2 0 10.063 0h2.874c.863 0 1.438.576 1.438 1.437v20.126c0 .863-.575 1.437-1.438 1.437zm8.625 0c-.863 0-1.439-.574-1.439-1.437V8.625c0-.863.576-1.437 1.439-1.437h2.875c.861 0 1.437.574 1.437 1.437v12.938c0 .863-.576 1.437-1.437 1.437z" /></g></g></svg>
                            Dashboards
                        </li>
                    </NavLink>
                    <NavLink activeClassName='active' to="/inbox">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21"><g><g><path fill="#e2394a" d="M20.93 5.243l-8.737 4.993-8.737-4.993V3.175H20.93zm0 12.494H3.456v-9.14l8.015 4.58c.448.255.997.255 1.444 0l8.015-4.58zM22.386.263H2C1.196.263.544.914.544 1.72v17.474c0 .805.652 1.456 1.456 1.456h20.386c.804 0 1.456-.65 1.456-1.456V1.719c0-.805-.652-1.456-1.456-1.456z" /></g></g></svg>
                            Inbox
                        </li>
                    </NavLink>
                    <NavLink activeClassName='active' to="/products">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"><g><g><path fill="#e2394a" d="M4.312 15.813V0h2.875v15.813zm4.313 0V0h5.75v15.813zm7.188 0V0h2.875v15.813zM0 23V0h2.875v23zm20.125 0V0H23v23z" /></g></g></svg>
                            Products
                        </li>
                    </NavLink>
                    <NavLink activeClassName='active' to="/invoices">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g><g><path fill="#e2394a" d="M16.018 8.912H4.368V6h11.65zm0 5.825H4.368v-2.912h11.65zM18.93.175H1.456C.582.175 0 .758 0 1.632v21.842l4.368-2.913 2.913 2.913 2.912-2.913 2.912 2.913 2.913-2.913 4.368 2.913V1.632c0-.874-.582-1.457-1.456-1.457z" /></g></g></svg>
                            Invoices
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </aside>
    );
}

export default Nav;
