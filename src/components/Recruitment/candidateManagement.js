import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ClearIcon from "@mui/icons-material/Clear";
import {
    Box,
    Dialog,
    DialogContent,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../assets/css/cssRecruitment/recruitment.css";
import "../../assets/css/cssRecruitment/responsiveRecruitment.css";
import imagePractice from "../../assets/image/PracticeImage.jpg";
import BreadCrumbs from "../fragment/breadcrumbs/breadcrumbs";
import Footer from "../fragment/footer/footer";
import Header from "../fragment/header/header";
import Navbar from "../fragment/navbar/navbar";
import DialogCandidateFormCreate from "./dialogCandidateManagement/dialogCandidateFromCreate";
import DialogPersonalFormUpdate from "./dialogPersonalNeeds/dialogPersonalFormUpdate";
import DialogPersonalFormWatch from './dialogPersonalNeeds/dialogPersonalFormWatch';
export default function CandidateManagement() {

    const [open, setOpen] = useState(false);
    const handleClickPracticeOpen = () => {
        setOpen(true);
    };
    const handleClickPracticeClose = () => {
        setOpen(false);
    };
    const [check, setCheck] = useState(false);
    const checkDisplay = () => {
        setCheck(false);
    };

    const [status, setStatus] = useState("");
    const handleChange = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value);
    };


    const CandidateManagementTest = [
        {
            id: 1,
            name: "trọng",
            email: "trong@gmail.com",
            number: "0392017345",
            scoreTest: "53",
            scorePV: "8",
            status: "Chưa có kq",
        },
        {
            id: 2,
            name: "Hoàng",
            email: "trong@gmail.com",
            number: "0392017345",
            scoreTest: "53",
            scorePV: "8",
            status: "Chưa có kq",
        },
        {
            id: 3,
            name: "Hoa",
            email: "trong@gmail.com",
            number: "0392017345",
            scoreTest: "53",
            scorePV: "8",
            status: "Chưa có kq",
        }
    ];

    const [valueRecuitments, setSearchName] = useState('');
    const [showError, setShowError] = useState(false);
    const handleSearch = (event) => {
        setSearchName(event.target.value);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/recruitmentRequests/search?name=${valueRecuitments}`);
            setRecuitment(response.data);
            if (response.data.length === 0) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        } catch (error) {
            console.error('Error search results:', error);
        }
    };
    const listTestSelect = [
        { id: "Đã hủy", text: "Đã hủy" },
        { id: "Đã xác nhận", text: "Đã xác nhận" },
        { id: "Đang chờ", text: "Đang chờ" },
        { id: "Bị từ chối bởi DET", text: "Bị từ chối bởi DET" },
        { id: "Bị từ chối bởi DCAN", text: "Bị từ chối bởi DCAN" },
        { id: "Đang tuyển dụng", text: "Đang tuyển dụng" },
        { id: "Đã bàn giao", text: "Đã bàn giao" },
    ]
    const [selectedStatus, setSelectedStatus] = useState('');
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        handleSubmitSelect(event.target.value);
    };

    const handleSubmitSelect = async (selectedValue) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/recruitmentRequests/filter?status=${selectedValue}`);
            setRecuitment(response.data);
            if (response.data.length === 0) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        } catch (error) {
            console.error('Error searching by status:', error);
        }
    };
    const [recuitments, setRecuitment] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/recruitmentRequests").then((res) => {
            setRecuitment(res.data);
        });
    }, []);



 

    return (
        <>
            <Header />
            <Navbar breadCrumb={"Quản lý ứng viên"} />
            <Box component="main" sx={{ minWidth: '1246px', flexGrow: 1, p: 2, marginTop: '64px', marginLeft: '64px' }}>
                <BreadCrumbs recruitment="Tuyển dụng" personnelNeeds="Quản lý ứng viên" icon={<BusinessCenterIcon sx={{ marginBottom: '5px', marginRight: '2px' }} />} />
                <div className="content-recruiment">
                    <div className=" d-flex align-items-centent justify-content-between">
                        <p className="title text-center mb-0">
                            Quản lý ứng viên
                        </p>
                        <div className="d-flex align-items-center cursor-pointer" onClick={handleClickPracticeOpen}>
                            <p className="practice text-center mb-0 me-1">
                                Quy trình tuyển dụng

                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#005B9F" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 16a1 1 0 1 1 1-1a1 1 0 0 1-1 1m1-5.16V14a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.5-1.5a1 1 0 0 1-2 0a3.5 3.5 0 1 1 4.5 3.34" /></svg>
                        </div>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClickPracticeClose}
                        id="dialog"
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
                    <div className=" mt-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="search-input position-relative">
                                    <form onSubmit={handleSubmitSearch}>
                                        <input type="text" className="border-clr-grey w-px position-relative" name="name" value={valueRecuitments} onChange={handleSearch} placeholder="Tìm kiếm với tên..." />
                                        <svg className="search-icon position-absolute" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgb(131 125 125 / 87%)" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
                                    </form>
                                </div>
                                <FormControl className="ml-10 select-form" sx={{ minWidth: 300 }}>
                                    <InputLabel htmlFor="grouped-select">Trạng thái...</InputLabel>
                                    <Select defaultValue=""
                                        id="grouped-select"
                                        label="Trạng thái..."
                                        onChange={handleStatusChange}
                                        value={selectedStatus}
                                        className="select-edit grey-text"
                                    >
                                        {
                                            listTestSelect.map(item => (
                                                <MenuItem value={item.id} key="{item.status}" onClick={handleSubmitSelect}>{item.text}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="ml-10 select-form" sx={{ minWidth: 300 }}>
                                    <InputLabel htmlFor="grouped-select">Kế hoạch tuyển dụng...</InputLabel>
                                    <Select defaultValue=""
                                        id="grouped-select"
                                        label="Kế hoạch tuyển dụng..."
                                        onChange={handleStatusChange}
                                        value={selectedStatus}
                                        className="select-edit grey-text"
                                    >
                                        {
                                            listTestSelect.map(item => (
                                                <MenuItem value={item.id} key="{item.status}" onClick={handleSubmitSelect}>{item.text}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <DialogCandidateFormCreate />
                        </div>

                    </div>
                    <div>
                        <table className="table responsive-table">
                            <tr className="header-tr grey-text">
                                <th style={{ width: 48 }}>STT</th>
                                <th style={{ width: 144 }}>Tên ứng viên</th>
                                <th style={{ width: 130 }} className=" text-center">
                                    Email
                                </th>
                                <th className="w-130 text-center ws-nowrap">Số điện thoại</th>
                                <th className="w-130 text-center ws-nowrap">Điểm Test(%)</th>
                                <th className="w-130 text-center">Điểm PV</th>
                                <th className="w-130 text-center">Trạng thái</th>
                                <th className="w-130 text-right">Hành động</th>
                            </tr>
                            {recuitments.map((item) => (
                                <tr className="grey-text count-tr" key={item.id}>
                                    <td className="count-td pl-20"></td>

                                    <td className='ws-nowrap'>{item.name}</td>
                                    <td className="text-center">{item.email}</td>
                                    <td className="text-center">{item.number}</td>
                                    <td className="text-center">{item.scoreTest}</td>
                                    <td className="text-center">{item.scorePV}</td>
                                    <td className="text-center">{item.status}</td>
                                    <td className="text-right p-tricklord">
                                        <DialogPersonalFormWatch id={item.id} />
                                        {item.status === "Bị từ chối bởi DET" || item.status.toLowerCase() === "đã xác nhận" ? (
                                            <DialogPersonalFormUpdate id={item.id} check={true} />
                                        ) : (
                                            <DialogPersonalFormUpdate id={item.id} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </table>
                        {showError && <p>No Content</p>}
                    </div>
                </div>
            </Box>
            <Footer />
        </>
    )
}



