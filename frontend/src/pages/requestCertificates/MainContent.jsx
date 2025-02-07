/* eslint-disable react/prop-types */
import ChooseCertificate from "../../components/ChooseCertificate";
import PersonalDetails from "../../components/PersonalDetails";

function MainContent({ selectedPage }) {

  const renderContent = () => {
    switch (selectedPage) {
      case "Personal Details":
        return <PersonalDetails />;
      case "Certificates":
        return <ChooseCertificate />;
      default:
        return <ChooseCertificate />;
    }
  };
  return  <div className="p-5">{renderContent()}</div>;
}

export default MainContent;
