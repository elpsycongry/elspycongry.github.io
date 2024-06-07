import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logoImage from '../../../assets/image/logoCodeGym.png';


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

// Show and hide password
const EndAdorment = ({ visible, setVisible }) => {
    return (
        <InputAdornment position='end'>
            <IconButton onClick={() => setVisible(!visible)}>
                {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
        </InputAdornment>
    )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function PageWait() {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container style={{ paddingTop: '140px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={{ width: '100px', height: '100px' }} sx={{ m: 1, bgcolor: '#282781' }}>
                        <img src={logoImage} style={{ width: '80px', height: '80px' }} />
                    </Avatar>
                    <Typography variant="h2" style={{ paddingTop: '40px'}}>Chờ đến khi admin phê duyệt</Typography>
                </Box>
                <div style={{ marginTop: '-70px' }}>
                    <Copyright sx={{ mt: 36, mb: 4 }} />
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default PageWait;