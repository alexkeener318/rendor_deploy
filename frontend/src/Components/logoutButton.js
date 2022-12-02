import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () =>{
    const { logout } = useAuth0()
    return (
        <Button 
            style={{backgroundColor:"blue"}}

            onClick = {() => logout()}
            id = "qsLoginBtn"
            variant = "contained"
            >
            Log out
        </Button>
    )
}

export default LogoutButton