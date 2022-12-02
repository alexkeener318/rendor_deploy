import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () =>{
    const { loginWithRedirect } = useAuth0()
    return (
        <Button 
            style={{backgroundColor:"blue"}}
            onClick = {() => loginWithRedirect()}
            id = "qsLoginBtn"
            variant = "contained"
            >
            Log in
        </Button>
    )
}

export default LoginButton