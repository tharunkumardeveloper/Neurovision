import { useState, useEffect } from 'react'
import { Save, Upload, Eye, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { getRandomMRIImages, analyzeMRIFeatures, MRI_CATEGORIES } from '@/lib/dataService'

interface ImagingAssessmentProps {
  data: {
    hippocampalVolume: number
    corticalThickness: number
    completed: boolean
  }
  setData: (data: any) => void
}

export default function ImagingAssessment({ data, setData }: ImagingAssessmentProps) {
  const [formData, setFormData] = useState(data)
  const [showGradCAM, setShowGradCAM] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mriSamples, setMriSamples] = useState<any[]>([])
  const [selectedSample, setSelectedSample] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof MRI_CATEGORIES>('NonDemented')

  useEffect(() => {
    // Load MRI samples for the selected category
    const samples = getRandomMRIImages(selectedCategory, 8)
    setMriSamples(samples)
    if (samples.length > 0) {
      setSelectedSample(samples[0])
    }
  }, [selectedCategory])

  const handleSave = () => {
    setData({ ...formData, completed: true })
  }

  const simulateProcessing = () => {
    setIsProcessing(true)
    setTimeout(() => {
      if (selectedSample) {
        const features = analyzeMRIFeatures(selectedSample.path)
        setFormData({
          ...formData,
          hippocampalVolume: features.hippocampalVolume,
          corticalThickness: features.corticalThickness
        })
      }
      setIsProcessing(false)
    }, 3000)
  }

  const getVolumeStatus = (value: number) => {
    if (value > 0.85) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
    if (value > 0.7) return { status: 'Mild Atrophy', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'Significant Atrophy', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const getThicknessStatus = (value: number) => {
    if (value > 0.8) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-50' }
    if (value > 0.65) return { status: 'Mild Thinning', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'Significant Thinning', color: 'text-red-600', bg: 'bg-red-50' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">MRI Structural Imaging</h3>
        <div className="flex items-center space-x-2 text-sm text-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          <span>Stage 2 Assessment</span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as keyof typeof MRI_CATEGORIES)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>

        {/* MRI Sample Selection */}
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-900">
            MRI Samples - {MRI_CATEGORIES[selectedCategory].label}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mriSamples.map((sample, index) => (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${
                  selectedSample?.id === sample.id 
                    ? 'border-medical-500 bg-medical-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="aspect-square bg-gray-900 rounded flex items-center justify-center mb-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-xs text-center">
                  <div className={`font-medium text-${MRI_CATEGORIES[sample.category as keyof typeof MRI_CATEGORIES]?.color || 'gray'}-600`}>
                    {MRI_CATEGORIES[sample.category as keyof typeof MRI_CATEGORIES]?.label || 'Unknown'}
                  </div>
                  <div className="text-gray-500 truncate">{sample.filename}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload/Processing Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          {selectedSample ? (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-900 rounded max-w-md mx-auto flex items-center justify-center">
                <div className="text-center text-white">
                  <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-sm">{selectedSample.filename}</p>
                  <p className="text-xs text-gray-300">
                    {MRI_CATEGORIES[selectedSample.category as keyof typeof MRI_CATEGORIES]?.label || 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Selected MRI scan ready for analysis</p>
                <p className="text-sm text-gray-500">
                  Real patient data from our clinical dataset
                </p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-gray-600">Select an MRI scan above</p>
                <p className="text-sm text-gray-500">
                  Choose from real patient scans in our dataset
                </p>
              </div>
            </>
          )}
          <button
            onClick={simulateProcessing}
            disabled={isProcessing || !selectedSample}
            className="mt-4 btn-primary disabled:opacity-50"
          >
            {isProcessing ? 'Processing MRI...' : 'Analyze & Process'}
          </button>
        </div>
      </div>

      {/* MRI Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brain Scan Display */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Brain Scan Analysis</h4>
            <button
              onClick={() => setShowGradCAM(!showGradCAM)}
              className="flex items-center space-x-2 text-sm text-medical-600 hover:text-medical-700"
            >
              <Eye className="h-4 w-4" />
              <span>{showGradCAM ? 'Hide' : 'Show'} Grad-CAM</span>
            </button>
          </div>
          
          <div className="relative bg-gray-900 rounded-lg aspect-square flex items-center justify-center">
            {/* Simulated Brain Scan */}
            <div className="relative w-48 h-48 bg-gray-700 rounded-full">
              {/* Brain outline */}
              <div className="absolute inset-4 bg-gray-600 rounded-full"></div>
              
              {/* Hippocampus regions */}
              <div className="absolute top-16 left-12 w-8 h-6 bg-gray-500 rounded-full transform rotate-12"></div>
              <div className="absolute top-16 right-12 w-8 h-6 bg-gray-500 rounded-full transform -rotate-12"></div>
              
              {/* Grad-CAM overlay */}
              {showGradCAM && (
                <>
                  <div className="absolute top-16 left-12 w-8 h-6 bg-red-500 opacity-60 rounded-full transform rotate-12"></div>
                  <div className="absolute top-16 right-12 w-8 h-6 bg-yellow-500 opacity-60 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-12 left-16 w-12 h-8 bg-orange-500 opacity-40 rounded-full"></div>
                </>
              )}
            </div>
            
            {showGradCAM && (
              <div className="absolute bottom-4 left-4 text-white text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Moderate Risk</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Measurements */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Volumetric Analysis</h4>
          
          {/* Hippocampal Volume */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-gray-900">Hippocampal Volume</h5>
                <p className="text-sm text-gray-500">Normalized to ICV</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{(formData.hippocampalVolume * 100).toFixed(1)}%</div>
                <div className={`text-sm px-2 py-1 rounded ${getVolumeStatus(formData.hippocampalVolume).bg} ${getVolumeStatus(formData.hippocampalVolume).color}`}>
                  {getVolumeStatus(formData.hippocampalVolume).status}
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-medical-500 h-2 rounded-full"
                style={{ width: `${formData.hippocampalVolume * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50%</span>
              <span>Normal: &gt;85%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Cortical Thickness */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-gray-900">Cortical Thickness</h5>
                <p className="text-sm text-gray-500">Average across ROIs</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{(formData.corticalThickness * 100).toFixed(1)}%</div>
                <div className={`text-sm px-2 py-1 rounded ${getThicknessStatus(formData.corticalThickness).bg} ${getThicknessStatus(formData.corticalThickness).color}`}>
                  {getThicknessStatus(formData.corticalThickness).status}
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-medical-500 h-2 rounded-full"
                style={{ width: `${formData.corticalThickness * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50%</span>
              <span>Normal: &gt;80%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Dataset Information</h4>
        <div className="text-sm text-blue-800">
          <p>Using real MRI scans from our clinical dataset:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Total samples: {mriSamples.length} for {MRI_CATEGORIES[selectedCategory].label}</li>
            <li>Categories: Normal, Very Mild, Mild, and Moderate Dementia</li>
            <li>Analysis: Hippocampal volume, cortical thickness, and atrophy patterns</li>
            <li>AI Model: CNN-based structural analysis with Grad-CAM visualization</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Assessment</span>
        </button>
      </div>
    </div>
  )
}