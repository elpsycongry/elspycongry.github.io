import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function Email() {
    const [dataSend, setDataSend] = useState({
        formName: 'Trọng',
        toEmail: 'tronglai301@gmail.com',
        toName: 'Trọng',
        emailCc: 'tronglai301@gmail.com,vantuanvuong69@gmail.com,nguyenhoanggiaminh24@gmail.com',
        internNeeds: 4,
        internPass: 1,
        namePersonalNeeds: 'Nhu cầu nhân sự tháng 6',
        dateStart: '12/03/2024',
        dateEnd: '12/04/2024'
    });


    const intervalRef = useRef(null);
    const sendEmail = () => {
        const serviceId = process.env.REACT_APP_API_SERVICE_ID;
        const templateId = process.env.REACT_APP_API_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;

        const templateParams = {
            to_email: dataSend.toEmail,
            form_name: dataSend.formName,
            to_name: dataSend.toName,
            emailCc: dataSend.emailCc,
            intern_needs: dataSend.internNeeds,
            intern_pass: dataSend.internPass,
            name_personal_needs: dataSend.namePersonalNeeds,
            date_start: dataSend.dateStart,
            date_end: dataSend.dateEnd,


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

        console.log(dayCheck, dateCheck, monthCheck)
        if (dayCheck === 2) {
            sendEmail();
        }

        intervalRef.current = setInterval(sendEmail, 24 * 60 * 60 * 1000);
        return () => clearInterval(intervalRef.current);

    }, [])
    return null;
}