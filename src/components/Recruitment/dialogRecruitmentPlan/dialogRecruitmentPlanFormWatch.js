import { Dialog, DialogTitle, Grid, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DialogRecruitmentPlanFormReason from "./dialogRecruitmentPlanFormReason";
import axios from "axios";
import { useFormik } from "formik";



export default function DialogRecruitmentPlanFormWatch({ id }) {
    const [tenhnology, setTenhnology] = useState([]);
    // Dữ liệu fake
    const formData = useFormik({
        initialValues: {
            idUser: null,
            recruitmentPlan: {
                recruitmentRequest: {
                    dateStart: "",
                    dateEnd: "",
                    name: "",
                    reason: "",
                    division: null,
                    status: ""
                },
                name: "",
                handoverDeadline: "",
                dateRecruitmentEnd: "",
                status : ""
            },
            planDetails: [
                {
                    recruitmentPlan: null,
                    type: "",
                    numberOfPersonnelNeeded: "",
                    numberOfOutputPersonnel: ""
                },
               
            ],
        },
    });
    useEffect(() => {
        axios.get("http://localhost:8080/api/plan/" + id).then((res) => {
            formData.setValues(res.data);
            const detail = res.data.planDetails;
            setTenhnology(detail);
            console.log(tenhnology)
        });
    }, []);
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
    const handleCloseWatchOpenReason = () => {
        setOpenForm(false);
        setOpenFormReason(true);
    }
    return (
        <>
            <Tooltip title='Xem chi tiết'>
                <RemoveRedEyeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" className="color-blue white-div fs-edit hover-primary" onClick={handleClickFormOpen} />
            </Tooltip>
            <Dialog
                id="formWatchRecruitmentPlan"
                open={openForm}
                onClose={handleClickFormClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    <form className=" row g-3">
                        <div className=" col-md-12">
                            <h2 className="grey-text">Kế hoạch tuyển dụng</h2>
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
                                <tbody>
                                    <tr>
                                        <th className="w-1">
                                            <label htmlFor="name" style={{ color: '#6F6F6F', whiteSpace: 'nowrap' }} className="fw-500 mr-15 fs-20">Từ nhu cầu nhân sự: </label>
                                        </th>
                                        <th>
                                            <p className="namePersonal" style={{ color: '#838383' }}>{formData.values.recruitmentPlan.recruitmentRequest.name}</p>
                                        </th>

                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="name" style={{ color: '#6F6F6F', whiteSpace: 'nowrap' }} className="fw-500 mr-15 fs-20">Tên kế hoạch tuyển dụng: </label>
                                        </th>
                                        <th>
                                            <p className="namePersonal" style={{ color: '#838383' }}>{formData.values.recruitmentPlan.name}</p>
                                        </th>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-12 d-flex justify-content-center">
                            <table className="table-edit">
                                <thead className="grey-text">
                                    <th style={{ color: '#6F6F6F' }} className="text-center p-2 w-250 fw-500">Công nghệ</th>
                                    <th style={{ color: '#6F6F6F' }} className="text-center p-2 w-250 fw-500">Số lượng nhân sự cần tuyển</th>
                                    <th style={{ color: '#6F6F6F' }} className="text-center p-2 w-250 fw-500">Số lượng nhân sự đầu ra</th>
                                </thead>
                                <tbody>
                                    {tenhnology.map(item => (
                                        <tr key={item.type}>
                                            <td style={{ color: '#838383' }} className="text-center p-2 w-250 fs-15 grey-text">{item.type}</td>
                                            <td style={{ color: '#838383' }} className="text-center p-2 w-250 fs-15 grey-text">{item.numberOfPersonnelNeeded}</td>
                                            <td style={{ color: '#838383' }} className="text-center p-2 w-250 fs-15 grey-text">{item.numberOfOutputPersonnel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-12 mt-2 d-flex height-35">
                            <label htmlFor="time" style={{ color: '#6F6F6F' }} className="form-label fs-20 mb-0">Thời hạn tuyển dụng: </label>
                            <p className="time-edit mb-0" style={{ color: '#838383', marginLeft: '70px' }}>{formData.values.recruitmentPlan.dateRecruitmentEnd}</p>
                        </div>
                        <div className="col-md-12 mt-0 mb-2 d-flex height-35">
                            <label htmlFor="time" style={{ color: '#6F6F6F' }} className="form-label fs-20 ">Thời hạn bàn giao: </label>
                            <p className="time-edit " style={{ color: '#838383', marginLeft: '70px' }}>{formData.values.recruitmentPlan.handoverDeadline}</p>
                        </div>
                        {formData.values.recruitmentPlan.status === "Bị từ chối bởi DET" ? (
                            <div className="col-md-12  d-flex ">
                                <label htmlFor="time" style={{ color: '#6F6F6F', whiteSpace: 'nowrap' }} className="form-label fs-20 me-2">Lý do:</label>
                                <textarea
                                    readOnly

                                    className="form-control resize pt-2 "
                                    style={{ color: '#838383' }}
                                    value={formData.values.recruitmentPlan.reason}
                                >

                                </textarea>
                            </div>
                        ) : (
                            <div className="col-md-12 mt-0 d-flex">
                                <div className="col-md-6 mt-2">
                                    <button type="button" className="btn btn-danger w-100 bg-clr-danger btn-edit stop" onClick={handleCloseWatchOpenReason}>Từ chối</button>
                                </div>
                                <div className="col-md-6 mt-2 ms-2">
                                    <button className=" btn-edit btn btn-success w-98    bg-clr-success">Phê duyệt</button>
                                </div>
                            </div>)}
                    </form>
                </DialogTitle>
            </Dialog>
            <DialogRecruitmentPlanFormReason idUser={id} open={openFormReason} onClose={() => setOpenFormReason(false)} />
        </>
    )
}