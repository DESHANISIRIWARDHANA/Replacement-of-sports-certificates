import { useLocation, useParams } from "react-router-dom";

function CertificateDetails() {
    const { id } = useParams(); 
  const location = useLocation();
  const certificate = location.state || { title: id };

  if (!certificate) {
    return <div>No certificate details available.</div>;
  }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{certificate.title}</h1>
      <p className="text-gray-600">{certificate.date}</p>
      <img
        src={certificate.image}
        alt={certificate.title}
        className="w-[400px]  mt-4 rounded-md"
      />
    </div>
  );
}

export default CertificateDetails;
