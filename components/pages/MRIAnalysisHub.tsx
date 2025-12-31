import React, { useState, useRef } from 'react'
import { Upload, Brain, CheckCircle, AlertCircle, Eye, BarChart3, Loader2 } from 'lucide-react'
import { getRandomMRIImages, MRI_CATEGORIES } from '@/lib/dataService'
import MRIUpload from '../MRIUpload'

interface UploadedFile {
  name: string
  type: string
  size: number
  preview?: string
}

export default function MRIAnalysisHub() {
  const [mriFile, setMriFile] = useState<UploadedFile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof MRI_CATEGORIES>('NonDemented')
  const [showResults, setShowResults] = useState(false)

  const mriInputRef = useRef<HTMLInputElement>(null)

  const handleMRIUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const uploadedFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file)
      }
      setMriFile(uploadedFile)
      setShowResults(true) // Show results after upload
    }
  }

  const handleProcessMRI = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setMriFile(null)
    setShowResults(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-10 h-10 text-purple-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            MRI Analysis Hub
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Upload your MRI scan and get comprehensive AI analysis with Grad-CAM visualizations and SHAP explanations
        </p>
      </div>

      {!showResults ? (
        /* Upload Section */
        <div className="space-y-8">
          {/* MRI Upload */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Upload MRI Scan</h2>
            </div>

            {!mriFile ? (
              <div
                onClick={() => mriInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <p className="text-xl font-medium text-gray-700 mb-3">
                  Click to upload your MRI scan
                </p>
                <p className="text-gray-500 mb-4">
                  Supports DICOM, NIfTI, JPG, PNG files (max 50MB)
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </div>
                <input
                  ref={mriInputRef}
                  type="file"
                  accept=".dcm,.nii,.nii.gz,.jpg,.jpeg,.png"
                  onChange={handleMRIUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border border-green-300 rounded-lg p-6 bg-green-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                      <div>
                        <p className="text-lg font-medium text-green-800">{mriFile.name}</p>
                        <p className="text-green-600">
                          {(mriFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  {mriFile.preview && (
                    <div className="mt-4">
                      <img
                        src={mriFile.preview}
                        alt="MRI Preview"
                        className="w-full max-w-md mx-auto h-64 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleProcessMRI}
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    Analyze MRI with AI
                  </button>
                  <p className="text-gray-600 mt-3">
                    This will generate Grad-CAM heatmaps and SHAP explanations
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Comprehensive MRI Gallery */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MRI Dataset Gallery</h3>
              <p className="text-gray-600">Browse sample MRI scans from our research dataset across different dementia stages</p>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as keyof typeof MRI_CATEGORIES)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>

            {/* Selected Category Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {MRI_CATEGORIES[selectedCategory].label}
              </h4>
              <p className="text-gray-600 text-sm">
                {selectedCategory === 'NonDemented' && 'Normal cognitive function with no signs of dementia. These scans show healthy brain structure with minimal atrophy.'}
                {selectedCategory === 'VeryMildDemented' && 'Very mild cognitive decline (CDR 0.5). Early signs of memory issues but daily functioning remains largely intact.'}
                {selectedCategory === 'MildDemented' && 'Mild dementia (CDR 1). Noticeable memory and cognitive problems that interfere with daily activities.'}
                {selectedCategory === 'ModerateDemented' && 'Moderate dementia (CDR 2). Significant cognitive decline requiring assistance with daily activities and care.'}
              </p>
            </div>

            {/* MRI Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getRandomMRIImages(selectedCategory, 4).map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                    <img
                      src={image.path}
                      alt={`MRI ${image.category}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
                      <p className="font-semibold text-sm mb-1">{MRI_CATEGORIES[image.category].label}</p>
                      <p className="text-xs">ID: {image.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dataset Statistics */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {getRandomMRIImages(key as keyof typeof MRI_CATEGORIES, 1000).length}
                  </p>
                  <p className="text-xs text-gray-600">{value.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Information Panel */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens after upload?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Loader2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">AI Processing</h4>
                <p className="text-sm text-gray-600">
                  Our ResNet50-based CNN analyzes your MRI scan for dementia indicators
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Grad-CAM Visualization</h4>
                <p className="text-sm text-gray-600">
                  See exactly which brain regions the AI focuses on for its prediction
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">SHAP Explanations</h4>
                <p className="text-sm text-gray-600">
                  Understand how different features contribute to the AI's decision
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-8">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Analysis Complete
                </h2>
                <p className="text-gray-600">
                  AI analysis with Grad-CAM visualizations and SHAP explanations
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Upload New MRI
              </button>
            </div>
          </div>

          {/* MRI Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">MRI Analysis Results</h3>
            </div>
            <MRIUpload />
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Model Information</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium">ResNet50-based CNN</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-medium text-blue-600">75.47%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>F1-Score:</span>
                    <span className="font-medium text-green-600">78.95%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-medium">~2.3 seconds</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Explanation Methods</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <Eye className="w-4 h-4 text-green-500 mr-2" />
                    <span>Grad-CAM heatmap visualization</span>
                  </li>
                  <li className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-purple-500 mr-2" />
                    <span>SHAP feature importance analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Confidence score calculation</span>
                  </li>
                  <li className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                    <span>Risk assessment breakdown</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}