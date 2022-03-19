/*  This file is to verify current session, when the user is logged in.
    It will be used when e-mail is changed, password, or different data.*/
import React, {createContext} from "react";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import CognitoUserPool from "./CognitoUserPool";
const AccountContext = createContext(); // context created here to transfer existing functions to other components.

const AccountActions = (props) => { //thanks to props detail added here, Username and Password used below will be acquired via Context Provider.
    const getSession = async() => { //checking the status of the user. if user is logged in, "user" here is true. Otherwise false.
        return await new Promise((resolve,reject) => {
            const user = CognitoUserPool.getCurrentUser();
            if (user) {
                user.getSession((err,session) => {
                    if (err) {reject();}
                    else {
                        resolve(session);}
                });
            }
            else {reject();}
        });
    };

    const logout = () => { // another pre-defined method by Cognito providing a signout option when requested.
        const user = CognitoUserPool.getCurrentUser();
        if (user) {
            user.signOut()         
        }
    };

    // The detail of turning the function into async allows us to add resolve/reject details below. With success/failure there is a termination to the function session
    const authenticate = async (Username,Password) => {
        return await new Promise((resolve,reject) => {
        // first CognitoUser object defined, stating the email, and to which CognitoUserPool we attempt to login.
        const user = new CognitoUser({  // Username: Username, here is same as Username,
            Username,
            Pool: CognitoUserPool,
        });

        // This is a list of objects defining authentication details, later will be used as an input to authenticateUser function.
        const authDetails = new AuthenticationDetails({
            Username,
            Password
        });

        // predefined authenticateUser function applied to new CognitoUser. 
        user.authenticateUser(
            authDetails,
            {
                onSuccess : (data) => {
                    console.log(data.getIdToken().payload.email);
                    resolve(data);
                },
                onFailure : (err) => {
                    console.error("onFailure: ",err);
                    reject(err);
                },
                newPasswordRequired : (data) => {
                    console.log("newPassRequired: ",data);
                    resolve(data);
                }
            }); 
        })

    };

    return(
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
             {props.children}
        </AccountContext.Provider>
    )
}

// Account will be used in NavbarRouter, to give us the ability to call authenticate function within Login.jsx
// AccountContext is exported, to call the authenticate function, each time user clicks "Login" button at Login.jsx
// As a wrapper, Account should cover Login, so we can call authenticate function within the Login.jsx
export {AccountActions, AccountContext};
