import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-500">Terms & Conditions</h1>
      <div className="prose">
        <p className="mb-4">
          By using Pack2Go, you agree to the terms and conditions outlined below. These govern your access and use of our services, including bookings, payments, and communication.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Bookings & Payments</h2>
        <p className="mb-4">
          All tour bookings are subject to availability. Once confirmed, cancellations or changes may incur fees. Payment must be made through our secure portal at the time of booking.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for providing accurate information and ensuring your account details are secure. Misuse of our platform may result in account suspension.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Liability</h2>
        <p className="mb-4">
          Pack2Go acts as an intermediary between users and tour providers. We are not responsible for any damages, losses, or issues that occur during your trip.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Policy Updates</h2>
        <p className="mb-4">
          We may update these terms periodically. Continued use of our platform after changes means you accept the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>
          For any questions regarding these terms, email us at: support@pack2go.com
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
