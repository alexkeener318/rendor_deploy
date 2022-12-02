// react
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useState, useContext} from 'react'

// external imports
import { Button } from "@mui/material";

// components
import ProtectedRoute from "./Components/ProtectedRoute";

// pages
import Checkout from "./Pages/Checkout";
import Inventory from "./Pages/Inventory";
import Pinpad from "./Pages/Pinpad";
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
            <Route path="/pinpad" element={<Pinpad />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/popularcombos" element={<PopularCombos />} />
            <Route path="/excessreport" element={<ExcessReport />} />
            {/* <Route path="/customergui" element={<CustomerGUI />} /> */}
            <Route path="/" element={<CustomerGUI />} />
            <Route path="/lowstockgui" element={<LowstockGUI />} />
            <Route path="/cashiergui" element={<CashierGUI />} />
            <Route path="/statistics" element={<Statistics />} />
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
