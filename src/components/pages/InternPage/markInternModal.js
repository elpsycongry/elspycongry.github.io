import {Dialog, DialogContent, DialogTitle, FormControl, NativeSelect} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";
import {useSnackbar} from "notistack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import {AddComment, InsertComment} from '@mui/icons-material';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css'
import DialogContentText from "@mui/material/DialogContentText";
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import Tooltip from "@mui/material/Tooltip";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export function MarkInternModal({userID, updateFunction}) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [open, setOpen] = useState(false)
    const {enqueueSnackbar} = useSnackbar();

    const [readOnly, setReadOnly] = useState(false)
    const finalScore = useRef()
    const passed = useRef({validScore: false, scorePassed: false})
    const [finalScoreValue, setFinalScoreValue] = useState();
    const [finalResultPass, setFinalResultPass] = useState(null);
    const [inValidSave, setInV21alidSave] = useState(false);
    // alert
    const [openAlert, setOpenAlert] = useState(false);
    const handleClose = () => {
        // updateFunction()
        setOpen(false)
    };

    const [data, setData] = useState({
        name: '', startDate: "2024-02-12", endDate: "", trainingState: '', isPass: null, scoreInTeam: null,

        subjects: [{
            name: "Git",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 1, value: 'Comment 1'}
        }, {
            name: "CSDL",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 2, value: 'Comment 2'}
        }, {
            name: "Scrum", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id: 3, value: 'Comment 3'}
        }, {
            name: "React JS",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 4, value: 'Comment 4'}
        }, {
            name: "Spring boot",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 5, value: 'Comment 5'}
        }, {
            name: "Java",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 6, value: 'Comment 6'}
        }, {
            name: "HTML",
            theoryScore: '',
            practiceScore: '',
            attitudeScore: '',
            comment: {id: 7, value: 'Comment 7'}
        },],


    })

    // Thay đổi trạng thái thực tập
    const handleTrainingStateChange = (event) => {
        switch (event.target.value) {
            case 'trained':
                const currentDate = new Date().toISOString().split('T')[0];
                setData({...data, trainingState: event.target.value, endDate: currentDate});
                break
            case 'stop_training':
                setOpenAlert(true);
                break
            default:
                setData({...data, trainingState: event.target.value});
        }
    };
    // Thay đổi điểm
    const inputRegex = /^(10(\.0+)?|[0-9](\.[0-9])?|)$/;
    // Lý thuyết
    const handleTheoryScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
            // setInValidSave(false)
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].theoryScore = event.target.value;
            setData({
                ...data, subjects: updatedSubjects
            });
        }
    }
    // Thực hành
    const handlePracticeScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].practiceScore = event.target.value;
            setData({
                ...data, subjects: updatedSubjects
            });
        }
    }
    // Thái độ
    const handleAttitudeScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].attitudeScore = event.target.value;
            setData({
                ...data, subjects: updatedSubjects
            });
        }
    }
    // Điểm trong team
    const handleScoreInTeamChange = (event) => {
        if (event.target.value.match(inputRegex)) {
            setData({
                ...data, scoreInTeam: event.target.value
            });
        }
    }

    // Khi thay đổi Comment
    function handleCommentChange(e, index) {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].comment = {...updatedSubjects[index].comment, value: e.target.value};
        setData({...data, subjects: updatedSubjects});
    }

    // Handle click alert
    const handleClickAgreeAlert = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setData({...data, trainingState: 'stop_training', endDate: currentDate});
        setOpenAlert(false)
    }

    finalScore.current = []
    passed.current = {validScore: true, scorePassed: true}

    // Hàm lấy ra ngày thực tập
    const getBusinessDay = (dateFrom, dateTo) => {
        let day = 0;
        if (new Date(null).toDateString() === dateTo.toDateString()) {
            dateTo = new Date()
        }

        for (var currentDate = new Date(dateFrom); currentDate <= dateTo; currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate.toLocaleDateString('en-US', {weekday: "short"}) !== 'Sun' && currentDate.toLocaleDateString('en-US', {weekday: "short"}) !== 'Sat') {
                day++;
            }
        }

        if (day > 50) {
            passed.current = {...passed.current, scorePassed: false}
        }

        return (day > 50 ?
            (<ThemeProvider theme={theme}>
                <Tooltip
                    arrow
                    placement={'top'}
                    title="Đã quá ngày thực tập" disableInteractive={true}>
                    <span style={{fontWeight: 600, color: "red", fontSize: '1.1rem'}}>{day}</span>
                </Tooltip>
            </ThemeProvider>)
            :
            <span style={{fontWeight: 600, fontSize: '1.1rem'}}>{day}</span>)
    }

    function findTotal(theory, practice, attitude) {
        theory = parseFloat(theory);
        practice = parseFloat(practice);
        attitude = parseFloat(attitude);
        if (isNaN(theory) || isNaN(practice) || isNaN(attitude)) {
            passed.current = {...passed.current, validScore: false}
            return (<div className={"result"}>NA</div>)
        }

        let result = (theory + practice * 2 + attitude * 2) / 5
        result = parseFloat(result.toFixed(2)); // Làm tròn đến 2 chữ số sau dấu thập phân

        finalScore.current.push(result) // Thêm kết quả vào mảng để tính tổng điểm cuối cùng
        if (result % 1 === 0) {
            result = result.toFixed(1)
        }
        if (result >= 7) {
            return (<div className={"result"}> {result}
                <div className={"result-icon success"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </div>
            </div>)
        } else {
            passed.current = {...passed.current, scorePassed: false}
            return (<div className={"result"}> {result}
                <div className={"result-icon fail"}><FontAwesomeIcon icon={faX}/></div>
            </div>)
        }
    }

    // Tính kết quả thực tập theo điểm tổng kết và đánh giá team
    const fetchFinalResultPass = (finalScore, inTeamScore) => {
        // Set fail nếu training state là stop_training
        if (data.trainingState === 'stop_training') {
            setFinalResultPass(false)
            return
        }

        if (passed.current.validScore) {
            if (!passed.current.scorePassed) {
                setFinalResultPass(false)
                return;
            }

            finalScore = parseFloat(finalScore);
            inTeamScore = parseFloat(inTeamScore);
            if (!isNaN(finalScore) && !isNaN(inTeamScore)) {
                let isPass = parseFloat(((finalScore + inTeamScore) / 2).toFixed(2));
                setFinalResultPass(isPass >= 7)

                // Tự động cho đã hoàn thành nếu chấm điểm xong
                // if (data.trainingState === 'training' || data.trainingState === null){
                //     const currentDate = new Date().toISOString().split('T')[0];
                //     setData({...data, trainingState: 'trained', endDate: currentDate});
                // }

            } else {
                setFinalResultPass(null)
            }
        } else {
            setFinalResultPass(null)
        }
    }

    // Kiểm tra nếu comment là null thì thêm value rỗng vào
    const checkCommentSubject = (data) => {
        for (const subj of data.subjects) {
            if (subj.comment === null) {
                subj.comment = {value: null};
            }
        }
    }

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        axios.get(`http://localhost:8080/api/interns/?id=${userID}`).then(res => {
            checkCommentSubject(res.data)
            setData(res.data)
        })
    }, [open]);

    useEffect(() => {
        setFinalScoreValue(parseFloat(finalScore.current.reduce((a, b) => a + b, 0) / finalScore.current.length).toFixed(2))

        fetchFinalResultPass(
            parseFloat(finalScore.current.reduce((a, b) => a + b, 0) / finalScore.current.length)
                .toFixed(2), data.scoreInTeam, false)
    }, [data]);
    // Handle submit
    const handleSubmit = (type) => {

        let sendData;
        // Save ngày và kết quả thực tập pass hoặc fail
        if (finalResultPass !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            sendData = {...data, endDate: currentDate, isPass: finalResultPass};
            if (finalResultPass) {
                sendData = {...data, isPass: true}
            } else {
                sendData = {...data, isPass: false}
            }
        } else {
            sendData = {...data}
        }
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        axios.put('http://localhost:8080/api/interns', sendData).then(res => {
            enqueueSnackbar("Lưu thành công !", {
                variant: "success", anchorOrigin: {horizontal: "right", vertical: "top"}
            })
            updateFunction()
            if (type === 'saveCmt') {
                return;
            }
            setOpen(false)
        }).catch(e => {
            enqueueSnackbar("Không thể lưu vui lòng thử lại sau! ", {
                variant: "error", anchorOrigin: {horizontal: "right", vertical: "top"}, autoHideDuration: 3000
            });
        })
    }


    const convertFormatDate = (dateString) => {
        const date = new Date(dateString)

        return `${date.getDate().toString().padStart(2, '0')}-${date.getMonth().toString().padStart(2, '0')}-${date.getFullYear()}`
    }

    const theme = createTheme({
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: "0.8rem",
                        backgroundColor: "#e1e1e1",
                        color: "red",
                        fontWeight: 600
                    },
                    arrow: {
                        color: "#e1e1e1" // Màu của arrow
                    }
                }
            }
        }
    });
    const [visibleT, setVisibleT] = useState(0)
    const toggerCmtModal = (value) => {
        if (value == visibleT) {
            setVisibleT(0)
        } else {
            setVisibleT(value)
        }
    }
    const checking = (value) => {
        return value == visibleT;
    }

    return (<>
        <RemoveRedEyeIcon
            onClick={() => {
                setOpen(true);
                setReadOnly(true)
            }}
            style={{width: '27px', height: '27px', marginRight: '7px'}}
            className="color-blue white-div font-size-large hov"/>
        <CreateIcon onClick={() => {
            setOpen(true);
            setReadOnly(false)
        }} style={{width: '24px', height: '24px'}} className="hov color-orange pencil-btn font-size-medium"/>
        <div className={"modal"}>
            <Dialog
                sx={{
                    '& .MuiDialogContent-root': {
                        paddingRight: '0',
                        paddingTop: '0',
                        paddingBottom: '0',
                    },
                    '& .MuiPaper-root': {
                        position: 'relative',
                        overflow: 'visible',
                    }

                }}
                fullWidth maxWidth={'sm'} onClose={handleClose} open={open}>
                <DialogTitle key={2} sx={{padding: "16px 24px 8px 23px", fontSize: '1.5rem'}}>Kết quả học
                    tập</DialogTitle>

                {readOnly && (
                    <div className={"dialog-close"}>
                        <CloseIcon className={"dialog-close__btn"} onClick={() => {
                            setOpen(false);
                        }}/>
                    </div>
                )}
                <DialogContent style={{overflow: "visible"}}>
                    <div key={3} className={"flex-col"}>
                        <h6>Họ tên: {data.name}</h6>
                        <div className={"flex-row"}>
                            <p>Ngày bắt đầu: {convertFormatDate(data.startDate)}</p>
                            <p style={{paddingRight: '18px'}}>
                                Số ngày thực tập: {getBusinessDay(new Date(data.startDate), new Date(data.endDate))}
                            </p>
                        </div>
                        <p>Ngày kết thúc: {data.endDate ? convertFormatDate(data.endDate) : "Chưa kết thúc"}</p>
                    </div>
                    {/*Modal body*/}
                    <div key={5} className={"table-score"}>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"w110 tb l"}>Môn học</p>
                            <p className={"tb"} id={"theory"}>Lý thuyết</p>
                            <p className={"tb"}>Thực hành</p>
                            <p className={"tb"}>Thái độ</p>
                            <p className={"tb"}>Tổng</p>
                        </div>
                        {data.subjects.map((subject, index) => {
                            return (<div className={"flex flex-row justify-content-between"}>
                                <div className={"table-score__item tl w110"}>
                                    <Tippy
                                        onClickOutside={() => {
                                            toggerCmtModal(0)
                                        }}
                                        visible={checking(index + 1)}
                                        interactive
                                        offset={[0, 45]}
                                        animation={false}
                                        content={'test'}
                                        render={() => (
                                            <div className="comment-box">
                                                <h5>Ghi chú môn {subject.name}</h5>
                                                <textarea
                                                    maxLength={132}
                                                    className={readOnly ? "edit-comment" : "edit-comment"}
                                                    disabled={readOnly}
                                                    onChange={readOnly ? null : (e) => handleCommentChange(e, index)}
                                                    value={subject.comment.value}
                                                />
                                                {!readOnly && (
                                                    <button
                                                        disabled={inValidSave}
                                                        onClick={() => {
                                                            handleSubmit('saveCmt');
                                                            toggerCmtModal(0)
                                                        }}
                                                        className={"save-btn comment-btn"}>
                                                        LƯU GHI CHÚ
                                                    </button>)}
                                            </div>)}
                                        placement={'left'}>
                                        {readOnly ?
                                            <Tooltip title="Xem comment" disableInteractive={true}>
                                                <InsertComment className={"add_icon"} onClick={() => {
                                                    toggerCmtModal(index + 1)
                                                }}/>
                                            </Tooltip>
                                            :
                                            <Tooltip title="Thêm comment" disableInteractive={true}>
                                                <AddComment className={"add_icon"} onClick={() => {
                                                    toggerCmtModal(index + 1)
                                                }}/>
                                            </Tooltip>}
                                    </Tippy>
                                    {subject.name}
                                </div>

                                <div className={"table-score__item"}>
                                    {readOnly ? subject.theoryScore : (<input
                                        type={"number"}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        value={subject.theoryScore}
                                        onChange={(e) => {
                                            handleTheoryScoreChange(e, index)
                                        }}
                                        className={"input-score "}/>)}
                                </div>
                                <div className={"table-score__item"}>
                                    {readOnly ? subject.practiceScore : <input
                                        disabled={readOnly}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        type={"number"}
                                        value={subject.practiceScore}
                                        onChange={(e) => {
                                            handlePracticeScoreChange(e, index)
                                        }}
                                        className={readOnly ? "input-score" : "input-score"}/>}
                                </div>
                                <div className={"table-score__item"}>
                                    {readOnly ? subject.attitudeScore : <input
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        type={"number"}
                                        value={subject.attitudeScore}
                                        onChange={(e => handleAttitudeScoreChange(e, index))}
                                        className={readOnly ? "input-score" : "input-score"}/>}
                                </div>
                                <div className={"table-score__item"}
                                     style={{position: "relative"}}>{findTotal(subject.theoryScore, subject.practiceScore, subject.attitudeScore)}
                                </div>
                            </div>)
                        })}

                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb l"}>Tổng kết</p>
                            <p className={"table-score__item tb"}>
                                {finalScoreValue}
                            </p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl tb"}>Đánh giá trên team</p>
                            <div className={"table-score__item "}>
                                {readOnly ? <span className={"tb"}>{data.scoreInTeam}</span> : <input
                                    onChange={(e) => {
                                        handleScoreInTeamChange(e)
                                    }}
                                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    type={"number"}
                                    value={data.scoreInTeam}
                                    className={"input-score"}/>}
                            </div>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb "}>Kết quả thực tập</p>
                            <p className={"table-score__item tb"}>
                                {finalResultPass === null ? "NA" : (finalResultPass ?
                                    <span style={{color: "green"}}>Pass</span> :
                                    <span style={{color: "red"}}>Fail</span>)}
                            </p>
                        </div>

                        <div className={"flex flex-row justify-content-between"}>
                            {readOnly ? (data.trainingState === null || data.trainingState === "training" || data.trainingState === "") ?
                                    <div>Đang thực tập</div> : (data.trainingState === 'stop_training' ?
                                        <div>Dừng thực tập</div> : <div>Đã hoàn thành</div>) :
                                <FormControl sx={{width: '30%'}}>
                                    <NativeSelect
                                        disabled={readOnly}
                                        value={data.trainingState}
                                        onChange={handleTrainingStateChange}
                                        inputProps={{
                                            name: 'trainingState', id: 'uncontrolled-native',
                                        }}>
                                        <option value={'training'}>Đang thực tập</option>
                                        <option value={'trained'}>Đã hoàn thành</option>
                                        <option value={'stop_training'}>Dừng thực tập</option>
                                    </NativeSelect>
                                </FormControl>}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{display: "flex"}}>
                    {readOnly ? (
                            <button
                                disabled={inValidSave}
                                onClick={() => {
                                    setOpen(false)
                                }}
                                className={"back-btn close"}>
                                ĐÓNG
                            </button>)
                        :
                        (<>
                                <button
                                    disabled={inValidSave}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                    className={"back-btn"}>
                                    HUỶ
                                </button>
                                <button
                                    disabled={inValidSave}
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                    className={"save-btn"}>
                                    LƯU
                                </button>
                            </>
                        )
                    }
                </DialogActions>
            </Dialog>
        </div>

        <Dialog
            open={openAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className={"alert-modal"}>
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc là muốn dừng thực tập intern này ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{paddingRight: '26px', textAlign: 'justify'}}
                                       id="alert-dialog-description">
                        Dừng thực tập đồng nghĩa với việc kết quả thực tập của người này sẽ là trượt
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenAlert(false)
                    }}>Quay lại</Button>
                    <StyledEngineProvider injectFirst={true}>
                        <Button className={"save-btn"} onClick={handleClickAgreeAlert} autoFocus>
                            Đồng ý
                        </Button>
                    </StyledEngineProvider>
                </DialogActions>
            </div>
        </Dialog>
    </>);
}