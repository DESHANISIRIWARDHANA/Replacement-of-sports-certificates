import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Certificate from './pages/requestCertificates/Certificate';
// import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
