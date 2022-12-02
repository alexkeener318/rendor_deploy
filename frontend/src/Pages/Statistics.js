// react
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// external imports
import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { margin, width } from "@mui/system";
import { TextField } from "@mui/material";
import axios from 'axios'

// components
import Header from "../Components/Header";
import TranslatedText from "../Components/TranslatedText";

// pages
import ExcessReport from "./ExcessReport";
import PopularCombos from "./PopularCombos";
import POSReport from "./POSReport";

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


function createData(time, amount) {
    return { time, amount };
}

const Statistics = () => {
    const {lang, setLang} = useContext(LanguageContext)

  const theme = useTheme();
  const [startDate, setStartDate] = useState("2022-09-20");
  const [endDate, setEndDate] = useState("2022-10-05");
  const [revenue, setRevenue] = useState();
  const [credit, setCredit] = useState();
  const [dining, setDining] = useState();
  const [orders, setOrders] = useState();
  const [graphData, setGraphData] = useState([]);

  function updateState( time, total) {
    setGraphData(graphData => [...graphData, createData(time, total)]);

  }

  useEffect(() => {
    axios.post("http://localhost:5000/statsTable", { startDate: startDate, endDate:endDate})
      .then(data => {
        setRevenue(data.data.grossRevenue);
        setCredit(data.data.credit);
        setDining(data.data.dining);
        setOrders(data.data.orders);
      })

    axios.post("http://localhost:5000/statsGraph", { startDate: startDate, endDate:endDate})
      .then(retrievedData => {
        // console.log(retrievedData);
        // console.log("retrieved data: ", retrievedData);
        setGraphData([]);
        let numElements = retrievedData.data.length-1; 

        if (numElements >= 5) {
            let elementsPerBreakpoint = numElements/5;
            let breakpointTotal; 
            let time = 0;
            let elemIndex = 0;
            for (var breakpoint = 0; breakpoint < 5; breakpoint++) {
                breakpointTotal = 0;
                for (var i = 0; i < elementsPerBreakpoint; i++) {
                    breakpointTotal += retrievedData.data[elemIndex].total;
                    elemIndex++;
                }
                console.log("timestamp: ", retrievedData.data[elemIndex].timestamp);
                console.log("total: ", breakpointTotal);
                updateState(retrievedData.data[elemIndex].timestamp, breakpointTotal);
                //setGraphData(graphData => [...graphData, createData(retrievedData.data[elemIndex].timestamp, breakpointTotal)]);
            }
        }
        // {(retrievedData.data ?? []).map( (elem) => {
        //     setGraphData(graphData => [...graphData, createData(elem.timestamp, elem.total)]);
        // })}
      })
  },[startDate,endDate])

  useEffect(() => {
    console.log(graphData);
  }, [graphData])


  return (
    <div style={{height: "80%"}}>
        <Header title = "Statistics" path = "/cashiergui"></Header>

        <span className="statsContainer" style={{
            borderTop: "5%",
            display: "flex",
            height: "100%",
            paddingTop: "5%",
            paddingRight: "10%",
            paddingLeft: "10%"
        }}>
            <div className="leftComponent" style={{
                width: "45%",
                height: "75%",
                marginRight: "10%"
            }}>
                <div>
                    <TextField
                        id="date"
                        label="Starting Date"
                        type="date"
                        value = {startDate}
                        onChange = { ( event ) => setStartDate(event.target.value) }
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        style = {{  
                            width: "40%",
                            marginRight: "20%"
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
                        style = {{  
                            width: "40%"
                        }}
                    />
                </div>
                <table style = {{
                    marginTop: "5%",
                    width: "100%",
                    height: "70%",
                    backgroundColor: "blue",
                    color: "white"
                }}>
                    <tr>
                        <td><TranslatedText text = "Gross Revenue" key = {lang}/></td>
                        <td>$ {revenue}</td>
                    </tr>
                    <tr>
                        <td><TranslatedText text = "Credit" key = {lang}/></td>
                        <td>$ {credit}</td>
                    </tr>
                    <tr>
                        <td><TranslatedText text = "Dining" key = {lang}/></td>
                        <td>$ {dining}</td>
                    </tr>
                    <tr>
                        <td><TranslatedText text = "Orders" key = {lang}/></td>
                        <td>{orders}</td>
                    </tr>
                </table>

                <div className="reportButtonsContainer" style={{
                    marginTop: "5%",
                }}>
                    <Link to="/posreport" style={{ textDecoration:"none" }}>
                        <Button className = "reportButtons" style ={{backgroundColor:"red", width: "25%"}} variant = "contained" >POS <br /> <TranslatedText  text = {"Report"} key = {lang}/></Button>
                    </Link>
                    <Link to="/popularcombos" style={{ textDecoration:"none" }}>
                        <Button className = "reportButtons" style ={{backgroundColor:"red", width: "25%", marginLeft: "12.5%"}} variant = "contained" ><TranslatedText  text = {"Popular Combos"} key = {lang}/></Button>
                    </Link>
                    <Link to="/excessreport" style={{ textDecoration:"none" }}>
                        <Button className = "reportButtons" style ={{backgroundColor:"red", width: "25%", marginLeft: "12.5%"}} variant = "contained" ><TranslatedText  text = {"Excess Report"} key = {lang}/></Button>
                    </Link>
                </div>

            </div>

            <ResponsiveContainer 
                width = "45%"
                height = "70%"
            >
                <LineChart
                    data = {graphData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                    >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                        <Label
                        style={{
                            textAnchor: 'middle',
                            fill: theme.palette.text.primary,
                            ...theme.typography.body1,
                        }}
                        >
                        Time/Date
                        </Label>
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                        angle={270}
                        position="left"
                        style={{
                            textAnchor: 'middle',
                            fill: theme.palette.text.primary,
                            ...theme.typography.body1,
                        }}
                        >
                        Sales ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}z
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </span>

    </div>
  )
}

export default Statistics;
