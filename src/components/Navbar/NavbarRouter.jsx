import React from "react";
import Navbar from "./Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { AccountActions } from "../AWS/AccountActions";
// below are pages to load for Router
import About from "../../pages/About";
import Account from "../../pages/Account";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";


const NavbarRouter = () => {

    return(
    <AccountActions> 
        {/* Received Account from Account.jsx and first it tries to apply authenticate function by default
            If the cookies provide "props.children" then the user remains logged in. If not, authenticate fnctn is rejected.  */}
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route exact path='/' exact element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/account' element={<Account/>}/>
            </Routes> 
      </BrowserRouter>
    </AccountActions>
    )
}

export default NavbarRouter;