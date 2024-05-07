import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/navbar/navbar'
import ButtonAppBarTest from './components/navbar/navbar'
import Footer from './components/footer/footer';
import Header from './components/header/header'
import { Box, Toolbar, Typography } from '@mui/material';
function App() {
  return (
    <>
      <Header />
      <ButtonAppBarTest/>
      <Footer/>
    </>

  );
}

export default App;
