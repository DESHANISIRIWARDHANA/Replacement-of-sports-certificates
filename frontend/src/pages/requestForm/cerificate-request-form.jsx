"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const CertificateRequestForm = () => {
  const [activeStep, setActiveStep] = useState("personal"); // personal, certificate, upload, review
  const [formData, setFormData] = useState({
    fullName: "",
    facultyName: "",
    studentId: "",
    dateOfBirth: "",
    address: "",
    email: "",
    phoneNumber: "",
    eventName: "",
    certificateType: "",
    dateOfIssue: "",
    reason: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    certificate: null,
    id: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.size > 3 * 1024 * 1024) {
      // 3MB limit
      alert("File size must be less than 3MB");
      e.target.value = "";
      return;
    }
    setUploadedFiles((prevState) => ({
      ...prevState,
      [type]: file,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("facultyName", formData.facultyName);
    formDataToSend.append("studentId", formData.studentId);
    formDataToSend.append("dob", formData.dateOfBirth);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("certificateType", formData.certificateType);
    formDataToSend.append("dateIssued", formData.dateOfIssue);
    formDataToSend.append("reason", formData.reason);
    formDataToSend.append("oldDocumentCopy", uploadedFiles.certificate);
    formDataToSend.append("NIC", uploadedFiles.id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/certificates/request",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Request submitted successfully:", response.data);
      // Handle success (e.g., show a success message, redirect to another page, etc.)
    } catch (error) {
      console.error("Error submitting request:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const renderPersonalDetails = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Student Details</h2>
      <div>
        <label className="block text-sm mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">Faculty Name</label>
        <input
          type="text"
          name="facultyName"
          value={formData.facultyName}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Date Of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
          />
        </div>
      </div>
    </div>
  );

  const renderCertificateDetails = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Certificate Details</h2>
      <div>
        <label className="block text-sm mb-2">Event Name</label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">Type Of Certificate</label>
        <input
          type="text"
          name="certificateType"
          value={formData.certificateType}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">Date of Issue</label>
        <input
          type="date"
          name="dateOfIssue"
          value={formData.dateOfIssue}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm mb-2">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-[#f8fafc] border border-gray-200 h-24"
        />
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Document Upload</h2>
      <div>
        <label className="block text-sm mb-2">
          Uploading old certificate copy (if available)
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-[#f8fafc]">
          <div className="flex flex-col items-center">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add pdf/png</span>
          </div>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "certificate")}
            accept=".pdf,.png"
            className="hidden"
            id="certificate-upload"
          />
          <label
            htmlFor="certificate-upload"
            className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100"
          >
            Choose File
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2">Upload ID</label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-[#f8fafc]">
          <div className="flex flex-col items-center">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add pdf/png</span>
          </div>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, "id")}
            accept=".pdf,.png"
            className="hidden"
            id="id-upload"
          />
          <label
            htmlFor="id-upload"
            className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100"
          >
            Choose File
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Each document must be less than 3MB in size
        </p>
      </div>
    </div>
  );

  const renderReviewSubmit = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Request Information</h3>
        <div className="space-y-2">
          <p>Name: {formData.fullName}</p>
          <p>Student ID: {formData.studentId}</p>
          <p>Certificate Type: {formData.certificateType}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="terms" className="mr-2" />
        <label htmlFor="terms" className="text-sm">
          I Agree with Terms & Conditions
        </label>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case "personal":
        return renderPersonalDetails();
      case "certificate":
        return renderCertificateDetails();
      case "upload":
        return renderDocumentUpload();
      case "review":
        return renderReviewSubmit();
      default:
        return null;
    }
  };

  const renderNavigation = () => (
    <div className="flex justify-between mt-6">
      <button
        onClick={() => {
          if (activeStep === "certificate") setActiveStep("personal");
          if (activeStep === "upload") setActiveStep("certificate");
          if (activeStep === "review") setActiveStep("upload");
        }}
        className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
        style={{ visibility: activeStep === "personal" ? "hidden" : "visible" }}
      >
        Back
      </button>
      <div className="flex gap-4">
        {activeStep === "review" && (
          <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
            Print
          </button>
        )}
        <button
          onClick={() => {
            if (activeStep === "personal") setActiveStep("certificate");
            if (activeStep === "certificate") setActiveStep("upload");
            if (activeStep === "upload") setActiveStep("review");
            if (activeStep === "review") {
              handleSubmit();
            }
          }}
          className={`px-6 py-2 rounded ${
            activeStep === "review"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-[#40b66b] text-white hover:bg-[#40b66b]/90"
          }`}
        >
          {activeStep === "review" ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-40">
      <div className="flex mb-8">
        <div className="w-64 pr-8 border-r">
          <nav className="space-y-2">
            <div
              className={`p-2 rounded ${
                activeStep === "personal" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Personal Details
            </div>
            <div
              className={`p-2 rounded ${
                activeStep === "certificate" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Certificate Details
            </div>
            <div
              className={`p-2 rounded ${
                activeStep === "upload" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Document Upload
            </div>
            <div
              className={`p-2 rounded ${
                activeStep === "review" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Review & Submit
            </div>
          </nav>
        </div>
        <div className="flex-1 pl-8">
          {renderStepContent()}
          {renderNavigation()}
        </div>
      </div>
    </div>
  );
};

export default CertificateRequestForm;
