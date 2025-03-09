"use client";

import { useState } from "react";

const VerifyCertificate = () => {
  const [request_id, setRequestId] = useState("");
  const [requestDetails, setRequestDetails] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (event) => {
    setRequestId(event.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!request_id) {
      alert("Please enter a request ID");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setRequestDetails(null);
    setCertificateDetails(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/certificates/request/verify/${request_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.requestDetails.status === "approved") {
          setRequestDetails(result.requestDetails);
          setCertificateDetails(result.requestDetails); // Assuming certificate details are part of request details
        } else {
          setErrorMessage("Your certificate is not verified");
        }
      } else {
        setErrorMessage(
          result.message || "An error occurred while verifying the certificate"
        );
      }
    } catch (error) {
      console.error("Error fetching request details:", error);
      setErrorMessage("An error occurred while verifying the certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg border-none overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <h1 className="text-3xl font-bold">Certificate Verification</h1>
            </div>
            <p className="text-blue-100 text-center">
              Enter your certificate ID to verify its authenticity
            </p>
          </div>

          {/* Content */}
          <div className="pt-6 px-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Certificate ID"
                  value={request_id}
                  onChange={handleInputChange}
                  className="w-full h-12 text-lg px-4 pr-10 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="m9 15 3-3 3 3"></path>
                    <path d="M9 18h6"></path>
                  </svg>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    Verify
                  </div>
                )}
              </button>
            </div>

            {loading && (
              <div className="space-y-3 py-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 mb-5 p-5 rounded-lg bg-red-50 border border-red-200 animate-[fadeIn_0.5s_ease-in-out]">
                <div className="flex items-center text-red-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                  <h3 className="text-xl font-semibold">Verification Failed</h3>
                </div>
                <p className="text-red-600">{errorMessage}</p>
              </div>
            )}

            {requestDetails && certificateDetails && (
              <div className="mt-4 animate-[fadeIn_0.5s_ease-in-out]">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 text-green-700 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-700 ml-3">
                    Certificate Verified!
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Request Information Card */}
                  <div className="border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 p-4 pb-2 rounded-t-lg">
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <path d="M14 2v6h6"></path>
                          <path d="m9 15 3-3 3 3"></path>
                          <path d="M9 18h6"></path>
                        </svg>
                        Request Information
                      </h3>
                    </div>
                    <div className="p-4">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Full Name:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {requestDetails.full_name}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Email:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {requestDetails.email}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Reason:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {requestDetails.reason}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Status:
                          </dt>
                          <dd>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {requestDetails.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Certificate Details Card */}
                  <div className="border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 p-4 pb-2 rounded-t-lg">
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        Certificate Details
                      </h3>
                    </div>
                    <div className="p-4">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            NIC:
                          </dt>
                          <dd className="text-sm font-semibold flex items-center">
                            {certificateDetails.nic}
                            <button
                              className="ml-1 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={() =>
                                copyToClipboard(certificateDetails.nic)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Name:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {certificateDetails.full_name}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Meet:
                          </dt>
                          <dd className="text-sm font-semibold ">
                            {certificateDetails.meet}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Age Group:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {certificateDetails.ageGroup}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Place:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {certificateDetails.place}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">
                            Birth Certificate:
                          </dt>
                          <dd className="text-sm font-semibold">
                            {certificateDetails.birthCertNumber}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* Certificate Link */}
                <div className="mt-6 mb-5">
                  <div className="border-blue-200 bg-blue-50 rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        <span className="font-medium text-blue-700">
                          View Your Certificate
                        </span>
                      </div>
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105"
                        onClick={() =>
                          window.open(
                            certificateDetails.certificate_url,
                            "_blank"
                          )
                        }
                      >
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-center border-t p-4 text-sm text-gray-500">
            {copied && (
              <span className="text-green-600 animate-[fadeIn_0.5s_ease-in-out]">
                Copied to clipboard!
              </span>
            )}
            {!copied &&
              "All certificate information is securely verified through our system"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
