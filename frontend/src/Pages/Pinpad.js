// react
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// external imports
import { createTheme, ThemeProvider, Button } from "@mui/material";
import axios from 'axios';

// components
import LanguagePicker from "../Components/LanguagePicker";
import TranslatedText from "../Components/TranslatedText";
import Header from "../Components/Header"

// pages

// contexts
import { UserContext } from "../contexts/user";
import { LanguageContext } from '../contexts/language';

const numbers = [ 0,
            1, 2, 3,
            4, 5, 6, 
            7, 8, 9 ]


const Pinpad = ()=> {
  const navigate = useNavigate()
  const {user,setUser } = useContext(UserContext)
  const {lang, setLang} = useContext(LanguageContext)

  const [ passcode, setPasscode ] = useState("")


  // async function translate(text, lang){
  //   axios.post("http://localhost:5000/translateText", { text: text, lang:lang})
  //     .then(res => {
  //       console.log(res.data)
  //       return res.data
  //     })
  // }

  async function logIn(code){
    if (code === "Enter Passcode"){
      code = "1"
    }

    let role = "yoink"
    await axios.post('http://localhost:5000/employeeType',{
      pin: code 
    })
        
      .then(res => {
        setUser({name: res.data.name, id: res.data.id, role: res.data.role})
        if (res.data.name !== undefined){
          navigate('/cashiergui')
        }
        else {
          navigate('/customergui')
        }
        
      })
  }

  function addToCode(digit){
    if (passcode === ""){
      setPasscode( String(digit) )
    }
    else {
      setPasscode(passcode + digit)
    }
  }

  function removeDigit(){
    if (passcode.length === 1){
      setPasscode("")
    }
    else {
      if (passcode !== ""){
        setPasscode(passcode.slice(0, passcode.length - 1))
      }
    }
  }

  return (
    <div style={{ height: "100%"}}>
      <div style={{width:"100%", display:"flex", justifyContent:"right"}}>
        <LanguagePicker/>
      </div>

      <div style={{width:"100%",display:"flex", justifyContent:"center", alignItems:"center", marginTop:"3%"}}>
        <h1 style = {{textAlign: "center"}}>
          <TranslatedText text = "Log in" key = {lang}/>
        </h1>
      </div>
      

      {/* Start pinpad here */}
      <div style = {{width:"100%", display:"flex", justifyContent:"center", marginTop:"15vh"}}>

        <div style={{border:"solid", paddingTop:"4px"}}>
          
          <h1 style={{textAlign:"center", overflow:"hidden", height:"40px"}}> {passcode} </h1>

          <div style = {{height:"370px", idth:"370px", backgroundColor:"blue",color:"white", marginTop:"2vh"}}>

            {/* start rows here */}

            <div style = {{height:"25%", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>

              {numbers.slice(1,4).map( elem => {
                return (
                  <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>

                    <Button 
                      variant = "contained" 
                      onClick = {() => addToCode(elem)}
                      className = "hoverOpacity"
                      style = {{justifyContent:"center", border:"solid", width:"50%", height:"50%", display:"flex", alignItems:"center"}}>
                        {elem}
                    </Button>

                  </div>
                );
              })}

            </div>

            <div style = {{height:"25%", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>

            {numbers.slice(4,7).map( elem => {
                return (
                  <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>

                    <Button 
                      variant = "contained" 
                      onClick = {() => addToCode(elem)}
                      className = "hoverOpacity"
                      style = {{justifyContent:"center", border:"solid", width:"50%", height:"50%", display:"flex", alignItems:"center"}}>
                        {elem}
                    </Button>

                  </div>
                );
              })}

            </div>

            <div style = {{height:"25%", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>

            
            {numbers.slice(7,10).map( elem => {
                return (
                  <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>

                    <Button 
                      variant = "contained" 
                      onClick = {() => addToCode(elem)}
                      className = "hoverOpacity"
                      style = {{justifyContent:"center", border:"solid", width:"50%", height:"50%", display:"flex", alignItems:"center"}}>
                        {elem}
                    </Button>

                  </div>
                );
              })}

            </div>

            <div style = {{height:"25%", display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>

              <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>
                <Button 
                  variant = "contained"
                  onClick = {() => removeDigit()}
                  className = "hoverOpacity"
                  style = {{justifyContent:"center", border:"solid", width:"50%", height:"50%", display:"flex", alignItems:"center"}}>
                    <TranslatedText text = {"Delete"} key = {lang}/>
                </Button>
              </div>

              {numbers.slice(0,1).map( elem => {
                return (
                  
                  <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>

                    <Button
                      variant = "contained" 
                      onClick = {() => addToCode(elem)}
                      className = "hoverOpacity"
                      style = {{justifyContent:"center", border:"solid", width:"50%", height:"50%", display:"flex", alignItems:"center"}}>
                        {elem}
                    </Button>
                    
                  </div>
                );
              })}
              
              <div style={{display:"flex", alignItems:"center",justifyContent:"center", width:"100%"}}>
                {/* <Link to="/cashiergui" style={{ textDecoration:"none" }}> */}
                  <Button 
                    variant = "contained"
                    className = "hoverOpacity"
                    onClick = {() => console.log(logIn(passcode))}
                    style = {{justifyContent:"center", border:"solid", width:"60%", height:"60%", display:"flex", alignItems:"center"}}>
                      <TranslatedText text = {"LOG IN"} key = {lang}/>
                  </Button>
                {/* </Link> */}
                
              </div>

            </div>



          </div>

        </div>
      </div>

      


      <br/>
      <br/>
      <br/>
      <br/>


      
      
    </div>
  );
}

export default Pinpad;




