import { Box, Dialog, DialogContent, IconButton, FormControl, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import BreadCrumbs from "../fragment/breadcrumbs/breadcrumbs";
import Footer from "../fragment/footer/footer";
import Header from "../fragment/header/header";
import Navbar from "../fragment/navbar/navbar";
import "../../assets/css/cssRecruitment/recruitment.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import imagePractice from '../../assets/image/z5420560028155_279ad92bb3d475ee7a7d0139eac6402f.jpg'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import moment from 'moment';

import { useEffect, useState } from "react";
import axios from "axios";
export default function PersonalNeeds() {

    const [open, setOpen] = useState(false);
    const handleClickPracticeOpen = () => {
        setOpen(true);
    }
    const handleClickPracticeClose = () => {
        setOpen(false);
    }

    const [status, setStatus] = useState('');
    const handleChange = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value)
    };
    // Dữ liệu fake của thằng trạng thái, nhân sự
    const listTestSelect = [
        { id: 1, text: "Hoạt động" },
        { id: 2, text: "Không hoạt động" },
        { id: 3, text: "Đang chờ" }
    ]
    const listPersonal = [
        { id: 1, name: 'DECEN- Nhu cầu nhân sự quý 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 2, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 3, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 4, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 5, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 6, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' },
        { id: 7, name: 'DECEN- Nhu cầu 3', time: '14:19 11/11/2019', status: 'Đã gửi', man: 'KongDT' }
    ]
    const [recuitments , setRecuitment] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:8080/api/recruitmentRequests").then(res =>{
            setRecuitment(res.data);
        })
    },[])
    return (
        <>
            <Header />
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '64px', marginLeft: '64px' }}>
                <BreadCrumbs />
                <div className="content-recruiment">
                    <div className=" d-flex align-items-centent justify-content-between">
                        <p className="title text-center mb-0">
                            Nhu cầu nhân sự
                        </p>
                        <div className="d-flex align-items-center cursor-pointer" onClick={handleClickPracticeOpen}>
                            <p className="practice text-center mb-0">
                                Quy trình tuyển dụng

                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#4d4dff" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 16a1 1 0 1 1 1-1a1 1 0 0 1-1 1m1-5.16V14a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.5-1.5a1 1 0 0 1-2 0a3.5 3.5 0 1 1 4.5 3.34" /></svg>
                        </div>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClickPracticeClose}
                    >
                        <DialogContent sx={{
                            p: 0,
                            position: 'relative'
                        }}>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}
                                onClick={handleClickPracticeClose}
                            >
                                <ClearIcon />
                            </IconButton>
                            <img src={imagePractice} alt="image" style={{ width: '100%' }} />
                        </DialogContent>
                    </Dialog>
                    <div className=" mt-3">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="search-input position-relative">
                                    <input type="text" className="w-px position-relative" placeholder="Search with name..." />
                                    <svg className="search-icon position-absolute" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgb(131 125 125 / 87%)" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                                </div>
                                <FormControl className="h-px" sx={{ minWidth: '250px' }}>
                                    <InputLabel className="top-left" id="demo-simple-small-label">Trạng thái...</InputLabel>
                                    <Select
                                        labelId="demo-simple-small-label"
                                        className="h-px"
                                        id="demo-simple-select"
                                        label="Status"
                                        value={status}
                                        onChange={handleChange}
                                    >
                                        {listTestSelect.map(item => (
                                            <MenuItem value={item.id} key={item.id}>{item.text}</MenuItem>
                                        ))

                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="min-width position-relative ">
                                <button className="btn-create w-100  text-right clr-white font-w-1 non-outline">Create new personnel</button>
                                <AddIcon className=" position-absolute plus-icon clr-white" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className=" table ">
                            <tr className="header-tr grey-text">
                                <th>STT</th>
                                <th>Tên nhu cầu</th>
                                <th>Thời gian khởi tạo</th>
                                <th className=" text-center">Trạng thái</th>
                                <th className=" text-center">Người gửi</th>
                                <th className=" text-center">Hành động</th>
                            </tr>
                            {recuitments.map(item => (
                                <tr className="grey-text count-tr" key={item.id}>
                                    <td className="count-td"></td>
                                    <td>{item.name}</td>
                                    <td>{moment(item.dateStart).format("HH:mm YYYY-MM-DD")}</td>
                                    <td className="text-center">{item.status}</td>
<td className="text-center">{item.users.name}</td>
<td className="text-center">
  <RemoveRedEyeIcon className="color-blue white-div font-size-large" />
  {item.status.toLowerCase() === 'đã hủy' ? (<CreateIcon className="color-orange pencil-btn font-size-medium bg-whiteImportant"/>) : (
        <CreateIcon className="color-orange pencil-btn font-size-medium" />
  )}
</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </Box>
            <Footer />
        </>
    )
}