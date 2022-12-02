import { Button } from "@mui/material"
import { useContext } from "react";
import TranslatedText from "./TranslatedText";

import { LanguageContext } from '../contexts/language';


const ThreeColRow = (props) => {
    const {lang, setLang } = useContext(LanguageContext)

    return (
        <div>

            <div style = {{ width:"100%",height:"50px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"solid", borderWidth:0.5, backgroundColor:"blue", color:"white" }}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <h4 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}><TranslatedText text = {props.item} key = {lang + props.item}/>  </h4>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h4 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}> <TranslatedText text = {props.quantity} key = {lang + props.quantity}/>  </h4>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h4 style = {{textAlign:"center", width:"100%"}}> <TranslatedText text = {props.price} key = {lang + props.price}/>  </h4>
                </div>

            </div>
            
        </div>
    );
  }
  
  export default ThreeColRow;
  