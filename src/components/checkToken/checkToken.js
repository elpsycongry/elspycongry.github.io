import {useState} from "react";
import {useNavigate} from "react-router-dom";
// Check Token
function CheckToken({children}) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    if (currentUser === null) {
        window.location.href = "http://localhost:3000/login";
    }
    return (<>{children}</>)
}

export default CheckToken;