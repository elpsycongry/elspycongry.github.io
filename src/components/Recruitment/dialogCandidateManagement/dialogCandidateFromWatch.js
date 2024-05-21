import { Dialog, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TimeField } from "@mui/x-date-pickers";

export default function DialogCandidateFormWatch({ id }) {
  const [dateErr, setDateErr] = useState(false);
  const [techErr, setTechErr] = useState(false);
  const [errNumberOfPersonal, setErrNumberOfPersonal] = useState(false);
  const [errNumberofOutput, setErrNumberOfOutput] = useState(false);
  const [errNameRecruitmentPlan, setErrNameRecruitmentPlan] = useState(false);
  const [errIdPersonalNeed, setErrIdPersonalNeed] = useState(false);
  const [errNumber, setErrNumber] = useState(false);


  // Xử lý số lượng nhân sự
  const checkValid = (dateSet, techArr, dateCreate, nameRecruitmentPlan, personalneed) => {
    const futureDate = new Date(dateCreate);
    futureDate.setDate(dateCreate.getDate() + 75);
    // 
    var hasErrPersonalNeeds;
    if (personalneed === "" || personalneed === null || personalneed === "default") {
      hasErrPersonalNeeds = true;
      setErrIdPersonalNeed(true);
    } else {
      hasErrPersonalNeeds = false;
      setErrIdPersonalNeed(false);
    }

    const errTech = techArr.map(item => {
      if (item.type === "" || item.type === "default") {
        return true;
      } else {
        return false;
      }
    })
    const hasErrTech = errTech.some(item => item === true);
    setTechErr(hasErrTech);


    // 
    const errNumberR = techArr.map(item => {
      if (item.numberOfPersonnelNeeded != "" && item.NumberOfOutputPersonnel != "" && item.numberOfPersonnelNeeded != 0 && item.NumberOfOutputPersonnel != 0) {
        return item.numberOfPersonnelNeeded < item.numberOfOutputPersonnel;
      } else {
        return false;
      }
    })
    const hasErrNumber = errNumberR.some(item => item === true);
    setErrNumber(hasErrNumber)
    //
    var hasErrOfPersonal;
    if (!hasErrNumber) {
      const errNumberPersonal = techArr.map(item => {
        if (item.numberOfPersonnelNeeded == 0 || item.numberOfPersonnelNeeded === "" || item.numberOfPersonnelNeeded < 0) {
          return true;
        } else {
          return false;
        }
      })
      hasErrOfPersonal = errNumberPersonal.some(item => item === true);
      setErrNumberOfPersonal(hasErrOfPersonal);
    } else {
      hasErrOfPersonal = false;
      setErrNumberOfPersonal(false);
    }
    // 
    var hasErrNumberOutput;
    if (!hasErrNumber) {
      const errNumberOutput = techArr.map(item => {
        if (item.numberOfOutputPersonnel == 0 || item.numberOfOutputPersonnel === "" || item.numberOfOutputPersonnel < 0) {
          return true;
        } else {
          return false;
        }
      })
      hasErrNumberOutput = errNumberOutput.some(item => item === true)
      setErrNumberOfOutput(hasErrNumberOutput);
    } else {
      hasErrNumberOutput = false;
      setErrNumberOfOutput(false);
    }
    //  
    var hasErrRecruitmentPlan;
    if (nameRecruitmentPlan == "") {
      hasErrRecruitmentPlan = true;
      setErrNameRecruitmentPlan(true);
    } else {
      hasErrRecruitmentPlan = false;
      setErrNameRecruitmentPlan(false);
    }


    if (dateSet < futureDate || dateSet == "Invalid Date") {
      setDateErr(true);
    } else {
      setDateErr(false);
    }


    if (dateSet < futureDate || dateSet == "Invalid Date" || hasErrTech || hasErrNumberOutput || hasErrOfPersonal || hasErrRecruitmentPlan || hasErrPersonalNeeds || hasErrNumber) {
      return false;
    } else {
      return true;
    }
  }

  const formData = useFormik({
    initialValues: {
      idUser: null,
      recruitmentPlan: {
        recruitmentRequest: {
          id: null,
          dateStart: "",
          dateEnd: "",
          name: "",
          reason: "",
          division: null,
          status: "",
        },
        name: "",
        handoverDeadline: "",
        dateRecruitmentEnd: "",
        status: "",
      },
      planDetails: [
        {
          recruitmentPlan: null,
          type: "",
          numberOfPersonnelNeeded: "",
          numberOfOutputPersonnel: "",
        },
      ],
    },
    onSubmit: async (values, { setSubmitting }) => {
      // console.log(values); 
      const personalneed = values.recruitmentPlan.recruitmentRequest.id;
      const nameRecruitmentPlan = values.recruitmentPlan.name;
      values.planDetails = [...tech];
      values.idUser = 1;
      if (values.recruitmentPlan.dateRecruitmentEnd == '') {
        values.recruitmentPlan.dateRecruitmentEnd = dateRecruitmentEnd;
      }
      if (values.recruitmentPlan.handoverDeadline == '') {
        values.recruitmentPlan.handoverDeadline = handoverDeadline;
      }
      const date = new Date(values.recruitmentPlan.handoverDeadline);
      const dateCreate = new Date(values.recruitmentPlan.dateRecruitmentEnd);
      // checkValid(date, tech, dateCreate, nameRecruitmentPlan, personalneed);
      // setSubmitting(false);
      // return;
      if (!checkValid(date, tech, dateCreate, nameRecruitmentPlan, personalneed)) {
        setSubmitting(false);
        return;
      } else {
        setSubmitting(true);
        try {
          await axios
            .post("http://localhost:8080/api/plans", values)
            .then((res) => {
              swal("Thêm kế hoạch tuyển dụng thành công", {
                icon: "success",
                buttons: false,
                timer: 2000,
              }).then(() => {
                window.location.href = "/recruitment/recruitmentPlan";

              });
            });
        } catch (error) {
          swal("Thêm kế hoạch tuyển dụng thất bại", {
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        }
      }
    }
  });
  // Call api
  const [recuitments, setRecuitment] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/recruitmentRequests").then((res) => {
      setRecuitment(res.data);
    });

  }, []);





  // Xử lý mở form
  const listTechnology = [
    { id: 1, text: "PHP" },
    { id: 2, text: "Laravel" },
    { id: 3, text: "React" },
    { id: 4, text: "React Native" },
    { id: 5, text: "Agular" },
    { id: 6, text: "Python - Django" },
    { id: 7, text: "VueJs" },
    { id: 8, text: "Android" },
    { id: 9, text: "IOS" },
    { id: 10, text: "JAVA" },
    { id: 11, text: ".NET" }
  ]
  const [openForm, setOpenForm] = useState(false);
  const handleClickFormOpen = () => {
    setOpenForm(true);
  }
  const handleClickFormClose = () => {
    setOpenForm(false);
  }
  // Xử lý thêm công nghệ
  const [tech, setTech] = useState([{ type: "", numberOfPersonnelNeeded: "", numberOfOutputPersonnel: "" }]);
  const addTech = () => {
    setTech((prevTech) => [...prevTech, { type: "", numberOfPersonnelNeeded: "", numberOfOutputPersonnel: "" }]);
  };

  const removeTech = (index) => {
    const updateTech = tech.filter((_, idx) => idx !== index);
    setTech(updateTech);
  };
  const handleChangeSelect = (e, index) => {
    const updateTech = [...tech];
    updateTech[index] = { ...updateTech[index], type: e.target.value };
    setTech(updateTech);
  }
  // NumberOfOutputPersonnel

  // Hàm dữ liệu đầu ra
  function NumberOfOutputPersonnel({ number, idx }) {

    if (number === "" || number == 0) {
      number = 0;
    }
    const [countOf, setCountOf] = useState(number);

    const handleClickCountPlus = () => {
      if (number < 20 || countOf < 20) {
        setCountOf(parseInt(countOf) + 1);
        numberOfOutputPersonnel((parseInt(number) + 1), idx);
      }
    };
    const handleInputChange = (e) => {
      if (e.target.value <= 20) {
        const newCount = parseInt(e.target.value);
        setCountOf(newCount);
      }
    };
    const handleClickCountMinus = () => {
      if (!countOf <= 0) {
        setCountOf(countOf - 1);
        numberOfOutputPersonnel((parseInt(number) - 1), idx);

      }
    };
    const handleBlur = () => {
      numberOfOutputPersonnel(countOf, idx);
    };
    return (
      <div className="d-flex justify-content-center align-items-center">
        <RemoveIcon onClick={handleClickCountMinus} className="me-1" />
        <input
          value={countOf}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <AddIcon onClick={handleClickCountPlus} className="ms-1" />
      </div>
    );
  }
  const numberOfOutputPersonnel = (countOf, index) => {
    const updatedTech = [...tech];
    updatedTech[index].numberOfOutputPersonnel = countOf;
    setTech(updatedTech);
    const count = countOf * 3;
    if (count > 60) {
      handleQuantityOffPersonal(60, index);
    } else {
      handleQuantityOffPersonal(count, index, countOf);
    }
  };
  // Hàm dữ liệu cần tuyển
  function NumberOfPersonnelNeeded({ number, idx, numberOutPut }) {
    if (number === "" || number == 0) {
      number = 0;
    }
    const [countOf, setCountOf] = useState(number);
    const handleClickCountPlus = () => {
      if (number < 60 || countOf < 60) {
        setCountOf(countOf + 1);
        handleQuantityOffPersonal(parseInt(number) + 1, idx);
      }
    };
    const handleInputChange = (e) => {
      if (e.target.value <= 60) {
        const newCount = parseInt(e.target.value);
        setCountOf(newCount);
      }
    };
    const handleClickCountMinus = () => {
      if (!countOf <= 0) {
        setCountOf(countOf - 1);
        handleQuantityOffPersonal(parseInt(number) - 1, idx);
      }
    };
    const handleBlur = () => {
      handleQuantityOffPersonal(countOf, idx);
    };

    return (
      <div className="d-flex justify-content-center align-items-center">
        <RemoveIcon onClick={handleClickCountMinus} className="me-1" />
        <input
          value={countOf}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <AddIcon onClick={handleClickCountPlus} className="ms-1" />
      </div>
    );
  }
  const handleQuantityOffPersonal = (countOf, index) => {
    const updatedTech = [...tech];
    updatedTech[index].numberOfPersonnelNeeded = countOf;
    setTech(updatedTech);
  };
  const Dlt = ({ index }) => {
    if (tech.length > 1) {
      return (
        <ClearIcon className="position-absolute oc-08 clr-danger hover-danger" sx={{ right: '55px', top: '6px' }} onClick={() => removeTech(index)} />
      )
    }
  }
  const timeNow = new Date();
  const year = timeNow.getFullYear();
  const month = String(timeNow.getMonth() + 1).padStart(2, '0'); // Tháng phải có 2 chữ số
  const day = String(timeNow.getDate()).padStart(2, '0'); // Ngày phải có 2 chữ số
  const timeNowValue = `${year}-${month}-${day}`;

  const dateDeadline = new Date(timeNow);
  dateDeadline.setDate(timeNow.getDate() + 75);
  const yearDL = dateDeadline.getFullYear();
  const monthDL = String(dateDeadline.getMonth() + 1).padStart(2, '0'); // Tháng phải có 2 chữ số
  const dayDL = String(dateDeadline.getDate()).padStart(2, '0'); // Ngày phải có 2 chữ số
  const dateDeadlineValue = `${yearDL}-${monthDL}-${dayDL}`;
  const [dateRecruitmentEnd, setRecuitmentDateEnd] = useState(timeNowValue);
  const [handoverDeadline, setHandoverDeadline] = useState(dateDeadlineValue);
  const handleDateChange = (event) => {
    if (event.target.name === 'recruitmentPlan.dateRecruitmentEnd') {
      setRecuitmentDateEnd(event.target.value);
    } else if (event.target.name === 'recruitmentPlan.handoverDeadline') {
      setHandoverDeadline(event.target.value);
      // 
      const timeChange = new Date(event.target.value);
      timeChange.setDate(timeChange.getDate() - 75);
      const yearChange = timeChange.getFullYear();
      const monthChange = String(timeChange.getMonth() + 1).padStart(2, '0'); // Tháng phải có 2 chữ số
      const dayChange = String(timeChange.getDate()).padStart(2, '0'); // Ngày phải có 2 chữ số
      const timeChangeValue = `${yearChange}-${monthChange}-${dayChange}`;
      // 
      if (timeChange < timeNow) {
        setRecuitmentDateEnd(timeNowValue);
        formData.handleChange({
          target: {
            name: 'recruitmentPlan.dateRecruitmentEnd',
            value: timeNowValue
          }
        });
      } else {

        setRecuitmentDateEnd(timeChangeValue);
        formData.handleChange({
          target: {
            name: 'recruitmentPlan.dateRecruitmentEnd',
            value: timeChangeValue
          }
        });
      }
    }
    formData.handleChange(event);
  }


  // Code mới của thg candidate

  const dateNow = dayjs();

  const [date, setDate] = useState(dateNow);
  const handleChangeDateTime = (e) => {
    setDate(e);
  }


  // const 
  function TestMarks() {
    const [testMarks, setTestMarks] = useState(50);
    const handleClickCountPlus = () => {
      if (testMarks < 100) {
        setTestMarks(testMarks + 1);
      }
    };
    const handleInputChange = (e) => {
      if (e.target.value <= 100) {
        const newCount = parseInt(e.target.value);
        setTestMarks(newCount);
      }
    };
    const handleClickCountMinus = () => {
      if (!testMarks <= 0) {
        setTestMarks(testMarks - 1);
      }
    };

    return (
      <div className="d-flex justify-content-center align-items-center">
        <RemoveIcon onClick={handleClickCountMinus} className="me-1" />
        <input
          value={testMarks}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          onChange={handleInputChange}
        />
        <AddIcon onClick={handleClickCountPlus} className="ms-1" />
      </div>
    );
  }

  function Interview() {
    const [interview, setInterview] = useState(1);
    const handleClickCountPlus = () => {
      if (interview < 10) {
        setInterview(interview + 1);
      }
    };
    const handleInputChange = (e) => {
      if (e.target.value <= 10) {
        const newCount = parseInt(e.target.value);
        setInterview(newCount);
      }
    };
    const handleClickCountMinus = () => {
      if (!interview <= 0) {
        setInterview(interview - 1);
      }
    };

    return (
      <div className="d-flex justify-content-center align-items-center">
        <RemoveIcon onClick={handleClickCountMinus} className="me-1" />
        <input
          value={interview}
          style={{ fontSize: "15px", height: "36px" }}
          className="form-control w-25 border-clr-grey border text-center"
          type="number"
          onChange={handleInputChange}
        />
        <AddIcon onClick={handleClickCountPlus} className="ms-1" />
      </div>
    );
  }


  const [selectedValuePassFaild, setSelectedValuePassFaild] = useState('true');

  const handleChangePassFaild = (e) => {
    setSelectedValuePassFaild(e.target.value);
  };

  console.log(selectedValuePassFaild)


  return (
    <>
      <div className=" position-relative " style={{ width: '75px', minWidth: '170px' }} onClick={handleClickFormOpen}>
        <button className="hover-btn btn-create w-100  text-right clr-white font-w-1 non-outline cursor-pointer">Thêm ứng viên</button>
        <AddIcon className=" position-absolute plus-icon clr-white" />
      </div>
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
                placeholder="Nhập họ và tên ứng viên..."
                className='form-control grey-text'
              />
              <div className="col-md-8  mt-0">
                {errIdPersonalNeed && (
                  <p className="err-valid ws-nowrap ">
                    Nhu cầu không được để trống
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 mt-1">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Email <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                placeholder="Nhập email ứng viên..."
                className='form-control grey-text'
              />
              <div className="col-md-8  mt-0">
                {errIdPersonalNeed && (
                  <p className="err-valid ws-nowrap ">
                    Nhu cầu không được để trống
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 mt-1">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Số điện thoại <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                placeholder="Nhập số điện thoại..."
                className='form-control grey-text'
              />
              <div className="col-md-8  mt-0">
                {errIdPersonalNeed && (
                  <p className="err-valid ws-nowrap ">
                    Nhu cầu không được để trống
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 mt-1 ">
              <label htmlFor="name" className="form-label grey-text mb-0 mt-2">
                Link CV
              </label>
              <input
                maxLength={60}
                type="text"
                placeholder="Link CV..."
                className='form-control grey-text'
              />
              <div className="col-md-8  mt-0">
                {errIdPersonalNeed && (
                  <p className="err-valid ws-nowrap ">
                    Nhu cầu không được để trống
                  </p>
                )}
              </div>
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
                    onChange={handleChangeDateTime}
                    format="HH:mm"
                  />
                  <DemoContainer components={['DateTimePicker']}>
                    <DemoItem >
                      <DateTimePicker className="date-set form-control"
                        views={['day', 'month', 'year', 'hours', 'minutes']}
                        value={date}
                        onChange={handleChangeDateTime}
                        format="YYYY/MM/DD"
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
              <select
                className="form-select grey-text"
                aria-label="Default select example"
                onChange={formData.handleChange}
                name="recruitmentPlan.recruitmentRequest.id"
                id="recruitmentPlan.recruitmentRequest.id"
              >
                <option value="default">Chọn nhu cầu nhân sự</option>
                {recuitments.filter(item => item.status == "Đã gửi").map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="col-md-8  mt-0">
                {errIdPersonalNeed && (
                  <p className="err-valid ws-nowrap ">
                    Nhu cầu không được để trống
                  </p>
                )}
              </div>
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
                    onChange={formData.handleChange}
                    name="recruitmentPlan.recruitmentRequest.id"
                    id="recruitmentPlan.recruitmentRequest.id"
                  >
                    <option value="default">Có</option>
                    <option value="default">Không</option>
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
                    placeholder="Nhập nhận xét"
                    id="outlined-multiline-flexible form-control"
                    multiline
                    maxRows={4}
                  />
                </div>
              </div>
              <div className="col-md-12 mt-2 d-flex align-item-center justify-content-center">
                <label htmlFor="name" className="form-label grey-text mb-0 ws-nowrap">
                  Kết quả cuối cùng:
                </label>
                {selectedValuePassFaild === 'true' ? <select
                  className="form-select text-success  ms-2"
                  style={{ width: '170px' }}
                  aria-label="Default select example"
                  value={selectedValuePassFaild}
                  onChange={handleChangePassFaild}
                >
                  <option className="text-success" value="true">Pass</option>
                  <option className="text-danger" value="false">Faild</option>
                </select> : <select
                  className="form-select text-danger  ms-2"
                  style={{ width: '170px' }}
                  aria-label="Default select example"
                  value={selectedValuePassFaild}
                  onChange={handleChangePassFaild}
                >
                  <option className="text-success" value="true">Pass</option>
                  <option className="text-danger" value="false">Faild</option>
                </select>}
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
                  <select
                    className="form-select grey-text"
                    aria-label="Default select example"
                  >
                    <option value="default">Chọn nhu cầu nhân sự</option>
                    {recuitments.filter(item => item.status == "Đã gửi").map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-7 ms-4">
                  <label htmlFor="name" className="form-label grey-text mb-0 mt-2 ws-nowrap">
                    Lưu ý
                  </label>
                  <input
                type="text"
                placeholder="Nhập lưu ý nếu có..."
                className='form-control grey-text'
              />
                </div>
              </div>
              <div className=" text-right mt-0 d-flex align-item-flex-end">
                <div className="send-child position-relative ">
                  <button type="submit" className=" text-center align-item-center btn send-btn btn-success ">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </form>
        </DialogTitle >
      </Dialog >
    </>
  )
}