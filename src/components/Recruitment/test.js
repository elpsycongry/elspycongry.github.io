import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { validEmail, validPhone } from "./regex/regex";
import { useState } from "react";
import Navbar from '../fragment/navbar/navbar';
import Header from '../fragment/header/header';
import { Box } from '@mui/material';


export default function Test() {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Box component='main' sx={{ minWidth: '1096px', flexGrow: 1, p: 2, marginTop: '64px', marginLeft: '64px', textAlign:'center' }}>
                <h1>Home</h1>
            </Box>
        </div>
    );
};