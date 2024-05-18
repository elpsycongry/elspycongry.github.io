import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/pages/login/login";
import Users from "./components/users/users";
import AuthContext from "./components/checkToken/AuthContext";
import NotFoundPage from "./components/pages/NotFoundPage/notFoundPage";
import Training from './components/training/training';
import HomePage from "./components/pages/homePage/homePage";
import {InternPage} from "./components/pages/InternPage/Internpage";
import './assets/css/index.css'
import TrainingStats from './components/stats/trainingStats/trainingStats';
function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <AuthContext><HomePage /></AuthContext>
                } />
                <Route path={"/users"} element={
                    <AuthContext><Users /></AuthContext>
                } />
                <Route path={"/intern/:id"} element={
                    <AuthContext><InternPage /></AuthContext>
                } />
                <Route path={"/login"} element={
                    <AuthContext> <Login /></AuthContext>
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
                <Route path={"/training/stats"} element={
                    <AuthContext><TrainingStats /></AuthContext>
                }>

                </Route>
            </Routes>
        </>
    )
}

export default App;
