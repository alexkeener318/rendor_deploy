// react
import { useState, useContext, useEffect } from "react";

// external imports
import axios from 'axios'
import { TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material";

// components
import Header from "../Components/Header"
import FiveColRow from "../Components/FiveColRow";
import ThreeColRow from "../Components/ThreeColRow";
import TranslatedText from "../Components/TranslatedText";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';



const rows = [
  {id: 1, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 2, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 3, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 4, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 5, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 6, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 7, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 8, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 9, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
  {id: 10, item: "Butter Chicken",  quantity:"French Fries", price: "30"},
]



const PopularCombos = ()=> {
  const {lang, setLang} = useContext(LanguageContext)

  const [startDate, setStartDate] = useState("2022-09-20");
  const [endDate, setEndDate] = useState("2022-10-05")
  const [combos, setCombos] = useState([])

  useEffect(() => {
    axios.post("http://localhost:5000/popCombos", { startDate: startDate, endDate:endDate})
      .then(data => {
        setCombos(data.data)
      })
  },[startDate,endDate])

  return (
    <div style={{ height: "100%"}}>
      <Header title = "Popular Combos" path = "/statistics"/>
      

      {/* A div which will have slight margins on both sides
      This will be achieved by making a div with display flex, and another div within that  */}

      <div style={{display:"flex", justifyContent:"center", marginTop:20}}>
        <div style={{width:"90%"}}>


          {/* A grid div which will contain the two text boxes */}
          <div style={{display:"flex", justifyContent:"space-evenly"}}>
            
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
          </div>

          {/* Start table here */}
          <div style={{height:"500px", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20}}>

            <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
              <ThreeColRow item = {"Item 1 "} quantity = {"Item 2"} price = {"Number of matches"}/>
            </div>
            

            {(combos ?? []).map( (row) =>{
              return (
                <ThreeColRow key = {row.id} item = {row.first} quantity = {row.second} price = {row.value} />
              )
            })}

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

export default PopularCombos;




