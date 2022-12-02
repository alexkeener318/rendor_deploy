// react
import { Link, useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";

// external imports
import { Button, TextField, Card, CardMedia, CardContent } from "@mui/material"
import { Grid } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

// components
import LanguagePicker from "../Components/LanguagePicker";
import TranslatedText from "../Components/TranslatedText";
import Header from "../Components/Header";

// pages
import Checkout from './Checkout'

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';



const bowlList = [
    {id: 1, itemName: "Butter Chicken Bowl", url:`url("https://www.shutterstock.com/image-photo/chicken-over-rice-new-york-600w-2214082787.jpg")`},
    {id: 2, itemName: "Lemon Chicken Bowl", url:`url("https://www.shutterstock.com/image-photo/mediterranean-chicken-shawarma-rice-bowl-600w-1198272178.jpg")`},
    {id: 3, itemName: "Veggie Bowl", url:`url("https://www.shutterstock.com/image-photo/healthy-quinoa-bowl-duck-avocado-600w-1934068175.jpg")`},
    {id: 4, itemName: "Seasoned Meat Bowl", url: `url("https://www.shutterstock.com/image-photo/halal-food-gyro-chicken-platter-600w-1108805390.jpg")`},
    {id: 5, itemName: "Meatball Bowl", url:`url("https://www.shutterstock.com/image-photo/baked-quinoa-meatballs-vegetable-salad-600w-543170401.jpg")`}
]

const gyroList = [
    {id: 1, itemName: "Seasoned Meat Gyro", url:`url("https://www.shutterstock.com/image-photo/greek-lamb-meat-gyros-tzatziki-600w-650180254.jpg")`},
    {id: 2, itemName: "Lemon Chicken Gyro", url:`url("https://www.shutterstock.com/image-photo/greek-gyros-wrapped-pita-breads-600w-625236380.jpg")`},
    {id: 3, itemName: "Veggie Gyro", url:`url("https://www.shutterstock.com/image-photo/pita-roasted-chicken-vegetables-cucumber-600w-2020615118.jpg")`},
    {id: 4, itemName: "Meatball Gyro", url:`url("https://www.shutterstock.com/image-photo/meatballs-cabbage-pita-bread-on-600w-1737029006.jpg")`},
]

const extraList = [
    {id: 1, itemName: "Hummus & Pita", url:`url("https://www.shutterstock.com/image-photo/hummus-plate-pita-bread-middle-600w-1737528299.jpg")`},
    {id: 2, itemName: "Pita Bread", url:`url("https://www.shutterstock.com/image-photo/pita-bread-on-wooden-board-600w-257018629.jpg")`},
    {id: 3, itemName: "2 Falafels", url:`url("https://www.shutterstock.com/image-photo/falafel-sandwich-on-black-background-600w-1544891525.jpg")`},
    {id: 4, itemName: "2 Meatballs", url:`url("https://www.shutterstock.com/image-photo/baked-homemade-meatballs-isolated-on-600w-1800790381.jpg")`},
    {id: 5, itemName: "Fries", url:`url("https://www.shutterstock.com/image-photo/french-fries-600w-510881971.jpg")`},
    {id: 6, itemName: "Garlic Fries", url:`url("https://www.shutterstock.com/image-photo/garlic-parsley-french-fries-ketchup-600w-163845740.jpg")`},
    {id: 7, itemName: "Extra Dressing", url:`url("https://www.shutterstock.com/image-photo/variety-homemade-sauces-salad-dressings-600w-571747333.jpg")`},
    {id: 8, itemName: "Extra Hummus", url:`url("https://www.shutterstock.com/image-photo/hummus-olive-oil-paprika-lemon-600w-1412942363.jpg")`},
    {id: 9, itemName: "Extra Protein", url:`url("https://www.shutterstock.com/image-photo/partially-sliced-grilled-chicken-breast-600w-504699331.jpg")`},
]

const drinkList = [
    {id: 1, itemName: "Bottled Water", url:`url("https://www.shutterstock.com/image-photo/plastic-water-bottle-big-small-600w-1907885707.jpg")`},
    {id: 2, itemName: "Fountain Drinks", url:`url("https://www.shutterstock.com/image-photo/soda-fountain-cup-isolated-on-600w-445209874.jpg")`},
]


function extraMenu() {
    console.log("extra button clicked");
}

function drinkMenu() {
    console.log("drink button clicked");
}

var counter = 0;

export const globalTotal = React.createContext()

const CustomerGUI = () => {
    const {lang, setLang} = useContext(LanguageContext)


    const [results, setResults] = useState([...bowlList])
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

    const handleClick = async (item) => {
        setReceipt([...receipt,{id:counter, name:item}]);
        counter++;
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/addItem', {
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

    const handleCheckout = async (payment, employeeName) => {
        setIsLoading(true);
        emptyReceipt()
        setTotal(0);
        try {
            const response = await fetch('http://localhost:5000/sendOrder', {
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

    const emptyReceipt = () => {
        setReceipt([]);
        counter = 0;
    };

    const removeItem = async (id) => {
        const newReceipt = receipt.filter(
            (receipt) => receipt.id !== id
        );
        setReceipt(newReceipt);
            console.log(receipt);
        try {
            const response = await fetch('http://localhost:5000/removeItem', {
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
                {results.map( elem => {
                     return (
                        <Grid  item xs = {3}  style = {{height:"40vh"}}>
                            
                            {/* menu item goes here */}
                            <Card  className = "hoverCard" key = {elem.id} onClick = {event => handleClick(elem.itemName)} >
                                <CardMedia
                                    component = {"img"}
                                    style ={{height:"75%",backgroundImage: elem.url, backgroundPosition:"top center", backgroundSize:"120%" }}
                                /> 
                                <CardContent style={{textAlign:"center", height:"25%"}}>
                                    <TranslatedText text = {elem.itemName} key = {lang + elem.url}/>
                                </CardContent>
                            </Card>
                            {/* <Button key = {elem.url} onClick = {event => handleClick(elem.itemName)} style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%", backgroundSize: "160%",backgroundImage: elem.url, backgroundPosition:"top center" }}>
                                <TranslatedText text = {elem.itemName} key = {lang}/>
                            </Button> */}
                            {/* <Button onClick = {event => handleClick(elem.itemName)} style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%" }}>{elem.itemName}</Button> */}
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
                                    { elem.name } 
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
                            <Button onClick = {event => handleCheckout("Dining Dollars", "customer")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Drining Dollars"} key = {lang}/></Button>
                        </div>
                    </div>
                    
                    <Link to="/pinpad" style={{ textDecoration:"none" }}>
                        <Button style = {{ maxHeight: "25%", width: "60%", marginTop: "2.5%", marginLeft: "20%", backgroundColor: "red", color: "white" }}><TranslatedText text = {"Sign In"} key = {lang}/></Button>
                    </Link>
                </div>
            </div>

            
        </div>
    )
}

export default CustomerGUI;