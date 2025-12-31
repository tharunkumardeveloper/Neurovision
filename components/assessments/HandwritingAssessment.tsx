import { useState, useEffect } from 'react'
import { Save, Upload, Play, Square, Image as ImageIcon } from 'lucide-react'
import { getRandomHandwritingImages, analyzeHandwritingFeatures, HANDWRITING_TASKS } from '@/lib/dataService'

interface HandwritingAssessmentProps {
  data: {
    velocity: number
    pressure: number
    tremor: number
    completed: boolean
  }
  setData: (data: any) => void
}

export default function HandwritingAssessment({ data, setData }: HandwritingAssessmentProps) {
  const [formData, setFormData] = useState(data)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedTask, setSelectedTask] = useState('TASK_02')
  const [handwritingSamples, setHandwritingSamples] = useState<any[]>([])
  const [selectedSample, setSelectedSample] = useState<any>(null)

  useEffect(() => {
    // Load handwriting samples for the selected task
    const samples = getRandomHandwritingImages(selectedTask, undefined, 8)
    setHandwritingSamples(samples)
    if (samples.length > 0) {
      setSelectedSample(samples[0])
    }
  }, [selectedTask])

  const handleSave = () => {
    setData({ ...formData, completed: true })
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Simulate recording completion after 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        if (selectedSample) {
          const features = analyzeHandwritingFeatures(selectedSample.path)
          setFormData({
            ...formData,
            ...features
          })
        }
      }, 3000)
    }
  }

  const getMetricColor = (value: number, type: 'velocity' | 'pressure' | 'tremor') => {
    if (type === 'tremor') {
      return value < 0.3 ? 'text-green-600' : value < 0.6 ? 'text-yellow-600' : 'text-red-600'
    }
    return value > 0.7 ? 'text-green-600' : value > 0.4 ? 'text-yellow-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Digital Handwriting Analysis</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            {Object.entries(HANDWRITING_TASKS).map(([taskId, taskName]) => (
              <option key={taskId} value={taskId}>{taskName}</option>
            ))}
          </select>
          <button
            onClick={toggleRecording}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
              isRecording 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRecording ? 'Stop Analysis' : 'Analyze Sample'}</span>
          </button>
        </div>
      </div>

      {/* Sample Selection */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Handwriting Samples - {HANDWRITING_TASKS[selectedTask as keyof typeof HANDWRITING_TASKS]}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {handwritingSamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => setSelectedSample(sample)}
              className={`cursor-pointer border-2 rounded-lg p-2 transition-all ${
                selectedSample?.id === sample.id 
                  ? 'border-medical-500 bg-medical-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-square bg-gray-100 rounded flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={sample.path}
                  alt={`Handwriting sample ${sample.filename}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none'
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      const icon = document.createElement('div')
                      icon.innerHTML = '<svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
                      parent.appendChild(icon)
                    }
                  }}
                />
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">{sample.condition === 'AD' ? 'Alzheimer\'s' : 'Healthy'}</div>
                <div className="text-gray-500">{sample.filename}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Area */}
      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isRecording ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
      }`}>
        {isRecording ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 w-4 bg-red-500 rounded-full mx-auto mb-2"></div>
              <p className="text-red-700 font-medium">Analyzing handwriting sample...</p>
            </div>
            <p className="text-sm text-gray-600">
              Processing kinematic features from: {selectedSample?.filename}
            </p>
            <div className="text-lg font-medium text-gray-900">
              Task: {HANDWRITING_TASKS[selectedTask as keyof typeof HANDWRITING_TASKS]}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedSample ? (
              <>
                <div className="aspect-video bg-white rounded border max-w-md mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedSample.path}
                    alt={`Handwriting sample ${selectedSample.filename}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).style.display = 'none'
                      const parent = (e.target as HTMLImageElement).parentElement
                      if (parent) {
                        const fallback = document.createElement('div')
                        fallback.className = 'text-center'
                        fallback.innerHTML = `
                          <svg class="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p class="text-sm text-gray-600">${selectedSample.filename}</p>
                          <p class="text-xs text-gray-500">${selectedSample.condition === 'AD' ? 'Alzheimer\'s Patient' : 'Healthy Control'}</p>
                        `
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
                <div>
                  <p className="text-gray-600">Selected sample ready for analysis</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Click "Analyze Sample" to extract kinematic features
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600">Select a handwriting sample above</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose from real patient samples in our dataset
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Metrics Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Writing Velocity</h4>
            <div className={`text-2xl font-bold ${getMetricColor(formData.velocity, 'velocity')}`}>
              {(formData.velocity * 100).toFixed(0)}%
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-medical-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${formData.velocity * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formData.velocity > 0.7 ? 'Normal' : formData.velocity > 0.4 ? 'Reduced' : 'Significantly Reduced'}
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Pen Pressure</h4>
            <div className={`text-2xl font-bold ${getMetricColor(formData.pressure, 'pressure')}`}>
              {(formData.pressure * 100).toFixed(0)}%
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-medical-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${formData.pressure * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formData.pressure > 0.7 ? 'Normal' : formData.pressure > 0.4 ? 'Reduced' : 'Significantly Reduced'}
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tremor Level</h4>
            <div className={`text-2xl font-bold ${getMetricColor(formData.tremor, 'tremor')}`}>
              {(formData.tremor * 100).toFixed(0)}%
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${formData.tremor * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formData.tremor < 0.3 ? 'Minimal' : formData.tremor < 0.6 ? 'Moderate' : 'Significant'}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Dataset Information</h4>
        <div className="text-sm text-blue-800">
          <p>Using real handwriting samples from our clinical dataset:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Total samples: {handwritingSamples.length} for {HANDWRITING_TASKS[selectedTask as keyof typeof HANDWRITING_TASKS]}</li>
            <li>Conditions: Alzheimer's Disease (AD) and Healthy Controls (HC)</li>
            <li>Tasks: 6 different handwriting and drawing tasks</li>
            <li>Features: Velocity, pressure, tremor, and fluency analysis</li>
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