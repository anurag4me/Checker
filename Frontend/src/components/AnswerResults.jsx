import React from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function AnswerResults({ results }) {
  const percentage = Math.round((results.score / (results.totalQuestions * 10)) * 100)

  const getGradeLabel = (percentage) => {
    if (percentage >= 90) return "Excellent"
    if (percentage >= 80) return "Very Good"
    if (percentage >= 70) return "Good"
    if (percentage >= 60) return "Satisfactory"
    if (percentage >= 50) return "Pass"
    return "Needs Improvement"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partially-correct":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "incorrect":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-100 text-green-800"
      case "partially-correct":
        return "bg-amber-100 text-amber-800"
      case "incorrect":
        return "bg-red-100 text-red-800"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{results.score}</span>
              <span className="ml-1 text-gray-500">/ {results.totalQuestions * 10}</span>
            </div>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {getGradeLabel(percentage)}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Performance</h3>
            <div className="space-y-4">
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-700">{percentage}% overall accuracy</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Answer Breakdown</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded-md">
                <p className="text-xl font-bold text-green-600">{results.correctAnswers}</p>
                <p className="text-xs text-gray-600">Correct</p>
              </div>
              <div className="bg-amber-50 p-2 rounded-md">
                <p className="text-xl font-bold text-amber-600">{results.partiallyCorrect}</p>
                <p className="text-xs text-gray-600">Partial</p>
              </div>
              <div className="bg-red-50 p-2 rounded-md">
                <p className="text-xl font-bold text-red-600">{results.incorrectAnswers}</p>
                <p className="text-xs text-gray-600">Incorrect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Detailed Analysis</h3>
        {results.questions.map((question) => (
          <details
            key={question.id}
            className="border rounded-lg overflow-hidden open:ring-2 open:ring-blue-200"
          >
            <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center space-x-3">
              {getStatusIcon(question.status)}
              <div>
                <div className="font-medium">Question {question.id}</div>
                <div className="text-sm text-gray-500 truncate max-w-md">
                  {question.question}
                </div>
              </div>
              <span
                className={`ml-auto text-xs px-2 py-1 rounded ${getStatusColor(
                  question.status
                )}`}
              >
                {question.score} / {question.maxScore}
              </span>
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Question:</p>
                <p className="text-sm text-gray-900">{question.question}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Your Answer:</p>
                  <p className="text-sm text-gray-900 p-3 bg-gray-50 rounded-md">
                    {question.userAnswer}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Correct Answer:</p>
                  <p className="text-sm text-gray-900 p-3 bg-green-50 rounded-md">
                    {question.correctAnswer}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Feedback:</p>
                <p className="text-sm text-gray-900">{question.feedback}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
