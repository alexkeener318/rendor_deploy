import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Components/Header"

import Checkout from "./Pages/Checkout";
import Inventory from "./Pages/Inventory";
import Pinpad from "./Pages/Pinpad";
import PopularCombos from "./Pages/PopularCombos";
import POSReport from "./Pages/POSReport";
import CustomerGUI from "./Pages/CustomerGUI";

const App= ()=> {
  return (
    <CustomerGUI />
    // <div style={{backgroundColor:"teal", height: "100%"}}>
    //   <Header title = "This is a title"/>

    //   <h1 style = {{textAlign: "center"}}>App Starts here</h1>

    //   <Link to="/checkout" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Checkout</Button>
    //   </Link>

    //   <Link to="/inventory" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Inventory</Button>
    //   </Link>

    //   <Link to="/pinpad" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Pinpad</Button>
    //   </Link>

    //   <Link to="/popularcombos" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">PopularCombos</Button>
    //   </Link>

    //   <Link to="/posreport" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">POSReport</Button>
    //   </Link>

    //   <Link to="/excessreport" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Excess Report</Button>
    //   </Link>

    //   <Link to="/customergui" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Customer GUI</Button>
    //   </Link>

    //   <Link to="/cashiergui" style={{textDecoration:"none"}} >
    //     <Button variant = "contained">Cashier GUI</Button>
    //   </Link>
    // </div>
  );
}

export default App;
