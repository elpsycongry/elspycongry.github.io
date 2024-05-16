import { Box, Button, ButtonGroup, Dialog, DialogContent, IconButton } from "@mui/material";
import Header from "../../fragment/header/header";
import Navbar from "../../fragment/navbar/navbar";
import './trainingStats.css';
export default function TrainingStats() {
    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '57px', marginLeft: '64px', bgcolor: 'rgb(231, 227, 227)' }}>
                <Box m={2} style={{ display: 'flex' }}>
                    <svg style={{ width: 25, height: 25, color: 'rgba(0, 0, 0, 0.60)' }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20v-6h3v6zm6 0V9h3v11zm6 0V4h3v16z" /></svg>
                    <p style={{ marginLeft: '10px', marginBottom: '0px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)' }}>Thống kê {'>'} Kết quả đào tạo</p>
                </Box>
                <div style={{height: '800px'}} className="content-recruiment">
                    <div style={{width: '100%'}} class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-warning active">Chỉ số</button>
                        <button type="button" class="btn btn-outline-warning">Biểu đồ</button>
                        <button type="button" class="btn btn-outline-warning">Thống kê tăng trưởng</button>
                    </div>
                    <h4 style={{ marginLeft: '10px', marginBottom: '0px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)', marginTop: '25px', marginBottom: '25px' }}>Kết quả đào tạo tháng 4</h4>
                    <div style={{width: '50%', marginBottom: '25px' }} class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-warning active">Theo tháng</button>
                        <button type="button" class="btn btn-outline-warning">Theo quý</button>
                        <button type="button" class="btn btn-outline-warning">Theo năm</button>
                        <button type="button" class="btn btn-outline-warning">Tất cả</button>
                    </div>
                    <div style={{ marginLeft: '10px', marginBottom: '0px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '550', color: 'rgba(0, 0, 0, 0.60)'}}>
                        <label>Số thực tập sinh nhập học:</label>
                        <label style={{ marginLeft: '200px'}}>150 TTS</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh tốt nghiệp:</label>
                        <label style={{ marginLeft: '195px'}}>75 TTS</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh fail:</label>
                        <label style={{ marginLeft: '264px'}}>15 TTS</label>
                        <br></br>
                        <br></br>
                        <label>Tỷ lệ Pass/fail:</label>
                        <label style={{ marginLeft: '328px'}}>4.2</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh đang thực tập:</label>
                        <label style={{ marginLeft: '162px'}}>10 TTS</label>
                        <br></br>
                        <br></br>
                        <label>Số thực tập sinh nghỉ thực tập:</label>
                        <label style={{ marginLeft: '170px'}}>1 TTS</label>
                        <br></br>
                        <br></br>
                        <label>Điểm tốt nghiệp trung bình:</label>
                        <label style={{ marginLeft: '208px'}}>7.78</label>
                    </div>
                </div>
            </Box>
        </>
    )
}