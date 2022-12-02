// react
import { useContext, useEffect, useState } from "react";

// external imports
import { TextField,Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

// components
import Header from "../Components/Header";
import TranslatedText from "../Components/TranslatedText";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


const EditMenu = () => {
    const {lang, setLang} = useContext(LanguageContext)

    const [newItemName, setNewItemName] = useState();
    const [newItemPrice, setNewItemPrice] = useState();
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToChange, setItemToChange] = useState();
    const [newPrice, setNewPrice] = useState();
    const [newItemIngredients, setNewItemIngredients] = useState();
    const [err, setErr] = useState('');


    const addNewItem = async (name, price, ingredients) => {
        console.log("clicked");
        console.log(name);
        console.log(price);
        console.log(ingredients);
        try {
            const response = await fetch('http://localhost:5000/newItem', {
                method: 'POST',
                body: JSON.stringify({ itemName: name, itemPrice: price, itemIngreds: ingredients }),
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
        }
    }

    const deleteItem = async (name) => {
        console.log("clicked");
        try {
            const response = await fetch('http://localhost:5000/deleteItem', {
                method: 'POST',
                body: JSON.stringify({ item: name }),
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
        }
    }

    const changePrice = async (itemName, newPrice) => {
        console.log("clicked");
        try {
            const response = await fetch('http://localhost:5000/updateItem', {
                method: 'POST',
                body: JSON.stringify({ item: itemName, price: newPrice }),
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
        }
    }

    return (
        <div style = {{ height: "100%" }}>
            <Header title = "Edit Menu" path = "/cashiergui"></Header>  

            <div style = {{ height: "90%", paddingBottom: "2.5%" }}>

                <div className="addItem" style = {{ height: "30%", width: "80%", marginLeft: "10%", marginTop: "2.5%", backgroundColor: "lightgrey"}}>
                    <h2 style = {{ paddingTop: ".75%", textAlign: "center" }}><TranslatedText text = "Add Item" key = {lang}/></h2>
                    <span style = {{ display: "flex"}}>
                        <div style = {{ width: "60%", height: "70%", marginLeft: "10%"}}>
                            <article style = {{ marginTop: "3%", marginBottom: "2%" }}>
                                <TextField onChange = { ( event ) => setNewItemName(event.target.value)} value={newItemName} size="small" label="Name of Item" variant="filled" style = {{ width: "60%", marginRight: "5%", backgroundColor: "white"}}/>
                                <TextField size="small" label="Price of Item" variant="filled" 
                                    onChange = { ( event ) => setNewItemPrice(event.target.value)}
                                    value = {newItemPrice}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    style = {{ width: "30%", marginRight: "5%", backgroundColor: "white"}} />
                            </article>
                            <TextField onChange = { ( event ) => setNewItemIngredients(event.target.value)} value={newItemIngredients} size="small" label="Ingredients of Item" variant="filled" style = {{ width: "95%", marginRight: "5%", backgroundColor: "white"}}/>
                        </div>
                        <Button onClick = {event => {addNewItem(newItemName, newItemPrice, newItemIngredients); setNewItemName(""); setNewItemPrice(""); setNewItemIngredients("")}} style = {{ height: "7.5%", width: "10%", marginLeft: "5%", marginTop: "4%", color: "white", backgroundColor: "blue" }}><TranslatedText text = "Add Item" key = {lang}/></Button>
                    </span>
                </div>


                <div className="deleteItem" style = {{ height: "30%", width: "80%", marginLeft: "10%", marginTop: "2.5%", backgroundColor: "lightgrey", textAlign: "center" }}>
                    <h2 style = {{ paddingTop: ".75%" }}><TranslatedText text = "Delete Item" key = {lang}/></h2>
                    <div>
                        <TextField onChange = { ( event ) => setItemToDelete(event.target.value)} value={itemToDelete} size="small" label="Name of Item" variant="filled" style = {{ width: "50%", marginTop: "4%", marginRight: "5%", backgroundColor: "white"}}/>
                        <Button onClick = {event => {deleteItem(itemToDelete); setItemToDelete("");}} style = {{ height: "10%", width: "10%", marginLeft: "3.5%", marginTop: "4.5%", color: "white", backgroundColor: "blue" }}><TranslatedText text = "Delete Item" key = {lang}/></Button>
                    </div>
                </div>


                <div className="editItem" style = {{ height: "30%", width: "80%", marginLeft: "10%", marginTop: "2.5%", backgroundColor: "lightgrey", textAlign: "center" }}>
                    <h2 style = {{ paddingTop: ".75%" }}><TranslatedText text = "Edit Item" key = {lang}/></h2>
                    <div>
                        <TextField onChange = { ( event ) => setItemToChange(event.target.value)} value={itemToChange} size="small" label="Name of Item" variant="filled" style = {{ width: "40%", marginTop: "4%", marginRight: "3.5%", backgroundColor: "white"}}/>
                        <TextField onChange = { ( event ) => setNewPrice(event.target.value)} value={newPrice} size="small" label="New Price" variant="filled" 
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            style = {{ width: "15%", marginTop: "4%", backgroundColor: "white"}} />
                        <Button onClick = {event => {changePrice(itemToChange, newPrice); setItemToChange(""); setNewPrice("")}} style = {{ height: "10%", width: "10%", marginLeft: "3.5%", marginTop: "4.5%", color: "white", backgroundColor: "blue" }}><TranslatedText text = "Change Price" key = {lang}/></Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditMenu;