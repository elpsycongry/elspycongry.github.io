import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/login/login";
import HomePage from './components/homePage/homePage';
function App() {
  return (
    <>
      <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
