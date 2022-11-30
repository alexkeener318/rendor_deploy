// react
import { useState, useEffect, useContext } from "react";

// external imports
import axios from 'axios'
import { TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'; 
import { createTheme, ThemeProvider } from "@mui/material";

// components
import Header from "../Components/Header"
import FiveColRow from "../Components/FiveColRow";
import TranslatedText from "../Components/TranslatedText";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


const Inventory = ()=> {
  const {lang, setLang} = useContext(LanguageContext)

  const [startDate, setStartDate] = useState("2022-09-20");
  const [endDate, setEndDate] = useState("2022-10-05")
  const[data, setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/getInventory')
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
  },[startDate, endDate])

 

  return (
    <div style={{ height: "100%"}}>
      <Header title = "Inventory" path = "/cashiergui"/>
      

      {/* A div which will have slight margins on both sides
      This will be achieved by making a div with display flex, and another div within that  */}

      <div style={{display:"flex", justifyContent:"center", marginTop:20}}>
        <div style={{width:"90%"}}>


          {/* A grid div which will contain the two text boxes */}
          {/* <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <TextField
                id="date"
                label="Starting Date"
                type="date"
                //defaultValue="2022-05-24"
                value = {startDate}
                onChange = { ( event ) => setStartDate(event.target.value)}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />

            <TextField
                id="date"
                label="Ending Date"
                type="date"
                value = {endDate}
                onChange = { ( event ) => setEndDate(event.target.value)}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
          </div> */}

          {/* Start table here */}
          <div style={{height:"500px", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20}}>

            <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
              <FiveColRow item = {"Item id"} quantity = {"Name"} prevQuantity = {"Quantity"}  lastShipment = {"Unit"} nextShipment = {"Last Shipment"}/>
            </div>
            

            { (data ?? []).map( (row) =>{
              return (
                <FiveColRow key = {row.ingredient_id} item = {row.ingredient_id} quantity = {row.name} prevQuantity = {row.quantity} lastShipment = {row.ingredient_unit} nextShipment = {row.last_shipment.slice(0,10)} />
              )
            }) }
            

          </div>

        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      
    </div>
  );
}

export default Inventory;




