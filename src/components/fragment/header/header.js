import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import AuthContext, { doLogout } from "../../checkToken/AuthContext";
import { useNavigate } from "react-router-dom";
import logoCodeGym from '../../../assets/image/logoCodeGym.png'
import avatarDemo from '../../../assets/image/boy_2.png'
import './header.css'
import { Notification } from "../../Notification/notification";
import { useEffect } from 'react';
import { useState } from 'react';

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function Header() {
    // Notification
    const [userRoles, setUserRoles] = useState([]);
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    setUserRoles(user.roles);
    },[])
    
    userRoles.map(item =>{
        console.log(item.authority);
    })
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const [anchorElRoles, setAnchorElRoles] = useState(null);

    const handleRolesClick = (event) => {
        setAnchorElRoles(event.currentTarget);
    };

    const handleRolesClose = () => {
        setAnchorElRoles(null);
    };

    const openRoles = Boolean(anchorElRoles);

    const rolesMenu = (
        <Menu
            id="basic-menu"
            className='menuChild'
            anchorEl={anchorElRoles}
            open={openRoles}
            onClose={handleRolesClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            {userRoles.map((item,index) => (
                <MenuItem key={index}>
                    <Typography textAlign="center">{item.authority}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'orange' }}>
                <Toolbar style={{ padding: '0 4px' }}>
                    <Avatar sx={{ m: 1, bgcolor: '#282781' }}>
                        <img src={logoCodeGym} style={{ width: '30px', height: '30px' }} />
                    </Avatar>
                    <Typography variant="h6" noWrap component="div">
                        Hệ thống quản lý đào tạo
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                    <Box sx={{ marginRight: '10px', display: "flex", alignItems: 'center' }}>
                        <Notification />
                    </Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar className='avt-img' alt="Remy Sharp" src={avatarDemo} />
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={() => { doLogout(navigate) }}>
                            <Typography textAlign="center">Đăng xuất</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleRolesClick}>
                            <Typography textAlign="center">Vai trò</Typography>
                        </MenuItem>
                        {rolesMenu}
                    </Menu>
                </Toolbar>

            </AppBar>
        </>
    )
}