import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/login/login';
import Users from './components/users/users';
import AuthContext from './components/checkToken/AuthContext';
import NotFoundPage from './components/pages/NotFoundPage/notFoundPage';
import Training from './components/training/training';
import HomePage from './components/pages/homePage/homePage';
import { MarkInternModal } from './components/pages/InternPage/markInternModal';
import './assets/css/index.css';
import TrainingStats from './components/stats/trainingStats/trainingStats';
import RecruitmentStats from './components/stats/recruitmentStats/recruitmentStats';
import Test from './components/Recruitment/test';
import PersonalNeeds from './components/Recruitment/personalNeeds';
import CandidateManagement from './components/Recruitment/candidateManagement';
import RecruitmentPlan from './components/Recruitment/recruitmentPlan';
import axiosInstance from './components/checkToken/axiosInstance';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthContext><HomePage /></AuthContext>} />
                <Route path="/users" element={<AuthContext><Users /></AuthContext>} />
                <Route path="/intern" element={<AuthContext><MarkInternModal userID={1} /></AuthContext>} />
                <Route path="/login" element={<AuthContext><Login /></AuthContext>} />
                <Route path="/notFound" element={<NotFoundPage />} />
                <Route path="/training" element={<AuthContext><Training /></AuthContext>} />
                <Route path="/training/stats" element={<AuthContext><TrainingStats /></AuthContext>} />
                <Route path="/recruitment/stats" element={<AuthContext><RecruitmentStats /></AuthContext>} />
                <Route path="/recruitment/personalNeeds" element={<AuthContext><PersonalNeeds /></AuthContext>} />
                <Route path="/recruitment/candidateManagement" element={<AuthContext><CandidateManagement /></AuthContext>} />
                <Route path="/recruitment/recruitmentPlan" element={<AuthContext><RecruitmentPlan /></AuthContext>} />
                <Route path="/" element={<Test />} />
            </Routes>
        </>
    );
}

export default App;
