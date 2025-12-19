"use client";

import { useState } from "react";

export default function Home() {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [advice, setAdvice] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshot(e.target.files[0]);
    }
  };

  const getAdvice = () => {
    if (!screenshot) {
      setError("Please upload a screenshot first.");
      setAdvice("");
      return;
    }
    setError("");
    setAdvice(
      "Based on the conversation, it seems like you should communicate your feelings more openly. Honesty and clear communication are key to a healthy relationship."
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Love Advice AI
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Upload a screenshot of a conversation to get relationship advice.
        </p>

        <div className="mb-4">
          <label
            htmlFor="screenshot"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Screenshot
          </label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-violet-50 file:py-2 file:px-4
              file:text-sm file:font-semibold
              file:text-violet-700 hover:file:bg-violet-100
            "
          />
        </div>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <button
          onClick={getAdvice}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        >
          Get Advice
        </button>

        {advice && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Your Advice
            </h2>
            <p className="text-gray-600">{advice}</p>
          </div>
        )}
      </div>
    </main>
  );
}
