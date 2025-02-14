import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Certificate from './pages/requestCertificates/Certificate';
import CertificateDetails from './pages/requestCertificates/CertificateDetails';
import ApplyRequestCertificatePage from './pages/ApplyRequestCertificatePage';
// import Navbar from './components/Navbar';

const volleyballImageUrl="https://s3-alpha-sig.figma.com/img/7043/3437/f735a6d5371f7616d4e1ec2a38029456?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ob4LVnCtmW-ujP9ffpli13ESvh4AJLHA5SfxsTfPZgVy2AUnxhwbnDyR9NFnh0weKWH~RuJbvz~bjp6c4nkxH8cFWHUx1Hw119oBIFIvr7J3vGikigXJec7aahgphqPr3oZ9GrCAEaphu3vCFwRKKahO6LAczJFlsEL3PcIXcre2qu35yublajRp0ff58UfT7domG-MxFJPCZtFRo1dhLN0DLHvZhAtEisYbsjcC1XieUcyYdwivUH7ug9p3i~2QVNNibLYa9qLtwMEYFQ~aypaZfIK3scUzSE4MI~AsqbKstrClur8sDhESug0hv5LuFMuDr0bFlXLDgpxOpAwizw__";
function App() {

  return (
    <>
      <BrowserRouter>
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
