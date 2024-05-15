import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import logoImage from '../../../assets/image/logoCodeGym.png'
import {doLogout} from "../../checkToken/AuthContext";
import Navbar from '../../fragment/navbar/navbar';

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div style={{backgroundColor: 'white'}}>
            {/* '#ffb837' */}
            <AppBar position="static" sx={{backgroundColor: 'orange'}}>
                <Toolbar>
                    <Avatar sx={{m: 1, bgcolor: 'orange'}}>
                        <img src={logoImage} style={{width: '40px', height: '40px'}}/>
                    </Avatar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Quản lý đào tạo
                    </Typography>
                    <Button onClick={() => {doLogout(navigate)}} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Navbar></Navbar>
            <React.Fragment>
                    <Box>
                        <Typography variant="h4" style={{textAlign: "center"}}>Nâng cao kỹ năng - Nâng tầm giá trị</Typography>
                    </Box>
            </React.Fragment>
        </div>
    );
};

export default HomePage;