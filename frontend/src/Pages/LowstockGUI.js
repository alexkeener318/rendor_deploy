/**
* This class displays a table of all of the items that are currently low on stock
* @author   Emily Ha
*/
// react
import { useState, useEffect, useContext } from "react";

// external imports
import axios from 'axios'
import { Button, TextField } from "@mui/material"; 
import { createTheme, ThemeProvider } from "@mui/material";
import OneColRow from "../Components/OneColRow";

// components
import Header from "../Components/Header"
import TranslatedText from "../Components/TranslatedText";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';

const LowstockGUI = ()=> {
    const {lang, setLang} = useContext(LanguageContext)
    const [stockItems, setStockItems] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        axios.get("https://project-3-6njq.onrender.com/lowStock", {})
          .then(data => {
            setStockItems(data.data)
          })
        },[])

    return (
        <div style={{ height: "100%"}}>
            <Header title = "Low Stock" path = "/cashiergui"/>
            <div style={{maxHeight:"1000px", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20, marginLeft: "20%", marginRight: "20%", fontSize: "30px"}}>
                <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
                    <OneColRow item = {"Items Low on Stock"} />
                </div>

                {(stockItems ?? []).map( (row) =>{
                    return (
                        <OneColRow key = {row.id} item = {row}/>
                    )
                })}

            </div>
        </div>
    );
}

export default LowstockGUI;