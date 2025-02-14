/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";
import placeholderImage from "../../assets/images/Certificate.png";

function CertificateDetails() {
  const { certificate_id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [image, setImage] = useState(placeholderImage);

  useEffect(() => {
    // Fetch certificate details from the backend
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/admin/certificate/${certificate_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCertificate(response.data.certificate);
      })
      .catch((error) => {
        console.error("Error fetching certificate details:", error);
      });
  }, [certificate_id]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.certificate_url;
    link.download = `${certificate.title}.pdf`; // You can change the file extension if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!certificate) {
    return <div>No certificate details available.</div>;
  }

  return (
    <div className="p-5">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <MdArrowBackIosNew className="text-xl" />
        <h1 className="text-3xl font-bold">{certificate.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-black py-1">
              Certificate Name
            </label>
            <input
              type="text"
              className="w-full p-2 border bg-[#EDF6F5] border-[#B9D8DB] rounded-lg focus:ring focus:ring-[#B9D8DB] text-[15px] text-black"
              value={certificate.full_name}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black py-1">
              Sport Name
            </label>
            <input
              type="text"
              className="w-full p-2 border bg-[#EDF6F5] border-[#B9D8DB] rounded-lg focus:ring focus:ring-[#B9D8DB] text-[15px] text-black"
              value={certificate.event_name}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black py-1">
              Place
            </label>
            <input
              type="text"
              className="w-full p-2 border bg-[#EDF6F5] border-[#B9D8DB] rounded-lg focus:ring focus:ring-[#B9D8DB] text-[15px] text-black"
              value={certificate.place}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black py-1">
              Issue Date
            </label>
            <input
              type="text"
              className="w-full p-2 border bg-[#EDF6F5] border-[#B9D8DB] rounded-lg focus:ring focus:ring-[#B9D8DB] text-[15px] text-black"
              value={certificate.date_issued}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full p-2 border bg-[#EDF6F5] border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={certificate.reason}
              readOnly
            ></textarea>
          </div>

          <button
            className="bg-[#67CDCD] text-white py-2 px-4 rounded-lg w-fit"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        <div className="flex justify-center rounded-md">
          <img
            src={image}
            aria-label={certificate.title}
            className="w-[500px] h[400]- mt-4 rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default CertificateDetails;
