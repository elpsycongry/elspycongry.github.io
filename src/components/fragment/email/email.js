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

    // Đang giới hạn số lượng mỗi template là 5 tin nhắn
    const check = () => {
        const recruitmentPlan = [];
        const personalNeed = [];
        var a = 0;
        var b = 0;
        toSend.forEach(item => {
            console.log(item.isRequest);
            if (item.isRequest === 0 && a < 5) {
                a++;
                recruitmentPlan.push(item);
            }
            if (item.isRequest === 1 && b < 5) {
                b++;
                personalNeed.push(item);
            }
        })
        setDataSendPersonalNeed(personalNeed);
        setDataSendRecruitmentPlan(recruitmentPlan);
    }


    useEffect(() => {
        check();
    }, [toSend])


    console.log(dataSendPersonalNeed)
    console.log(dataSendRecruitmentPlan)
    const serviceId = process.env.REACT_APP_API_SERVICE_ID;
    const templateIdRecruitmentPLan = process.env.REACT_APP_API_TEMPLATE_RECRUITMENT_PLAN_ID;
    const templateIdPersonalNeed = process.env.REACT_APP_API_TEMPLATE_PERSONAL_NEED_ID;
    const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
    const intervalRef = useRef(null);
    const sendEmailBoth = (item, template) => {
        const templateParamsRcruitmentPLan = {
            to_email: item.toEmail,
            to_name: item.toName,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_personal_needs: item.namePersonalNeeds,
            link_progress: item.linkProgress,
            date_start: item.dateStart,
            date_end: item.dateEnd,
            total_intern: item.totalIntern,
            pass_intern: item.passIntern,
            trainning_intern: item.trainingIntern,
            hand_over_intern: item.handOverIntern,
            fail_intern: item.failIntern,
            not_trainning_intern: item.notTrainingIntern
        }
        emailjs.send(serviceId, template, templateParamsRcruitmentPLan, publicKey).then(
            (response) => {
                console.log('Success!', response);
            }, (error) => {
                console.log(error.text);
            }
        )
    }
    const sendEmailsSequentially = async (data, templateId) => {
        const delay = 1000; // thời gian chờ giữa các email (ms)
        for (const item of data) {
            await sendEmailBoth(item, templateId);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    };
    useEffect(() => {
        const dayNow = new Date();
        const dayCheck = dayNow.getDay();
        const hoursCheck = dayNow.getHours();
        const sendPersonalNeedEmails = () => {
            return sendEmailsSequentially(dataSendPersonalNeed, templateIdPersonalNeed);
        };
        const sendRecruitmentPlanEmails = () => {
            return sendEmailsSequentially(dataSendRecruitmentPlan, templateIdRecruitmentPLan);
        };
        // Demo check
        if (hoursCheck === 19) {
            // sendPersonalNeedEmails()
            //     .then(() => sendRecruitmentPlanEmails())
            //     .catch(error => {
            //         console.error('Error sending emails:', error);
            //     });
        }
        
        // Check vào 4h chiều thứ 6 hàng tuần
        if (dayCheck === 5 && hoursCheck === 13) {
            // sendPersonalNeedEmails()
            //     .then(() => sendRecruitmentPlanEmails())
            //     .catch(error => {
            //         console.error('Error sending emails:', error);
            //     });
        }
        intervalRef.current = setInterval(sendEmailBoth, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalRef.current);

    }, [])

    return null;
}