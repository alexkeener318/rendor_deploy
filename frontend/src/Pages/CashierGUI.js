import { Button, TextField } from "@mui/material"
import { Grid } from '@mui/material';
import { useState } from "react";

const bowlList = [
    {id: 1, itemName: "Butter Chicken Bowl"},
    {id: 2, itemName: "Lemon Chicken Bowl"},
    {id: 3, itemName: "Veggie Bowl"},
    {id: 4, itemName: "Butter Chicken Bowl"},
    {id: 5, itemName: "Butter Chicken Bowl"}
]

const gyroList = [
    {id: 1, itemName: "Butter Chicken Gyro"},
    {id: 2, itemName: "Lemon Chicken Gyro"},
    {id: 3, itemName: "Veggie Gyro"},
    {id: 4, itemName: "Butter Chicken Gyro"},
    {id: 5, itemName: "Butter Chicken Gyro"}
]

const extraList = [
    {id: 1, itemName: "Hummus"},
    {id: 2, itemName: "Pita Bread"},
    {id: 3, itemName: "Falafel"},
]

const drinkList = [
    {id: 1, itemName: "Water"},
    {id: 2, itemName: "Fountain Drink"},
]

const managerButtonList = [
    {id: 1, buttonName: "Statistics"},
    {id: 2, buttonName: "Inventory"}
]

function extraMenu() {
    console.log("extra button clicked");
}

function drinkMenu() {
    console.log("drink button clicked");
}


const CashierGUI = () => {
    const [results, setResults] = useState([])

    const [managerButtons, setManagerButtons] = useState([])

    function buttonMenu() {
        setManagerButtons([...managerButtonList]);
    }

    function bowlMenu() {
        setResults([...bowlList]);
    }

    function gyroMenu() {
        setResults([...gyroList]);
    }

    function extraMenu() {
        setResults([...extraList]);
    }

    function drinkMenu() {
        setResults([...drinkList]);
    }

    return (
        <div style = {{ width: "90%", height: "100%", marginLeft: "5%" }}>
            <div className="menuOptions" style={{ height: "7.5%", marginTop: "2.5%" }}>
                <Button onClick={bowlMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", marginLeft: "4.5%", backgroundColor: "blue", color: "white" }}>Bowl</Button>
                <Button onClick={gyroMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}>Gyro</Button>
                <Button onClick={extraMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}>Extra</Button>
                <Button onClick={drinkMenu} style = {{ height: "100%", width: "17.5%", backgroundColor: "blue", color: "white" }}>Drink</Button>
            </div>
            <div style = {{ height: "80%", marginTop: "2.5%", padding: "2.5%", backgroundColor: "lightgrey" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ height: "100%" }}>
                {results.map( elem => {
                     return (
                            <Grid item xs = {3} style={{ height: "20vw" }}>
                                <Button style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%" }}>{elem.itemName}</Button>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
            <div style = {{ display: "flex", minHeight: "30%", marginTop: "2.5%", marginBottom: "10%", paddingTop: "2.5%", paddingBottom: "2.5%", backgroundColor: "lightgrey" }}>
                <div style = {{ minHeight: "90%", width: "45%", marginLeft: "2.5%", backgroundColor: "whitesmoke" }}>
                    Itemized Receipt
                </div>
                <div style = {{ minHeight: "90%", width: "15%", marginLeft: "2.5%" }}>
                    <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        Total: $X.XX
                    </div>
                    <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        Employee ID: 12345
                    </div>
                </div>
                <div style = {{ minHeight: "90%", width: "30%", marginLeft: "2.5%" }}>
                    <div style = {{ minHeight: "60%", width: "100%", paddingTop: "2.5%", backgroundColor: "whitesmoke" }}>
                        <div className="checkoutButtons" style = {{ width:"80%", marginLeft: "10%" }}>
                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}>Credit</Button>
                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}>Dining Dollars</Button>
                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}>Retail Swipes</Button>
                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}>Employee Swipes</Button>
                            {managerButtons.map( elem => {
                                return (
                                        <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}>{elem.buttonName}</Button>
                                    );
                                })}
                        </div>
                    </div>
                    <Button onClick={buttonMenu} style = {{ maxHeight: "25%", width: "60%", marginTop: "5%", marginLeft: "20%", backgroundColor: "red", color: "white" }}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}

export default CashierGUI;