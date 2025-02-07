import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import StudentDetailsForm from "./pages/StudentDetailsForm";
import ReplacementCertificateForm from './pages/ReplacementCertificateForm';
import AboutPage from './pages/AboutPage';
// import Navbar from './components/Navbar';

function App() {

  const imageUrl = "https://s3-alpha-sig.figma.com/img/d497/3986/87e79d837c3f075d753f05da0bb4633d?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gGrmsgQ5FbUNY17iRItwB4Daf7nBTTLwMpmtpvv0T1xXmG-61AIR85Bz49FgisHwoDdeeJPHCD2~1yunyzo9h6E0Eei2WYylZKP6uDzgU42rDWnUiu64v8HXXtsY1qAzZk6vS12DA6WYBYR9AGq5gzU9mclTf8U-3~YNh~wZTCFKwd9b4D8hJvMc3JQTtny4mkTd1X5wmEhoo9~M4BL2vHI6OSdcylqKrQFTUWMfEAFripCfnX~W6XaMeHXqKXadF74Te0Yp86HhSAX5KNchdZGtBPNyYZHcxC7dOQIvKmpwMbSJgeyHACEzNzYMCBEvr7r1gBIu89ZYKYVn8f1Fjg__";

  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalDetails" element={<StudentDetailsForm />} />
        <Route path="/ReplacementCertificateForm" element={<ReplacementCertificateForm />} />
        <Route path="/Aboutme" element={<AboutPage imageUrl={imageUrl} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
