import React from 'react'
import { Brain, Sparkles, Eye, BarChart3 } from 'lucide-react'
import AutoMRIDemo from '../AutoMRIDemo'

export default function AIExplanationDemo() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-purple-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            AI Explanation Demo
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience our explainable AI system in action with automatic MRI analysis, 
          Grad-CAM visualizations, and SHAP feature importance explanations.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
          <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Deep Learning Analysis
          </h3>
          <p className="text-gray-600 text-sm">
            ResNet50-based CNN analyzes MRI scans with 75.47% accuracy across 4 dementia stages
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
          <Eye className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Grad-CAM Visualization
          </h3>
          <p className="text-gray-600 text-sm">
            Visual heatmaps show exactly which brain regions the AI focuses on for predictions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
          <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            SHAP Explanations
          </h3>
          <p className="text-gray-600 text-sm">
            Quantitative feature importance scores explain how each factor contributes to the prediction
          </p>
        </div>
      </div>

      {/* Main Demo */}
      <AutoMRIDemo />

      {/* Technical Information */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          About This Demo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You're Seeing</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Automatic selection and analysis of a sample MRI scan from our dataset</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Real-time Grad-CAM heatmap generation showing model attention</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>SHAP feature importance analysis with risk/protective factors</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Confidence scores and detailed technical metrics</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Significance</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Provides transparent, interpretable AI decisions for healthcare professionals</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Enables validation of AI reasoning against clinical knowledge</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Supports early detection and intervention planning</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Builds trust through explainable AI methodology</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
            Model Performance Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">75.47%</p>
              <p className="text-sm text-gray-600">Overall Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">78.95%</p>
              <p className="text-sm text-gray-600">Macro F1-Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">2.3s</p>
              <p className="text-sm text-gray-600">Avg Processing</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">1,280</p>
              <p className="text-sm text-gray-600">Training Samples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}