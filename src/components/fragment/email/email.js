import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function Email() {
    const [dataSend, setDataSend] = useState([
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
            toEmail: 'nguyenhoanggiaminh24@gmail.com',
            toName: 'Minh',
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
    console.log(dataSend)
    const serviceId = process.env.REACT_APP_API_SERVICE_ID;
    const templateId = process.env.REACT_APP_API_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
    console.log(templateId);
    const intervalRef = useRef(null);

    const sendEmail = (item) => {
        const templateParams = {
            to_email: item.toEmail,
            to_name: item.toName,
            emailCc: item.emailCc,
            intern_needs: item.internNeeds,
            intern_need_hand_over: item.internNeedHandOver,
            name_personal_needs: item.namePersonalNeeds,
            date_start: item.dateStart,
            date_end: item.dateEnd,
            total_intern: item.totalIntern,
            pass_intern: item.passIntern,
            trainning_intern: item.trainningIntern,
            hand_over_intern: item.handOverIntern,
            fail_intern: item.failIntern,
            not_trainning_intern: item.notTrainningIntern,
            link_progress: item.linkProgress,

        }

        emailjs.send(serviceId, templateId, templateParams, publicKey).then(
            (response) => {
                console.log('Success!', response);
            }, (error) => {
                console.log(error.text);
            }
        )
    }
    useEffect(() => {
        const dayNow = new Date();
        const dayCheck = dayNow.getDay();
        const dateCheck = dayNow.getDate();
        const monthCheck = dayNow.getMonth() + 1;
        const hoursCheck = dayNow.getHours();

        if (dayCheck === 5 && hoursCheck === 16 ) {
            dataSend.map(item => {
                sendEmail(item);
            })
        }

        // Test send email uncommand to run
        // dataSend.map(item => {
        //     console.log(item);
        //     sendEmail(item);
        // })


        intervalRef.current = setInterval(sendEmail, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalRef.current);

    }, [])
    return null;
}