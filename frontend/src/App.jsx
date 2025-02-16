import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import StudentDetailsForm from "./pages/StudentDetailsForm";
import ReplacementCertificateForm from "./pages/ReplacementCertificateForm";

import Certificate from "./pages/requestCertificates/Certificate";
import CertificateDetails from "./pages/requestCertificates/CertificateDetails";

import AdminProfile from "./pages/Admin/AdminProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddNewAdmin from "./pages/Admin/AddNewAdmin";
import StudentDetails from "./pages/Admin/StudentDetails";
import CertificationDetails from "./pages/Admin/CertificationDetails";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyCert from "./pages/VerifyCertificate";
import PersonalDetails from "./components/PersonalDetails";

import CertificateRequestForm from "../src/pages/requestForm/cerificate-request-form";

import ApplyRequestCertificatePage from "./pages/ApplyRequestCertificatePage";

const volleyballImageUrl =
  "https://s3-alpha-sig.figma.com/img/7043/3437/f735a6d5371f7616d4e1ec2a38029456?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ob4LVnCtmW-ujP9ffpli13ESvh4AJLHA5SfxsTfPZgVy2AUnxhwbnDyR9NFnh0weKWH~RuJbvz~bjp6c4nkxH8cFWHUx1Hw119oBIFIvr7J3vGikigXJec7aahgphqPr3oZ9GrCAEaphu3vCFwRKKahO6LAczJFlsEL3PcIXcre2qu35yublajRp0ff58UfT7domG-MxFJPCZtFRo1dhLN0DLHvZhAtEisYbsjcC1XieUcyYdwivUH7ug9p3i~2QVNNibLYa9qLtwMEYFQ~aypaZfIK3scUzSE4MI~AsqbKstrClur8sDhESug0hv5LuFMuDr0bFlXLDgpxOpAwizw__";

const imageUrl =
  "https://s3-alpha-sig.figma.com/img/d497/3986/87e79d837c3f075d753f05da0bb4633d?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gGrmsgQ5FbUNY17iRItwB4Daf7nBTTLwMpmtpvv0T1xXmG-61AIR85Bz49FgisHwoDdeeJPHCD2~1yunyzo9h6E0Eei2WYylZKP6uDzgU42rDWnUiu64v8HXXtsY1qAzZk6vS12DA6WYBYR9AGq5gzU9mclTf8U-3~YNh~wZTCFKwd9b4D8hJvMc3JQTtny4mkTd1X5wmEhoo9~M4BL2vHI6OSdcylqKrQFTUWMfEAFripCfnX~W6XaMeHXqKXadF74Te0Yp86HhSAX5KNchdZGtBPNyYZHcxC7dOQIvKmpwMbSJgeyHACEzNzYMCBEvr7r1gBIu89ZYKYVn8f1Fjg__";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* common */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* athlete ....................................................................*/}
        <Route path="/" element={<Home />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route
          path="/replacement-certificate"
          element={<ReplacementCertificateForm />}
        />
        <Route path="/about" element={<AboutPage imageUrl={imageUrl} />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route
          path="/request-certificate"
          element={<CertificateRequestForm />}
        />
        <Route
          path="/admin/certificate/:certificate_id"
          element={<CertificationDetails />}
        />
        {/* admin .........................................................................*/}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/verifycert" element={<VerifyCert />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-admin" element={<AddNewAdmin />} />
        <Route path="/student-details" element={<PersonalDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/certification" element={<CertificationDetails />} />
        <Route
          path="/apply-request-certificate"
          element={
            <ApplyRequestCertificatePage
              volleyballImageUrl={volleyballImageUrl}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
