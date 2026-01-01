import React, { useState, useCallback, useEffect } from 'react'
import { Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { inferMRIImage, validateMRIFile, validateMRIImageContent, getProcessingStatus, MRIInferenceResult } from '../lib/modelInference'
import GradCAMHeatmap from './charts/GradCAMHeatmap'
import SampleMRIGallery from './SampleMRIGallery'
import SHAPBarChart from './charts/SHAPBarChart'
import { getRandomMRIImages } from '../lib/dataService'

interface MRIUploadProps {
  onResult?: (result: MRIInferenceResult) => void
}

export default function MRIUpload({ onResult }: MRIUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [processingTime, setProcessingTime] = useState(0)
  const [result, setResult] = useState<MRIInferenceResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSamples, setShowSamples] = useState(true)
  const [overlaidImageData, setOverlaidImageData] = useState<string | null>(null)

  useEffect(() => {
    // Listen for overlaid image from GradCAM component
    const handleOverlayReady = (event: CustomEvent) => {
      setOverlaidImageData(event.detail.overlaidImage)
    }

    window.addEventListener('gradcamOverlayReady' as any, handleOverlayReady)
    return () => {
      window.removeEventListener('gradcamOverlayReady' as any, handleOverlayReady)
    }
  }, [])

  // Update the analysis event when overlaid image is ready
  useEffect(() => {
    if (overlaidImageData && result) {
      const analysisData = {
        originalImage: result.gradCAM.originalImage,
        overlaidImage: overlaidImageData,
        prediction: result.prediction,
        gradCAM: result.gradCAM,
        shap: result.shap
      }
      
      const event = new CustomEvent('mriAnalysisComplete', { detail: analysisData })
      window.dispatchEvent(event)
    }
  }, [overlaidImageData, result])

  // Auto-analyze a sample MRI on component mount
  useEffect(() => {
    const autoAnalyzeSample = async () => {
      try {
        // Get a random MRI sample
        const sampleImages = getRandomMRIImages('MildDemented', 1)
        if (sampleImages.length === 0) return

        const sampleImage = sampleImages[0]
        
        // Create a mock file from the sample image
        const response = await fetch(sampleImage.path)
        const blob = await response.blob()
        const file = new File([blob], `sample_${sampleImage.id}.jpg`, { type: 'image/jpeg' })
        
        setUploadedFile(file)
        setProcessing(true)
        setError(null)
        
        // Simulate processing time
        const startTime = Date.now()
        const timer = setInterval(() => {
          setProcessingTime(Date.now() - startTime)
        }, 100)

        // Process the sample image
        const inferenceResult = await inferMRIImage(file)
        
        clearInterval(timer)
        setProcessing(false)
        setResult(inferenceResult)
        
        if (onResult) {
          onResult(inferenceResult)
        }
        
        setShowSamples(false) // Hide samples after auto-analysis
        
      } catch (err) {
        setProcessing(false)
        setError('Failed to auto-analyze sample MRI')
        console.error('Auto-analysis error:', err)
      }
    }

    // Only auto-analyze if no file is uploaded and no result exists
    if (!uploadedFile && !result && !processing) {
      autoAnalyzeSample()
    }
  }, []) // Empty dependency array to run only on mount

  // Handle sample image selection
  const handleSampleImageSelect = async (filename: string) => {
    setError(null)
    setResult(null)
    setShowSamples(false)

    // Create a mock file object for the sample image
    const mockFile = new File([''], filename, { type: 'image/jpeg' })
    setUploadedFile(mockFile)
    setProcessing(true)
    setProcessingTime(0)

    // Start processing timer
    const startTime = Date.now()
    const timer = setInterval(() => {
      setProcessingTime(Date.now() - startTime)
    }, 100)

    try {
      const inferenceResult = await inferMRIImage(mockFile)
      setResult(inferenceResult)
      onResult?.(inferenceResult)
    } catch (err) {
      setError('Failed to process sample MRI image. Please try again.')
    } finally {
      clearInterval(timer)
      setProcessing(false)
    }
  }

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  // Handle file input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Process uploaded file
  const handleFile = async (file: File) => {
    setError(null)
    setResult(null)

    // Basic file validation
    const basicValidation = validateMRIFile(file)
    if (!basicValidation.valid) {
      setError(basicValidation.error!)
      return
    }

    // Show initial processing state for content validation
    setProcessing(true)
    setProcessingTime(0)
    
    try {
      // Enhanced MRI content validation
      const contentValidation = await validateMRIImageContent(file)
      if (!contentValidation.valid) {
        setProcessing(false)
        setError(contentValidation.error!)
        return
      }

      // If validation passes, continue with processing
      setUploadedFile(file)

      // Start processing timer
      const startTime = Date.now()
      const timer = setInterval(() => {
        setProcessingTime(Date.now() - startTime)
      }, 100)

      const inferenceResult = await inferMRIImage(file)
      
      clearInterval(timer)
      setProcessing(false)
      setResult(inferenceResult)
      onResult?.(inferenceResult)
    } catch (err) {
      setProcessing(false)
      setError('Failed to process MRI image. Please try again.')
    }
  }

  // Reset upload
  const resetUpload = () => {
    setUploadedFile(null)
    setResult(null)
    setError(null)
    setProcessing(false)
    setProcessingTime(0)
    setShowSamples(true)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-50 border-green-200'
    if (confidence >= 0.6) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sample Images Gallery (shown before upload) */}
      {showSamples && !processing && !result && (
        <SampleMRIGallery onImageSelect={handleSampleImageSelect} />
      )}

      {/* Upload Area */}
      {!uploadedFile && !processing && !result && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*,.dcm"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Upload Your MRI Brain Scan
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Drag and drop your MRI brain image here, or click to browse
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Supports JPEG, PNG, and DICOM files (max 50MB)
          </p>
          <p className="text-xs sm:text-sm text-orange-600 mt-2 font-medium">
            ⚠️ Only MRI brain scans are supported - other images will be rejected
          </p>
          
          <div className="mt-3 sm:mt-4 text-xs text-gray-400">
            Or use the sample images above to see how the AI analysis works
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-sm sm:text-base">{error}</span>
          </div>
        </div>
      )}

      {/* Processing Status */}
      {processing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500 mr-2 sm:mr-3"></div>
              <span className="text-blue-700 font-medium text-sm sm:text-base">Processing MRI Image...</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{(processingTime / 1000).toFixed(1)}s</span>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-3">
            {getProcessingStatus(processingTime)}
          </div>
          
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (processingTime / 5000) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-4 sm:space-y-6">
          {/* Prediction Results */}
          <div className={`rounded-lg border p-4 sm:p-6 ${getConfidenceBg(result.prediction.confidence)}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Prediction Results</h3>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm text-gray-600">
                  Processed in {(result.processingTime / 1000).toFixed(1)}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Classification</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {result.prediction.class}
                    </span>
                    <span className={`text-base sm:text-lg font-bold ${getConfidenceColor(result.prediction.confidence)}`}>
                      {(result.prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Model confidence in prediction
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Class Probabilities</h4>
                <div className="space-y-2">
                  {Object.entries(result.prediction.probabilities).map(([className, prob]) => (
                    <div key={className} className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-700 truncate mr-2">{className}</span>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${prob * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900 w-10 sm:w-12">
                          {(prob * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grad-CAM Visualization */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Grad-CAM Attention Analysis
            </h3>
            <GradCAMHeatmap data={result.gradCAM} />
          </div>

          {/* SHAP Analysis */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              SHAP Feature Importance
            </h3>
            <SHAPBarChart data={result.shap} />
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={resetUpload}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}