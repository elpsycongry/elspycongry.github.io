import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Navigate } from "react-router-dom";
import Login from "../pages/login/login";

function AuthContext({ children }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const pathName = window.location.pathname;

    if (!currentUser) {
        if (pathName !== "/") {
            return pathName === "/login" ? <Login /> : <Navigate to="/" />;
        }
    } else {
        const roles = currentUser.roles.map(role => role.authority);
        const isAdmin = roles.includes('ROLE_ADMIN');
        const isManager = roles.includes('ROLE_TM');
        const isDivisionManager = roles.includes('ROLE_DM');
        const isQualityController = roles.includes('ROLE_QC');
        const isHumanResource = roles.includes('ROLE_HR');
        if (pathName === "/login") {
            return <Navigate to="/dashboard" />;
        }
        if (pathName === '/users' && !isAdmin) {
            return <Navigate to="/dashboard" />;
        }
        if (pathName === "/training" && !isAdmin && !isManager) {
            return <Navigate to="/dashboard" />;
        }
        if ((pathName === "/training/stats" || pathName === "/recruitment/stats") && !isAdmin) {
            return <Navigate to="/dashboard" />;
        }
    }
    return children ? <>{children}</> : <Navigate to="/notFound" />;
}

export function doLogout(navigate) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        axios.post("http://localhost:8080/logoutUser", {}, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then(() => {
            enqueueSnackbar("Đăng xuất thành công", { variant: "success" });
        }).catch(e => {
            console.error(e);
            enqueueSnackbar("Có lỗi xảy ra không thể đăng xuất", { variant: "error" });
        });

        localStorage.removeItem("currentUser");
        navigate("/");
    } else {
        navigate("/");
    }
}

export default AuthContext;