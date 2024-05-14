import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {Navigate} from "react-router-dom";

// Check Token
function AuthContext({children}) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const pathName = window.location.pathname;
    console.log(currentUser)
    if (currentUser === null) {
        if (pathName !== "/login") {
            return <Navigate to="/login"/>
        }
    } else {
        if (pathName === "/login") {
            return <Navigate to="/"/>
        }
    }
    if (children === undefined) {
        return <Navigate to="/notFound"/>
    }
    return (<>{children}</>)

}

export function doLogout(navigate) {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (user != null) {
        axios.post("http://localhost:8080/logoutUser", {Authorization: `Bearer ${user.accessToken}`}).then(res => {
            // enqueueSnackbar("Đăng xuất thành công", {variant: "success"});
        }).catch(e => {
            console.error(e)
            // enqueueSnackbar("Có lỗi xảy ra không thể đăng xuất", {variant: "error"});
        })
        localStorage.removeItem("currentUser");
        navigate("/login")
    }
}

export default AuthContext;