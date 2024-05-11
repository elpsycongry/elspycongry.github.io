import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/login/login";

import {SnackbarProvider} from "notistack";
import HomePage from "./components/homePage/homePage";
import Users from "./components/users/users";
import CheckToken from "./components/checkToken/checkToken";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/home"} element={
                    <CheckToken>
                        <SnackbarProvider>
                            <HomePage/>
                        </SnackbarProvider>
                    </CheckToken>}/>
                <Route path={"/users"} element={
                    <CheckToken>
                        <SnackbarProvider>
                            <Users/>
                        </SnackbarProvider>
                    </CheckToken>
                }/>
                <Route path={"/login"} element={<SnackbarProvider><Login/></SnackbarProvider>}/>
            </Routes>
        </>
    )
}

export default App;
