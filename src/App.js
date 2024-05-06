import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/navbar/navbar'
import Footer from './components/footer/footer';
import Header from './components/header/header'
import { Box, Toolbar, Typography } from '@mui/material';
function App() {
  return (
    <>
      <Header />
      <ButtonAppBar />
      <Footer/>
    </>

  );
}

export default App;
