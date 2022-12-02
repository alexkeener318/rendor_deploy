import { Button } from "@mui/material"
import TranslatedText from "./TranslatedText";
import { LanguageContext } from '../contexts/language';
import { useContext, useEffect } from "react";

const FiveColRow = (props) => {
    const {lang, setLang } = useContext(LanguageContext)


    return (
        <div>

            <div style = {{ width:"100%",height:"50px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", borderBottom:"solid", borderWidth:0.5, backgroundColor:"blue", color:"white" }}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <h5 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}><TranslatedText text = {props.item} key = {lang + props.item}/>  </h5>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h5 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}> <TranslatedText text = {props.quantity} key = {lang + props.quantity}/>   </h5>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h5 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}> <TranslatedText text = {props.prevQuantity} key = {lang + props.prevQuantity}/>  </h5>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h5 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}> <TranslatedText text = {props.lastShipment} key = {lang + props.lastShipment}/>   </h5>
                </div>

                <div style={{display:"flex", alignItems:"center"}}>
                    <h5 style = {{textAlign:"center", width:"100%"}}> <TranslatedText text = {props.nextShipment} key = {lang + props.nextShipment}/>   </h5>
                </div>

            </div>
            
        </div>
    );
  }
  
  export default FiveColRow;
  