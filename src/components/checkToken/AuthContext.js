import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {Navigate} from "react-router-dom";

// Check Token
function AuthContext({children}) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const pathName = window.location.pathname;
    if (currentUser === null) {
        if (pathName !== "/login") {
            return <Navigate to="/login"/>
        }
    } else {
        if (currentUser.roles[0].authority === "ROLE_GUEST"
            && pathName !== "/guest") {
            return <Navigate to="/guest"/>
        }
        if (currentUser.roles[0].authority !== "ROLE_GUEST"
            && pathName === "/guest") {
            return <Navigate to="/users"/>
        }
        if (pathName === "/login") {
            return <Navigate to="/users"/>
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