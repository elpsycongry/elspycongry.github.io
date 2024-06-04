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
import { doLogout } from "../checkToken/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logoCodeGym from '../../assets/image/CodeGym.jpg'
import avatarDemo from '../../assets/image/boy_2.png'
import { Notification } from "../Notification/notification";

const settings = ['Đăng xuất'];
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
          <div style={{ display: 'flex' }}>
            {/* Nút đăng nhập */}
            <div>
              <Link className=' btn btn-codegym' to={`/login`} style={{ textDecoration: 'none', marginRight: '10px', width: '150px' }}> Đăng nhập</Link>
            </div>
            {/* Nút đăng ký */}
            <div>
              <button className='btn btn-codegym' style={{ marginRight: '10px', width: '150px' }}>
                Đăng ký
              </button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}