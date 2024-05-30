import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography,
    TextField, FormGroup, FormControlLabel, Checkbox, Button, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './addUser.css';
import '../../assets/css/cssRecruitment/recruitment.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function DialogAddUserForm({ token, onAdd }) {
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            roles: [],
            status: true
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30, 'Không quá 30 ký tự')
                .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỶỸửữựỳỵỷỹ\s@]+$/
                , 'Vui lòng nhập tên hợp lệ')
                .required('Tên không được bỏ trống'),
            email: Yup.string()
                .email('Email không đúng định dạng')
                .required('Email không được bỏ trống'),
            phone: Yup.string().matches(
                /^(0[3|5|7|8|9])+([0-9]{8})$/,
                'Số điện thoại không hợp lệ'
            ),
            password: Yup.string()
            .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,}$/, 'Mật khẩu phải có ít nhất 8 ký tự và có ít nhất 1 ký tự đặc biệt')
            .required('Mật khẩu không được bỏ trống'),
            roles: Yup.array()
                .min(1, 'Phải chọn ít nhất một vai trò')
                .required('Phải chọn ít nhất một vai trò'),
        }),
        validate: async (values) => {
            const errors = {};
            if (values.phone) {
                try {
                    const response = await axios.get(`http://localhost:8080/admin/users/check-phone/${values.phone}`);
                    if (response.data.exists) {
                        errors.phone = "Số điện thoại đã tồn tại";
                    }
                } catch (error) {
                    errors.phone = "Lỗi khi kiểm tra số điện thoại";
                }
            }

            if (values.email) {
                try {
                    const response = await axios.get(`http://localhost:8080/admin/users/check-email/${values.email}`);
                    if (response.data.exists) {
                        errors.email = "Email đã tồn tại";
                    }
                } catch (error) {
                    errors.email = "Lỗi khi kiểm tra email";
                }
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const userData = {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    password: values.password,
                    roles: values.roles,
                    status: values.status
                };

                const response = await axios.post('http://localhost:8080/admin/users/add', userData);

                if (response.status === 201) {
                    enqueueSnackbar('Thêm thành công!', { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                    onAdd();
                    setOpen(false);
                } else {
                    enqueueSnackbar("Thêm thất bại: Lỗi không xác định từ máy chủ.", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 3000 });
                }
            } catch (error) {
                if (error.response) {
                    enqueueSnackbar(`Thêm thất bại: ${error.response.data.message}`, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 3000 });
                }
            }
        },
    });

    // Handle checkbox change
    const handleCheckboxChange = (roleId) => (event) => {
        const updatedRoles = formik.values.roles.slice();
        const roleIndex = updatedRoles.findIndex(role => role.id === roleId);

        if (event.target.checked && roleIndex === -1) {
            updatedRoles.push({ id: roleId });
        } else if (!event.target.checked && roleIndex !== -1) {
            updatedRoles.splice(roleIndex, 1);
        }
        formik.setFieldValue('roles', updatedRoles);
    };

    // Render roles checkboxes
    const RolesCheckboxes = () => (
        <>
            <FormGroup>
                {[
                    { id: 2, label: "Trưởng bộ phận/nhóm" },
                    { id: 3, label: "Quản lý đào tạo" },
                    { id: 4, label: "Kiểm soát chất lượng" },
                    { id: 5, label: "Nhân sự" }
                ].map(role => (
                    <FormControlLabel
                        key={role.id}
                        control={<Checkbox checked={formik.values.roles.some(r => r.id === role.id)} onChange={handleCheckboxChange(role.id)} />}
                        label={<span className="form-label grey-text information-user">{role.label}</span>}
                    />
                ))}
            </FormGroup>
            {formik.touched.roles && formik.errors.roles && (
                <div className="roles-error">{formik.errors.roles}</div>
            )}
        </>
    );

    return (
        // onClick={() => setOpen(true)}
        <>
            <Tooltip title="Thêm người dùng" arrow>
                <button className="btn btn-success" style={{ position: 'absolute', bottom: '0', right: '0' }} onClick={() => setOpen(true)}>
                    <PersonAddIcon sx={{ marginRight: '8px' }} />
                    Thêm người dùng
                </button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{ component: 'form', onSubmit: formik.handleSubmit }}
            >
                <div className='form-add-user' style={{ width: '600px' }}>
                    <DialogTitle style={{ padding: '0' }}><span style={{ fontWeight: '700', fontSize: '32px', marginLeft: '20px' }} className='add-title'>Thêm người dùng</span></DialogTitle>
                    <DialogContent>
                        <div className='form-label-input'>
                            <div className="form-label grey-text information-user">Họ tên:
                                <span style={{ color: 'red' }}> *</span>
                            </div>
                            <TextField
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>
                        <div className='form-label-input'>
                            <div className="form-label grey-text information-user">Mật khẩu:
                                <span style={{ color: 'red' }}> *</span>
                            </div>
                            <TextField
                                name='password'
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </div>
                        <div className='form-label-input'>
                            <div className="form-label grey-text information-user">Email:
                                <span style={{ color: 'red' }}> *</span>
                            </div>
                            <TextField
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className='form-label-input'>
                            <div className="form-label grey-text information-user">Số điện thoại:
                            </div>

                            <TextField
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="form-label grey-text information-user">Vai trò:
                            </div>
                            <div style={{ paddingLeft: '20px' }}>
                                <RolesCheckboxes />
                            </div>
                        </div>
                    </DialogContent>
                    <div className='btn-container-user'>
                        {formik.isValid ? (
                            <Button
                                type="submit"
                                variant="contained"
                                className='send-btn-add-user'
                                style={{ backgroundColor: 'green' }}>
                                Thêm
                            </Button>
                        ) :
                            <Button
                                type="submit"
                                disabled
                                variant="contained"
                                className='send-btn-add-user'
                            >
                                Thêm
                            </Button>
                        }
                    </div>
                </div>
            </Dialog>
        </>
    );
}
