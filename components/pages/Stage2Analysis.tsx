'use client'

import { useState } from 'react'
import { Brain, TrendingUp, Upload } from 'lucide-react'
import MRIUpload from '../MRIUpload'
import ModelPerformanceTab from '../tabs/ModelPerformanceTab'
import { MRIInferenceResult } from '../../lib/modelInference'

export default function Stage2Analysis() {
  const [activeTab, setActiveTab] = useState<'upload' | 'performance'>('upload')
  const [uploadResult, setUploadResult] = useState<MRIInferenceResult | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stage 2: Advanced MRI Analysis
        </h1>
        <p className="text-lg text-gray-600">
          Upload MRI images for AI-powered analysis or view model performance metrics
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Upload className="h-5 w-5 inline mr-2" />
              MRI Upload & Analysis
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-5 w-5 inline mr-2" />
              Model Performance
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'upload' && (
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Brain className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                MRI Image Analysis
              </h2>
            </div>
            
            <MRIUpload onResult={setUploadResult} />
          </div>

          {/* Sample Results Section (shown when no upload) */}
          {!uploadResult && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sample Analysis Results from Research
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Sample Analysis #1</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Classification:</strong> Mild AD</div>
                    <div><strong>Confidence:</strong> 82.1%</div>
                    <div><strong>Key Regions:</strong> Hippocampus (67%), Temporal Lobe (58%)</div>
                    <div><strong>SHAP Risk Score:</strong> +0.267</div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Sample Analysis #2</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Classification:</strong> Normal</div>
                    <div><strong>Confidence:</strong> 92.3%</div>
                    <div><strong>Key Regions:</strong> All regions normal (12-23%)</div>
                    <div><strong>SHAP Risk Score:</strong> -0.156</div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Sample Analysis #3</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Classification:</strong> MCI</div>
                    <div><strong>Confidence:</strong> 76.4%</div>
                    <div><strong>Key Regions:</strong> Hippocampus (45%), Temporal (38%)</div>
                    <div><strong>SHAP Risk Score:</strong> +0.234</div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Sample Analysis #4</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Classification:</strong> Moderate AD</div>
                    <div><strong>Confidence:</strong> 88.7%</div>
                    <div><strong>Key Regions:</strong> Severe atrophy (65-89%)</div>
                    <div><strong>SHAP Risk Score:</strong> +0.342</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-center">
                  <strong>Upload your own MRI image above</strong> to see real-time AI analysis with:
                </p>
                <ul className="text-gray-600 text-sm mt-2 space-y-1 text-center">
                  <li>• Grad-CAM attention heatmaps showing brain regions of interest</li>
                  <li>• SHAP feature importance explaining the prediction</li>
                  <li>• Confidence scores and class probabilities</li>
                  <li>• Processing takes 2-5 seconds using our trained ResNet50 model</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'performance' && (
        <div>
          <ModelPerformanceTab />
        </div>
      )}
    </div>
  )
}