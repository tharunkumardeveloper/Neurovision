import { useState } from 'react'
import { TrendingUp, BarChart3, PieChart } from 'lucide-react'
import PerformanceChart from '../charts/PerformanceChart'
import ConfusionMatrix from '../charts/ConfusionMatrix'
import ClassificationReport from '../charts/ClassificationReport'
import TrainingCurves from '../charts/TrainingCurves'
import { modelPerformanceResults, confusionMatrixData, trainingHistory } from '../../lib/modelResults'

export default function ModelPerformanceTab() {
  const [selectedMatrix, setSelectedMatrix] = useState('ensemble')

  const performanceData = [
    {
      model: modelPerformanceResults.mriCNN.name,
      accuracy: modelPerformanceResults.mriCNN.accuracy,
      macroF1: modelPerformanceResults.mriCNN.macroF1,
      weightedF1: modelPerformanceResults.mriCNN.weightedF1,
      trainingTime: `${modelPerformanceResults.mriCNN.trainingTime} min`,
      color: 'blue'
    },
    {
      model: modelPerformanceResults.genomicXGB.name,
      accuracy: modelPerformanceResults.genomicXGB.accuracy,
      macroF1: modelPerformanceResults.genomicXGB.macroF1,
      weightedF1: modelPerformanceResults.genomicXGB.weightedF1,
      trainingTime: `${modelPerformanceResults.genomicXGB.trainingTime} min`,
      color: 'purple'
    },
    {
      model: modelPerformanceResults.ensemble.name,
      accuracy: modelPerformanceResults.ensemble.accuracy,
      macroF1: modelPerformanceResults.ensemble.macroF1,
      weightedF1: modelPerformanceResults.ensemble.weightedF1,
      trainingTime: `${modelPerformanceResults.ensemble.trainingTime} min`,
      improvement: `+${modelPerformanceResults.ensemble.improvement.accuracyVsMRI.toFixed(2)}%`,
      color: 'green'
    }
  ]

  const confusionMatrices = {
    ensemble: confusionMatrixData.ensemble,
    mri: confusionMatrixData.mriCNN
  }

  const getMatrixColor = (value: number) => {
    if (value >= 90) return 'bg-green-500'
    if (value >= 80) return 'bg-green-400'
    if (value >= 70) return 'bg-yellow-400'
    if (value >= 60) return 'bg-orange-400'
    return 'bg-red-400'
  }

  return (
    <div className="space-y-8">
      {/* Performance Comparison Table */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Performance Comparison</h2>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Model</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Accuracy</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Macro F1</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Weighted F1</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Training Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {performanceData.map((model, index) => (
                  <tr key={index} className={model.model.includes('ENSEMBLE') ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${model.color}-500`}></div>
                        <span className="font-medium text-gray-900">{model.model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${model.model.includes('ENSEMBLE') ? 'text-green-600' : 'text-gray-900'}`}>
                        {model.accuracy.toFixed(2)}%
                        {model.improvement && (
                          <span className="ml-2 text-sm text-green-600">({model.improvement})</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${model.model.includes('ENSEMBLE') ? 'text-green-600' : 'text-gray-900'}`}>
                        {model.macroF1.toFixed(2)}%
                        {model.model.includes('ENSEMBLE') && (
                          <span className="ml-2 text-sm text-green-600">(+7.25%)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${model.model.includes('ENSEMBLE') ? 'text-green-600' : 'text-gray-900'}`}>
                        {model.weightedF1.toFixed(2)}%
                        {model.model.includes('ENSEMBLE') && (
                          <span className="ml-2 text-sm text-green-600">(+3.27%)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{model.trainingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Key Insight:</strong> Ensemble achieves +3.23% accuracy improvement through multi-modal fusion, 
              with particularly strong Macro F1 (+7.25%) showing better class balance
            </p>
          </div>
        </div>
      </div>

      {/* Confusion Matrices */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Confusion Matrices</h2>
          <div className="flex space-x-2">
            {Object.entries(confusionMatrices).map(([key, matrix]) => (
              <button
                key={key}
                onClick={() => setSelectedMatrix(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMatrix === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {matrix.name}
              </button>
            ))}
          </div>
        </div>

        <ConfusionMatrix
          matrix={confusionMatrices[selectedMatrix as keyof typeof confusionMatrices].matrix}
          classNames={confusionMatrices[selectedMatrix as keyof typeof confusionMatrices].classNames}
          title={`${confusionMatrices[selectedMatrix as keyof typeof confusionMatrices].name} - Confusion Matrix`}
        />
      </div>

      {/* Classification Reports */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Classification Reports</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <ClassificationReport
            metrics={modelPerformanceResults.mriCNN.classificationReport.metrics}
            overallAccuracy={modelPerformanceResults.mriCNN.classificationReport.overallAccuracy}
            macroAvg={modelPerformanceResults.mriCNN.classificationReport.macroAvg}
            weightedAvg={modelPerformanceResults.mriCNN.classificationReport.weightedAvg}
            title="MRI CNN Model Report"
          />
          
          <ClassificationReport
            metrics={modelPerformanceResults.ensemble.classificationReport.metrics}
            overallAccuracy={modelPerformanceResults.ensemble.classificationReport.overallAccuracy}
            macroAvg={modelPerformanceResults.ensemble.classificationReport.macroAvg}
            weightedAvg={modelPerformanceResults.ensemble.classificationReport.weightedAvg}
            title="Ensemble Model Report"
          />
        </div>
      </div>

      {/* Performance Comparison Chart */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Comparison</h2>
        <PerformanceChart data={performanceData} />
      </div>

      {/* Training Curves */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Training History</h2>
        <TrainingCurves 
          data={trainingHistory}
          title="MRI CNN Training Progress"
        />
      </div>

      {/* Key Insights */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Insights</h2>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Strengths</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>MCI Detection:</strong> Perfect 100% precision and recall across all models</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Ensemble Advantage:</strong> +1.31% Macro F1 improvement over MRI CNN</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Class Balance:</strong> Ensemble shows better macro averaging (80.26%)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Class Imbalance:</strong> MCI (15 samples) vs Mild AD (629 samples)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Normal Classification:</strong> Lowest precision (71.08%) in ensemble</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Moderate AD:</strong> Challenging recall (75.16%) for severe cases</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Clinical Impact:</h4>
            <p className="text-sm text-gray-700">
              The ensemble model's superior macro F1 score (80.26%) indicates better balanced performance across all disease stages, 
              which is crucial for clinical applications where missing any stage could have significant consequences for patient care.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}