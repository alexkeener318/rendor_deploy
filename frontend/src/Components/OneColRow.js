import { useContext } from "react";
import TranslatedText from "./TranslatedText";

import { LanguageContext } from '../contexts/language';


const OneColRow = (props) => {
    const {lang, setLang } = useContext(LanguageContext)

    return (
        <div>
            <div style = {{ width:"100%",height:"50px", display:"grid", gridTemplateColumns:"1fr", borderBottom:"solid", borderWidth:0.5, backgroundColor:"blue", color:"white" }}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <h4 style = {{borderRight:"solid 0.5px", textAlign:"center", width:"100%"}}><TranslatedText text = {props.item} key = {lang + props.item}/>  </h4>
                </div>
            </div>
        </div>
    );
}
  
export default OneColRow;
  