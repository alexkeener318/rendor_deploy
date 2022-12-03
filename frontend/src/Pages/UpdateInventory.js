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

    const updateIngredients = async (ingredientsList) => {
        console.log(ingredientsList);
        try {
            const response = await fetch('http://localhost:5000/updateTopping', {
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

            <div style = {{ display: "flex", height: "90%", width: "60%", marginTop: "2%", marginLeft: "20%", backgroundColor: "lightgrey" }}>
                <div className = "itemNameColumn" style = {{ height: "100%", width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h1 style = {{ marginTop: "2.5%", backgroundColor: "lightgrey" }}>Item</h1>
                    <h3 style = {{ height: "6%", marginTop: "6%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Tomatoes</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Salt</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Lettuce</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Hummus</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Cheese</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Olives</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Onions</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Cucumbers</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Cauliflower</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Peppers</h3>
                    <h3 style = {{ height: "6%", marginTop: "3%", fontSize: "150%", fontWeight: "normal", backgroundColor: "lightgrey"}}>Dressing</h3>

                </div>

                <div className = "quantityColumn" style = {{ height: "100%", width: "42.5%", marginLeft: "5%", textAlign: "center" }}>
                    <h1 style = {{ marginTop: "2.5%", backgroundColor: "lightgrey"}} >Quantity Used</h1>
                    <TextField onChange = { ( event ) => setTomato(event.target.value)} value={tomato} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setSalt(event.target.value)} value={salt} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setLettuce(event.target.value)} value={lettuce} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setHummus(event.target.value)} value={hummus} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setCheese(event.target.value)} value={cheese} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setOlives(event.target.value)} value={olives} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setOnions(event.target.value)} value={onions} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setCucumber(event.target.value)} value={cucumbers} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setCauliflower(event.target.value)} value={cauliflower} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setPeppers(event.target.value)} value={peppers} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
                    <TextField onChange = { ( event ) => setDressing(event.target.value)} value={dressing} size="small" label="bags used" variant="filled" style = {{ width: "60%", marginTop: "2.5%", marginRight: "5%", backgroundColor: "white"}}/>
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
                }} style = {{ height: "100%", width: "20%", marginLeft: "40%", color: "white", backgroundColor: "blue" }}><TranslatedText text = "Update" key = {lang}/></Button>
            </div>
        </div>
    );
}

export default UpdateInventory;