import React, { useState, useEffect } from 'react'
import { Eye, Download, Maximize2, X, Brain, TrendingUp } from 'lucide-react'
import GradCAMHeatmap from './charts/GradCAMHeatmap'
import SHAPBarChart from './charts/SHAPBarChart'

interface LastMRIData {
  originalImage: string
  overlaidImage: string
  prediction: {
    class: string
    confidence: number
  }
  gradCAM: any
  shap: any
  timestamp: Date
}

interface LastMRIAnalysisProps {
  className?: string
}

export default function LastMRIAnalysis({ className = '' }: LastMRIAnalysisProps) {
  const [lastAnalysis, setLastAnalysis] = useState<LastMRIData | null>(null)
  const [showFullView, setShowFullView] = useState(false)
  const [activeTab, setActiveTab] = useState<'heatmap' | 'shap'>('heatmap')

  useEffect(() => {
    // Check for stored analysis data
    const storedAnalysis = localStorage.getItem('lastMRIAnalysis')
    if (storedAnalysis) {
      try {
        const data = JSON.parse(storedAnalysis)
        setLastAnalysis({
          ...data,
          timestamp: new Date(data.timestamp)
        })
      } catch (error) {
        console.error('Error parsing stored analysis:', error)
      }
    }

    // Listen for new analysis results
    const handleNewAnalysis = (event: CustomEvent) => {
      const analysisData = event.detail
      setLastAnalysis({
        ...analysisData,
        timestamp: new Date()
      })
      
      // Store in localStorage
      localStorage.setItem('lastMRIAnalysis', JSON.stringify({
        ...analysisData,
        timestamp: new Date().toISOString()
      }))
    }

    window.addEventListener('mriAnalysisComplete' as any, handleNewAnalysis)
    return () => {
      window.removeEventListener('mriAnalysisComplete' as any, handleNewAnalysis)
    }
  }, [])

  const downloadImage = (imageData: string, filename: string) => {
    const link = document.createElement('a')
    link.href = imageData
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  if (!lastAnalysis) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Analysis</h3>
          <p className="text-gray-600 text-sm">
            Upload and analyze an MRI image to see results here
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Last MRI Analysis</h3>
            <p className="text-sm text-gray-600">{formatTimeAgo(lastAnalysis.timestamp)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => downloadImage(lastAnalysis.overlaidImage, 'mri-heatmap.png')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Download heatmap"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowFullView(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="View full analysis"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Heatmap Preview */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Grad-CAM Heatmap</h4>
            <div 
              className="relative bg-black rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setShowFullView(true)}
            >
              <img
                src={lastAnalysis.overlaidImage}
                alt="MRI with Grad-CAM overlay"
                className="w-full h-32 object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Prediction Summary */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Prediction</h4>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{lastAnalysis.prediction.class}</span>
                <span className="text-lg font-bold text-blue-600">
                  {lastAnalysis.prediction.confidence.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${lastAnalysis.prediction.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowFullView(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Full Analysis →
          </button>
        </div>
      </div>

      {/* Full View Modal */}
      {showFullView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">MRI Analysis Results</h2>
                <p className="text-sm text-gray-600">
                  {lastAnalysis.prediction.class} - {lastAnalysis.prediction.confidence.toFixed(1)}% confidence
                </p>
              </div>
              <button
                onClick={() => setShowFullView(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('heatmap')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'heatmap'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Grad-CAM Heatmap
              </button>
              <button
                onClick={() => setActiveTab('shap')}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'shap'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                SHAP Analysis
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'heatmap' && (
                <div className="space-y-6">
                  {/* Full Size Heatmap */}
                  <div className="text-center">
                    <div className="inline-block bg-black rounded-lg p-4">
                      <img
                        src={lastAnalysis.overlaidImage}
                        alt="Full MRI with Grad-CAM overlay"
                        className="max-w-full max-h-96 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Grad-CAM Component */}
                  <GradCAMHeatmap data={lastAnalysis.gradCAM} />
                </div>
              )}

              {activeTab === 'shap' && (
                <div>
                  <SHAPBarChart data={lastAnalysis.shap} />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Analysis completed {formatTimeAgo(lastAnalysis.timestamp)}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => downloadImage(lastAnalysis.overlaidImage, 'mri-heatmap.png')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Heatmap</span>
                </button>
                <button
                  onClick={() => setShowFullView(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}