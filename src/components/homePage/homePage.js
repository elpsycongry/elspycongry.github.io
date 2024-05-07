import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* '#ffb837' */}
            <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
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
