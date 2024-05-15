import {Dialog, DialogContent, DialogTitle, FormControl, InputLabel, NativeSelect, Select} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";

export function InternPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false)
    };

    const handleListItemClick = (value) => {
        setOpen(false)
    };

    const [data, setData] = useState({
        name: 'Vũ Thanh Tùng',
        startDate: "2024-05-14",
        endDate: "2024-05-17",
        trainingState: 'Đang thực tập',
        isPass: false,

        subjects: [
            {name: "Môn 1", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 2", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 3", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 4", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 5", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 6", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
            {name: "Môn 7", theoryScore: 7, practiceScore: 8, attitudeScore: 6},
        ]
    })

    const handleTheoryScoreChange = (event, index) => {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].theoryScore = event.target.value;
        setData({
            ...data,
            subjects: updatedSubjects
        });
    }
    const handlePracticeScoreChange = (event, index) => {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].practiceScore = event.target.value;
        setData({
            ...data,
            subjects: updatedSubjects
        });
    }
    const handleAttitudeScoreChange = (event, index) => {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].attitudeScore = event.target.value;
        setData({
            ...data,
            subjects: updatedSubjects
        });
    }

    function findTotal(theory, practice, attitude) {
        theory = parseInt(theory);
        practice = parseInt(practice);
        attitude = parseInt(attitude);
        if (isNaN(theory)) {
            theory = 0;
        }
        if (isNaN(practice)) {
            practice = 0;
        }
        if (isNaN(attitude)) {
            attitude = 0;
        }
        const result = (theory + practice * 2 + attitude * 2) / 5
        if (result > 7){
            return (<> {result} <i className="bi bi-check"></i></>)
        } else {
            return (<> {result} <i className="bi bi-x"></i></>)
        }

    }

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        axios.get("http://localhost:8080/api/interns/?id=1").then(res => {
            setData(res.data)
        })
    }, []);

    return (
        <>
            <Button key={1} onClick={() => {
                setOpen(true)
            }}>Open</Button>

            <Dialog fullWidth maxWidth={'sm'} onClose={handleClose} open={open}>
                <DialogTitle key={2} sx={{padding: "16px 24px 8px 24px  "}}>Kết quả học tập</DialogTitle>

                <DialogContent>
                    <div key={3} className={"flex-col"}>
                        <h6>Họ tên: {data.name}</h6>
                        <div className={"flex-row"}>
                            <p>Ngày bắt đầu: {data.startDate}</p>
                            <p style={{paddingRight: '8px'}}>Số ngày thực tập: 35</p>
                        </div>
                        <p>Ngày kết thúc: {data.endDate}</p>
                    </div>
                    <div key={5} className={"table-score"}>
                        <div className={"flex flex-row justify-content-between"}>
                            <p>Môn học</p>
                            <p>Lý thuyết</p>
                            <p>Thực hành</p>
                            <p>Thái độ</p>
                            <p>Tổng</p>
                        </div>
                        {data.subjects.map((subject, index) => {

                            return (
                                <div className={"flex flex-row justify-content-between"}>
                                    <p className={"table-score__item tl"}>{subject.name}</p>
                                    <div className={"table-score__item"}>
                                        <input
                                            value={subject.theoryScore}
                                            onChange={(e) => {
                                                handleTheoryScoreChange(e, index)
                                            }}
                                            className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input
                                            value={subject.practiceScore}
                                            onChange={(e) => {
                                                handlePracticeScoreChange(e, index)
                                            }}
                                            className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input
                                            value={subject.attitudeScore}
                                            onChange={(e => handleAttitudeScoreChange(e, index))}
                                            className={"input-score"}/>
                                    </div>
                                    <p className={"table-score__item"}>{
                                        findTotal(
                                            subject.theoryScore,
                                            subject.practiceScore,
                                            subject.attitudeScore)}
                                    </p>
                                </div>
                            )
                        })}

                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb"}>Tổng kết</p>
                            <p className={"table-score__item"}>7</p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb "}>Kết quả thực tập</p>
                            <p className={"table-score__item"}>NA</p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Đánh giá trên team</p>
                            <div className={"table-score__item "}>
                                <input value={7} className={"input-score"}/>
                            </div>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <FormControl sx={{width: '30%'}}>
                                <NativeSelect
                                    defaultValue={"Đang"}
                                    inputProps={{
                                        name: 'trainingState',
                                        id: 'uncontrolled-native',
                                    }}>
                                    <option value={"1"}>Đang thực tập</option>
                                    <option value={"Đang"}>Đã thực tập</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{display: "flex"}}>
                    <button className={"save-btn"}>
                        SAVE
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}