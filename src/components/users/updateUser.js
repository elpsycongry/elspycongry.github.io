import * as React from 'react';
import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './updateUser.css';
import '../../assets/css/cssRecruitment/recruitment.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function DialogUpdateUserForm({ userId, onUpdate }) {

    const [open, setOpen] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar();

    // Sử dụng useFormik để quản lý form
    const formData = useFormik({
        initialValues: {
            id: null,
            name: "",
            email: "",
            phone:"",
            roles: [] // Danh sách roles ban đầu
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:8080/admin/users/update/${userId}`, values);
                enqueueSnackbar('Cập nhật thành công !', { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                // window.location.href = "/users";
                onUpdate();
                setOpen(false);
            } catch (error) {
                setOpen(false);
                enqueueSnackbar("Cập nhật thất bại!", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 3000 });
            }
        }
    });

    React.useEffect(() => {
        axios.get(`http://localhost:8080/admin/users/view/${userId}`)
            .then((res) => {
                setRoles(res.data.roles);
                formData.setValues(res.data);
            });
    }, [userId]);

    // Hàm xử lý thay đổi checkbox
    const handleCheckboxChange = (roleId) => (event) => {
        const isChecked = event.target.checked;
        const updatedRoles = [...formData.values.roles];
        console.log(updatedRoles);
        const roleIndex = updatedRoles.findIndex(role => role.id === roleId);
        if (isChecked && roleIndex === -1) {
            // Nếu checkbox được chọn và roleId không tồn tại trong mảng roles, thêm mới roleId vào mảng
            updatedRoles.push({ id: roleId });
        } else if (!isChecked && roleIndex !== -1) {
            // Nếu checkbox không được chọn và roleId tồn tại trong mảng roles, loại bỏ roleId khỏi mảng
            updatedRoles.splice(roleIndex, 1);
        }
        // Cập nhật trạng thái của mảng roles trong form
        formData.setFieldValue('roles', updatedRoles);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function FormTest({ userId }) {
        const hasTeamLeadRole = roles.some(role => role.name === 'ROLE_TEAMLEAD');
        const hasHRRoles = roles.some(role => role.name === 'ROLE_HR');
        const hasQCRoles = roles.some(role => role.name === 'ROLE_QC');
        const hasTrainingManagerRole = roles.some(role => role.name === 'ROLE_TM');

        // Tạo trạng thái để quản lý trạng thái của checkbox
        const [isTeamLeadChecked, setTeamLeadChecked] = React.useState(hasTeamLeadRole);
        const [isHRChecked, setHRChecked] = React.useState(hasHRRoles);
        const [isQCChecked, setQCChecked] = React.useState(hasQCRoles);
        const [isTrainingManagerChecked, setTrainingManagerChecked] = React.useState(hasTrainingManagerRole);

        React.useEffect(() => {
            setTeamLeadChecked(hasTeamLeadRole);
            setHRChecked(hasHRRoles);
            setQCChecked(hasQCRoles);
            setTrainingManagerChecked(hasTrainingManagerRole);
        }, []);

        return (
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={formData.values.roles.some(role => role.id === 2)} onChange={handleCheckboxChange(2)} />}
                    label={<span className="form-label grey-text information-user">Trưởng bộ phận/nhóm</span>}
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.values.roles.some(role => role.id === 3)} onChange={handleCheckboxChange(3)} />}
                    label={<span className="form-label grey-text information-user">Nhân sự</span>}
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.values.roles.some(role => role.id === 4)} onChange={handleCheckboxChange(4)} />}
                    label={<span className="form-label grey-text information-user">Kiểm soát chất lượng</span>}
                />
                <FormControlLabel
                    control={<Checkbox checked={formData.values.roles.some(role => role.id === 5)} onChange={handleCheckboxChange(5)} />}
                    label={<span className="form-label grey-text information-user">Quản lý đào tạo</span>}
                />
            </FormGroup>
        );
    }

    return (
        <>
            <CreateIcon className="color-orange pencil-btn font-size-medium cursor" onClick={(id) => handleClickOpen(id)} />
            <Dialog
                className='wrapper-update row g-3'
                open={open}
                onClose={handleClose}
                PaperProps={{
                    fontSize: '16px',
                    component: 'form',
                    onSubmit: formData.handleSubmit,
                }}
            >
                <div style={{ padding: '33px' }}>
                    <DialogTitle className="col-md-12 grey-text" style={{ paddingBottom: 3 }}><h2 style={{ fontWeight: '700' }}>Cập nhật thông tin</h2></DialogTitle>
                    <DialogContent className="col-md-12" >
                        <DialogContentText>
                            <div className="form-label grey-text information-user">Họ tên: <span className='information-user'>{formData.values.name}</span></div>
                            <div className="form-label grey-text information-user">Email: <span>{formData.values.email}</span></div>
                            <div className="form-label grey-text information-user">Số điện thoại: <span>{formData.values.phone}</span></div>
                            {/* <div className="form-label grey-text information-user">Trạng thái tài khoản: <span>Đang chờ duyệt</span></div> */}
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className="form-label grey-text information-user">Vai trò:</div>
                                <div style={{ paddingLeft: '20px' }}>
                                    <FormTest />
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div className="send text-right">
                            <div className="send-child position-relative">
                                <button type="submit" className="btn send-btn btn-success text-center">
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </DialogActions>
                </div>

            </Dialog>
        </>
    )
}