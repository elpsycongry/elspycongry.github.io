import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import AuthContext, { doLogout } from "../../checkToken/AuthContext";
import { useNavigate } from "react-router-dom";
import logoCodeGym from '../../../assets/image/logoCodeGym.png';
import './header.css';
import { Notification } from "../../Notification/notification";
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const drawerWidth = 240;

// Tạo AppBar với các kiểu dáng tùy chỉnh
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
    const [userRoles, setUserRoles] = React.useState([]);
    const [userLogin, setUserLogin] = React.useState({
        name: '',
        email: ''
    });

    // Lấy thông tin người dùng sau khi component được mount
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user != null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
            axios.get('http://localhost:8080/roles/users/view/' + user.id).then(res => {
                setUserLogin(res.data);
            }).catch((e) => {
                console.error(e)});
            setUserRoles(user.roles);
        }
    }, []);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const [anchorElRoles, setAnchorElRoles] = React.useState(null);

    // Mở menu người dùng
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // Đóng menu người dùng
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Mở menu vai trò
    const handleRolesClick = (event) => {
        setAnchorElRoles(event.currentTarget);
    };

    // Đóng menu vai trò
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
            {userRoles.map((item, index) => (
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
                    {/* Logo của CodeGym */}
                    <Avatar sx={{ m: 1, bgcolor: '#282781' }}>
                        <img src={logoCodeGym} style={{ width: '30px', height: '30px' }} alt="Logo" />
                    </Avatar>
                    {/* Tiêu đề hệ thống */}
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Hệ thống quản lý đào tạo
                    </Typography>
                    {/* Khoảng trống để đẩy các phần tử khác sang phải */}
                    <Box sx={{ flexGrow: 1 }}></Box>
                    {/* Thông báo */}
                    <Box sx={{ marginRight: '10px', display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Notification />
                    </Box>
                    {/* Menu người dùng */}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar className='me-3' alt="Remy Sharp" src={userLogin.avatar} />
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        className='menu'
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
                        <div className='info-user pe-2 ps-2 mt-2' style={{ height: '50px' }}>
                            <div className='d-flex ms-2 align-item-center'>
                                <Avatar className='me-3' alt="Remy Sharp" src={userLogin.avatar} />
                                <div className='d-flex flex-column'>
                                    <span>{userLogin.name}</span>
                                    <span>{userLogin.email}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* Menu vai trò */}
                        <MenuItem onClick={handleRolesClick}>
                            <ContactEmergencyIcon className='me-3' />
                            <Typography textAlign="center">Vai trò</Typography>
                        </MenuItem>
                        {/* Menu đăng xuất */}
                        <MenuItem onClick={() => { doLogout(navigate) }}>
                            <LogoutIcon className='me-3' />
                            <Typography textAlign="center">Đăng xuất</Typography>
                        </MenuItem>
                        {rolesMenu}
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}