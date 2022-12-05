import { Button, Select, FormControl, MenuItem } from "@mui/material"
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "./TranslatedText";

import { LanguageContext } from "../contexts/language";

import ReactCountryFlag from "react-country-flag"

const LanguagePicker = () => {
  const {lang,setLang} = useContext(LanguageContext)

    /**
    * Changes the language of the website
    * @param {Object} event contains the event that occured when a different language is chosen
    */
    const changeLanguage = (event) =>{
      setLang(event.target.value)
    }

    return (
        
          
    <div style={{display:"flex", alignItems:"center"}}>

            <FormControl variant = "standard">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Age"
              onChange = {changeLanguage}
            >

              <MenuItem value = "en">English  &nbsp;                        
              <ReactCountryFlag countryCode="US" svg />
              </MenuItem>

              <MenuItem value = "fr">Français &nbsp;
              <ReactCountryFlag countryCode="FR" svg />
              </MenuItem>

              <MenuItem value = "de">Deutsch &nbsp;
              <ReactCountryFlag countryCode="DE" svg />
              </MenuItem>

              <MenuItem value = "hy">Հայերեն &nbsp;
              <ReactCountryFlag countryCode="AM" svg />
              </MenuItem>

              <MenuItem value = "es">Español &nbsp;
              <ReactCountryFlag countryCode="ES" svg />
              </MenuItem>

            </Select>
          </FormControl>
        
      </div>
    );
  }
  
  export default LanguagePicker;
  