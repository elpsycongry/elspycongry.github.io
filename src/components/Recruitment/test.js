import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { validEmail, validPhone } from "./regex/regex";
import { useState } from "react";


export default function SelectSmall() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [dateErr, setDateErr] = useState(false);
    const validate = (e) => {
        console.log(emailErr, phoneError)
        if (!validEmail.test(email)) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }
        if (!validPhone.test(phone)) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
        // 
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 75);

        const dateSet = new Date(date);
        if (dateSet < futureDate) {
            setDateErr(true);
        } else {
            setDateErr(false);
        }
    };




    const checkDate = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        const datE = new Date(date);
        console.log(datE);

    }



    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <div>
                <button onClick={validate}>Validate</button>
            </div>
            {/* {emailErr && <p>Your email is invalid</p>}
            {phoneError && <p>Your phone is invalid</p>} */}
            {dateErr && <p>Your date is invalid</p>}
        </div>
    );
};