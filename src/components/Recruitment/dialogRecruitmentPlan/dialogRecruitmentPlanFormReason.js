import {Dialog, DialogTitle, IconButton} from "@mui/material";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import swal from "sweetalert";
import {sendNotifications} from "../../Notification/notification";


export default function DialogRecruitmentPlanFormReason({
                                                            requestPlanName,
                                                            data,
                                                            recruitmentRequestName,
                                                            idPlan,
                                                            open,
                                                            onClose
                                                        }) {
    const [reason, setReason] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/api/plans/' + idPlan + '/users/1',
                {reason}
            ).then(() => {
                swal("Cập nhật lý do thành công", {
                    icon: "success",
                    buttons: false,
                    timer: 2000
                }).then(() => {
                    sendNotifications(null,
                        `Nhu cầu nhân sự ${recruitmentRequestName} vừa cập nhật trạng thái: Bị từ chối bởi DCAN`,
                        ['ROLE_DM'],
                        null,
                        `/recruitment/personalNeeds?idRequest=${data.values.recruitmentPlan.recruitmentRequest.id}`)
                        .then(sendNotifications(
                            null,
                            `Kế hoạch tuyển dụng <b>${requestPlanName}</b> vừa cập nhật trạng thái: <b>Bị từ chối</b> `,
                            ['ROLE_TM'],
                            null,
                            `/recruitment/recruitmentPlan?idPlan=${data.values.recruitmentPlan.id}`))

                    window.location.href = "/recruitment/personalNeeds";
                });
            });
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
                <DialogTitle>
                    <form className=" row g-3" onSubmit={handleSubmit}>
                        <div className=" col-md-12">
                            <h2 className="grey-text text-center">Lý do từ chối</h2>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}
                                onClick={onClose}
                            >
                                <ClearIcon className="fs-1_5em"/>
                            </IconButton>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <textarea
                                    className="form-control resize pt-2 text-area"
                                    placeholder="Describe yourself here..."
                                    id="floatingTextarea2"
                                    style={{height: 200}}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                </textarea>
                                <label className=" grey-text" htmlFor="floatingTextarea2">Nhập lý do từ chối...</label>
                            </div>
                        </div>
                        <div className="col-md-12 mt-2 d-flex">
                            <div className="col-md-6 mt-2">
                                <button type="button" onClick={onClose}
                                        className="btn btn-danger w-100 bg-clr-danger btn-edit">Hủy
                                </button>
                            </div>
                            <div className="col-md-6 mt-2 ms-2">
                                <button className=" btn-edit btn btn-success w-98 bg-clr-success" type="submit">Gửi
                                </button>
                            </div>
                        </div>
                    </form>
                </DialogTitle>
            </Dialog>
        </>
    )
}