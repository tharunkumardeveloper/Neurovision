import { TrendingUp, Users, Clock, Zap, Brain, Database } from 'lucide-react'

export default function OverviewTab() {
  const kpiData = [
    { label: 'Total Patients Analyzed', value: '6,400', icon: Users, color: 'blue' },
    { label: 'MRI Dataset Accuracy', value: '72.3%', icon: Brain, color: 'green' },
    { label: 'Genomic Dataset Accuracy', value: '61.8%', icon: Database, color: 'purple' },
    { label: 'Ensemble Performance Boost', value: '+3.2%', icon: TrendingUp, color: 'emerald' },
    { label: 'Active Models', value: '3', icon: Zap, color: 'orange' },
    { label: 'Average Prediction Time', value: '3.2s', icon: Clock, color: 'red' }
  ]

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, icon: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-600' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: 'text-emerald-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-600' }
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon
            const colors = getColorClasses(kpi.color)
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                    <p className={`text-3xl font-bold mt-2 ${colors.text}`}>{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* System Architecture */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Input Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">INPUT LAYER</h3>
              <div className="flex justify-center space-x-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 w-48">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800">MRI Scan</h4>
                  <p className="text-sm text-blue-600">224x224x3 RGB Image</p>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 w-48">
                  <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-800">Genomic Data</h4>
                  <p className="text-sm text-purple-600">130 Features</p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="text-gray-400">↓</div>
            </div>

            {/* Processing Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">PROCESSING LAYER</h3>
              <div className="flex justify-center space-x-8">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 w-48">
                  <div className="font-semibold text-green-800">ResNet50 CNN</div>
                  <p className="text-sm text-green-600">Frozen + Fine-tuned</p>
                  <p className="text-xs text-green-500 mt-2">Output: 4 probabilities</p>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 w-48">
                  <div className="font-semibold text-orange-800">XGBoost Classifier</div>
                  <p className="text-sm text-orange-600">300 trees</p>
                  <p className="text-xs text-orange-500 mt-2">Output: 9 probabilities</p>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="text-gray-400">↓</div>
            </div>

            {/* Fusion Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">FUSION LAYER</h3>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 w-64 mx-auto">
                <div className="font-semibold text-indigo-800">Logistic Regression</div>
                <p className="text-sm text-indigo-600">Meta-Learner (Ensemble Fusion)</p>
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="text-gray-400">↓</div>
            </div>

            {/* Output Layer */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">OUTPUT LAYER</h3>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>• Predicted Stage</div>
                  <div>• Confidence Score</div>
                  <div>• Risk Level</div>
                  <div>• Grad-CAM Visualization</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Modal Components */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Multi-Modal Components</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MRI CNN Module */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">MRI CNN Module</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium">Architecture:</span> ResNet50</div>
              <div><span className="font-medium">Input:</span> 224x224 RGB MRI</div>
              <div><span className="font-medium">Accuracy:</span> 72.3%</div>
              <div><span className="font-medium">Training:</span> 45 min</div>
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <div className="text-xs text-blue-800">
                  <strong>Key Features:</strong><br/>
                  • Frozen layers: conv1-layer3<br/>
                  • Fine-tuned: layer4<br/>
                  • Early stopping: patience=5
                </div>
              </div>
            </div>
          </div>

          {/* Genomic XGBoost Module */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Genomic XGBoost</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium">Trees:</span> 300</div>
              <div><span className="font-medium">Max Depth:</span> 6</div>
              <div><span className="font-medium">Accuracy:</span> 61.8%</div>
              <div><span className="font-medium">Training:</span> 12 min</div>
              <div className="bg-purple-50 p-3 rounded-lg mt-4">
                <div className="text-xs text-purple-800">
                  <strong>Key Features:</strong><br/>
                  • 130 genomic markers<br/>
                  • APOE variants included<br/>
                  • 5-fold cross-validation
                </div>
              </div>
            </div>
          </div>

          {/* Ensemble Meta-Learner */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Ensemble Meta-Learner</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium">Algorithm:</span> Logistic Regression</div>
              <div><span className="font-medium">Input:</span> 13 features</div>
              <div><span className="font-medium">Accuracy:</span> 75.5%</div>
              <div><span className="font-medium">Improvement:</span> +3.2%</div>
              <div className="bg-green-50 p-3 rounded-lg mt-4">
                <div className="text-xs text-green-800">
                  <strong>Performance:</strong><br/>
                  • Macro F1: 80.3%<br/>
                  • Weighted F1: 75.7%<br/>
                  • Soft voting strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Summary */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dataset Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">MRI Dataset</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Samples:</span>
                <span className="font-semibold">6,400 scans</span>
              </div>
              <div className="flex justify-between">
                <span>Training Set:</span>
                <span>5,120 images (80%)</span>
              </div>
              <div className="flex justify-between">
                <span>Test Set:</span>
                <span>1,280 images (20%)</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span>224x224 RGB</span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-800">
                  <strong>Class Distribution (Balanced):</strong><br/>
                  Normal: 1,280 train / 320 test<br/>
                  MCI: 1,280 train / 320 test<br/>
                  Mild AD: 1,280 train / 320 test<br/>
                  Moderate AD: 1,280 train / 320 test
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Genomic Dataset</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Samples:</span>
                <span className="font-semibold">6,346 individuals</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span>130 genomic markers</span>
              </div>
              <div className="flex justify-between">
                <span>Training Set:</span>
                <span>5,076 samples (80%)</span>
              </div>
              <div className="flex justify-between">
                <span>Test Set:</span>
                <span>1,270 samples (20%)</span>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-purple-800">
                  <strong>Key Features:</strong><br/>
                  • APOE variants<br/>
                  • Chromosome 19 markers<br/>
                  • Inflammatory pathways<br/>
                  • 266 imputed missing values
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}