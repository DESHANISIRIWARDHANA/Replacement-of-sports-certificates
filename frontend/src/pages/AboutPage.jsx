const AboutPage = ({ imageUrl }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg p-8 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="About Us"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">ABOUT US</h2>
          <p className="text-gray-700 mb-4">
            We understand the importance of sports certificates in recognizing
            and celebrating the achievements of athletes. Whether it’s for
            scholarships, career opportunities, or personal milestones, these
            certificates are a vital part of an athlete’s journey. However, we
            also recognize that losing or damaging these important documents
            can be a frustrating and time-consuming experience.
          </p>
          <p className="text-gray-700 mb-4">
            That’s why we’ve developed the Sports Certificate Replacement
            System, a secure, efficient, and user-friendly platform designed to
            simplify the process of replacing lost or damaged sports
            certificates.
          </p>
          <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-4">OUR MISSION</h2>
          <p className="text-gray-700">
            Our mission is to empower athletes and sports organizations by
            providing a reliable and efficient solution for replacing sports
            certificates. We believe that no one should miss out on
            opportunities due to lost or damaged documents, and we’re here to
            help you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
