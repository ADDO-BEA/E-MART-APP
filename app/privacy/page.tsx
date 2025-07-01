// pages/privacy.tsx

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal
        information.
      </p>
      <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following information when you use our website:
        <ul className="list-disc pl-6">
          <li>Personal details (e.g., name, email address)</li>
          <li>Usage data (e.g., pages visited, time spent on the site)</li>
          <li>Cookies and tracking information</li>
        </ul>
      </p>
      <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        The information we collect may be used to:
        <ul className="list-disc pl-6">
          <li>Improve your experience on our website</li>
          <li>Send updates or promotional content</li>
          <li>Analyze website usage and trends</li>
        </ul>
      </p>
      <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties, except as required by law or for the
        operation of our website.
      </p>
      <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance your experience. You can choose to disable cookies in your browser settings,
        but some features may not function properly.
      </p>
      <h2 className="text-2xl font-semibold mb-2">5. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy, please contact us at{' '}
        <a href="mailto:info@example.com" className="text-blue-500 underline">
          edwinaaddo9@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
