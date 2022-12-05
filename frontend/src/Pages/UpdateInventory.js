/**
* This class creates the UI that reports to the user sales information
* during a specified time frame
* @author   Sry Hak
*/
// react
import { useContext, useEffect, useState } from "react";

// external imports
import { TextField,Button } from "@mui/material";

// components
import Header from "../Components/Header";
import TranslatedText from "../Components/TranslatedText";

// contexts
import { LanguageContext } from '../contexts/language';


const UpdateInventory = () => {
    const {lang, setLang} = useContext(LanguageContext)
    const [ingredientsList, setIngredientList] = useState([]);
    const [tomato, setTomato] = useState();
    const [salt, setSalt] = useState();
    const [lettuce, setLettuce] = useState();
    const [hummus, setHummus] = useState();
    const [cheese, setCheese] = useState();
    const [olives, setOlives] = useState();
    const [onions, setOnions] = useState();
    const [cucumbers, setCucumber] = useState();
    const [cauliflower, setCauliflower] = useState();
    const [peppers, setPeppers] = useState();
    const [dressing, setDressing] = useState();
    const [err, setErr] = useState('');


    useEffect(() =>{
        setIngredientList([tomato, salt, lettuce, hummus, cheese, olives, onions, cucumbers, cauliflower, peppers, dressing]);
    },[tomato, salt, lettuce, hummus, cheese, olives, onions, cucumbers, cauliflower, peppers, dressing])

    /**
    * Deducts the specified amount for each topping in the database
    * @param {number[]} ingredientsList       contains the amount to be deducted
    */
    const updateIngredients = async (ingredientsList) => {
        console.log(ingredientsList);
        try {
            const response = await fetch('https://project-3-6njq.onrender.com/updateTopping', {
                method: 'POST',
                body: JSON.stringify({ list: ingredientsList }),
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
        <div style = {{ height: "100%", paddingBottom: "10%" }}>
            <Header title = "Update Inventory" path = "/cashiergui"></Header>  

            <div style = {{  width: "60%", marginTop: "2%", marginLeft: "20%", backgroundColor: "lightgrey" }}>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                        <h1 style = {{ marginTop: "2.5%", backgroundColor: "lightgrey" }}><TranslatedText text = "Item" key = {lang}/></h1>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                        <h1 style = {{ marginTop: "2.5%", backgroundColor: "lightgrey"}} ><TranslatedText text = "Quantity Used" key = {lang}/></h1>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "6%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Tomatoes" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setTomato(event.target.value)} value={tomato} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Salt" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setSalt(event.target.value)} value={salt} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Lettuce" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setLettuce(event.target.value)} value={lettuce} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Hummus" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setHummus(event.target.value)} value={hummus} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Cheese" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setCheese(event.target.value)} value={cheese} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Olives" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setOlives(event.target.value)} value={olives} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Onions" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setOnions(event.target.value)} value={onions} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Cucumbers" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setCucumber(event.target.value)} value={cucumbers} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Cauliflowers" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setCauliflower(event.target.value)} value={cauliflower} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Peppers" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setPeppers(event.target.value)} value={peppers} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

                <div style = {{display:"flex"}}>
                    <div className = "itemNameColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}><TranslatedText text = "Dressing" key = {lang}/></h3>
                    </div>
                    <div className = "quantityColumn" style = {{ width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <TextField onChange = { ( event ) => setDressing(event.target.value)} value={dressing} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    </div>
                </div>

            </div>
            <div style = {{ height: "5%", width: "60%", marginLeft: "20%", paddingBottom: "2.5%", backgroundColor: "lightgrey" }}>
                <Button onClick = {event => 
                    {updateIngredients(ingredientsList); 
                        setTomato(""); 
                        setSalt("");
                        setLettuce("");
                        setHummus("");
                        setCheese("");
                        setOlives("");
                        setOnions("");
                        setCucumber("");
                        setCauliflower("");
                        setPeppers("");
                        setDressing("");
                }} style = {{ height: "100%", width: "20%", marginLeft: "40%", marginTop:20,color: "white", backgroundColor: "blue" }}><TranslatedText text = "Update" key = {lang}/></Button>
            </div>
        </div>
    );
}

export default UpdateInventory;