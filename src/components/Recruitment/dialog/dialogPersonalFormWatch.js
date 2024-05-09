import { Dialog, DialogTitle, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DialogPersonalFormReason from "./dialogPersonalFormReason";



export default function DialogPersonalFormWatch() {
    // Dữ liệu fake
    const personalDetail = [{ id: 1, name: 'DECEN- Nhu cầu nhân sự quý 3', time: '11/11/2019', personal: '123', tech: 'PHP' }]
    // const testId = [useState()]

    // Xử lý mở form
    const [openForm, setOpenForm] = useState(false);
    const handleClickFormOpen = () => {

        setOpenForm(true);
    }
    const handleClickFormClose = () => {
        setOpenForm(false);
    }

    // Xử lý dialog 
    const [openFormReason, setOpenFormReason] = useState(false);
    const handleCloseWatchOpenReason = () =>{
        setOpenForm(false);
        setOpenFormReason(true);
    }
    return (
        <>
            <RemoveRedEyeIcon className="color-blue white-div fs-edit" onClick={handleClickFormOpen} />
            <Dialog
                id="formWatch"
                open={openForm}
                onClose={handleClickFormClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    <form className=" row g-3">
                        <div className=" col-md-12">
                            <h2 className="grey-text">Nhu cầu nhân sự</h2>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}
                                onClick={handleClickFormClose}
                            >
                                <ClearIcon className="fs-1_5em" />
                            </IconButton>
                        </div>
                        <div className="col-md-12 ">
                            <table className="w-100">
                                <thead>
                                    <tr>
                                        <th>
                                            <label htmlFor="name" style={{ color: '#6F6F6F' }} className="form-label fw-500 mr-15 fs-20">Tên </label>
                                        </th>
                                        <th>
                                            <p className="namePersonal" style={{ color: '#838383' }}>{personalDetail[0].name}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <table className="table-edit">
                                                <thead className="grey-text">
                                                    <th style={{ color: '#6F6F6F' }} className="text-center p-2 w-250 fw-500">Công nghệ</th>
                                                    <th style={{ color: '#6F6F6F' }} className="text-center p-2 w-250 fw-500">Số lượng nhân sự</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ color: '#838383' }} className="text-center p-2 w-250 fs-15 grey-text">{personalDetail[0].tech}</td>
                                                        <td style={{ color: '#838383' }} className="text-center p-2 w-250 fs-15 grey-text">{personalDetail[0].personal}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 mt-2 d-flex height-35">
                            <label htmlFor="time" style={{ color: '#6F6F6F' }} className="form-label fs-20">Thời hạn bàn giao: </label>
                            <p className="time-edit" style={{ color: '#838383' }}>{personalDetail[0].time}</p>
                        </div>
                        <div className="col-md-12 mt-0 d-flex">
                            <div className="col-md-3 mt-2">
                                <button type="button" className="btn btn-danger w-100 bg-clr-danger btn-edit stop" onClick={handleCloseWatchOpenReason}>Từ chối</button>
                            </div>
                            <div className="col-md-9 mt-2 ms-2">
                                <button className=" btn-edit btn btn-success w-98    bg-clr-success">Khởi tạo kế hoạch tuyển dụng</button>
                            </div>
                        </div>
                    </form>
                </DialogTitle>
            </Dialog>
            <DialogPersonalFormReason open={openFormReason} onClose={() => setOpenFormReason(false)}/>
        </>
    )
}