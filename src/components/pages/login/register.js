import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import logoImage from '../../../assets/image/logoCodeGym.png';
import { useState } from "react";
import Link from 'axios';

function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/public">
                Quản lý đào tạo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Show and hide password
const EndAdorment = ({ visible, setVisible }) => {
    return (
        <InputAdornment position='end'>
            <IconButton onClick={() => setVisible(!visible)}>
                {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
        </InputAdornment>
    )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Register() {
    const [visible, setVisible] = React.useState(true)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        setFlagValidate({ ...flagValidate, validSubmit: false })
        const formData = new FormData(event.currentTarget);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        axios.post("http://localhost:8080/register", data).then(
            res => {
                if (res.data.code === "401") {
                    enqueueSnackbar(res.data.msg, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
                }
                if (res.data.code === "200") {
                    localStorage.setItem("currentUser", JSON.stringify(res.data.data))
                    enqueueSnackbar('Đăng nhập thành công !', { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                    navigate("/users")
                }
                if (res.data.code === "202") {
                    enqueueSnackbar(res.data.msg, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
                }
                setFlagValidate({ ...flagValidate, validSubmit: true })
            }
        ).catch(reason => {
            enqueueSnackbar("Có lỗi ở phía máy chủ", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 3000 });
            setFlagValidate({ ...flagValidate, validSubmit: true })
        })
    };

    // Ép buộc component re-render
    const [, forceRender] = React.useReducer(x => x + 1, 0);

    // Validation
    const [flagValidate, setFlagValidate] = React.useState({
        validEmail: false,
        validPass: false,
        validSubmit: true,
        emailError: "Email không được để trống",
        passwordError: "Mật khẩu không được để trống",
    })

    const [showMsg, setShowMsg] = React.useState({
        showEmailError: false,
        showPassError: false,
        showUserNotFoundError: false,
        showSuccesAlert: false,
        showFailAlert: false,
    })


    // Hàm kiểm tra email
    let checkEmail = (value) => {
        let patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (value.match(patternEmail)) {
            setFlagValidate({ ...flagValidate, validEmail: true })
        } else if (value === "") {
            setFlagValidate({ ...flagValidate, validEmail: false, emailError: "Email không được bỏ trống" })
        } else {
            setFlagValidate({ ...flagValidate, validEmail: false, emailError: "Không đúng định dạng email" })
        }
    }

    // Hàm kiểm tra pass
    let checkPass = (value) => {
        let patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
        if (value.match(patternPassword)) {
            setFlagValidate({ ...flagValidate, validPass: true })
        } else if (value === "") {
            setFlagValidate({ ...flagValidate, validPass: false, passwordError: "Mật khẩu không được để trống" })
        } else {
            setFlagValidate({
                ...flagValidate,
                validPass: false,
                passwordError: "Mật khẩu phải ít nhất 8 ký tự và có viết hoa, thường và số"
            })
        }
    }


    // Disabled submit nếu một trong các flag là false
    const validForm = Object.values(flagValidate).some(value => !value);

    // Tạo các ref dể lấy giá trị của input nếu cần
    const emailInput = React.useRef();
    const passwordInput = React.useRef();
    const submitButton = React.useRef();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" style={{ paddingTop: '140px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={{ width: '100px', height: '100px' }} sx={{ m: 1, bgcolor: '#282781' }}>
                        <img src={logoImage} style={{ width: '80px', height: '80px' }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '16px' }}>
                    <Link  ariant="body2">
                        Already have an account? Sign in
                    </Link>
                </Box>

                <div style={{ marginTop: '-70px' }}>
                    <Copyright sx={{ mt: 36, mb: 4 }} />
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default Register;