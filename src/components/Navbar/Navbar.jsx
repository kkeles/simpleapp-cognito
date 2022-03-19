import React, {useContext,useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { AccountContext } from "../AWS/AccountActions";



const Navbar = () => {
    const getSession = useContext(AccountContext).getSession;
    const logout = useContext(AccountContext).logout;

    const [status,setStatus] = useState(false);

    useEffect(() => {
        getSession()
            .then((session) => {
                setStatus(true);
            });
    },[]);

    if (status) {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <i className="fas fa-bars"></i>
                    </button>
                <div className="collapse navbar-collapse" id="navbarExample01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/account">Account</NavLink>
                         </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={logout} href="/">Logout</a>
                            
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>);
    } else {return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarExample01"
                    aria-controls="navbarExample01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars"></i>
                </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                     </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>   
    );};
};

export default Navbar;