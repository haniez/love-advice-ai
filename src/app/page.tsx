"use client";

import { useState } from "react";

interface Advice {
  summary: string;
  emotions: string[];
  whatToDo: string;
  whatToAvoid: string;
  exampleMessage: string;
}

export default function Home() {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshot(e.target.files[0]);
    }
  };

  const getAdvice = () => {
    if (!screenshot) {
      setError("Please upload a screenshot first.");
      setAdvice(null);
      return;
    }
    
    setLoading(true);
    setError("");
    setAdvice(null);

    setTimeout(() => {
      setAdvice({
        summary: "The conversation seems a bit tense, with one person appearing defensive and the other frustrated.",
        emotions: ["Frustration", "Anxiety", "Defensiveness"],
        whatToDo: "Create a calm and open environment for conversation. Use 'I' statements to express your feelings without blaming.",
        whatToAvoid: "Don't make assumptions or accuse the other person. Avoid bringing up past issues that aren't relevant.",
        exampleMessage: "Hey, I feel like we might be misunderstanding each other. Can we talk about it when you have a moment? I want to make sure we're on the same page."
      });
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-800">
            Get Calm, Honest Relationship Advice
            </h1>
            <p className="text-slate-500 mt-4 text-lg">
            Upload a screenshot of a conversation, and our AI will provide gentle, insightful advice.
            </p>
        </header>

        <div className="mb-6">
          <label
            htmlFor="screenshot"
            className="mb-3 block text-base font-medium text-slate-700"
          >
            Upload Screenshot
          </label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-base text-slate-500
              file:mr-5 file:rounded-full file:border-0
              file:bg-indigo-50 file:py-3 file:px-5
              file:text-sm file:font-semibold
              file:text-indigo-700 hover:file:bg-indigo-100 transition-colors duration-200
            "
          />
        </div>

        {error && <p className="mb-4 text-center text-red-500 text-sm">{error}</p>}

        <button
          onClick={getAdvice}
          disabled={loading}
          className="w-full rounded-full bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Get Advice"}
        </button>

        {loading && (
          <div className="text-center mt-8">
            <p className="text-slate-500">Analyzing your conversation with care...</p>
          </div>
        )}

        {advice && !loading && (
          <div className="mt-8 rounded-xl bg-slate-50 p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                <span className="mr-2">📝</span> Situation Summary
              </h2>
              <p className="text-slate-600 leading-relaxed mt-2">{advice.summary}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                <span className="mr-2">🧐</span> Emotions Detected
              </h2>
              <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
                {advice.emotions.map((emotion, index) => (
                  <li key={index}>{emotion}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                <span className="mr-2">👍</span> What to Do
              </h2>
              <p className="text-slate-600 leading-relaxed mt-2">{advice.whatToDo}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                <span className="mr-2">👎</span> What to Avoid
              </h2>
              <p className="text-slate-600 leading-relaxed mt-2">{advice.whatToAvoid}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center">
                <span className="mr-2">💬</span> Example Message
              </h2>
              <p className="text-slate-600 leading-relaxed mt-2 italic bg-slate-100 p-4 rounded-lg">"{advice.exampleMessage}"</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
