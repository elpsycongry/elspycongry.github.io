import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import logoCodeGym from '../../assets/image/CodeGym.jpg'

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
              <Link className=' btn btn-codegym' to={`/register`} style={{ textDecoration: 'none', marginRight: '10px', width: '150px' }}> Đăng kí</Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}