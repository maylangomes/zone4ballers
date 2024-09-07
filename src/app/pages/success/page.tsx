'use client';

import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <svg
          className="w-16 h-16 text-teal-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-2xl font-bold text-teal-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your payment has been successfully
          processed.
        </p>

        <button
          onClick={() => router.push('/')}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
