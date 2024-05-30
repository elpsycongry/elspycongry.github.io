import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import axios from "axios";
import swal from 'sweetalert';


export default function BlockUser({ userId, status, onUpdate }) {
    const [isBlocked, setIsBlocked] = React.useState(status);
  
    const blockUserWithId = async () => {
      swal({
        title: "Bạn có chắc chắn?",
        text: isBlocked ? "Người dùng không thực hiện bất kỳ tác vụ nào!" : "Người dùng sẽ có thể thực hiện các tác vụ!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            if (user != null) {
              axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
              await axios.post(`http://localhost:8080/admin/block/${userId}`, { isBlocked: !isBlocked });
              onUpdate();
              setIsBlocked(!isBlocked);
              swal(isBlocked ? "Đã chặn quyền truy cập người dùng!" : "Đã bỏ chặn quyền truy cập người dùng!", {
                icon: "success",
              });
            }
          } catch (error) {
            console.log(error);
            swal("Đã xảy ra lỗi khi xử lý yêu cầu!", {
              icon: "error",
            });
          }
        } else {
          swal("Không có thay đổi nào được lưu!");
        }
      });
    };
  
    return (
      <React.Fragment>
        <ToggleButton
          value="check"
          selected={isBlocked}
          onClick={blockUserWithId}
          style={{
            backgroundColor: isBlocked ? "green" : "gray",
            color: "white",
            marginLeft: "5px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          }}
        >
          {isBlocked ? <CheckIcon /> : <CloseIcon sx={{bgcolor: 'red', borderRadius: '100%'}} />}
        </ToggleButton>
      </React.Fragment>
    );
  }