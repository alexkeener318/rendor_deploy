/**
* This class holds all the functions to allow users to add, edit, and delete a menu item
* @author   David Asatryan
* @author   Sry Hak
*/
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
import { LanguageContext } from '../contexts/language';

/**
 * The edit menu function holds all the functions to allow users to add, edit, and delete a menu item.
 */
const EditMenu = () => {
    const {lang, setLang} = useContext(LanguageContext)

    const [newItemName, setNewItemName] = useState();
    const [newItemPrice, setNewItemPrice] = useState();
    const [newItemURL, setNewItemURL] = useState();
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToChange, setItemToChange] = useState();
    const [newPrice, setNewPrice] = useState();
    const [newItemIngredients, setNewItemIngredients] = useState();
    const [err, setErr] = useState('');


    /**
    * Sends information about new item to the backend so that it can be added to the database
    * @param {string} name       contains the name of the new item
    * @param {number} price       contains the price of the new item
    * @param {string} ingredients       contains the list of ingredients for the new item
    * @param {string} photoURL       contains the URL to the photo representing the new item
    */
    const addNewItem = async (name, price, ingredients, photoURL) => {
        console.log("clicked");
        console.log(name);
        console.log(price);
        console.log(photoURL);
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/newItem', {
                method: 'POST',
                body: JSON.stringify({ itemName: name, itemPrice: price, itemIngreds: ingredients, url: photoURL}),
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

    /**
    * Removes a specified item from the database
    * @param {string} name       contains the name of the item to be removed from the database
    */
    const deleteItem = async (name) => {
        console.log("clicked");
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/deleteItem', {
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

    /**
    * Changes the price of the specified item
    * @param {string} itemName       contains the name of the item that is to be changed
    * @param {number} newPrice       contains the price of the new item
    */
    const changePrice = async (itemName, newPrice) => {
        console.log("clicked");
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/updateItem', {
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

                <div className="addItem" style = {{ height: "37.5%", width: "80%", marginLeft: "10%", marginTop: "2.5%", backgroundColor: "lightgrey"}}>
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
                            <TextField onChange = { ( event ) => setNewItemIngredients(event.target.value)} value={newItemIngredients} size="small" label="Ingredients of Item" variant="filled" style = {{ width: "95%", marginRight: "5%", marginBottom: "2%", backgroundColor: "white"}}/>
                            <TextField onChange = { ( event ) => setNewItemURL(event.target.value)} value={newItemURL} size="small" label="Photo URL" variant="filled" style = {{ width: "95%", marginRight: "5%", backgroundColor: "white"}}/>
                        </div>
                        <Button onClick = {event => {addNewItem(newItemName, newItemPrice, newItemIngredients, newItemURL); setNewItemName(""); setNewItemPrice(""); setNewItemIngredients(""); setNewItemURL("")}} style = {{ height: "7.5%", width: "10%", marginLeft: "5%", marginTop: "7%", color: "white", backgroundColor: "blue" }}><TranslatedText text = "Add Item" key = {lang}/></Button>
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