import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy of Specialized Air Services
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">1. General Provisions</h2>
          <p className="text-gray-600 mt-2">
            This Privacy Policy (hereinafter referred to as the "Policy") describes how Specialized Air Services
            (hereinafter referred to as the "Company," "we," "us") collects, uses, stores, and protects users'
            personal data (hereinafter referred to as the "User," "you").
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">2. What Data We Collect</h2>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Contact details (full name, phone number, e-mail)</li>
            <li>Licensing and professional information (pilot license, ratings, flight hours, certificates)</li>
            <li>Medical information (class of medical certificate)</li>
            <li>Information on citizenship and visa status</li>
            <li>Technical data (IP address, device information, cookies)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">3. Purpose of Data Collection</h2>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Reviewing applications and selecting candidates</li>
            <li>Communicating with you regarding employment opportunities</li>
            <li>Verifying licenses, ratings, and qualifications</li>
            <li>Complying with legal and aviation regulatory requirements</li>
            <li>Improving service quality and security</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">4. Data Sharing with Third Parties</h2>
          <p className="text-gray-600 mt-2">
            We do not share your personal data with third parties without your consent, except in cases where:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Required by aviation regulators (EASA, FAA, etc.)</li>
            <li>Necessary for legal compliance</li>
            <li>Engaging partners and service providers for data processing</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">5. Data Protection</h2>
          <p className="text-gray-600 mt-2">
            We take all reasonable measures to protect your data from unauthorized access, modification, or destruction.
            Access to data is restricted only to employees who need it to perform their job duties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">6. Data Retention Period</h2>
          <p className="text-gray-600 mt-2">
            We retain your personal data for the period necessary to fulfill processing purposes but no longer than
            12 months after application submission unless otherwise required by law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">7. Your Rights</h2>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of data</li>
            <li>Withdraw consent for data processing</li>
            <li>File a complaint with regulatory authorities in case of rights violations</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">8. Contact Information</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions regarding the processing of your personal data, please contact us:
          </p>
          <p className="text-gray-600 font-semibold">Specialized Air Services</p>
          <p className="text-gray-600">E-mail: [specify contact email]</p>
          <p className="text-gray-600">Phone: [specify phone number]</p>
        </section>

        <p className="text-sm text-gray-500 text-center mt-6">
          This Policy may be updated, and changes will take effect upon publication on our website.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
