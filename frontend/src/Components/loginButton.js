/**
* This component serves as a button which allows the current user to log in 
* @author   David Asatryan
*/
import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import TranslatedText from "./TranslatedText";
import { LanguageContext } from '../contexts/language';

const LoginButton = () =>{
    const {lang, setLang} = useContext(LanguageContext)
    const { loginWithRedirect } = useAuth0()

    return (
        <Button 
            style={{backgroundColor:"blue"}}
            onClick = {() => loginWithRedirect()}
            id = "qsLoginBtn"
            variant = "contained"
            >
            <TranslatedText text = "Log in" key = {lang}></TranslatedText>
        </Button>
    )
}

export default LoginButton