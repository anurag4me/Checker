import React, { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { AnswerResults } from "./AnswerResults"
import { data } from "../lib/dataset"

export function AnswerChecker() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("idle")
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setError(null)
    } else {
      setFile(null)
      setError("Please upload a valid PDF file")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    try {
      setStatus("uploading")
      setProgress(0)

      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(uploadInterval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearInterval(uploadInterval)
      setProgress(100)

      setStatus("processing")

      const formData = new FormData();
      formData.append("answer", file);

      try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/uploads`, {
          method: "POST",
          body: formData,
      });
      const data = await res.json();
      console.log("Server Response:", data);
      } catch (err) {
      console.error("Error submitting form", err);
      }
        
      setResults({
        score: 75,
        totalQuestions: 10,
        correctAnswers: 6,
        partiallyCorrect: 2,
        incorrectAnswers: 2,
        questions: data,
      })
      setStatus("complete")
    } catch (err) {
      setStatus("error")
      setError("An error occurred while processing your file. Please try again.")
      console.error(err)
    }
  }

  const resetForm = () => {
    setFile(null)
    setStatus("idle")
    setProgress(0)
    setResults(null)
    setError(null)
  }

  return (
    <div className="space-y-8">
      {status !== "complete" ? (
        <div className="p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Upload Answer Sheet</h2>
              <p className="text-sm text-gray-500">Upload a PDF file containing the answer sheet to be verified</p>
            </div>

            {status === "idle" && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-900">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF (up to 10MB)</p>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {(status === "uploading" || status === "processing") && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{file?.name}</p>
                    <p className="text-xs text-gray-500">
                      {status === "uploading" ? "Uploading..." : "Processing with AI..."}
                    </p>
                  </div>
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {status === "uploading" ? "Uploading file..." : "Analyzing answers..."}
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={status === "uploading" || status === "processing"}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file || status === "uploading" || status === "processing"}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {status === "uploading"
                  ? "Uploading..."
                  : status === "processing"
                  ? "Processing..."
                  : "Verify Answers"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Analysis Complete</h2>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Check Another File
            </button>
          </div>

          <AnswerResults results={results} />
        </div>
      )}
    </div>
  )
}
