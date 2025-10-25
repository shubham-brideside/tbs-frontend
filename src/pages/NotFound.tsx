import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a href="/" className="text-blue-600 hover:text-blue-800 underline">
          Go back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
