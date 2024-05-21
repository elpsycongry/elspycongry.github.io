import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/css/index.css'
import Test from './components/Recruitment/test'
import PersonalNeeds from './components/Recruitment/personalNeeds';
import CandidateManagement from './components/Recruitment/candidateManagement';
import RecruitmentPlan from './components/Recruitment/recruitmentPlan';
function App() {
  return (
    <>
      <Routes>
        <Route path='/recruitment/personalNeeds' element={<PersonalNeeds />} />
        <Route path='/recruitment/candidateManagement' element={<CandidateManagement />} />
        <Route path='/recruitment/recruitmentPlan' element={<RecruitmentPlan />} />
        <Route path='/' element={<Test />} />
      </Routes>
    </>

  );
}

export default App;
