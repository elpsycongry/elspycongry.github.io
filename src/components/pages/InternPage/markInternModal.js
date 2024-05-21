import {Dialog, DialogContent, DialogTitle, FormControl, NativeSelect} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"
import DialogActions from "@mui/material/DialogActions";
import axios, {options} from "axios";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash'
import {sortedUniq} from "lodash/array";
import target from "lodash/seq";
import {useSnackbar} from "notistack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import {AddComment } from '@mui/icons-material';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css'
import DialogContentText from "@mui/material/DialogContentText";
import {SubjectCommentBox} from "./subjectCommentBox";
import StyledEngineProvider from "@mui/material/StyledEngineProvider"

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
        updateFunction()
        setOpen(false)
    };

    const [data, setData] = useState({
        name: '',
        startDate: "",
        endDate: "",
        trainingState: '',
        isPass: null,
        scoreInTeam: null,

        subjects: [
            {name: "Git", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:1, value: 'Comment 1'}},
            {name: "Cơ sở dữ liệu", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:2, value: 'Comment 2'}},
            {name: "Scrum", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:3, value: 'Comment 3'}},
            {name: "React JS", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:4, value: 'Comment 4'}},
            {name: "Spring boot", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:5, value: 'Comment 5'}},
            {name: "Java", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:6, value: 'Comment 6'}},
            {name: "HTML", theoryScore: '', practiceScore: '', attitudeScore: '', comment: {id:7, value: 'Comment 7'}},
        ],


    })

    // Thay đổi trạng thái thực tập
    const handleTrainingStateChange = (event) => {
        switch (event.target.value){
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
                ...data,
                subjects: updatedSubjects
            });
        }
    }
    // Thực hành
    const handlePracticeScoreChange = (event, index) => {
        console.log(target.value)
        if (event.target.value.match(inputRegex)) {
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].practiceScore = event.target.value;
            setData({
                ...data,
                subjects: updatedSubjects
            });
        }
    }
    // Thái độ
    const handleAttitudeScoreChange = (event, index) => {
        console.log(target.value)
        if (event.target.value.match(inputRegex)) {
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].attitudeScore = event.target.value;
            setData({
                ...data,
                subjects: updatedSubjects
            });
        }
    }
    // Điểm trong team
    const handleScoreInTeamChange = (event) => {
        if (event.target.value.match(inputRegex)) {
            setData({
                ...data,
                scoreInTeam: event.target.value
            });
        }
    }
    // Khi thay đổi Comment
    function handleCommentChange(e, index) {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].comment = {...updatedSubjects[index].comment, value: e.target.value};
        setData({...data, subjects: updatedSubjects});
    }
    finalScore.current = []

    passed.current = {validScore: true, scorePassed: true}
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
        if (result > 7) {
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
        if (data.trainingState === 'stop_training'){
            setFinalResultPass(false)
            return
        }

        if (passed.current.validScore) {
            if (!passed.current.scorePassed){
                setFinalResultPass(false)
                return;
            }
            finalScore = parseFloat(finalScore);
            inTeamScore = parseFloat(inTeamScore);
            if (!isNaN(finalScore) && !isNaN(inTeamScore)) {
                let isPass = parseFloat(((finalScore + inTeamScore) / 2).toFixed(2));
                setFinalResultPass(isPass > 7)
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
                subj.comment = { value: null };
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
        setFinalScoreValue(
            parseFloat(
                finalScore.current.reduce((a, b) => a + b, 0) / finalScore.current.length)
                .toFixed(2))
        fetchFinalResultPass(
            parseFloat(
                finalScore.current.reduce((a, b) => a + b, 0) / finalScore.current.length)
                .toFixed(2)
            , data.scoreInTeam, false)
    }, [data]);
    // Handle submit
    const handleSubmit = () => {

        let sendData;
        if (finalResultPass !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            sendData = {...data, endDate: currentDate, isPass: finalResultPass};
        } else {
            sendData = {...data}
        }
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        axios.put('http://localhost:8080/api/interns', sendData).then(res => {
            enqueueSnackbar("Lưu thành công !", {
                variant: "success",
                anchorOrigin: {horizontal: "right", vertical: "top"}
            })
            updateFunction()
            setOpen(false)
        }).catch(e => {
            enqueueSnackbar("Không thể lưu vui lòng thử lại sau! ", {
                variant: "error",
                anchorOrigin: {horizontal: "right", vertical: "top"},
                autoHideDuration: 3000
            });
        })
    }
    // Hàm lấy ra ngày thực tập
    const getBusinessDay = (dateFrom, dateTo) => {
        let day = 0;
        if (new Date(null).toDateString() === dateTo.toDateString()) {
            dateTo = new Date()
        }

        for (var currentDate = new Date(dateFrom); currentDate <= dateTo; currentDate.setDate(currentDate.getDate() + 1)) {
            if (
                currentDate.toLocaleDateString('en-US', {weekday: "short"}) !== 'Sun'
                &&
                currentDate.toLocaleDateString('en-US', {weekday: "short"}) !== 'Sat'
            ) {
                day++;
            }
        }
        return (
            day > 50 ?
                (<Tippy
                       content={"Đã quá ngày thực tập"}
                >
                    <span style={{fontWeight: 600, color: "red", fontSize: '1.1rem'}}>{day}</span>
                </Tippy>)
                :
                <span style={{fontWeight: 600, fontSize: '1.1rem'}}>{day}</span>
        )
    }
    // Handle click alert


    const handleClickAgreeAlert = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setData({...data, trainingState: 'stop_training', endDate: currentDate});
        setOpenAlert(false)
    }

    return (
        <>
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
            <Dialog
                sx={{
                    '& .MuiPaper-root': {
                    overflow: 'visible',
                }
                }}
                fullWidth maxWidth={'sm'} onClose={handleClose} open={open} >
                <DialogTitle key={2} sx={{padding: "16px 24px 8px 29px", fontSize: '1.5rem'}}>Kết quả học tập</DialogTitle>

                <DialogContent style={{overflow: "visible"}}>
                    <div key={3} className={"flex-col"}>
                        <h6>Họ tên: {data.name}</h6>
                        <div className={"flex-row"}>
                            <p>Ngày bắt đầu: {data.startDate}</p>
                            <p style={{paddingRight: '18px'}}>
                                Số ngày thực tập: {getBusinessDay(new Date(data.startDate), new Date(data.endDate))}
                            </p>
                        </div>
                        <p>Ngày kết thúc: {data.endDate ? data.endDate : "Chưa kết thúc"}</p>
                    </div>
                    {/*Modal body*/}
                    <div key={5} className={"table-score"}>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"w110 l"}>Môn học</p>
                            <p id={"theory"}>Lý thuyết</p>
                            <p>Thực hành</p>
                            <p>Thái độ</p>
                            <p>Tổng</p>
                        </div>
                        {data.subjects.map((subject, index) => {

                            return (
                                <div className={"flex flex-row justify-content-between"}>
                                    <div className={"table-score__item tl w110"}>
                                        {subject.name}
                                        <Tippy
                                            interactive
                                            offset={[0, 25]}
                                            animation={false}
                                            trigger={'click'}
                                            content={'test'}
                                            render={() => (
                                                <div
                                                    className="comment-box">
                                                    <h5>Ghi chú môn {subject.name}</h5>
                                                    <textarea
                                                        onChange={(e) => {handleCommentChange(e, index)}}
                                                        value={subject.comment.value}
                                                    />
                                                </div>
                                            )}
                                            placement={'left'}>
                                            <AddComment className={"add_icon"} />
                                        </Tippy>
                                    </div>

                                    <div className={"table-score__item"}>
                                        {readOnly ?
                                            subject.theoryScore
                                            :
                                            (<input
                                                type={"number"}
                                                // onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                                value={subject.theoryScore}
                                                onChange={(e) => {
                                                    handleTheoryScoreChange(e, index)
                                                }}
                                                className={"input-score "}/>)}
                                    </div>
                                    <div className={"table-score__item"}>
                                        {readOnly ?
                                            subject.practiceScore
                                            :
                                            <input
                                                disabled={readOnly}
                                                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                                type={"number"}
                                                value={subject.practiceScore}
                                                onChange={(e) => {
                                                    handlePracticeScoreChange(e, index)
                                                }}
                                                className={readOnly ? "input-score" : "input-score"}/>
                                        }
                                    </div>
                                    <div className={"table-score__item"}>
                                        {readOnly ?
                                            subject.attitudeScore
                                            :
                                            <input
                                                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                                type={"number"}
                                                value={subject.attitudeScore}
                                                onChange={(e => handleAttitudeScoreChange(e, index))}
                                                className={readOnly ? "input-score" : "input-score"}/>
                                        }
                                    </div>
                                    <div className={"table-score__item"} style={{position: "relative"}}>{
                                        findTotal(
                                            subject.theoryScore,
                                            subject.practiceScore,
                                            subject.attitudeScore)}
                                    </div>
                                </div>
                            )
                        })}

                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb l"}>Tổng kết</p>
                            <p className={"table-score__item"}>
                                {finalScoreValue}
                            </p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb "}>Kết quả thực tập</p>
                            <p className={"table-score__item"}>
                                {finalResultPass === null ? "NA" : (finalResultPass ?
                                    <span style={{color: "green"}}>Pass</span> :
                                    <span style={{color: "red"}}>Fail</span>)}
                            </p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Đánh giá trên team</p>
                            <div className={"table-score__item "}>
                                {readOnly ?
                                    data.scoreInTeam
                                    :
                                    <input
                                        onChange={(e) => {
                                            handleScoreInTeamChange(e)
                                        }}
                                        type={"number"}
                                        value={data.scoreInTeam}
                                        className={"input-score"}/>
                                }
                            </div>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            {readOnly ?
                                (data.trainingState === null
                                    ||
                                    data.trainingState === "training"
                                    ||
                                    data.trainingState === ""
                                ) ?
                                    <div>Đang thực tập</div> :
                                    <div>Đã hoàn thành</div>
                                :
                                <FormControl sx={{width: '30%'}}>
                                    <NativeSelect
                                        disabled={readOnly}
                                        value={data.trainingState}
                                        onChange={handleTrainingStateChange}
                                        inputProps={{
                                            name: 'trainingState',
                                            id: 'uncontrolled-native',
                                        }}>
                                        <option value={'training'}>Đang thực tập</option>
                                        <option value={'trained'}>Đã hoàn thành</option>
                                        <option value={'stop_training'}>Dừng thực tập</option>
                                    </NativeSelect>
                                </FormControl>
                            }
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{display: "flex"}}>
                    {!readOnly
                        &&
                        <button disabled={inValidSave} onClick={() => {
                            handleSubmit()
                        }} className={"save-btn"}>
                            LƯU
                        </button>
                    }
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc là muốn dừng thực tập intern này ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{paddingRight: '26px', textAlign: 'justify'}} id="alert-dialog-description">
                        Dừng thực tập đồng nghĩa với việc kết quả thực tập của người này sẽ là trượt
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenAlert(false)}}>Quay lại</Button>
                    <StyledEngineProvider injectFirst={true}>
                        <Button className={"save-btn"} onClick={handleClickAgreeAlert} autoFocus>
                            Đồng ý
                        </Button>
                    </StyledEngineProvider>
                </DialogActions>
            </Dialog>
        </>
    );
}