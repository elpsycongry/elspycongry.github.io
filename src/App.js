import './App.css';
import { Route, Routes } from 'react-router-dom';
import './assets/css/index.css'
import Test from './components/Recruitment/test'
import PersonalNeeds from './components/Recruitment/personalNeeds';
import CandidateManagement from './components/Recruitment/candidateManagement';
function App() {
  return (
    <>
      <Routes>
        <Route path='/recruitment/personalNeeds' element={<PersonalNeeds />} />
        <Route path='/recruitment/candidateManagement' element={<CandidateManagement />} />
        <Route path='/' element={<Test />} />
      </Routes>
    </>

  );
}

export default App;
