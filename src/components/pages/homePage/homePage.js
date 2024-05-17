import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import logoImage from '../../../assets/image/logoCodeGym.png'
import { doLogout } from "../../checkToken/AuthContext";
import Navbar from '../../fragment/navbar/navbar';
import Header from '../../fragment/header/header';
import { Icon } from '@iconify/react';
import './homePage.css';

// const HomeIcon = () => {
//     return (
//         <Icon icon="fa:home" width="25" height="25" />
//     )
// }

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '57px', marginLeft: '64px', bgcolor: 'rgb(231, 227, 227)' }}>
                <Box m={2} style={{ display: 'flex', marginBottom: '11px' }}>
                    <Icon icon="fa:home" width="24" height="24" style={{ color: 'rgba(0, 0, 0, 0.60)', paddingBottom: '6px' }} />
                    <p style={{ marginLeft: '10px', marginBottom: '0px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)' }}>Trang chủ</p>
                </Box>
                <Box>
                    <div className='large-div-container'>
                        {/* first-div */}
                        <div className='small-div-container first-div'>
                            <div className='smaller-div-container'>
                                <div className='smaller-content'>
                                    <h3 className='smaller-content-title'>Nhu cầu nhân sự</h3>
                                    <div className='smaller-content-data'>
                                        <div className='smaller-content-number'>
                                            <p><strong>26</strong></p>
                                            <p><strong>4</strong></p>
                                            <p><strong>9</strong></p>
                                            <p><strong>12</strong></p>
                                        </div>
                                        <div className='smaller-content-text'>
                                            <p>Tổng số nhu cầu nhân sự</p>
                                            <p>Đang chờ duyệt</p>
                                            <p>Đã duyệt</p>
                                            <p>Đã bàn giao</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='smaller-icon-container'>
                                    <Icon icon="fa:home" className='smaller-icon-container-icon' style={{height: '120px'}} />
                                </div>
                            </div>
                        </div>
                        {/* second-div */}
                        <div className='small-div-container second-div'>
                            <div className='smaller-div-container'>
                                <div className='smaller-content'>
                                    <h3 className='smaller-content-title'>Kế hoạch tuyển dụng</h3>
                                    <div className='smaller-content-data'>
                                        <div className='smaller-content-number'>
                                            <p><strong>21</strong></p>
                                            <p><strong>0</strong></p>
                                            <p><strong>18</strong></p>
                                            <p><strong>3</strong></p>
                                        </div>
                                        <div className='smaller-content-text'>
                                            <p>Tổng số kế hoạch tuyển dụng</p>
                                            <p>Đang chờ duyệt</p>
                                            <p>Đã duyệt</p>
                                            <p>Đã hoàn thành</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='smaller-icon-container'>
                                    <Icon icon="fluent:document-bullet-list-24-filled" className='smaller-icon-container-icon' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='large-div-container'>
                        {/* third-div */}
                        <div className='small-div-container third-div'>
                            <div className='smaller-div-container'>
                                <div className='smaller-content'>
                                    <h3 className='smaller-content-title'>Ứng viên</h3>
                                    <div className='smaller-content-data'>
                                        <div className='smaller-content-number'>
                                            <p><strong>542</strong></p>
                                            <p><strong>4</strong></p>
                                            <p><strong>9</strong></p>
                                            <p><strong>12</strong></p>
                                        </div>
                                        <div className='smaller-content-text'>
                                            <p>Tổng số ứng viên</p>
                                            <p>Chưa phỏng vấn</p>
                                            <p>Pass</p>
                                            <p>Fail</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='smaller-icon-container'>
                                    <Icon icon="material-symbols:contact-mail" className='smaller-icon-container-icon' />
                                </div>
                            </div>
                        </div>
                        {/* fourth-div */}
                        <div className='small-div-container fourth-div'>
                            <div className='smaller-div-container'>
                                <div className='smaller-content'>
                                    <h3 className='smaller-content-title'>Thực tập sinh</h3>
                                    <div className='smaller-content-data'>
                                        <div className='smaller-content-number'>
                                            <p><strong>96</strong></p>
                                            <p><strong>26</strong></p>
                                            <p><strong>20</strong></p>
                                            <p><strong>0</strong></p>
                                        </div>
                                        <div className='smaller-content-text'>
                                            <p>Tổng số thực tập sinh</p>
                                            <p>Đang thực tập</p>
                                            <p>Pass</p>
                                            <p>Fail</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='smaller-icon-container'>
                                    <Icon icon="bxs:book-reader" className='smaller-icon-container-icon' />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default HomePage;