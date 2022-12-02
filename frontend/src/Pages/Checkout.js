// react
import React, { useState, useContext, createContext } from "react";

// external imports
import { Button, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material";

// components
import Header from "../Components/Header"
import TranslatedText from "../Components/TranslatedText";
import ThreeColRow from "../Components/ThreeColRow";

// pages
import CustomerGUI from "./CustomerGUI";
import { globalTotal } from './CustomerGUI'

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


const Checkout = ()=> {

    const totalPrice = useContext(UserContext);
    const {lang, setLang} = useContext(LanguageContext)


    return (
        
        <div style={{ height: "100%" }}>
            <Header title = "Checkout"/>

            <h1 style={{ textAlign:"center"}} > Order: ${totalPrice} </h1>
            <h1 style={{ textAlign:"center"}} > Tax: ${totalPrice * 0.2} </h1>
            <h1 style={{ textAlign:"center"}} > Total: ${totalPrice * 1.2} </h1>

            
            <br/>
            <br/>
            <br/>
            <br/>

            <div style = {{display:"flex", justifyContent:"center", width:"100%"}}>
                <div style = {{width:"80%", maxHeight:"50vh", overflowY:"scroll", border:"solid"}}>
                    <h1>Item 1</h1>
                    <h1>Item 2</h1>
                    <h1>Item 3</h1>
                    <h1>Item 4</h1>
                    <h1>Item 5</h1>

                    
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>


            {/* Three centered divs */}
            <div style = {{width: "100%", display:"flex", justifyContent:"center"}} >

                <div style = {{width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
                    <div style ={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" style = {{height:"60px"}}> Credit/Debit card </Button>
                    </div>

                    <div style ={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" style = {{height:"60px"}}> Meal Swipes </Button>
                    </div>

                    <div style ={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" style = {{height:"60px"}}> Dining Dollars </Button>
                    </div>
                </div>

            </div>

            <div style = {{width: "100%", display:"flex", justifyContent:"center", marginTop:"10vh"}} >

                    <div style ={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" style = {{height:"60px"}}> Cancel Order </Button>
                    </div>

            </div>
                

            <br/>
            <br/>
            <br/>
            <br/>
        
        </div>
    );
}

export default Checkout;




