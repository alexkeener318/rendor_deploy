// react
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// external imports
import axios from 'axios'
import { Button, TextField } from "@mui/material";

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

  const [startDate, setStartDate] = useState("2022-09-20")
  const [endDate, setEndDate] = useState("2022-10-05")
  const [data, setData] = useState([])
  const [stockItems, setStockItems] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(()=>{
    axios.get('https://project-3-6njq.onrender.com/getInventory')
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
  },[startDate, endDate])

  /**
  * Retrieves all items that currently have a low stock and places them inside an array
  * 
  */
  const lowStock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://project-3-6njq.onrender.com/lowStock', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
      });

      const result = await response.json();
      setStockItems(result);
      console.log(stockItems);

    } catch (err) {
        setErr(err.message);
    } finally {
        setIsLoading(false);
    }
  }
 

  return (
    <div style={{ height: "100%"}}>
      <Header title = "Inventory" path = "/cashiergui"/>
      

      {/* A div which will have slight margins on both sides
      This will be achieved by making a div with display flex, and another div within that  */}

      <div style={{display:"flex", justifyContent:"center", marginTop:20}}>
        <div style={{width:"90%"}}>

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

          <div style = {{  marginTop: "3%", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "2%", backgroundColor: "lightgrey" }}>
              <p style = {{fontSize: "20px", textAlign: "center", paddingTop: "2%"}}>
                  <Button onClick = {event => lowStock()} style = {{ height: "100%", width: "17.5%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Low Stock" key={lang}/></Button>
                  { (stockItems ?? []).map( elem => {
                      return (
                          <div key = { elem.id }>
                                  { elem }
                          </div>
                      )
                  })}
              </p>
              <Link to = "/updateInventory" style={{textDecoration:"none"}}>
                <Button style = {{ height: "100%", width: "17.5%", marginLeft: "41.25%", marginTop: "1%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Update Inventory" key={lang}/></Button>
              </Link>
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