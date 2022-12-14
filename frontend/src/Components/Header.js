/**
* This component serves as a header which most pages will use to display a title or navigate to other pages
* @author   David Asatryan
*/
import { Button, Select, FormControl, MenuItem } from "@mui/material"

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "./LanguagePicker";
import TranslatedText from "./TranslatedText";

import { LanguageContext } from "../contexts/language";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";

const AuthNav = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <div >
      {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
    </div>
  )
}

const Header = (props) => {
  const {lang,setLang} = useContext(LanguageContext)

    /**
    * Changes the language of the website
    * @param {Object} event contains the event that occured when a different language is chosen
    */
    const changeLanguage = (event) =>{
      setLang(event.target.value)
    }

    return (
      <div >
        <div style = {{  height:"85%",display:"grid", gridTemplateColumns:"1.5fr 8fr 1.5fr"}}>
          
          
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            {props.path !== "none" && 
              <Link to = {(props.path ?? '/')} style={{textDecoration:"none"}}>
                <Button style ={{backgroundColor:"blue"}} variant = "contained" ><TranslatedText key = {lang} text = "Back" /></Button>
              </Link>
            }
            
          </div>

          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div>
              <h1 style = {{textAlign: "center"}}><TranslatedText key = {lang} text = {props.title} /></h1>
              <div style={{display:"flex", justifyContent:"center"}}>
              <LanguagePicker/>
              </div>
            </div>

          </div>
          
          <div style={{display:"flex", alignItems:"center"}}>
            <AuthNav/>
          </div>   
        </div>
        <hr/>
      </div>
    );
  }
  
  export default Header;
  