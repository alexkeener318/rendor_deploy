import axios from 'axios'

import { useState, useEffect, useContext } from "react";
import { LanguageContext } from '../contexts/language';

const TranslatedText=(props)=>{
    const {lang, setLang} = useContext(LanguageContext)
    const [translation, setTranslation]=useState("")

    useEffect(()=>{
      const getTranslation= async ()=>{
         const result = await axios.post("https://project-3-6njq.onrender.com/translateText", { text: props.text, lang:lang})
         
         setTranslation(result.data);
      }
      
      if (lang !=="en"){
        getTranslation()
      }
      else {
        setTranslation(props.text)
      }
    
    },[])
    
    return <>{translation}</>
    }

export default TranslatedText