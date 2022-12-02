import { Button, Select, FormControl, MenuItem } from "@mui/material"
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "./TranslatedText";

import { LanguageContext } from "../contexts/language";


const LanguagePicker = (props) => {
  const {lang,setLang} = useContext(LanguageContext)


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
              <MenuItem value = "en">English</MenuItem>
              <MenuItem value = "fr">Français</MenuItem>
              <MenuItem value = "de">Deutsch</MenuItem>
              <MenuItem value = "hy">Հայերեն</MenuItem>
              <MenuItem value = "es">Español</MenuItem>

            </Select>
          </FormControl>
        
      </div>
    );
  }
  
  export default LanguagePicker;
  