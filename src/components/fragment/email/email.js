import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function Email() {
    const [dataSendPersonalNeed, setDataSendPersonalNeed] = useState([
        {
            toEmail: 'tronglai301@gmail.com',
            toName: 'Trọng',
            internNeeds: 4,
            internNeedHandOver: 1,
            namePersonalNeeds: 'Nhu cầu nhân sự tháng 6',
            dateStart: '12/03/2024',
            dateEnd: '12/04/2024',
            linkProgress: 13,
            totalIntern: 20,
            passIntern: 15,
            trainningIntern: 10,
            handOverIntern: 3,
            failIntern: 3,
            notTrainningIntern: 3
        },
        {
            toEmail: 'gabynexo221@gmail.com',
            toName: 'Bảo ngu',
            internNeeds: 4,
            internNeedHandOver: 1,
            namePersonalNeeds: 'Nhu cầu nhân sự tháng 6',
            dateStart: '12/03/2024',
            dateEnd: '12/04/2024',
            totalIntern: 20,
            passIntern: 15,
            trainningIntern: 10,
            handOverIntern: 3,
            failIntern: 3,
            notTrainningIntern: 3,
            linkProgress: 13
        }
    ]);
    const [dataSendRecruitmentPlan, setDataSendRecruitmentPlan] = useState([
        {
            toEmail: 'vantuanvuong69@gmail.com',
            toName: 'Tuấn',
            internNeeds: 4,
            internNeedHandOver: 1,
            nameRecuitmentPlan: 'Kế hoạch tuyển dụng tháng 6',
            linkProgress: 2,
            dateStart: '12/03/2024',
            dateEnd: '12/04/2024',
            totalIntern: 20,
            passIntern: 15,
            trainningIntern: 10,
            handOverIntern: 3,
            failIntern: 3,
            notTrainningIntern: 3
        }
    ]);
    console.log(dataSendRecruitmentPlan)
    const serviceId = process.env.REACT_APP_API_SERVICE_ID ;
    const templateIdRecruitmentPLan = process.env.REACT_APP_API_TEMPLATE_RECRUITMENT_PLAN_ID ;
    const templateIdPersonalNeed = process.env.REACT_APP_API_TEMPLATE_PERSONAL_NEED_ID;
    const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
    const intervalRef = useRef(null);
 
    const sendEmailRecuitmentPlan = (item) => {
        const templateParamsRcruitmentPLan = {
            to_email: item.toEmail,
            to_name: item.toName,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_recruitment_plan: item.nameRecuitmentPlan,
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

    const sendEmail = () =>{
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
        //     sendEmailPersonalneed(item);
        // })
        // dataSendRecruitmentPlan.map(item => {
        //     sendEmailRecuitmentPlan(item);
        // })




        intervalRef.current = setInterval(sendEmail, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalRef.current);

    }, [])
    return null;
}