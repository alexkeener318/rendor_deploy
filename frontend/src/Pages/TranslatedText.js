import axios from 'axios'

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from '../contexts/language';

/**
 * This function is used to translate text into a specified language.
 * @param {Object} props an object holding values from parent
 * @returns {string} translation of the page into specified language
 */
const TranslatedText=(props)=>{
    const {lang, setLang} = useContext(LanguageContext)
    const [translation, setTranslation]=useState("")

    useEffect(()=>{
      const getTranslation= async ()=>{
         const result = await axios.post("http://localhost:5000/translateText", { text: props.text, lang:lang})
         
         setTranslation(result.data);
      }
      // only translate if the text is not a number
     // if (isNaN(parseFloat(props.text))){
      if (lang !=="en"){
        getTranslation()
      }
      else {
        setTranslation(props.text)
      }
      // }
      // else {
      //   setTranslation(props.text)
      // }
    
    },[])
    
    return <>{translation}</>
    }

export default TranslatedText