import React from "react";
import { AnswerChecker } from "../components/AnswerChecker";

function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">AI Answer Checker</h1>
          <p className="mt-3 text-xl text-gray-500">Upload an answer sheet PDF and get AI-verified results</p>
        </div>

        <AnswerChecker />
      </div>
    </main>
  );
}

export default Home;
