/**
* This component serves as a button which allows the current user to log out 
* @author   David Asatryan
*/
import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { LanguageContext } from '../contexts/language';
import TranslatedText from "./TranslatedText";

const LogoutButton = () =>{
    const {lang, setLang} = useContext(LanguageContext)
    const { logout } = useAuth0()
    return (
        <Button 
            style={{backgroundColor:"blue"}}

            onClick = {() => logout()}
            id = "qsLoginBtn"
            variant = "contained"
            >
            <TranslatedText text = "Log out" key = {lang}></TranslatedText>
        </Button>
    )
}

export default LogoutButton