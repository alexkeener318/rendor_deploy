import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import POSReport from './Pages/POSReport';
import Inventory from './Pages/Inventory';
import Pinpad from './Pages/Pinpad';
import Checkout from './Pages/Checkout'
import Statistics from './Pages/Statistics';
import PopularCombos from './Pages/PopularCombos';
import ExcessReport from  './Pages/ExcessReport';
import CustomerGUI from './Pages/CustomerGUI'
import CashierGUI from './Pages/CashierGUI';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from './auth0ProviderWithHistory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div style={{height:"100vh", margin: 0}}>
      <App/>
    </div>


    
  </>
);