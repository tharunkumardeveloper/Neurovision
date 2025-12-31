import React from 'react'

interface ClassMetrics {
  className: string
  precision: number
  recall: number
  f1Score: number
  support: number
}

interface ClassificationReportProps {
  metrics: ClassMetrics[]
  overallAccuracy: number
  macroAvg: { precision: number; recall: number; f1Score: number }
  weightedAvg: { precision: number; recall: number; f1Score: number }
  title: string
}

export default function ClassificationReport({ 
  metrics, 
  overallAccuracy, 
  macroAvg, 
  weightedAvg, 
  title 
}: ClassificationReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50'
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Class</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">Precision</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">Recall</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">F1-Score</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">Support</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-2 font-medium text-gray-900">{metric.className}</td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(metric.precision)}`}>
                    {(metric.precision * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(metric.recall)}`}>
                    {(metric.recall * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(metric.f1Score)}`}>
                    {(metric.f1Score * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-2 text-center text-gray-600">{metric.support}</td>
              </tr>
            ))}
            
            {/* Separator */}
            <tr><td colSpan={5} className="py-2"></td></tr>
            
            {/* Overall Accuracy */}
            <tr className="bg-blue-50">
              <td className="py-3 px-2 font-semibold text-blue-900">Accuracy</td>
              <td colSpan={3} className="py-3 px-2 text-center">
                <span className="px-3 py-1 rounded bg-blue-100 text-blue-800 font-semibold">
                  {(overallAccuracy * 100).toFixed(2)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center text-blue-700">
                {metrics.reduce((sum, m) => sum + m.support, 0)}
              </td>
            </tr>
            
            {/* Macro Average */}
            <tr className="bg-purple-50">
              <td className="py-3 px-2 font-semibold text-purple-900">Macro Avg</td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(macroAvg.precision)}`}>
                  {(macroAvg.precision * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(macroAvg.recall)}`}>
                  {(macroAvg.recall * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(macroAvg.f1Score)}`}>
                  {(macroAvg.f1Score * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center text-purple-700">
                {metrics.reduce((sum, m) => sum + m.support, 0)}
              </td>
            </tr>
            
            {/* Weighted Average */}
            <tr className="bg-green-50">
              <td className="py-3 px-2 font-semibold text-green-900">Weighted Avg</td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(weightedAvg.precision)}`}>
                  {(weightedAvg.precision * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(weightedAvg.recall)}`}>
                  {(weightedAvg.recall * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(weightedAvg.f1Score)}`}>
                  {(weightedAvg.f1Score * 100).toFixed(1)}%
                </span>
              </td>
              <td className="py-3 px-2 text-center text-green-700">
                {metrics.reduce((sum, m) => sum + m.support, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}