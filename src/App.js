import './App.css';
import { Route, Routes } from 'react-router-dom';
import PersonalNeeds from './components/Recruitment/personalNeeds';
import './assets/css/index.css'
function App() {
  return (
    <>
      <Routes>
        <Route  path='/recruitment' element={<PersonalNeeds/>}/>
      </Routes>
    </>

  );
}

export default App;
