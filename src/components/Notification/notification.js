import NotificationsIcon from "@mui/icons-material/Notifications";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import './notification.scss'
import {useState} from "react";
import {Tooltip} from "@mui/material";

export function Notification() {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open)
    }
    const [datas, setDatas] = useState([
        {
            id: 1,
            content: "Nhu cầu nhân sự abc xyz vừa bị từ chối",
            time: "1 phút trước",
            status: "un_read",

        }, {
            id: 2,
            content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Bị từ chối bởi DET. ",
            time: "1 giờ trước",
            status: "un_read",
        }, {
            id: 3,
            content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Đang tuyển dụng",
            time: "5 giây trước",
            status: "un_read",
        }, {
            id: 4,
            content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
            time: "3 ngày trước",
            status: "un_read",
        }, {
            id: 5,
            content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
            time: "5 ngày trước",
            status: "readed",
        },
    ]);

    const StyledIconWrapper = styled(Box)(({theme}) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        // Create pseudo-element fake
        '&::before': {
            content: '"3"',
            position: 'absolute',
            right: 2,
            top: 3,
            width: '40%',
            height: '40%',
            backgroundColor: 'rgba(255, 0, 0, 0.83)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: 'white'
        }
    }));
    const markReaded = (index) => {
        datas[index].status = 'readed'
        setDatas([...datas])
    }

    return (
        <Tippy
            placement={"bottom-end"}
            onClickOutside={handleToggle}
            visible={open}
            interactive
            trigger={'manual'}
            render={() => (
                <div className={"notification-container"}>
                    <div className={"wrapper"}>
                        <div className={"header"}>
                            <h4 className={"title"}>Thông báo</h4>
                            <div className={"btns"}>
                                <div className={"btn"}>
                                    Tất cả
                                </div>
                                <div className={"btn"}>
                                    Chưa đọc
                                </div>
                            </div>
                        </div>
                        <div className={"body"}>
                            {datas.map((notiItem, index) => (
                                <div key={notiItem.id} className={"noti-item"} onClick={() => {markReaded(index)}} >
                                    <div className={"content"}>{notiItem.content}</div>
                                    <div className={"time"}>{notiItem.time}</div>
                                    {notiItem.status === 'un_read' &&
                                        <Tooltip title={"Đánh dấu là đã đọc"}>
                                            <div className={"read-doc"} onClick={() => {markReaded(index)}}></div>
                                        </Tooltip>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}>
            <StyledIconWrapper onClick={handleToggle}>
                <NotificationsIcon sx={{fontSize: '35px'}}/>
            </StyledIconWrapper>
        </Tippy>
    )
}