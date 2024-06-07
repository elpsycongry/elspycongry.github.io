import {
    Box, Dialog,
    DialogContent,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Link, Switch,
    Tooltip
} from "@mui/material";
import Header from "../fragment/header/header";
import Navbar from "../fragment/navbar/navbar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '@mui/material/Pagination';
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
import './users.css'
import DialogUpdateUserForm from "./updateUser";
import DialogAddUserForm from "./addUser";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import swal from 'sweetalert';
import './blockUser.css';
import ReportIcon from '@mui/icons-material/Report';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/public">
                Quản lý đào tạo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function PageWait() {
    

    return (
        <>
            <Header />
            <Navbar />
            <div style={{ paddingTop: '30px', paddingBottom: '0px', width: '100%', height: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Copyright sx={{ maxWidth: '100%' }} />
            </div>
        </>
    );
}