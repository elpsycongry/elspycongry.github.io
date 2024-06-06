import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import logoCodeGym from '../../assets/image/CodeGym.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import './clientHeader.css';

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

// Component ClientHeader
export default function ClientHeader() {
  // Sử dụng chủ đề hiện tại
  const theme = useTheme();
  // Kiểm tra nếu kích thước màn hình là di động
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // AppBar có vị trí cố định và màu nền cam
    <AppBar position="fixed" sx={{ backgroundColor: 'orange' }}>
      {/* Thanh công cụ chứa nội dung */}
      <Toolbar className={`header-toolbar ${isMobile ? 'header-toolbar-mobile' : ''}`}>
        {/* Avatar cho logo */}
        <Avatar sx={{ m: 1, bgcolor: '#282781' }}>
          {/* Hình ảnh logo */}
          <img src={logoCodeGym} className="header-logo" />
        </Avatar>
        {/* Typography cho tiêu đề */}
        <Typography variant="h6" noWrap component="div" className={isMobile ? 'header-title-mobile' : ''}>
          Hệ thống quản lý đào tạo
        </Typography>
        {/* Box cho không gian linh hoạt */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
        {/* Container cho các nút */}
        <div className={`header-buttons ${isMobile ? 'header-buttons-mobile' : ''}`}>
          {/* Container cho nút đăng nhập */}
          <div className='header-link'>
            {/* Link đến trang đăng nhập */}
            <Link className='btn btn-codegym' to={`/login`}> Đăng nhập</Link>
          </div>
          {/* Container cho nút đăng ký */}
          <div className='header-link'>
            {/* Link đến trang đăng ký */}
            <Link className='btn btn-codegym' to={`/register`}> Đăng ký</Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
