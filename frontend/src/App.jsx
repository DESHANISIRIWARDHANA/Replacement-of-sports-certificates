import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

import StudentDetailsForm from "./pages/StudentDetailsForm";
import ReplacementCertificateForm from './pages/ReplacementCertificateForm';
import AboutPage from './pages/AboutPage';

import Certificate from './pages/requestCertificates/Certificate';
import CertificateDetails from './pages/requestCertificates/CertificateDetails';
import ApplyRequestCertificatePage from './pages/ApplyRequestCertificatePage';

// import Navbar from './components/Navbar';

const volleyballImageUrl="https://s3-alpha-sig.figma.com/img/7043/3437/f735a6d5371f7616d4e1ec2a38029456?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ob4LVnCtmW-ujP9ffpli13ESvh4AJLHA5SfxsTfPZgVy2AUnxhwbnDyR9NFnh0weKWH~RuJbvz~bjp6c4nkxH8cFWHUx1Hw119oBIFIvr7J3vGikigXJec7aahgphqPr3oZ9GrCAEaphu3vCFwRKKahO6LAczJFlsEL3PcIXcre2qu35yublajRp0ff58UfT7domG-MxFJPCZtFRo1dhLN0DLHvZhAtEisYbsjcC1XieUcyYdwivUH7ug9p3i~2QVNNibLYa9qLtwMEYFQ~aypaZfIK3scUzSE4MI~AsqbKstrClur8sDhESug0hv5LuFMuDr0bFlXLDgpxOpAwizw__";
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

        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/details/:id" element={<CertificateDetails />} />
          <Route path="/ApplyRequestCertificatePage" element={<ApplyRequestCertificatePage volleyballImageUrl={volleyballImageUrl}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
