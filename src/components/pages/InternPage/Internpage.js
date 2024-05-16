import {Dialog, DialogContent, DialogTitle, FormControl, NativeSelect} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import "./internpage.scss"
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";

export function InternPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [open, setOpen] = useState(true)

    const finalScore = useRef()
    const passed = useRef()
    const [finalScoreValue, setFinalScoreValue] = useState();
    const [finalResultPass, setFinalResultPass] = useState();
    const handleClose = () => {
        setOpen(false)
    };

    const handleListItemClick = (value) => {
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
            {name: "Môn 1", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 2", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 3", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 4", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 5", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 6", theoryScore: '', practiceScore: '', attitudeScore: ''},
            {name: "Môn 7", theoryScore: '', practiceScore: '', attitudeScore: ''},
        ],

        scores: []
    })
    const inputRegex = /^(10|[0-9]|)$/;
    const handleTheoryScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
            const updatedSubjects = [...data.subjects];
            updatedSubjects[index].theoryScore = event.target.value;
            setData({
                ...data,
                subjects: updatedSubjects
            });
        }
    }
    const handlePracticeScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].practiceScore = event.target.value;
        setData({
            ...data,
            subjects: updatedSubjects
        });}
    }
    const handleAttitudeScoreChange = (event, index) => {
        if (event.target.value.match(inputRegex)) {
        const updatedSubjects = [...data.subjects];
        updatedSubjects[index].attitudeScore = event.target.value;
        setData({
            ...data,
            subjects: updatedSubjects
        });}
    }
    const handleScoreInTeamChange = (event) => {
        if (event.target.value.match(inputRegex)) {
        setData({
            ...data,
            scoreInTeam: event.target.value
        });}
    }


    finalScore.current = []
    passed.current = true
    function findTotal(theory, practice, attitude) {
        theory = parseFloat(theory);
        practice = parseFloat(practice);
        attitude = parseFloat(attitude);
        if (isNaN(theory) || isNaN(practice)  || isNaN(attitude)) {
            passed.current = false
            return (<div className={"result"}>NA</div>)
        }

        let result = (theory + practice * 2 + attitude * 2) / 5
        result = parseFloat(result.toFixed(2)); // Làm tròn đến 2 chữ số sau dấu thập phân

        finalScore.current.push(result)

        if (result > 7) {
            return (<div className={"result"}> {result}
                <div className={"result-icon success"}><FontAwesomeIcon icon={faCheck}/></div>
            </div>)
        } else {
            return (<div className={"result"}> {result}
                <div className={"result-icon fail"}><FontAwesomeIcon icon={faX}/></div>
            </div>)
        }
    }
    const param = useParams();

    const fetchFinalResultPass = (finalScore, inTeamScore, isValid) => {
        console.log((parseFloat(finalScore)+parseFloat(inTeamScore))/2)
        if (!isValid){
            setFinalResultPass(null)
        }
    }

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        axios.get(`http://localhost:8080/api/interns/?id=${param.id}`).then(res => {
            setData(res.data)
        })
    }, []);

    useEffect(() => {
        setFinalScoreValue(parseFloat(finalScore.current.reduce((a,b) => a + b,0)/finalScore.current.length)
            .toFixed(2))
        fetchFinalResultPass(finalScoreValue, data.scoreInTeam, false)
    }, [data]);


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
                            <p className={"l"}>Môn học</p>
                            <p id={"theory"}>Lý thuyết</p>
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
                                            pattern="[0-9]|10"
                                            type={"number"}
                                            value={subject.theoryScore}
                                            onChange={(e) => {
                                                handleTheoryScoreChange(e, index)
                                            }}
                                            className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input
                                            pattern="[0-9]|10"
                                            type={"number"}
                                            value={subject.practiceScore}
                                            onChange={(e) => {
                                                handlePracticeScoreChange(e, index)
                                            }}
                                            className={"input-score"}/>
                                    </div>
                                    <div className={"table-score__item"}>
                                        <input
                                            pattern="[0-9]|10"
                                            type={"number"}
                                            value={subject.attitudeScore}
                                            onChange={(e => handleAttitudeScoreChange(e, index))}
                                            className={"input-score"}/>
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
                                { finalScoreValue }
                            </p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tb "}>Kết quả thực tập</p>
                            <p className={"table-score__item"}>
                                {data.isPass}
                            </p>
                        </div>
                        <div className={"flex flex-row justify-content-between"}>
                            <p className={"tl"}>Đánh giá trên team</p>
                            <div className={"table-score__item "}>
                                <input
                                    onChange={(e) => {handleScoreInTeamChange(e)}}
                                    type={"number"}
                                    value={data.scoreInTeam}
                                    className={"input-score"}/>
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