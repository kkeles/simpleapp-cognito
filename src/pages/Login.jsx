import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../components/AWS/AccountActions";


const Login = () => {
    const [email,setEmail] = useState(""); //email parameter that will be used for login
    const [password,setPassword] = useState(""); //password parameter that will be used for login
    //const {authenticate} = useContext(AccountContext); // authenticate here ends up as a function within {} - destructuring
    const authenticate = useContext(AccountContext).authenticate; // same as the code above.
    const navigate = useNavigate(); // used to return the user to homepage once logged in.

    const onSubmit = (event) => { //event received as the input. The following form will take onSubmit function
        //prevents to submit the form to the page. It is used to prevent form actions in traditional HTML but React.
        event.preventDefault()
        authenticate(email,password) //applying authenticate function from Account.jsx
            .then(data => {
                console.log("logged in!",data);
                navigate("/", { replace: true }); // redirect to homepage once logged in.
                window.location.reload(); // following navigate for reload.
            })
            .catch(err => {
                console.error("error",err);
            });
    }

    return(
        <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input //the value of this input is the email object created above. Once changed, also change the value.
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            ></input>

            <label htmlFor="password">Password</label>
            <input
                type="password" //to hide the password entry. 
                value={password} //the value of this input is the password object created above. Once changed, also change the value.
                onChange={(event) => setPassword(event.target.value)}
            ></input>

            <button type="submit">Login</button>
        </form>

        <h3>the.muffin.tools@gmail.com</h3>
    </div>
    )
}

export default Login;