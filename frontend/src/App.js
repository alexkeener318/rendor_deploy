/**
* This class contains all of the routing for our web app, and dictates what page will be displayed first
* @author   David Asatryan
*/
// react
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useState, useContext} from 'react'

// external imports
import { Button } from "@mui/material";

// components

// pages
import Inventory from "./Pages/Inventory";
import PopularCombos from "./Pages/PopularCombos";
import POSReport from "./Pages/POSReport";
import CustomerGUI from "./Pages/CustomerGUI";
import ExcessReport from "./Pages/ExcessReport";
import CashierGUI from "./Pages/CashierGUI";
import Statistics from "./Pages/Statistics";
import Map from "./Pages/Map";
import EditMenu from "./Pages/EditMenu";

// contexts
import { UserContext } from "./contexts/user";
import { LanguageContext } from "./contexts/language";
import Auth0ProviderWithHistory from "./auth0ProviderWithHistory";
import LowstockGUI from "./Pages/LowstockGUI";
import UpdateInventory from "./Pages/UpdateInventory";



const App= ()=> {
  const [ user,setUser  ] = useState({})
  const [ lang, setLang ] = useState("en")

  return (
    <BrowserRouter>
        <UserContext.Provider value = {{user,setUser}}>
        <LanguageContext.Provider value = {{lang, setLang}}>
        <Auth0ProviderWithHistory>

          <Routes>

            {/* <Route path="/" element={<Pinpad />} /> */}
            <Route path="/posreport" element={<POSReport />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/popularcombos" element={<PopularCombos />} />
            <Route path="/excessreport" element={<ExcessReport />} />
            <Route path="/" element={<CustomerGUI />} />
            <Route path="/lowstockgui" element={<LowstockGUI />} />
            <Route path="/cashiergui" element={<CashierGUI />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/updateinventory" element={<UpdateInventory />} />
            <Route path="/map" element={<Map />} />

            <Route path="/editMenu" element = {<EditMenu />} />
          </Routes>

        </Auth0ProviderWithHistory>
        </LanguageContext.Provider>
        </UserContext.Provider>

      </BrowserRouter>
    
  );
}

export default App;
