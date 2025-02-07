import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import StudentDetailsForm from "./pages/StudentDetailsForm";
import ReplacementCertificateForm from './pages/ReplacementCertificateForm';
// import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalDetails" element={<StudentDetailsForm />} />
        <Route path="/ReplacementCertificateForm" element={<ReplacementCertificateForm />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
