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


    return (
        <>
            <Button onClick={() => {
                setOpen(true)
            }}>Open</Button>

            <Dialog fullWidth maxWidth={'sm'} onClose={handleClose} open={open}>
                <DialogTitle sx={{padding: "16px 24px 8px 24px  "}}>Kết quả học tập</DialogTitle>

                <DialogContent>
                        <div className={"flex-col"}>
                            <h6>Họ tên: Thanh Tùng</h6>
                            <div className={"flex-row"}>
                                <p>Ngày bắt đầu: 14/07/2019</p>
                                <p>Số ngày thực tập: 35</p>
                            </div>
                            <p>Ngày kết thúc: Chưa kết thúc</p>
                        </div>
                        <div className={"table-score"}>

                            <div className={"flex flex-row justify-content-between"}>
                                <p>Môn học</p>
                                <p>Lý thuyết</p>
                                <p>Thực hành</p>
                                <p>Thái độ</p>
                                <p>Tổng</p>
                            </div>
                            <div className={"flex flex-row justify-content-between"}>
                                <p className={"tl"}>Môn 1</p>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <p className={"table-score__item"}>7</p>
                            </div>

                            <div className={"flex flex-row justify-content-between"}>
                                <p className={"tl"}>Môn 1</p>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <p className={"table-score__item"}>7</p>
                            </div>

                            <div className={"flex flex-row justify-content-between"}>
                                <p className={"tl"}>Môn 1</p>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <div className={"table-score__item"}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                                <p className={"table-score__item"}>7</p>
                            </div>

                            <div className={"flex flex-row justify-content-between"}>
                                <p className={"tl"}>Tổng kết</p>
                                <p className={"table-score__item"}>7</p>
                            </div>
                            <div className={"flex flex-row justify-content-between"}>
                                <p className={"tl"}>Đánh giá trên team</p>
                                <div className={"table-score__item "}>
                                    <input value={7} className={"input-score"}/>
                                </div>
                            </div>
                        </div>
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
                    <FormControl sx={{width: '30%'}}>
                        <NativeSelect
                            defaultValue={10}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Đang thực tập</option>
                            <option value={20}>Đã thực tập</option>
                        </NativeSelect>
                    </FormControl>
                    <Button autoFocus sx={{marginRight: '12px'}}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}