import { Dialog, DialogTitle, Grid, IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateIcon from '@mui/icons-material/Create';
import BackspaceIcon from '@mui/icons-material/Backspace';



export default function DialogPersonalFormUpdate() {
    // Xử lý số lượng nhân sự

    function PersonalQuantity() {
        const [count, setCount] = useState(0);

        const handleClickCountPlus = () => {
            setCount(count + 1);

        }
        const handleClickCountMinus = () => {
            if (!count <= 0) {
                setCount(count - 1);
            }
        }
        return (
            <div className="d-flex justify-content-center align-items-center">

                <RemoveIcon onClick={handleClickCountMinus} className="me-1" />
                <input value={count}
                    style={{ fontSize: '15px', height: '36px' }}
                    className="form-control w-25 border-clr-grey border text-center"
                    placeholder="1"
                    type="number"
                    onChange={(e) => setCount(e.target.value)}
                />
                <AddIcon onClick={handleClickCountPlus} className="ms-1" />
            </div>

        );
    }

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
    const [status, setStatus] = useState('');
    const handleChange = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value)
    };
    const listTestSelect = [
        { id: 1, text: "Hoạt động" },
        { id: 2, text: "Không hoạt động" },
        { id: 3, text: "Đang chờ" }
    ]
    const [openForm, setOpenForm] = useState(false);
    const handleClickFormOpen = () => {
        setOpenForm(true);
    }
    const handleClickFormClose = () => {
        setOpenForm(false);
    }
    // Xử lý thêm công nghệ
    const [tech, setTech] = useState([]);
    const addTech = () => {
        setTech(prevTech => [...prevTech, { techName: "", techCount: 1 }])
    }

    const removeTech = (index) => {
        const updateTech = tech.filter((_, idx) => idx !== index);
        setTech(updateTech)
    }
    return (
        <>
            <CreateIcon className="color-orange pencil-btn font-size-medium" onClick={handleClickFormOpen} />
            <Dialog
                open={openForm}
                onClose={handleClickFormClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <form className=" row g-3">
                        <div className=" col-md-12">
                            <h2 className="grey-text" style={{ paddingBottom: 3 }}>Thêm nhu cầu nhân sự</h2>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}
                                onClick={handleClickFormClose}
                            >
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label grey-text">Tên <span className="color-red">*</span></label>
                            <input type="text" className="form-control" id="name" placeholder="Nhập tên nhu cầu..." />
                        </div>
                        <div className="col-md-12 m-0 d-flex">
                            <div className="col-md-6 mb-0">
                                <label className="form-label grey-text">Công nghệ <span className="color-red">*</span></label>
                            </div>
                            <div className="col-md-6 mb-0 text-center">
                                <label className="form-label grey-text">Số lượng nhân sự <span className="color-red">*</span></label>

                            </div>
                        </div>
                        {tech.map((tech, index) => (
                            <>
                                <div key={index} className="col-md-6 mt-0 mb-2 last-child">
                                    <select className="form-select grey-text" aria-label="Default select example">
                                        <option selected>Thêm công nghệ...</option>
                                        {listTechnology.map((item) => (
                                            <option key={item.id}>{item.text}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 text-center mt-0 mb-2 d-flex align-item-center">
                                    <PersonalQuantity />
                                    <BackspaceIcon onClick={() => removeTech(index)} />
                                </div>

                            </>
                        ))}
                        <div className="col-md-12 mt-2" onClick={addTech}>
                            <p className="grey-text plusTech mb-0">Thêm công nghệ +</p>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-6 mt-2">
                                <label htmlFor="time" className="form-label grey-text">Thời hạn bàn giao <span className="color-red">*</span></label>
                                <input value="2021-01-01" type="date" className="form-control text-center grey-text" id="time" />
                            </div>
                        </div>
                        <div className="col-md-6 mt-2 pr-0">
                            <label htmlFor="status" className="form-label grey-text ">Trạng thái</label>
                            <select
                                value={status}
                                onChange={handleChange}
                                className="form-select grey-text"
                                aria-label="Default select example">
                                {listTestSelect.map(item => (
                                    <option key={item.id} value={item.id}>{item.text}</option>
                                ))}
                            </select>

                        </div>
                        <div className="col-md-6 mt-2">
                            <label className="form-label"></label>
                            <div className=" send  text-right">
                                <div className="send-child position-relative">
                                    <button className="btn send-btn btn-success text-center">Lưu</button>
                                </div>

                            </div>
                        </div>
                    </form>



                </DialogTitle>
            </Dialog >
        </>
    )
}