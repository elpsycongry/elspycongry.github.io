import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"

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
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <p className={"table-score__item"}>7</p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Môn 1</p>
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <p className={"table-score__item"}>7</p>

                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Môn 1</p>
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <input value={7} className={"table-score__item input-score"}/>
                            <p className={"table-score__item"}>7</p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Tổng kết</p>
                            <p className={"table-score__item"}>7</p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Đánh giá trên team</p>
                            <input value={7} className={"table-score__item input-score"}/>
                        </div>

                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Kết quả thực tập</p>
                            <p className={"table-score__item"}>7</p>

                        </div>
                        <div className={"flex flex-row justify-content-between"}>

                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}