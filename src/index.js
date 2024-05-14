import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import AuthContext from "./components/checkToken/AuthContext";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider style={{ marginTop: '60px' , marginRight: '18px'}} autoHideDuration={1500} anchorOrigin={{vertical: "top", horizontal: "right"}}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
