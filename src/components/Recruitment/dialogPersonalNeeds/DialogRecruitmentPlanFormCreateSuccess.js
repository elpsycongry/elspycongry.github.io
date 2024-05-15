import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceIcon from '@mui/icons-material/Backspace';

import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function DialogRecruitmentPlanFormCreateSuccess({ id, open, onClose }) {
  const [dateErr, setDateErr] = useState(false);
  const [techErr, setTechErr] = useState(false);
  const [errNumberOfPersonal, setErrNumberOfPersonal] = useState(false);
  const [errNumberofOutput, setErrNumberOfOutput] = useState(false);
  // Xử lý số lượng nhân sự
  const checkValid = (dateSet, techArr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 75);
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
    const errNumberPersonal = techArr.map(item => {
      if (item.numberOfOutputPersonnel == 0 || item.numberOfPersonnelNeeded === "" || item.numberOfPersonnelNeeded < 0) {
        return true;
      } else {
        return false;
      }
    })
    const hasErrOfPersonal = errNumberPersonal.some(item => item === true);
    setErrNumberOfPersonal(hasErrOfPersonal);
    // 
    const errNumberOutput = techArr.map(item => {
      if (item.numberOfOutputPersonnel == 0 || item.numberOfOutputPersonnel === "" || item.numberOfOutputPersonnel < 0) {
        return true;
      } else {
        return false;
      }
    })
    const hasErrNumberOutput = errNumberOutput.some(item => item === true);
    setErrNumberOfOutput(hasErrNumberOutput);



    if (dateSet < futureDate || dateSet == "Invalid Date") {
      setDateErr(true);
    } else {
      setDateErr(false);
    }


    if (dateSet < futureDate || dateSet == "Invalid Date" || hasErrTech || hasErrNumberOutput || hasErrOfPersonal) {
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
        const date = new Date(values.recruitmentPlan.handoverDeadline);
          // Dữ liệu hợp lệ, tiến hành gửi dữ liệu
          values.planDetails = [...tech];
          values.idUser = 1;
          values.recruitmentPlan.recruitmentRequest = recruitment;
          console.log(values)
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
      },
    );
    const [recruitmentDateEnd,setRecuitmentDateEnd] = useState();
