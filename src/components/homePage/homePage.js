import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import logoImage from '../../assets/image/logoA.jpg'

const HomePage = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* '#ffb837' */}
            <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
                <Toolbar>
                    <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                        <img src={logoImage} style={{ width: '40px', height: '40px' }} />
                    </Avatar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Quản lý đào tạo
                    </Typography>
                    <Button color="inherit">
                        <Link to={`/login`} style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}>Đăng nhập</Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <React.Fragment>
                <CssBaseline />
                <Container fixed style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ height: '90vh' }}>
                        <Typography style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'black'
                        }} variant="h4">Nâng cao kỹ năng - Nâng tầm giá trị</Typography>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    );
};

export default HomePage;