import {useState} from "react";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

// Check Token
function NavigateConfig({children}) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser === null && window.location.pathname !== "/login") {
        window.location.href = "http://localhost:3000/login";
    } else if (currentUser !== null && window.location.pathname !== "/home") {
        if (currentUser.roles[0].authority === "ROLE_GUEST") {
            navigate("/home")
        }
    } else if (currentUser !== null && window.location.pathname === "/login") {
        console.log("ok")
        navigate("/users")
    }

    return (<>{children}</>)
}

export function doLogout() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    if (user != null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
        axios.post("http://localhost:8080/logout").then(() => {

        }).catch(e => {
            console.error(e)
            // enqueueSnackbar("Có lỗi xảy ra không thể đăng xuất", { variant:"error"});
        })
        localStorage.removeItem("currentUser");
        window.location.href = "http://localhost:3000/login";
    }
}

export default NavigateConfig;