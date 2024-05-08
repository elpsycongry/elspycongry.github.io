import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
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

export default function Login() {
  const [visible, setVisible] = React.useState(true)
    const firstRender = React.useRef(true)
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      passwordInput: data.get('password'),
    });
  };

    // Ép buộc component re-render
    const [, forceRender] = React.useReducer(x => x + 1, 0);

    // Validation
    const [flagValidate, setFlagValidate] = React.useState({
        validEmail: false,
        validPass: false,
    })


    // Hàm kiểm tra email
    let checkEmail = (value) => {
        let patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (value.match(patternEmail)){
            setFlagValidate({...flagValidate, validEmail : true})
        } else {
            setFlagValidate({...flagValidate, validEmail : false})
        }
    }

    // Hàm kiểm tra pass
    let checkPass = (value) => {
        let patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        if (value.match(patternPassword)){
            setFlagValidate({...flagValidate, validPass: true})
        } else {
            setFlagValidate({...flagValidate, validPass: false})
        }
    }

    // Disabled submit nếu một trong các flag là false
    const validForm = Object.values(flagValidate).some(value => !value);

    // Tạo các ref dể lấy giá trị của input nếu cần
    const emailInput = React.useRef();
    const passwordInput = React.useRef();
    const submitButton = React.useRef()

    // Chạy hàm check cho lần chạy đầu tiên
    React.useEffect(() => {
        firstRender.current=false
    }, []);

    console.log("ok")


    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"

              placeholder="Example123@gmail.com"
              inputRef={emailInput}
              onChange={(e) => checkEmail(e.currentTarget.value)}
              // onChange={checkValidate}
              error={!firstRender.current && !flagValidate.validEmail }
              helperText={!firstRender.current && !flagValidate.validEmail ? "Không đúng định dạng email" : null}
              // onFocus={(e) => checkEmail(e.currentTarget.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={visible ? "password" : "text"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: <EndAdorment visible={visible} setVisible={setVisible} />
              }}

              placeholder={"Example123"}
              inputRef={passwordInput}
              error={!firstRender.current && !flagValidate.validPass}
              onChange={(e) => checkPass(e.currentTarget.value)}
              // onChange={checkValidate}
              helperText={!firstRender.current && !flagValidate.validPass ? "Mật khẩu phải ít nhất 8 ký tự và có viết hoa, thường và số" : null}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={firstRender.current || validForm}
              ref={submitButton}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}