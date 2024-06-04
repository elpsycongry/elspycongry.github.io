import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { render } from "@testing-library/react";

export default function Email() {
    const [dataSend, setDataSend] = useState({
        formName: 'Trọng',
        toEmail: 'tronglai301@gmail.com',
        toName: 'Trọng',
        emailCc: 'tronglai301@gmail.com,vantuanvuong69@gmail.com,nguyenhoanggiaminh24@gmail.com'
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
            emailCc: dataSend.emailCc
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

        sendEmail();

        // intervalRef.current = setInterval(sendEmail, 60 * 1000)
        // return () => clearInterval(intervalRef.current);

    }, [])
    return null;
}