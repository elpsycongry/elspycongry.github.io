
import { Box, Button, ButtonGroup, Dialog, DialogContent, IconButton, Link, Typography } from "@mui/material";
import Header from "../../fragment/header/header";
import Navbar from "../../fragment/navbar/navbar";
import './trainingStats.css';
import { useEffect, useState } from "react";
import Footer from "../../fragment/footer/footer";
import axios from "axios";
import { Copyright } from "@mui/icons-material";
import { date } from "yup";
// import Footer from "../fragment/footer/footer";
export default function TrainingStats() {
    const [traingStats, setTraningStats] = useState({
        internsEnrolled: "150 TTS",
        graduatingInterns: "75 TTS",
        internsFailed: "15 TTS",
        rate: 4.2,
        internsCurrentlyPracticing: "10 TTS",
        internsQuitInternship: "1 TTS",
        averageGraduationScore: 7.78
    });


    const [title, setTitle] = useState("Kết quả đào tạo tháng 5");
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/stats/trainingStats/month/5")
                .then(res => {
                    setTraningStats(res.data)
                })
    }, [])

    const handleClick = (event) => {
        const theValue = event.currentTarget.value;

        if (theValue == 1) {
            setTitle("Kết quả đào tạo tháng 5")
            setActive1(true)
            setActive2(false)
            setActive3(false)
            setActive4(false)
            axios.get("http://localhost:8080/api/stats/trainingStats/month/5")
                .then(res => {
                    setTraningStats(res.data)
                })
        }

        if (theValue == 2) {
            setTitle("Kết quả đào tạo quý 2")
            setActive1(false)
            setActive2(true)
            setActive3(false)
            setActive4(false)
            axios.get("http://localhost:8080/api/stats/trainingStats/quarter/2")
                .then(res => {
                    setTraningStats(res.data)
                })
        }

        if (theValue == 3) {
            setTitle("Kết quả đào tạo năm 2024")
            setActive1(false)
            setActive2(false)
            setActive3(true)
            setActive4(false)
            axios.get("http://localhost:8080/api/stats/trainingStats/year/2024")
                .then(res => {
                    setTraningStats(res.data)
                })
        }

        if (theValue == 4) {
            setTitle("Kết quả đào tạo tất cả")
            setActive1(false)
            setActive2(false)
            setActive3(false)
            setActive4(true)


            axios.get("http://localhost:8080/api/stats/trainingStats/all")
                .then(res => {
                    setTraningStats(res.data)
                })
        }

    };

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

    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '57px', marginLeft: '64px', bgcolor: 'rgb(231, 227, 227)' }}>
                <Box m={2} style={{ display: 'flex' }}>
                    <svg style={{ width: 25, height: 25, color: 'rgba(0, 0, 0, 0.60)' }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20v-6h3v6zm6 0V9h3v11zm6 0V4h3v16z" /></svg>
                    <p style={{ marginLeft: '10px', marginBottom: '0px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)' }}>Thống kê {'>'} Kết quả đào tạo</p>
                </Box>

                <div style={{ height: '680px' }} className="content-recruiment">
                    <div style={{ width: '100%' }} class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-warning active">Chỉ số</button>
                        <button type="button" class="btn btn-outline-warning">Biểu đồ</button>
                        <button type="button" class="btn btn-outline-warning">Thống kê tăng trưởng</button>
                    </div>
                    <h4 style={{ marginLeft: '10px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)', marginTop: '25px', marginBottom: '25px' }}>{title}</h4>
                    <div style={{ width: '50%', marginBottom: '25px' }} class="btn-group" role="group" aria-label="Basic outlined example">
                        {active1 ? (
                            <button type="button" value="1" onClick={handleClick} class="btn btn-outline-warning active">Theo tháng</button>
                        ) :
                            <button type="button" value="1" onClick={handleClick} class="btn btn-outline-warning">Theo tháng</button>
                        }
                        {active2 ? (
                            <button type="button" value="2" onClick={handleClick} class="btn btn-outline-warning active">Theo quý</button>
                        ) :
                            <button type="button" value="2" onClick={handleClick} class="btn btn-outline-warning">Theo quý</button>
                        }
                        {active3 ? (
                            <button type="button" value="3" onClick={handleClick} class="btn btn-outline-warning active">Theo năm</button>
                        ) :
                            <button type="button" value="3" onClick={handleClick} class="btn btn-outline-warning">Theo năm</button>
                        }
                        {active4 ? (
                            <button type="button" value="4" onClick={handleClick} class="btn btn-outline-warning active">Tất cả</button>
                        ) :
                            <button type="button" value="4" onClick={handleClick} class="btn btn-outline-warning">Tất cả</button>
                        }
                    </div>
                    <div style={{ marginLeft: '10px', marginBottom: '0px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)' }}>
                        <label>Số thực tập sinh nhập học:</label>
                        <label style={{ marginLeft: '200px' }}>{traingStats.internsEnrolled}</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh tốt nghiệp:</label>
                        <label style={{ marginLeft: '195px' }}>{traingStats.graduatingInterns}</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh fail:</label>
                        <label style={{ marginLeft: '264px' }}>{traingStats.internsFailed}</label>
                        <br></br>
                        <br></br>
                        <label>Tỷ lệ Pass/fail:</label>
                        <label style={{ marginLeft: '328px' }}>{traingStats.rate}</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh đang thực tập:</label>
                        <label style={{ marginLeft: '162px' }}>{traingStats.internsCurrentlyPracticing}</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh nghỉ thực tập:</label>
                        <label style={{ marginLeft: '170px' }}>{traingStats.internsQuitInternship}</label>
                        <br></br>
                        <br></br>
                        <label>Điểm tốt nghiệp trung bình:</label>
                        <label style={{ marginLeft: '208px' }}>{traingStats.averageGraduationScore}</label>
                    </div>
                </div>
                <div style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%', height: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Copyright sx={{ maxWidth: '100%' }} />
                 </div>
            </Box>
        </>
    )
}