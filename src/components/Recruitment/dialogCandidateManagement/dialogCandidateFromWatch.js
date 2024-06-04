import { Dialog, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import dayjs from 'dayjs';
import axios from "axios";
import { useFormik } from "formik";
import { TimeField } from "@mui/x-date-pickers";

export default function DialogCandidateFormWatch({ id }) {
  const formData = useFormik ({
    initialValues:{
      id : "",
      recruitmentPlan:{
        id : "",
        name :""
      },
      name :"",
      email :"",
      phone : "",
      linkCv :"",
      interviewTime :"",
      checkInterview:"",
      comment:"",
      note:"",
      finalResult:"",
      status:"",
      scoreTest:"",
      scoreInterview:"",
    },
 })
  // Call api
 
  useEffect(() => {
      axios.get("http://localhost:8080/api/plansIntern/" + id).then((res) => {
        formData.setValues(res.data);
        const formatT= res.data.interviewTime;
        const dateNow = dayjs(formatT);
        setDate(dateNow)
        setSelectedValuePassFaild(res.data.finalResult)
      });
  }, []);





  // Xử lý mở form
  
  const [openForm, setOpenForm] = useState(false);
  const handleClickFormOpen = () => {
    setOpenForm(true);
  }
  const handleClickFormClose = () => {
    setOpenForm(false);
  }
  const [date, setDate] = useState('');
  


  // const 
  function TestMarks() {
    return (
      <div className="d-flex justify-content-center align-items-center">
       
        <input
          value={formData.values.scoreTest}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          disabled
        />
      </div>
    );
  }

  function Interview() {
    return (
      <div className="d-flex justify-content-center align-items-center">
       
        <input
          value={formData.values.scoreInterview}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          disabled
        />
      </div>
    );
  }


  const [selectedValuePassFaild, setSelectedValuePassFaild] = useState();
  const handleChangePassFaild = (e) => {
    setSelectedValuePassFaild(e.target.value);
  };


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
        id="formCandidateCreate"
        open={openForm}
        onClose={handleClickFormClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>

          <form className="row g-3" onSubmit={formData.handleSubmit}>
            {/* Form 1 */}
            <div className="col-md-12">
              <h2 className="grey-text mb-0" style={{ paddingBottom: 3 }}>
                Thông tin ứng viên
              </h2>
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onClick={handleClickFormClose}
              >
                <ClearIcon className="cursor-pointer" />
              </IconButton>
            </div>
            <div className="col-md-12">
              <h4 className="grey-text mb-1">Thông tin</h4>
              <hr className="hr-infor" />
            </div>
            <div className="col-md-6 mt-1 ">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Họ và tên ứng viên <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                value={formData.values.name}
                className='form-control grey-text'
                disabled
              />
            </div>
            <div className="col-md-6 mt-1">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Email <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                value={formData.values.email}
                className='form-control grey-text'
                disabled
              />
            </div>
            <div className="col-md-6 mt-1">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Số điện thoại <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                value={formData.values.phone}
                placeholder="Nhập số điện thoại..."
                className='form-control grey-text'
                disabled
              />
            </div>
            <div className="col-md-6 mt-1 ">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Link CV
              </label>
              <input
                maxLength={60}
                type="text"
                value={formData.values.linkCv}
                className='form-control grey-text'
                disabled
              />
            </div>
            <div className="col-md-6 mt-1">
              <label htmlFor="time" className="form-label text-center grey-text mb-0 mt-2">
                Thời gian hẹn phỏng vấn <span className="color-red">*</span>
              </label>
              <div
                id="time"
                className=" d-flex justify-content-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField className="time-set form-control"
                    value={date}
                    format="HH:mm"
                    disabled
                  />
                  <DemoContainer components={['DateTimePicker']}>
                    <DemoItem >
                      <DateTimePicker className="date-set form-control"
                        views={['day', 'month', 'year', 'hours', 'minutes']}
                        value={date}
                        format="YYYY/MM/DD"
                        disabled
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="col-md-6 mt-1 ">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Kế hoạch tuyển dụng
              </label>
              <input
                className="form-select grey-text"
                aria-label="Default select example"
                value={formData.values.recruitmentPlan.name}
                disabled
               
              />
            </div>
            <div className="col-md-12">
              <div className="col-md-12">
                <h4 className="grey-text mb-1">Kết quả phỏng vấn</h4>
                <hr className="hr-infor" />
              </div>
              <div className="col-md-12 d-flex mt-3">
                <div className="col-md-4 ">
                  <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                    Có đến phỏng vấn?
                  </label>
                  <select
                    className="form-select grey-text"
                    style={{ width: '170px' }}
                    aria-label="Default select example"
                    value={formData.values.checkInterview ? "true" : "false"}
                    disabled
                  >
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </select>
                </div>
                {/*  */}
                <div className="col-md-4 text-center mt-0 mb-2">
                  <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                    Điểm kiểm tra (%)
                  </label>
                  <TestMarks />
                </div>
                <div className="col-md-4 text-center mt-0 mb-2">
                  <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                    Điểm phỏng vấn trực tiếp
                  </label>
                  <Interview />
                </div>
              </div>
              {/*  */}
              <div className="col-md-12 mt-2">
                <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                  Nhận xét (nếu có)
                </label>
                <div className="col-md-12 text-area-field">
                  <TextField
                    value={formData.values.comment}
                    id="outlined-multiline-flexible form-control"
                    multiline
                    maxRows={4}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12 mt-2 d-flex align-item-center justify-content-center">
                <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                  Kết quả cuối cùng:
                </label>
                <select
  className={`form-select ms-2 ${selectedValuePassFaild === "true" || selectedValuePassFaild === true ? 'text-success' : selectedValuePassFaild === "false" || selectedValuePassFaild === false ? 'text-danger' : 'grey-text'}`}
  style={{ width: "170px" }}
  aria-label="Default select example"
  value={selectedValuePassFaild}
  disabled
  onChange={handleChangePassFaild}
>
  <option className={`grey-text ${selectedValuePassFaild === "true" || selectedValuePassFaild === true || selectedValuePassFaild === "false" || selectedValuePassFaild === false|| selectedValuePassFaild === "" ? 'd-none' : ''}`} disabled value="">
    N/A
  </option>
  <option className="text-success" value="true">
    Passed
  </option>
  <option className="text-danger" value="false">
    Failed
  </option>
  </select>
              </div>
            </div>

            <div className="col-md-12">
              <h4 className="grey-text mb-1">Trạng thái</h4>
              <hr className="hr-infor" />
            </div>
            <div className="col-md-12 mb-2 mt-1 d-flex justify-content-between">
              <div className="col-md-10 d-flex">
                <div className="col-md-5">
                  <label htmlFor="name" className="form-label grey-text mb-0 mt-2 ws-nowrap">
                    Cập nhật trạng thái
                  </label>
                  <input
                    className="form-select grey-text"
                    aria-label="Default select example"
                    value={formData.values.status}
                    disabled
                  />
                </div>
                <div className="col-md-7 ms-4">
                  <label htmlFor="name" className="form-label grey-text mb-0 mt-2 ws-nowrap">
                    Lưu ý
                  </label>
                  <input
                type="text"
                value={formData.values.note}
                className='form-control grey-text'
                disabled
              />
                </div>
              </div>
              <div className=" text-right mt-0 d-flex align-item-flex-end">
                
              </div>
            </div>
          </form>
        </DialogTitle >
      </Dialog >
    </>
  )
}