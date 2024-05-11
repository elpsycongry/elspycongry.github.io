import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/login/login";
import HomePage from "./components/homePage/homePage";
import Users from "./components/users/users";
import NavigateConfig from "./components/checkToken/navigateConfig";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/home"} element={
                    <NavigateConfig><HomePage/></NavigateConfig>
                }/>
                <Route path={"/users"} element={
                    <NavigateConfig><Users/></NavigateConfig>
                }/>
                <Route path={"/login"} element={
                   <NavigateConfig> <Login/></NavigateConfig>
                }/>
            </Routes>
        </>
    )
}

export default App;
