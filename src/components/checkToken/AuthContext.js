import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Navigate } from "react-router-dom";
import Login from "../pages/login/login";

// Context xác thực người dùng
function AuthContext({ children }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Lấy thông tin người dùng hiện tại từ localStorage
    const pathName = window.location.pathname; // Lấy đường dẫn hiện tại

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!currentUser) {
        // Nếu chưa đăng nhập và đường dẫn không phải là trang chủ
        if (pathName !== "/") {
            // Nếu đường dẫn là trang đăng nhập, trả về component Login, nếu không thì chuyển hướng đến trang chủ
            return pathName === "/login" ? <Login /> : <Navigate to="/" />;
        }
    } else {
        // Nếu đã đăng nhập
        const roles = currentUser.roles.map(role => role.authority); // Lấy danh sách vai trò của người dùng
        const isAdmin = roles.includes('ROLE_ADMIN'); // Kiểm tra xem người dùng có vai trò admin hay không
        const isManager = roles.includes('ROLE_TM'); // Kiểm tra xem người dùng có vai trò quản lý hay không
        const isDivisionManager = roles.includes('ROLE_DM'); // Kiểm tra xem người dùng có vai trò quản lý bộ phận hay không
        const isQualityController = roles.includes('ROLE_QC'); // Kiểm tra xem người dùng có vai trò kiểm soát chất lượng hay không
        const isHumanResource = roles.includes('ROLE_HR'); // Kiểm tra xem người dùng có vai trò nhân sự hay không
        
        // Điều hướng người dùng đã đăng nhập đến trang dashboard nếu họ cố gắng truy cập trang đăng nhập
        if (pathName === "/login") {
            return <Navigate to="/dashboard" />;
        }
        // Nếu người dùng không phải admin, ngăn họ truy cập trang quản lý người dùng
        if (pathName === '/users' && !isAdmin) {
            return <Navigate to="/dashboard" />;
        }
        // Nếu người dùng không phải admin hoặc quản lý, ngăn họ truy cập trang đào tạo
        if (pathName === "/training" && !isAdmin && !isManager) {
            return <Navigate to="/dashboard" />;
        }
        // Nếu người dùng không phải admin, ngăn họ truy cập các trang thống kê
        if ((pathName === "/training/stats" || pathName === "/recruitment/stats") && !isAdmin) {
            return <Navigate to="/dashboard" />;
        }
    }
    // Trả về các children nếu không có vấn đề gì, nếu không chuyển hướng đến trang không tìm thấy
    return children ? <>{children}</> : <Navigate to="/notFound" />;
}

// Hàm đăng xuất
export function doLogout(navigate) {
    const user = JSON.parse(localStorage.getItem("currentUser")); // Lấy thông tin người dùng hiện tại từ localStorage

    // Kiểm tra xem người dùng có tồn tại không
    if (user) {
        // Gửi yêu cầu đăng xuất đến server
        axios.post("http://localhost:8080/logoutUser", {}, {
            headers: {
                Authorization: `Bearer ${user.accessToken}` // Thêm token vào header
            }
        }).then(() => {
            enqueueSnackbar("Đăng xuất thành công", { variant: "success" }); // Hiển thị thông báo thành công
        }).catch(e => {
            console.error(e); // In lỗi ra console
            enqueueSnackbar("Có lỗi xảy ra không thể đăng xuất", { variant: "error" }); // Hiển thị thông báo lỗi
        });

        localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
        navigate("/"); // Điều hướng người dùng đến trang chủ
    } else {
        navigate("/"); // Nếu không có người dùng, điều hướng trực tiếp đến trang chủ
    }
}

export default AuthContext;
