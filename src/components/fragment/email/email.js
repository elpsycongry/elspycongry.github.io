import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import axios from 'axios';

export default function Email() {
    const [toSend, setToSend] = useState([]);
    const [dataSendPersonalNeed, setDataSendPersonalNeed] = useState([]);
    const [dataSendRecruitmentPlan, setDataSendRecruitmentPlan] = useState([]);

    const emailApi = () => {
        axios.get('http://localhost:8080/api/send/').then(res => {
            setToSend(res.data.emailData);
        })

    }
    useEffect(() => {
        emailApi();
    }, [])

    const check = () => {
        const recruitmentPlan = [];
        const personalNeed = [];
        toSend.forEach(item => {
            console.log(item.isRequest);
            if (item.isRequest === 0) {
                recruitmentPlan.push(item);
            }
            if (item.isRequest === 1) {
                personalNeed.push(item);
            }
        })
        setDataSendPersonalNeed(personalNeed);
        setDataSendRecruitmentPlan(recruitmentPlan);
    }


    useEffect(() => {
        check();
    }, [toSend])


    console.log(dataSendRecruitmentPlan)
    console.log(dataSendPersonalNeed)
    const serviceId = process.env.REACT_APP_API_SERVICE_ID;
    const templateIdRecruitmentPLan = process.env.REACT_APP_API_TEMPLATE_RECRUITMENT_PLAN_ID;
    const templateIdPersonalNeed = process.env.REACT_APP_API_TEMPLATE_PERSONAL_NEED_ID;
    const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
    const intervalRef = useRef(null);
    const sendEmailBoth = (item,template) => {
        const templateParamsRcruitmentPLan = {
            to_email: item.toEmail,
            to_name: item.toName,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_recruitment_plan: item.namePersonalNeeds,
            link_progress: item.linkProgress,
            date_start: item.dateStart,
            date_end: item.dateEnd,
            total_intern: item.totalIntern,
            pass_intern: item.passIntern,
            trainning_intern: item.trainningIntern,
            hand_over_intern: item.handOverIntern,
            fail_intern: item.failIntern,
            not_trainning_intern: item.notTrainningIntern
        }
        emailjs.send(serviceId, template, templateParamsRcruitmentPLan, publicKey).then(
            (response) => {
                console.log('Success!', response);
            }, (error) => {
                console.log(error.text);
            }
        )
    }

    const sendEmailRecuitmentPlan = (item) => {
        const templateParamsRcruitmentPLan = {
            to_email: item.toEmail,
            to_name: item.toName,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_recruitment_plan: item.namePersonalNeeds,
            link_progress: item.linkProgress,
            date_start: item.dateStart,
            date_end: item.dateEnd,
            total_intern: item.totalIntern,
            pass_intern: item.passIntern,
            trainning_intern: item.trainningIntern,
            hand_over_intern: item.handOverIntern,
            fail_intern: item.failIntern,
            not_trainning_intern: item.notTrainningIntern
        }
        emailjs.send(serviceId, templateIdRecruitmentPLan, templateParamsRcruitmentPLan, publicKey).then(
            (response) => {
                console.log('Success!', response);
            }, (error) => {
                console.log(error.text);
            }
        )
    }
    const sendEmailPersonalneed = (item) => {
        const templateParams = {
            to_email: item.toEmail,
            to_name: item.toName,
            emailCc: item.emailCc,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_personal_needs: item.namePersonalNeeds,
            link_progress: item.linkProgress,
            date_start: item.dateStart,
            date_end: item.dateEnd,
            total_intern: item.totalIntern,
            pass_intern: item.passIntern,
            trainning_intern: item.trainningIntern,
            hand_over_intern: item.handOverIntern,
            fail_intern: item.failIntern,
            not_trainning_intern: item.notTrainningIntern,
        }
        emailjs.send(serviceId, templateIdPersonalNeed, templateParams, publicKey).then(
            (response) => {
                console.log('Success!', response);
            }, (error) => {
                console.log(error.text);
            }
        )
    }

    const sendEmail = () => {
        sendEmailRecuitmentPlan();
        sendEmailPersonalneed();
    }

    useEffect(() => {
        const dayNow = new Date();
        const dayCheck = dayNow.getDay();
        const dateCheck = dayNow.getDate();
        const monthCheck = dayNow.getMonth() + 1;
        const hoursCheck = dayNow.getHours();

        if (dayCheck === 5 && hoursCheck === 16) {
            dataSendPersonalNeed.map(item => {
                sendEmailPersonalneed(item);
            })
            dataSendRecruitmentPlan.map(item => {
                sendEmailRecuitmentPlan(item);
            })
        }
        // send check

        // dataSendPersonalNeed.map(item => {
        //     sendEmailBoth(item,templateIdPersonalNeed);
        // })

        // dataSendRecruitmentPlan.map(item => {
        //     sendEmailBoth(item,templateIdRecruitmentPLan);
        // })
  
        intervalRef.current = setInterval(sendEmail, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalRef.current);

    }, [])
    
    return null;
}