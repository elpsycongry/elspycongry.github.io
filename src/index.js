import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import AuthContext from "./components/checkToken/AuthContext";
import {SnackbarProvider} from "notistack";
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider  autoHideDuration={1500} anchorOrigin={{vertical: "top", horizontal: "right"}}>
        <BrowserRouter >
            <GoogleOAuthProvider clientId="1026149724502-sfvljrh0assd45c3k5m5dbnkntfsu3n1.apps.googleusercontent.com">
                 <App />
            </GoogleOAuthProvider>;
        </BrowserRouter>
    </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
