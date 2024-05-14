import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/pages/login/login";
import HomePage from "./components/pages/homePage/homePage";
import Users from "./components/users/users";
import AuthContext from "./components/checkToken/AuthContext";
import GuestPage from "./components/pages/GuestPage/guestPage";
import NotFoundPage from "./components/pages/NotFoundPage/notFoundPage";
import Training from './components/training/training';
import './assets/css/index.css'
function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <AuthContext><Users /></AuthContext>
                } />
                <Route path={"/users"} element={
                    <AuthContext><Users /></AuthContext>
                } />
                <Route path={"/login"} element={
                    <AuthContext> <Login /></AuthContext>
                } />
                <Route path={"/guest"} element={
                    <AuthContext> <GuestPage /></AuthContext>
                } />
                <Route path={"/*"} element={
                    <AuthContext></AuthContext>
                } />
                <Route path={"/notFound"} element={
                    <NotFoundPage />
                } />
                <Route path={"/training"} element={
                    <AuthContext><Training /></AuthContext>
                } />
            </Routes>
        </>
    )
}

export default App;
