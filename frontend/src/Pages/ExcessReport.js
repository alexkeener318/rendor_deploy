// react
// external imports
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';

// components
import Header from "../Components/Header";
import ThreeColRow from "../Components/ThreeColRow";
import TranslatedText from "../Components/TranslatedText";

// pages
import { useContext, useEffect, useState } from "react";
import axios from 'axios'


// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';



const columns = [
    {field: 'id', headerName: 'ID', flex: 1, hide:true},
    {field: 'item', headerName: 'Item', flex: 1},
    {field: 'quantity', headerName: 'Quantity', flex: 1},
    {field: 'sales', headerName: 'Sales', flex: 1}
  ]
  
  const rows = [
    {id:1, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:2, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:3, item: "Butter Chicken", quantity: 20, sales: 30},
    {id:4, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:5, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:6, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:7, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:8, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:9, item: "Butter Chicken", quantity: 20, sales: 40},
    {id:10, item: "Butter Chicken", quantity: 20, sales: 30}
  ]
  

const ExcessReport = () => {
    const [startDate, setStartDate] = useState("2022-09-20");
    const [endDate, setEndDate] = useState("2022-10-05");
    const [excessReportData, setExcessReportData] = useState([]);

    useEffect(() => {
      axios.post("http://localhost:5000/excessReport", { dateOne: startDate, dateTwo:endDate})
        .then(data => {
          setExcessReportData(data.data)
          console.log(data.data)
        })
    },[startDate,endDate])

    const {lang, setLang} = useContext(LanguageContext)

    return (
        <div style = {{ height: "100%" }}>
            <Header title = "Excess Report" path = "/statistics"></Header>   
            <div style = {{ height: "90%" }}>
                <div style={{display:"flex", marginTop: "2.5%", justifyContent:"space-evenly"}}>
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

                <div style={{height:"80%", width: "60%", marginLeft: "20%", overflowY:"scroll", border:"solid", borderWidth:2, borderColor:"blue", backgroundColor:"blue", marginTop:20}}>

                    <div style={{borderBottom:'solid white 3px', position:"sticky",  top:0}}>
                        <ThreeColRow item = {"Item"} quantity = {"Quantity"} price = {"Sales"} />
                    </div>


                    {(excessReportData ?? []).map( (row) =>{
                    return (
                        <ThreeColRow item = {row.name} quantity = {row.quantity} price = {row.sales}/>
                    )
                    })}

                </div>

            </div>
            
        </div>
    )
}

export default ExcessReport;