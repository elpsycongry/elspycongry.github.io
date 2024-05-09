import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/login/login";

import {SnackbarProvider} from "notistack";
import HomePage from "./components/homePage/homePage";
import Users from "./components/users/users";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/home"} element={<SnackbarProvider><HomePage/></SnackbarProvider>}/>
                <Route path={"/login"} element={<SnackbarProvider><Login/></SnackbarProvider>}/>
                <Route path={"/users"} element={<SnackbarProvider><Users/></SnackbarProvider>}/>
            </Routes>
        </>
    )
}

export default App;
