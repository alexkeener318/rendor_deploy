// react
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// external imports
import { Button, TextField, Card, CardMedia, CardContent } from "@mui/material"
import { Grid } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

// components
import TranslatedText from "../Components/TranslatedText";
import LanguagePicker from "../Components/LanguagePicker";
import Header from "../Components/Header";

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';


const managerButtonList = [
    {id: 1, buttonName: "Statistics", linkName: "/statistics"},
    {id: 2, buttonName: "Inventory", linkName: "/inventory"},
    {id: 3, buttonName: "Edit Menu", linkName: "/editMenu"}
]

var counter = 0;

const CashierGUI = () => {
    
   // const {user,setUser} = useContext(UserContext)
    const {lang, setLang} = useContext(LanguageContext)

    
    const [bowlList, setBowlList] = useState([]);
    const [gyroList, setGyroList] = useState([]);
    const [extraList, setExtraList] = useState([]);
    const [drinkList, setDrinkList] = useState([]);
    const [results, setResults] = useState([])
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    // TODO: IMPLEMENT LOGIC FOR SERVER VS MANAGER
    const [managerButtons, setManagerButtons] = useState([...managerButtonList])

    const { isAuthenticated } = useAuth0()
    const { user } = useAuth0()
    const { name, email } = user || {}

    const navigate = useNavigate()

    useEffect(() =>{
        
        if (!isAuthenticated){
            navigate("/")
        }
        //console.log(name, email)
    },[isAuthenticated])

    function buttonMenu() {
        setManagerButtons([...managerButtonList]);
    }

    const bowlMenu = async () => {
        try {
            const response = await fetch('http://localhost:5000/getBowls', {
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
        // setResults([...bowlList]);
    }

    const gyroMenu = async () => {
        try {
            const response = await fetch('http://localhost:5000/getGyros', {
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
        // setResults([...gyroList]);
    }
    const extraMenu = async () => {
        try {
            const response = await fetch('http://localhost:5000/getExtras', {
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
        // setResults([...extraList]);
    }

    const drinkMenu = async () => {
        try {
            const response = await fetch('http://localhost:5000/getDrinks', {
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
        //setResults([...drinkList]);
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

            <div className="menuOptions" style={{ height: "7.5%", marginTop: "2.5%" }}>
                <Button onClick={bowlMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", marginLeft: "4.5%", backgroundColor: "blue", color: "white" }}><TranslatedText key = {lang} text = {"Bowls"}/></Button>
                <Button onClick={gyroMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Gyro"} key = {lang}/></Button>
                <Button onClick={extraMenu} style = {{ height: "100%", width: "17.5%", marginRight: "7%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Extra"} key = {lang}/></Button>
                <Button onClick={drinkMenu} style = {{ height: "100%", width: "17.5%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {"Drinks"} key = {lang}/></Button>
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
                                <TranslatedText text = {elem} key = {lang}/>
                            </Button> */}
                            {/* <Button onClick = {event => handleClick(elem.itemName)} style = {{ backgroundColor: "blue", color: "white", width: "100%", height: "100%" }}>{elem.itemName}</Button> */}
                        </Grid>
                        );
                    })}
                </Grid>
            </div>
            <div style = {{ display: "flex", minHeight: "30%", marginTop: "2.5%", marginBottom: "5%", paddingTop: "2.5%", paddingBottom: "2.5%", backgroundColor: "lightgrey" }}>
                <div style = {{ minHeight: "90%", width: "45%", marginLeft: "2.5%", backgroundColor: "whitesmoke" }}>
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
                <div style = {{ minHeight: "90%", width: "15%", marginLeft: "2.5%" }}>
                    <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        <TranslatedText text = {"Total"} key = {lang}/>
                        : $ { total }
                    </div>
                    {/* <div style = {{ height: "20%", width: "100%", marginTop: "20%", backgroundColor: "whitesmoke" }} >
                        <TranslatedText text = {"Employee ID"} key = {lang}/>
                        : {(user.id ?? 'w')}
                    </div> */}
                    <div style = {{ height: "20%", width: "100%", backgroundColor: "whitesmoke" , paddingBottom:20}} >
                        <TranslatedText text = {"Employee Name"} key = {lang}/>
                        : {( user?.name ?? 'w')}
                    </div>
                </div>
                <div style = {{ minHeight: "90%", width: "30%", marginLeft: "2.5%" }}>
                    <div style = {{ minHeight: "60%", width: "100%", paddingTop: "2.5%", backgroundColor: "whitesmoke" }}>
                        <div className="checkoutButtons" style = {{ width:"80%", marginLeft: "10%" }}>
                            <Button onClick = {event => handleCheckout("Credit Card", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Credit" key={lang}/></Button>
                            <Button onClick = {event => handleCheckout("Debit Card", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Debit" key={lang}/></Button>
                            <Button onClick = {event => handleCheckout("Retail Swipes", "Sry")} style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = "Retail Swipes" key={lang}/></Button>
                            {managerButtons.map( elem => {
                                return (
                                        <Link key = {elem.id} to={elem.linkName} style={{ textDecoration:"none" }}>
                                            <Button style = {{ height: "47.5%", width: "47.5%", marginTop: "2.5%", marginLeft: "1.66%", backgroundColor: "blue", color: "white" }}><TranslatedText text = {elem.buttonName} key = {lang}/></Button>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                   
                </div>
            </div>

            <div style = {{width:"100%", display:"flex", justifyContent:"center"}}>
                <Link to = "/map" style={{textDecoration:"none"}}>
                    <Button variant = "contained"><TranslatedText text = "Find us on the map" key = {lang}/>!!</Button>
                </Link>
            </div>
        </div>
    )
}

export default CashierGUI;