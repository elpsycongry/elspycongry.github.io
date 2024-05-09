import './App.css';
import { Route, Routes } from 'react-router-dom';
import PersonalNeeds from './components/Recruitment/personalNeeds';
import './assets/css/index.css'
import Test from './components/Recruitment/test'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PersonalNeeds/>}/>
      </Routes>
    </>

  );
}

export default App;
