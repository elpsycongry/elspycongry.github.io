import NotificationsIcon from "@mui/icons-material/Notifications";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import './notification.scss'
import {useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import axios from "axios";

export function Notification() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('all')
    const handleToggle = () => {
        setOpen(!open)
    }
    const [datas, setDatas] = useState([
        {
            id: 1,
            content: "Nhu cầu nhân sự abc xyz vừa bị từ chối",
            timestamp: "1 phút trước",
            link: "",
            isRead: false,

        }, {
            id: 2,
            content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Bị từ chối bởi DET. ",
            timestamp: "1 giờ trước",
            isRead: false,
        }, {
            id: 3,
            content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Đang tuyển dụng",
            timestamp: "5 giây trước",
            isRead: false,
        }, {
            id: 4,
            content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
            timestamp: "3 ngày trước",
            isRead: true,
        }, {
            id: 5,
            content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
            timestamp: "5 ngày trước",
            isRead: true,
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
        datas[index].isRead = true
        setDatas([...datas])
    }
    useEffect(() => {
        console.log(datas)
        axios.get(`http://localhost:8080/api/notifications/${currentUser.id}`, {
            params: {
                type: type
            }
        }).then(
            response => {
                setDatas(response.data);
            }
        )
    }, [type]);

    const sendDatas = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/notifications/${currentUser.id}`, datas);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <Tippy
            placement={"bottom-end"}
            onClickOutside={() => {sendDatas(); handleToggle()}}
            visible={open}
            interactive
            render={() => (
                <div className={"notification-container"}>
                    <div className={"wrapper"}>
                        <div className={"header"}>
                            <h4 className={"title"}>Thông báo</h4>
                            <div className={"btns"}>
                                <div className={"btn"} onClick={() => {sendDatas() ;setType('all')}}>
                                    Tất cả
                                </div>
                                <div className={"btn"} onClick={() => {sendDatas(); setType('un_read')}}>
                                    Chưa đọc
                                </div>
                            </div>
                        </div>
                        <div className={"body"}>
                            {datas.map((notiItem, index) => (
                                <div key={notiItem.id} className={"noti-item"} onClick={() => {
                                    markReaded(index)
                                }}>
                                    <div className={"content"}>{notiItem.content}</div>
                                    <div className={"time"}>{notiItem.time}</div>
                                    {!notiItem.isRead &&
                                        <Tooltip title={"Đánh dấu là đã đọc"}>
                                            <div className={"read-doc"} onClick={() => {
                                                markReaded(index)
                                            }}></div>
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