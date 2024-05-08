import './App.css';
import { Route, Routes } from 'react-router-dom';
import PersonalNeeds from './components/Recruitment/personalNeeds';
import './assets/css/index.css'
import Test from './components/Recruitment/test'
function App() {
  return (
    <>
      <Routes>
        <Route  path='/recruitment' element={<PersonalNeeds/>}/>
        <Route  path='/' element={<Test/>}/>
      </Routes>
    </>

  );
}

export default App;