const [recruitmentName,setRecuitmentName] = useState();
const [recruitment,setRecuitment] = useState();
  // Call api
  useEffect(() => {

    if (id != null) {
      axios
        .get("http://localhost:8080/api/recruitmentRequests/" + id)
        .then((res) => {
          setRecuitmentName(res.data.recruitmentRequest.name);
          setRecuitment(res.data.recruitmentRequest);
          setRecuitmentDateEnd(res.data.recruitmentRequest.dateEnd);
          const detail = res.data.details;
          setTech(
            detail.map((item) => ({
              type: item.type,
              numberOfOutputPersonnel: item.quantity,
              numberOfPersonnelNeeded: item.quantity * 3,
            }))
          );
        });
    }
    
  }, [id]);



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
        numberOfOutputPersonnel( (parseInt(number) + 1), idx);
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
        numberOfOutputPersonnel( (parseInt(number) - 1), idx);

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
    if (count > 40) {
      handleQuantityOffPersonal(40, index);
    } else {
      handleQuantityOffPersonal(count, index);
    }
  };

  // Hàm dữ liệu cần tuyển
  function NumberOfPersonnelNeeded({ number, idx }) {
    if (number === "" || number == 0) {
      number = 0;
    }
    const [countOf, setCountOf] = useState(number);
    const handleClickCountPlus = () => {
      if (number < 40 || countOf <40) {
        setCountOf(countOf + 1);
        handleQuantityOffPersonal(parseInt(number) + 1, idx);
      }
    };
    const handleInputChange = (e) => {
      if (e.target.value <= 40) {
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

  function TimeRecruitment() {
    // const timeNow = new Date();
    // const year = timeNow.getFullYear();
    // const month = String(timeNow.getMonth() + 1).padStart(2, '0'); // Tháng phải có 2 chữ số
    // const day = String(timeNow.getDate()).padStart(2, '0'); // Ngày phải có 2 chữ số
    // const timeNowValue = `${year}-${month}-${day}`;
    // console.log(timeNowValue);

    return (
      <>
        <div className="col-md-4 mt-0 mb-2 child">
          <input
            type="date"
            onChange={formData.handleChange}
            onBlur={formData.handleBlur}
            className={`form-control text-center grey-text`}
            // value={timeRecruitment}
            id="recruitmentRequest.dateEnd"
            name="recruitmentRequest.dateEnd"
          // min={timeNowValue}
          />
        </div>
        <div className="col-md-4 mt-0 mb-2 child">
          <input
            type="date"
            onChange={formData.handleChange}
            onBlur={formData.handleBlur}
            className={`form-control text-center grey-text`}
            id="recruitmentRequest.dateEnd"
            name="recruitmentRequest.dateEnd"
            defaultValue={'2021-01-03'}
          />
          {dateErr && <p className="err-valid ">Thời hạn bàn giao phải tối thiểu 75 ngày</p>}
        </div>
      </>
    )
  }


  return (
    <>
      <Dialog
        id="formCreateRecruitmentPlan"
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <form className="row g-3" onSubmit={formData.handleSubmit}>
            <div className="col-md-12">
              <h2 className="grey-text" style={{ paddingBottom: 3 }}>
                Thêm kế hoạch tuyển dụng
              </h2>
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onClick={onClose}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <div className="col-md-12">
              <label htmlFor="name" className="form-label grey-text">
                Từ nhu cầu nhân sự
              </label>
              <div>
              <label className="input-container">
  <span className="input-value">{recruitmentName}</span>
  <input
    className="hidden-input"
    type="hidden"
    onChange={formData.handleChange}
    name="recruitmentPlan.recruitmentRequest"
    id="recruitmentPlan.recruitmentRequest"
    value={recruitment}
    placeholder={recruitmentName}
  />
</label>
</div>
          
            </div>
<div className="col-md-12">
              <label htmlFor="name" className="form-label grey-text">
                Tên kế hoạch tuyển dụng <span className="color-red">*</span>
              </label>
              <input
                maxLength={60}
                type="text"
                placeholder="Ví dụ: DECEN - Kế hoạch tuyển dụng quý 3/2021"
                onChange={formData.handleChange}
                onBlur={formData.handleBlur} // Thêm onBlur để kiểm tra lỗi khi trường dữ liệu bị mất trỏ
                className={`form-control`}
                id="recruitmentPlan.name"
                name="recruitmentPlan.name"
              />
            </div>
            <div className="col-md-12  d-flex">
              <div className="col-md-4 mb-0">
                <label className="form-label grey-text">
                  Công nghệ <span className="color-red">*</span>
                </label>
              </div>
              <div className="col-md-4 mb-0 text-center">
                <label className="form-label grey-text">
                  Số lượng nhân sự cần tuyển <span className="color-red">*</span>
                </label>
              </div>
              <div className="col-md-4 mb-0 text-center ">
                <label className="form-label grey-text">
                  Số lượng nhân sự đầu ra <span className="color-red">*</span>
                </label>
              </div>
            </div>
            {tech.map((tech, index) => (
              <>
                <div key={index} className="col-md-4 mt-0 mb-2 child">
                  <select
                    className="form-select grey-text"
                    aria-label="Default select example"
                    defaultValue="default"
                    value={tech.type}
                    onChange={(e) => handleChangeSelect(e, index)}
                    name={`tech[${index}].type`}
                  >
                    <option value="default">Chọn công nghệ...</option>
                    {listTechnology.map((item) => (
                      <option key={item.id} value={item.text}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 text-center mt-0 mb-2   align-item-center">
                  <NumberOfPersonnelNeeded
                    number={tech.numberOfPersonnelNeeded}
                    key={tech.numberOfPersonnelNeeded}
                    idx={index}
                  />
                </div>
                <div className="col-md-4 text-center mt-0 mb-2  position-relative align-item-center">
                  <NumberOfOutputPersonnel
                    number={tech.numberOfOutputPersonnel}
                    key={tech.numberOfOutputPersonnel}
                    idx={index}
                  />
                  <Dlt index={index} />
</div>
              </>
            ))}
            <div className="col-md-4 mt-0">
              {techErr && <p style={{ whiteSpace: 'nowrap' }} className="err-valid">Công nghệ không được để rỗng</p>}
            </div>
            <div className="col-md-4 mt-0 text-center">
              {errNumberOfPersonal && <p style={{ whiteSpace: 'nowrap' }} className="err-valid">Số lượng phải lớn hơn 0</p>}
            </div>
            <div className="col-md-4 mt-0 text-center">
              {errNumberofOutput && <p style={{ whiteSpace: 'nowrap' }} className="err-valid">Số lượng phải lớn hơn 0</p>}
            </div>
            <div className="col-md-12 mt-2" onClick={addTech}>
              <p className="grey-text plusTech w-125 mb-0">Thêm công nghệ +</p>
            </div>
            <div className="col-md-12  d-flex">
              <div className="col-md-4 mb-0">
                <label className="form-label grey-text">
                  Thời hạn tuyển dụng <span className="color-red">*</span>
                </label>
              </div>
              <div className="col-md-4 mb-0 text-center">
                <label className="form-label grey-text">
                  Thời hạn bàn giao <span className="color-red">*</span>
                </label>
              </div>
              <div className="col-md-4 mb-0 text-center">
                <label className="form-label"></label>
              </div>
            </div>
            <div className="col-md-4 mt-0 mb-2 child">
              <input
                type="date"
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                className={`form-control text-center grey-text`}
                id="recruitmentPlan.dateRecruitmentEnd"
                name="recruitmentPlan.dateRecruitmentEnd"
              />
              {dateErr && (
                <p className="err-valid ">
                  Thời hạn tuyển dụng phải tối thiểu 75 ngày
                </p>
              )}
            </div>
            <div className="col-md-4 mt-0 mb-2 child">
              <input
                type="date"
                onChange={formData.handleChange}
                onBlur={formData.handleBlur}
                className={`form-control text-center grey-text`}
                id="recruitmentPlan.handoverDeadline"
                name="recruitmentPlan.handoverDeadline"
                value={recruitmentDateEnd}
              />
              {dateErr && (
                <p className="err-valid ">
                  Thời hạn bàn giao phải tối thiểu 75 ngày
                </p>
              )}
            </div>


            <div className="col-md-4 mb-2 mt-0">
              <div className="send text-right mt-0">
                <div className="send-child position-relative">
                  <button type="submit" className="btn send-btn btn-success ">
                    Gửi
                    <SendIcon className="iconSend position-absolute" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </DialogTitle>
      </Dialog >
    </>
  )
}