import { Accordion, AccordionDetails, Dialog, DialogTitle, Grid, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DialogPersonalFormReason from "./dialogPersonalFormReason";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios";
import { useFormik } from "formik";
import DialogRecruitmentPlanFormCreateSuccess from "./dialogRecruitmentPlanFormCreateSuccess";
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import AccordionSummary from '@mui/material/AccordionSummary';

export default function DialogPersonalFormWatch({ id, userRoles, checkId }) {
    const [tenhnology, setTenhnology] = useState([]);
    const hasRoleAdmin = () => {
        return userRoles.some((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_TM");
    };
    const hasRoleKSCL = () => {
        return userRoles.some((role) => role.authority === "ROLE_QC");
    };
    const [dropProgress, setDropProgress] = useState(true);
    const clickProgress = () => {
        setDropProgress(!dropProgress);
    }
    // Dữ liệu fake
    const formData = useFormik({
        initialValues: {
            idUser: null,
            recruitmentRequest: {
                id: null,
                dateStart: "",
                dateEnd: "",
                name: "",
                status: "",
                reason: "",
                details: [
                    {
                        type: "",
                        quantity: "",
                    },
                ],
            },
        },
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        console.log(user);
        if (user != null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
            axios
                .get("http://localhost:8080/api/recruitmentRequests/" + id)
                .then((res) => {
                    formData.setValues(res.data);
                    const detail = res.data.details;
                    setTenhnology(
                        detail.map((item) => ({ type: item.type, quantity: item.quantity }))
                    );
                });
        }
    }, []);
    // const testId = [useState()]

    // Xử lý mở form
    const [openForm, setOpenForm] = useState(checkId);
    const handleClickFormOpen = () => {
        setOpenForm(true);
    };
    const handleClickFormClose = () => {
        setDropProgress(true);
        setOpenForm(false);
    };

    // Xử lý dialog
    const [openFormCreateSuccess, setOpenFormCreateSuccess] = useState(false);
    const handleCloseWatchOpenCreate = () => {
        setOpenForm(false);
        setOpenFormCreateSuccess(true);
    }
    const [openFormReason, setOpenFormReason] = useState(false);
    const handleCloseWatchOpenReason = () => {
        setOpenForm(false);
        setOpenFormReason(true);
    };
    const [steps, setSteps] = useState({
        resquestId: 0,
        planId: 0,
        requestName: "",
        requestCreator: "",
        reason: "",
        decanAccept: "",
        detAccept: "",
        planName: "",
        applicants: 0,
        training: 0,
        intern: 0,
        totalIntern: 0,
        step: 0,
    });
    const activeStep = steps.step;
    const deleteIcon = () => {
        return (
            <Icon icon="typcn:delete" width="24" height="24" />
        )
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/process/request/${id}`);
                console.log(response.data);
                setSteps(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const checkDecan = () => {
        if (steps.decanAccept === null || steps.decanAccept === "") {
            return false;
        } else {
            return true;
        }
    }
    const checkDet = () => {
        if (steps.detAccept === null || steps.detAccept === "") {
            return false;
        } else {
            return true;
        }
    }
    return (
        <>

            <Tooltip title="Xem chi tiết">
                <RemoveRedEyeIcon
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Tooltip on top"
                    className="color-blue white-div fs-edit hover-primary cursor-pointer"
                    onClick={handleClickFormOpen}
                />
            </Tooltip>

            <Dialog
                id="formWatch"
                className={`${hasRoleKSCL ? 'mwQC' : 'mw'}`}
                open={openForm}
                onClose={handleClickFormClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <form className=" row g-3">
                        <div className=" col-md-12">
                            <h2 className="grey-text">Nhu cầu nhân sự</h2>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                }}
                                onClick={handleClickFormClose}
                            >
                                <ClearIcon className="fs-1_5em cursor-pointer" />
                            </IconButton>
                        </div>
                        <div className="col-md-12 ">
                            <table className="w-100">
                                <thead>
                                    <tr>
                                        <th>
                                            <label
                                                htmlFor="name"
                                                style={{ color: "#6F6F6F" }}
                                                className="form-label fw-500 mr-15 fs-20"
                                            >
                                                Tên:{" "}
                                            </label>
                                        </th>
                                        <th>
                                            <p className="namePersonal" style={{ color: "#838383" }}>
                                                {formData.values.recruitmentRequest.name}
                                            </p>
                                        </th>
                                        <th style={{ width: '55.05px' }}>
                                            <label
                                                htmlFor="name"
                                                style={{ color: "#6F6F6F" }}
                                                className="form-label fw-500 mr-15 fs-20"
                                            >
                                            </label>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className="center-tech">
                                            <table className="table-edit">
                                                <thead className="grey-text">
                                                    <th
                                                        style={{ color: "#6F6F6F" }}
                                                        className="text-center p-2 w-250 fw-500"
                                                    >
                                                        Công nghệ
                                                    </th>
                                                    <th
                                                        style={{ color: "#6F6F6F" }}
                                                        className="text-center p-2 w-250 fw-500"
                                                    >
                                                        Số lượng nhân sự
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    {tenhnology.map((item) => (
                                                        <tr key={item.type}>
                                                            <td
                                                                style={{ color: "#838383" }}
                                                                className="text-center p-2 w-250 fs-15 grey-text"
                                                            >
                                                                {item.type}
                                                            </td>
                                                            <td
                                                                style={{ color: "#838383" }}
                                                                className="text-center p-2 w-250 fs-15 grey-text"
                                                            >
                                                                {item.quantity}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 mt-2 d-flex height-35">
                            <label
                                htmlFor="time"
                                style={{ color: "#6F6F6F" }}
                                className="form-label fs-20"
                            >
                                Thời hạn bàn giao:{" "}
                            </label>
                            <p className="time-edit" style={{ color: "#838383" }}>
                                {formData.values.recruitmentRequest.dateEnd}
                            </p>
                        </div>
                        <div className="col-md-12 mt-0 d-flex ">
                            <label
                                htmlFor="time"
                                style={{ color: "#6F6F6F" }}
                                className="form-label fs-20 mb-0"
                            >
                                Trạng thái:{" "}
                            </label>
                            <p
                                className=" namePersonal mb-0 ms-2"
                                style={{ color: "#838383" }}
                            >
                                {formData.values.recruitmentRequest.status}
                            </p>
                        </div>
                        <div className=" mt-0">
                            <div className="col-md-12 mt-2 progressDiv">
                                <Accordion>
                                    <AccordionSummary
                                        htmlFor="time"
                                        style={{ color: "#6F6F6F" }}
                                        className=" form-label fs-20 mb-0 p-0 btn-progress"
                                        onClick={clickProgress}
                                    >
                                        <span className="span-progress position-relative">
                                            Quy trình
                                            <KeyboardArrowUpIcon className={`Icon-Keyboard ${dropProgress ? '' : 'active'} position-absolute`} />
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="col-md-12 d-flex justify-content-center">
                                            <div className="col-md-4 d-flex flex-column mw-300">
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">Khởi tạo nhu cầu nhân sự</span>
                                                <div style={{ height: '24px' }}></div>
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">DET xác nhận</span>
                                                <div style={{ height: '24px' }}></div>
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">DCAN xác nhận</span>
                                                <div style={{ height: '24px' }}></div>
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">Tuyển dụng</span>
                                                <div style={{ height: '24px' }}></div>
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">Đào tạo</span>
                                                <div style={{ height: '24px' }}></div>
                                                <span className="ws-nowrap p-es-8 h-40 text-right me-2 fs-18 lh-24 fw-600 grey-text">Bàn giao nhân sự</span>
                                            </div>
                                            <div className="col-md-6">
                                                <Stepper activeStep={activeStep} orientation="vertical">
                                                    <Step>
                                                        <StepLabel className="ws-nowrap svg-size"><span
                                                            className=" bg-c d-flex flex-column align-items-start mt-12">{steps.requestCreator}
                                                            <span className="fs-16">{steps.requestName}</span></span>
                                                        </StepLabel>
                                                    </Step>
                                                    <Step>
                                                        <StepLabel
                                                            StepIconComponent={steps.detAccept === "false" || steps.detAccept === false ? deleteIcon : ''}
                                                            className={`ws-nowrap svg-size ${steps.detAccept === "false" || steps.detAccept === false ? 'svg-size-err' : ''}`}>
                                                            {checkDet() ?
                                                                steps.detAccept === "true" || steps.detAccept === true ?
                                                                    <span
                                                                        className="d-flex flex-column align-items-start mt-12">DET khởi tạo kế hoạch tuyển dụng <Link
                                                                            to={`/recruitment/recruitmentPlan?idPlan=${steps.planId}`}
                                                                            className="a-progress cursor-pointer">{steps.planName}</Link></span>
                                                                    :
                                                                    steps.decanAccept === "false" || steps.decanAccept === false ?
                                                                        <span
                                                                            className="d-flex flex-column align-items-start mt-10">DECAN từ chối kế hoạch tuyển dụng <span>Lý do: {steps.reason}</span></span>
                                                                        :
                                                                        <span
                                                                            className="d-flex flex-column align-items-start mt-10">DET từ chối kế hoạch tuyển dụng <span>Lý do: {steps.reason}</span></span>

                                                                :
                                                                <span
                                                                    className="d-flex flex-column align-items-start mt-12"><a
                                                                        className="a-progress"></a></span>
                                                            }
                                                        </StepLabel>

                                                    </Step>
                                                    <Step>
                                                        <StepLabel
                                                            StepIconComponent={steps.decanAccept === "false" || steps.decanAccept === false ? deleteIcon : ''}
                                                            className={`ws-nowrap svg-size ${steps.decanAccept === "false" || steps.decanAccept === false ? 'svg-size-err' : ''}`}>
                                                            {checkDecan() ?
                                                                steps.decanAccept === "true" || steps.decanAccept === true ?
                                                                    <span className="d-flex flex-column align-items-start">DECAN khởi tạo kế hoạch tuyển dụng <a
                                                                        className="a-progress"></a></span>
                                                                    :
                                                                    <span
                                                                        className="d-flex flex-column align-items-start mt-10">DECAN từ chối kế hoạch tuyển dụng <span>Lý do: {steps.reason}</span></span>
                                                                :
                                                                <span
                                                                    className="d-flex flex-column align-items-start mt-12"><a
                                                                        className="a-progress"></a></span>
                                                            }

                                                        </StepLabel>
                                                    </Step>
                                                    <Step>
                                                        {steps.step >= 3 ?
                                                            steps.applicants === 0 ?
                                                                <StepLabel
                                                                    className="ws-nowrap svg-size svg-size-none"><span
                                                                        className="d-flex flex-column align-items-start ">Số lượng ứng viên ứng tuyển: {steps.applicants}
                                                                        <a className="a-progress"></a></span> </StepLabel>

                                                                :
                                                                <StepLabel className="ws-nowrap svg-size"><span
                                                                    className="d-flex flex-column align-items-start mt-12">Số lượng ứng viên ứng tuyển: {steps.applicants}
                                                                    <Link
                                                                        to={`/recruitment/candidateManagement?planName=${steps.planName}`}
                                                                        className="a-progress cursor-pointer">Xem kết quả tuyển dụng</Link></span>
                                                                </StepLabel>
                                                            :
                                                            <StepLabel className="ws-nowrap svg-size"><span
                                                                className="d-flex flex-column align-items-start"> <a></a></span>
                                                            </StepLabel>
                                                        }
                                                    </Step>
                                                    <Step>
                                                        {steps.step >= 4 ?
                                                            steps.training === 0 ?
                                                                <StepLabel className={`ws-nowrap svg-size svg-size-none `}>
                                                                    <span
                                                                        className={`d-flex flex-column align-items-start`}>Số lượng TTS tham gia đào tạo: {steps.training}
                                                                        <a className="a-progress"></a></span>
                                                                </StepLabel>
                                                                :
                                                                <StepLabel className="ws-nowrap svg-size"><span
                                                                    className="d-flex flex-column align-items-start mt-12">Số lượng TTS tham gia đào tạo: {steps.training}
                                                                    <Link
                                                                        to={`/training?&planName=${steps.planName}`}
                                                                        className="a-progress cursor-pointer">Xem kết quả đào tạo</Link></span>
                                                                </StepLabel>
                                                            :
                                                            <StepLabel className="ws-nowrap svg-size"><span
                                                                className="d-flex flex-column align-items-start"> <a></a></span>
                                                            </StepLabel>
                                                        }
                                                    </Step>
                                                    <Step>
                                                        {steps.step >= 5 ?
                                                            <StepLabel className={`ws-nowrap svg-size  ${steps.intern !== steps.totalIntern ? 'svg-size-none' : ''}`}>
                                                                <span className="d-flex flex-column align-items-start mt-12">Đã bàn giao {steps.intern}/{steps.totalIntern} nhân sự
                                                                    {steps.intern !== 0 ?
                                                                        <Link to={``} className="a-progress cursor-pointer">Xem nhân sự</Link>
                                                                        :
                                                                        <Link className="a-progress"></Link>
                                                                    }
                                                                </span>
                                                            </StepLabel>
                                                            :
                                                            <StepLabel className="ws-nowrap svg-size"><span
                                                                className="d-flex flex-column align-items-start"> <a></a></span>
                                                            </StepLabel>
                                                        }
                                                    </Step>
                                                </Stepper>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                        {/* {!hasRoleKSCL() ? */}
                        {formData.values.recruitmentRequest.status ===
                            "Bị từ chối bởi DET" ? (
                            <div className="col-md-12 mt-2 d-flex ">
                                <label
                                    htmlFor="time"
                                    style={{ color: "#6F6F6F", whiteSpace: "nowrap" }}
                                    className="form-label fs-20 me-2"
                                >
                                    Lý do:
                                </label>
                                <textarea
                                    readOnly
                                    className="form-control resize pt-2 "
                                    style={{ color: "#838383" }}
                                    value={formData.values.recruitmentRequest.reason}>
                                </textarea>
                            </div>
                        ) : (formData.values.recruitmentRequest.status === "Đã xác nhận" || formData.values.recruitmentRequest.status === "Đang tuyển dụng" ? ("") :
                            (formData.values.recruitmentRequest.status === "Bị từ chối bởi DECAN" ? (
                                <div className="col-md-12 mt-2 d-flex ">
                                    <label
                                        htmlFor="time"
                                        style={{ color: "#6F6F6F", whiteSpace: "nowrap" }}
                                        className="form-label fs-20 me-2">

                                        Lý do:
                                    </label>
                                    <textarea
                                        readOnly
                                        className="form-control resize pt-2 "
                                        style={{ color: "#838383" }}
                                        value={formData.values.recruitmentRequest.reason}
                                    ></textarea>
                                </div>
                            ) : (
                                hasRoleAdmin() && (
                                    <div className="col-md-12 mt-0 d-flex">
                                        <div className="col-md-3 mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-danger w-100 bg-clr-danger btn-edit stop"
                                                onClick={handleCloseWatchOpenReason}
                                            >
                                                Từ chối
                                            </button>
                                        </div>
                                        <div className="col-md-9 mt-2 ms-2">
                                            <button
                                                type="button"
                                                className=" btn-edit btn btn-success w-98   bg-clr-success"
                                                onClick={handleCloseWatchOpenCreate}>
                                                Khởi tạo kế hoạch tuyển dụng
                                            </button>
                                        </div>
                                    </div>
                                )

                            ))
                        )}


                    </form>
                </DialogTitle>
            </Dialog>
            <DialogPersonalFormReason
                data={formData}
                nameNeedPlan={formData.values.recruitmentRequest.name}
                idUser={id}
                open={openFormReason}
                onClose={() => setOpenFormReason(false)}
            />
            <DialogRecruitmentPlanFormCreateSuccess userRoles={userRoles} id={formData.values.recruitmentRequest.id}
                open={openFormCreateSuccess}
                onClose={() => setOpenFormCreateSuccess(false)} />

        </>
    );
}