import React from 'react';

const SafetyGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Safety Guidelines</h1>
      <div className="prose">
        <p className="mb-4">
          Your safety is our top priority. We work closely with trusted partners to ensure every trip is safe, comfortable, and enjoyable. Please read these guidelines carefully before traveling.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Before Your Trip</h2>
        <p className="mb-4">
          Verify your booking details, carry valid ID, and inform a family member or friend about your travel plans. Ensure you understand the health protocols and requirements of your destination.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">During Your Tour</h2>
        <p className="mb-4">
          Always follow the guide’s instructions and local laws. Avoid risky areas and never leave your group without informing someone. Keep emergency contacts with you at all times.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Health Precautions</h2>
        <p className="mb-4">
          Stay hydrated, take necessary medications, and follow hygiene practices. If you feel unwell, notify your guide immediately.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Emergency Support</h2>
        <p className="mb-4">
          In case of any emergency, contact our 24/7 support team. We’re here to assist you throughout your journey.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>
          For safety questions or concerns, email us at: safety@pack2go.com
        </p>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
