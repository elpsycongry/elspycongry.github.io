import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/login/login";
import {SnackbarProvider} from "notistack";
import HomePage from "./components/homePage/homePage";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/login"} element={<SnackbarProvider><Login/></SnackbarProvider>}/>
                <Route path={"/home"} element={<SnackbarProvider><HomePage/></SnackbarProvider>}/>
            </Routes>
        </>
    );
}

export default App;
