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
import axios from 'axios';
import { Link } from '@mui/material';

// const HomeIcon = () => {
//     return (
//         <Icon icon="fa:home" width="25" height="25" />
//     )
// }
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

const HomePage = () => {
    const navigate = useNavigate()
    const [personnelNeeds, setPersonnelNeeds] = React.useState(
        {
            "approved": 0,
            "awaitingApproval": 0,
            "approved": 0,
            "handedOver": 0
        }
    );
    const [recruitmentPlan, setRecuitmentPlan] = React.useState(
        {
            "totalRecruitmentPlan": 0,
            "awaitingApproval": 0,
            "approved": 0,
            "Accomplished": 0
        }
    );
    const [candidate, setCandidate] = React.useState({
        "totalCandidate": 0,
        "haveNotInterviewedYet": 0,
        "candidatePass": 0,
        "candidateFail": 0
});
    const [intern, setIntern] = React.useState({
        "totalIntern": 0,
        "internTraining": 0,
        "internPass": 0,
        "internFail": 0
    });

    React.useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get(`http://localhost:8080/api/dashboard/personnelNeeds`);
                    setPersonnelNeeds(response.data)

                    const response1 = await axios.get(`http://localhost:8080/api/dashboard/recruitmentPlan`);
                    setRecuitmentPlan(response1.data)

                    const response2 = await axios.get(`http://localhost:8080/api/dashboard/candidate`);
                    setCandidate(response2.data)

                    const response3 = await axios.get(`http://localhost:8080/api/dashboard/intern`);
                    setIntern(response3.data)

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, []);
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
                                            <p><strong>{personnelNeeds.personnelNeeds}</strong></p>
                                            <p><strong>{personnelNeeds.awaitingApproval}</strong></p>
                                            <p><strong>{personnelNeeds.approved}</strong></p>
                                            <p><strong>{personnelNeeds.handedOver}</strong></p>
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
                                    <Icon icon="fa:home" className='smaller-icon-container-icon' style={{ height: '120px' }} />
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
                                            <p><strong>{recruitmentPlan.totalRecruitmentPlan}</strong></p>
                                            <p><strong>{recruitmentPlan.awaitingApproval}</strong></p>
                                            <p><strong>{recruitmentPlan.approved}</strong></p>
                                            <p><strong>{recruitmentPlan.accomplished}</strong></p>
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
                                            <p><strong>{candidate.totalCandidate}</strong></p>
                                            <p><strong>{candidate.haveNotInterviewedYet}</strong></p>
                                            <p><strong>{candidate.candidatePass}</strong></p>
                                            <p><strong>{candidate.candidateFail}</strong></p>
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
                                            <p><strong>{intern.totalIntern}</strong></p>
                                            <p><strong>{intern.internTraining}</strong></p>
                                            <p><strong>{intern.internPass}</strong></p>
                                            <p><strong>{intern.internFail}</strong></p>
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
            <div style={{ paddingTop: '70px', paddingBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Copyright sx={{ maxWidth: '100%' }} />
            </div>
        </>
    );
};

export default HomePage;