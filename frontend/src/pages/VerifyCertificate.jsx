import React, { useState } from "react";

const VerifyCertificate = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("certificate", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error("Error uploading certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Upload Certificate
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload and Verify"}
        </button>

        {prediction && (
          <div
            className={`mt-4 p-3 text-lg font-semibold text-center rounded-md ${
              prediction === "Real"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            Prediction: {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
