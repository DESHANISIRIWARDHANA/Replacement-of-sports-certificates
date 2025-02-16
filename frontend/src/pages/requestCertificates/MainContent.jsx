/* eslint-disable react/prop-types */
import { useState } from "react";
import ChooseCertificate from "../../components/ChooseCertificate";
import PersonalDetails from "../../components/PersonalDetails";
import CertificateDetails from "../requestCertificates/CertificateDetails";
import VerifyCertificate from "../VerifyCertificate";

function MainContent({ selectedPage }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const renderContent = () => {
    if (selectedCertificate) {
      return (
        <CertificateDetails
          certificate={selectedCertificate}
          setSelectedCertificate={setSelectedCertificate}
        />
      );
    }

    switch (selectedPage) {
      case "Personal":
        return <PersonalDetails />;
      case "Certificates":
        return (
          <ChooseCertificate setSelectedCertificate={setSelectedCertificate} />
        );
      case "Verify":
        return <VerifyCertificate />;
      default:
        return (
          <ChooseCertificate setSelectedCertificate={setSelectedCertificate} />
        );
    }
  };

  return <div className="p-5">{renderContent()}</div>;
}

export default MainContent;
