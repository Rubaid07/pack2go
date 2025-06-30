import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Privacy Policy</h1>
      <div className="prose">
        <p className="mb-4">
          At Pack2Go, we are committed to safeguarding your privacy. This policy outlines how we collect, use, and protect your personal data while you use our tour management services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We may collect your name, email, phone number, location, and payment details when you sign up, book a tour, or contact our support. We also use cookies and analytics tools to improve our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          Your information is used to personalize your experience, process bookings securely, communicate with you about your trips, and enhance our platform based on usage patterns.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Data Protection</h2>
        <p className="mb-4">
          We use industry-standard encryption and security practices to protect your data. However, please understand that no system is completely foolproof on the internet.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Involvement</h2>
        <p className="mb-4">
          Some of our services are integrated with trusted third parties like payment gateways and travel providers. We ensure they also comply with strict privacy standards.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Your Control</h2>
        <p className="mb-4">
          You have the right to access, edit, or delete your personal information. Contact our support team anytime to make such requests.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>
          For any privacy concerns, please reach out to us at: privacy@pack2go.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
