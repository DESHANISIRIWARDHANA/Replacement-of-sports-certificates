export default function ApplyRequestCertificatePage({ volleyballImageUrl }) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
        
        <div className="lg:w-1/2 text-center lg:text-left p-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#67CDCD] mb-4 text-center">
            Request a Replacement Certificate
          </h1>
          <p className="text-black mb-6 text-center">
            The Request Certificate Page allows users to apply for a replacement<br/>
            of lost or damaged sports certificates through a structured and user-<br/>
            friendly process. It includes a multi-step form to collect necessary<br/>
            details, verify documents, and submit requests efficiently.<br/>
            The system ensures secure data submission, real-time validation, and tracking<br/>
            capabilities.
          </p>
          <div className="flex justify-center w-full">
          <button className="bg-[#67CDCD] hover:bg-teal-600 text-black px-6 py-3 rounded-lg shadow-md mt-4">
            Request Now
          </button>
        </div>
        </div>
  
        
        <div className="lg:w-1/2 flex items-center justify-center overflow-hidden">
          <img
            src={volleyballImageUrl}
            alt="Volleyball Player Jumping"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
  