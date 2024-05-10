import { Dialog, DialogTitle, Grid, IconButton, TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export default function DialogPersonalFormReason({id, open, onClose }) {

    const navigate = useNavigate();

    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {

        try {
            const response = await axios.post(
                'http://localhost:8080/api/recruitmentRequests/' + id + '/users/2',
                { reason }
            );
            console.log('Response:', response.data);
            navigate("/recruitment");
        } catch (error) {
            console.error('Error:', error);
        }
    }

        return (
            <>
                <Dialog
                    open={open}
                    onClose={onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >
                        <form className=" row g-3" 
                        onSubmit={handleSubmit}
                        >
                            <div className=" col-md-12">
                                <h2 className="grey-text text-center">Lý do</h2>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0
                                    }}
                                    onClick={onClose}
                                >
                                    <ClearIcon className="fs-1_5em" />
                                </IconButton>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control resize pt-2"
                                        placeholder="Leave a comment here"
                                        id="floatingTextarea2"  
                                        style={{ height: 200 }}
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    >

                                    </textarea>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2 d-flex">
                                <div className="col-md-6 mt-2">
                                    <button type="button" onClick={onClose} className="btn btn-danger w-100 bg-clr-danger btn-edit">Hủy</button>
                                </div>
                                <div className="col-md-6 mt-2 ms-2">
                                    <button className=" btn-edit btn btn-success w-98 bg-clr-success" type="submit">Gửi</button>
                                </div>
                            </div>
                        </form>
                    </DialogTitle>
                </Dialog >
            </>
        )
    }