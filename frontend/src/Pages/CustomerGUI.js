/**
* This class holds all the functions needed for the customer GUI to communicate
* with the backend 
* @author   David Asatryan
* @author   Emily Ha
* @author   Sry Hak
*/
// react
import { Link, useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";

// external imports
import { Button, TextField, Card, CardMedia, CardContent } from "@mui/material"
import { Grid } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

// components
import TranslatedText from "../Components/TranslatedText";
import Header from "../Components/Header";

// contexts
import { LanguageContext } from '../contexts/language';

var counter = 0;

export const globalTotal = React.createContext()

const CustomerGUI = () => {
    const {lang, setLang} = useContext(LanguageContext)

    const [bowlList, setBowlList] = useState([]);
    const [gyroList, setGyroList] = useState([]);
    const [extraList, setExtraList] = useState([]);
    const [drinkList, setDrinkList] = useState([]);
    const [results, setResults] = useState([])
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const { isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    useEffect(() =>{
        console.log("isauth is ", isAuthenticated)
        if (isAuthenticated){
            navigate('/cashiergui')
        }
    },[isAuthenticated])

    /**
    * Retrieves the list of bowl menu items from the database
    * uses this information to populate the Bowl tab for the menu 
    */
     const bowlMenu = async () => {
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/getBowls', {
                method: 'POST',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setBowlList(result);
        } catch (err) {
        setResults([])
            setErr(err.message);
        }
    }

    /**
    * Retrieves the list of gyro menu items from the database
    * uses this information to populate the Gyro tab for the menu 
    */
    const gyroMenu = async () => {
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/getGyros', {
                method: 'POST',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setGyroList(result);
        } catch (err) {
        setResults(prevState => [])
            setErr(err.message);
        }
    }

    /**
    * Retrieves the list of extra menu items from the database
    * uses this information to populate the Extra tab for the menu 
    */
    const extraMenu = async () => {
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/getExtras', {
            // const response = await fetch('http://localhost:5000/getExtras', {

                method: 'POST',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setExtraList(result);
        } catch (err) {
        setResults(prevState => [])
            setErr(err.message);
        }
    }

    /**
    * Retrieves the list of drink menu items from the database
    * uses this information to populate the Drink tab for the menu 
    */
    const drinkMenu = async () => {
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/getDrinks', {
                method: 'POST',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setDrinkList(result);
        } catch (err) {
        setResults([])
            setErr(err.message);
        }
    }

     /**
    * Takes the menu item selected by the user and adds it to the itemized receipt
    * @param {string} item     the string of the menu item that was clicked by the user
    */
    const handleClick = async (item) => {
        setReceipt([...receipt,{id:counter, name:item}]);
        counter++;
        setIsLoading(true);
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/addItem', {
                method: 'POST',
                body: JSON.stringify({ itemName: item }),
                headers: {
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setTotal(result.totalPrice);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
    * Checkouts customer order and sends order including items ordered, payment type, and employee to the database 
    * @param {string} payment       the string that holds the current employee name
    * @param {string} employeeName   the string that holds the current employee id
    */
    const handleCheckout = async (payment, employeeName) => {
        setIsLoading(true);
        emptyReceipt()
        setTotal(0);
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/sendOrder', {
                method: 'POST',
                body: JSON.stringify({ paymentType : payment, empName: employeeName }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);

        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
    * Clears the itemized receipt
    */
    const emptyReceipt = () => {
        setReceipt([]);
        counter = 0;
    };

    /**
    * Removes a specified item from the itemized receipt
    * @param {number} id       contains the id of the item to be removed
    */
    const removeItem = async (id) => {
        const newReceipt = receipt.filter(
            (receipt) => receipt.id !== id
        );
        setReceipt(newReceipt);
            console.log(receipt);
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/removeItem', {
                method: 'POST',
                body: JSON.stringify({ itemID : id }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log(result);
            setTotal(result.totalPrice);

        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setResults([...bowlList]);
    },[bowlList])

    useEffect(() => {
        setResults([...gyroList]);
    },[gyroList])

    useEffect(() => {
        setResults([...extraList]);
    },[extraList])

    useEffect(() => {
        setResults([...drinkList]);
    },[drinkList])

    return (
        <div style = {{ width: "90%", height: "100%", marginLeft: "5%" }}>
            <Header title = "Pom & Honey" path = "none"/>

            <div style = {{width:"100%", display:"flex", justifyContent:"center"}}>
                <Link to = "/map" style={{textDecoration:"none"}}>
                    <Button variant = "contained" style={{backgroundColor:"blue"}}><TranslatedText text = "Find us on the map" key = {lang}/>!</Button>
                </Link>
            </div>

            <div className="menuOptions" style={{ height: "7.5%", marginTop: "2.5%" }}>
                <Button onClick={bowlMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", marginLeft: "4.5%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Bowls"} key = {lang}/></Button>
                <Button onClick={gyroMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Gyro"} key = {lang}/></Button>
                <Button onClick={extraMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Extra"} key = {lang}/></Button>
                <Button onClick={drinkMenu} style = {{ height: "100%", width: "17.5%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Drink"} key = {lang}/></Button>
            </div>
            <div style = {{ minHeight: "80%", marginTop: "2.5%", padding: "2.5%", backgroundColor: "lightgrey" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ height: "100%" }}>
                {results.length!==0 && results.map( elem => {
                     return (
                        <Grid  item xs = {3}  style = {{height:"40vh"}}>
                            <Card  className = "hoverCard" key = {elem.url} onClick = {event => handleClick(elem.name)} >
                                <CardMedia
                                    key = {elem.url}
                                    component = {"img"}
                                    style ={{height:"75%",backgroundImage: ("url(\"" + elem.url + "\")"), backgroundPosition:"top center", backgroundSize:"120%" }}
                                /> 
                                <CardContent style={{textAlign:"center", height:"25%"}}>
                                    <TranslatedText text = {elem.name} key = {lang + elem.url}/>
                                </CardContent>
                            </Card>
                        </Grid>
                        );
                    })}
                </Grid>
            </div>
            <div style = {{ display: "flex", minHeight: "30%", marginTop: "2.5%", marginBottom: "10%", paddingTop: "2.5%", backgroundColor: "lightgrey" }}>
                <div style = {{ minHeight: "90%", width: "60%", marginLeft: "2.5%", backgroundColor: "whitesmoke" }}>
                    <p style = {{ fontWeight: "bold", marginBottom: "1%", marginLeft: "1%", marginTop: "1%" }}>
                    <TranslatedText text = {"Itemized Receipt"} key = {lang}/>
                    </p>
                    {receipt.map( elem => {
                        return (
                            <div key = { elem.id } onClick = {() => removeItem(elem.id)}>
                                <p style = {{ marginLeft: "1%" }}> 
                                    <TranslatedText text = {elem.name} key = {lang}/>
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div style = {{ minHeight: "90%", width: "30%", marginLeft: "5%" }}>
                    <div style = {{ minHeight: "60%", width: "100%", paddingTop: "5%", backgroundColor: "whitesmoke" }}>
                        <div style = {{ height: "25%", width: "80%", marginLeft: "10%", backgroundColor: "lightgrey" }} >
                            <p> 
                            <TranslatedText text = {"Total"} key = {lang}/>: $ { total }
                            </p>
                        </div>
                        <div className="checkoutButtons" style = {{ width:"80%", marginLeft: "10%" }}>
                            <Button onClick = {event => handleCheckout("Credit", "customer")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Credit"} key = {lang}/></Button>
                            <Button onClick = {event => handleCheckout("Dining Dollars", "customer")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Dining Dollars"} key = {lang}/></Button>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}

export default CustomerGUI;