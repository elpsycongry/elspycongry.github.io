import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Link, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import logoImage from '../../../assets/image/logoA.jpg'
import {doLogout} from "../../checkToken/AuthContext";

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
                        Đăng xuất
                    </Button>
                </Toolbar>
            </AppBar>
            <React.Fragment>
                <CssBaseline/>
                <Container fixed style={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{height: '90vh'}}>
                        <Typography style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'black'
                        }} variant="h4">Tài khoản của bạn chưa được kích hoạt</Typography>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    );
};

export default HomePage;