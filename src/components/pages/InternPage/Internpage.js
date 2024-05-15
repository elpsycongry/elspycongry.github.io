import {Dialog, DialogContent, DialogTitle, FormControl, InputLabel, NativeSelect, Select} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import DialogActions from "@mui/material/DialogActions";

export function InternPage() {
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

    return (
        <>
            <Button onClick={() => {
                setOpen(true)
            }}>Open</Button>

            <Dialog fullWidth maxWidth={'sm'} onClose={handleClose} open={open}>
                <DialogTitle sx={{padding: "16px 24px 8px 24px  "}}>Kết quả học tập</DialogTitle>

                <DialogContent>
                    <div className={"flex-col"}>
                        <h6>Họ tên: {data.name}</h6>
                        <div className={"flex-row"}>
                            <p>Ngày bắt đầu: {data.startDate}</p>
                            <p style={{paddingRight: '8px'}}>Số ngày thực tập: 35</p>
                        </div>
                        <p>Ngày kết thúc: {data.endDate}</p>
                    </div>
                    <div className={"table-score"}>
                        <div className={"flex flex-row justify-content-between"}>
                            <p>Môn học</p>
                            <p>Lý thuyết</p>
                            <p>Thực hành</p>
                            <p>Thái độ</p>
                            <p>Tổng</p>
                        </div>
                        {data.subjects.map((subject) => {
                            return (
                                <div className={"flex flex-row justify-content-between"}>
                                    <p className={"tl"}>{subject.name}</p>
                                    <div className={"table-score__item"}>
                                        <input value={subject.theoryScore} className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input value={subject.practiceScore} className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input value={subject.attitudeScore} className={"input-score"}/>
                                    </div>
                                    <p className={"table-score__item"}>7</p>
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
                                    defaultValue={10}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}>
                                    <option value={10}>Đang thực tập</option>
                                    <option value={10}>Đang thực tập</option>
                                    <option value={20}>Đã thực tập</option>
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