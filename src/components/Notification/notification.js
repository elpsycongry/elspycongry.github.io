import NotificationsIcon from "@mui/icons-material/Notifications";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import './notification.scss'
import {useEffect, useRef, useState} from "react";
import {Tooltip} from "@mui/material";
import axios from "axios";
import {NotificationsNone, NotificationsPaused} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

export function Notification() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('all');
    const notiNumber = useRef(0);
    const handleToggle = () => {
        getDatas()
        setOpen(!open)
    }
   
    
    const [renderData, setRenderData] = useState(
        [
        //     {
        //         id: 1,
        //         content: "Nhu cầu nhân sự abc xyz vừa bị từ chối",
        //         timestamp: "1 phút trước",
        //         link: "",
        //         isRead: false,
        //     }, {
        //     id: 2,
        //     content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Bị từ chối bởi DET. ",
        //     timestamp: "1 giờ trước",
        //     isRead: false,
        // }, {
        //     id: 3,
        //     content: "Nhu cầu nhân sự tháng 3 vừa cập nhật trạng thái: Đang tuyển dụng",
        //     timestamp: "5 giây trước",
        //     isRead: false,
        // }, {
        //     id: 4,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "3 ngày trước",
        //     isRead: true,
        // }, {
        //     id: 5,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "5 ngày trước",
        //     isRead: true,
        // }, {
        //     id: 6,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "5 ngày trước",
        //     isRead: true,
        // }, {
        //     id: 7,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "5 ngày trước",
        //     isRead: true,
        // }, {
        //     id: 8,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "5 ngày trước",
        //     isRead: true,
        // }, {
        //     id: 9,
        //     content: "Nhu cầu nhân sự abc xyz vừa bị tử chối",
        //     timestamp: "5 ngày trước",
        //     isRead: true,
        // },
        ]
    );

    const StyledIconWrapper = styled(Box)(({theme}) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&::before': {
            content: notiNumber.current > 0 ? `"${notiNumber.current}"` : "''",
            position: 'absolute',
            right: 2,
            top: 3,
            width: '40%',
            height: '40%',
            backgroundColor: notiNumber.current > 0 ? 'rgba(255, 0, 0, 0.83)' : 'transparent',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: 'white'
        }
    }));

    const markReaded = (index) => {
        renderData[index].isRead = true
        setRenderData([...renderData])
    }

    useEffect(() => {
        if (renderData) {
            sendDatas().then(getDatas)
        }
    }, [type]);

    const sendDatas = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/notifications/${currentUser.id}`, renderData);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    const getDatas = () => {
        axios.get(`http://localhost:8080/api/notifications/${currentUser.id}`, {
            params: {
                type: type
            }
        }).then(
            response => {
                findNotiNumber(response.data)
                setRenderData(response.data);
            }
        )
    };

    const findNotiNumber = (data) => {
        notiNumber.current = 0;
        data.map(data => {
            if (data.isRead === false) {
                notiNumber.current++
            }
        })
    }
    return (
        <Tippy
            placement={"bottom-end"}
            onClickOutside={() => {
                sendDatas().then(handleToggle)
            }}

            visible={open}
            interactive
            render={() => (
                <div className={"notification-container"}>
                    <div className={"wrapper"}>
                        <div className={"header"}>
                            <h4 className={"title"}>Thông báo</h4>
                            <div className={"btns"}>
                                <div
                                    className={type === 'all' ? 'btn selected' : 'btn '}
                                    onClick={() => {
                                        setType('all')
                                    }}
                                >
                                    Tất cả
                                </div>
                                <div
                                    className={type === 'un_read' ? 'btn selected' : 'btn'}
                                    onClick={() => {
                                        setType('un_read')
                                    }}
                                >
                                    Chưa đọc
                                </div>
                            </div>
                        </div>
                        <div className={"body"}>
                            {renderData.length > 0 ? (
                                renderData.map((notiItem, index) => (
                                    <div key={notiItem.id} className={"noti-item"} onClick={() => markReaded(index)}>
                                        <div className={"avatar"}>
                                            <Avatar
                                                alt={"avatar"}
                                                src={`https://picsum.photos/50/50?random=${index}`}
                                            />
                                        </div>  
                                        <div>
                                            <div className={"content"}>{notiItem.content}</div>
                                            <div className={"time"}>{notiItem.timestamp}</div>
                                        </div>
                                        {!notiItem.isRead && (
                                            <Tooltip title={"Đánh dấu là đã đọc"}>
                                                <div className={"read-doc"} onClick={() => markReaded(index)}></div>
                                            </Tooltip>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className={"noti-placeholder"}>
                                    <div className={"icon"}>
                                        <NotificationsPaused />
                                    </div>
                                    <div>Hiện không có thông báo nào</div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}>
            <StyledIconWrapper onClick={handleToggle} className={'notificateIcon'}>
                {open ?
                    <NotificationsIcon sx={{fontSize: '35px'}}/>
                    :
                    <NotificationsNone sx={{fontSize: '35px'}}/>
                }

            </StyledIconWrapper>
        </Tippy>
    )
}

// Hàm gửi thông báo
// Nếu set giá trị cho cả listReceiverID và roleReceiver thì sẽ lấy theo listReceiverID
export async function sendNotifications(
    creatorId,
    content,
    roleReceiver,
    listReceiverId
) {
    var date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const notificationInfo = {
        creatorId: creatorId || currentUser.id, // Nếu creatorId là null hoặc rỗng, gán giá trị là người dùng hiện tại
        content: content,
        listRoleReceiver: roleReceiver,
        listReceiverId: listReceiverId,
        timeCreate: date.toISOString(),
    }
    await axios.post('http://localhost:8080/api/notifications', notificationInfo)
}