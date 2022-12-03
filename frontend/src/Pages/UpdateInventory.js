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
    return (
        <div>
            <Header title = "Update Inventory" path = "/cashiergui"/>

        </div>
    );
}

export default UpdateInventory;