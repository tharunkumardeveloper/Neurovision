'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, FileText, TrendingUp, AlertTriangle, CheckCircle, Eye } from 'lucide-react'
import { analyzeMRIFeatures, analyzeHandwritingFeatures, getBiomarkerData } from '@/lib/dataService'

interface AnalysisResult {
  mri: {
    hippocampalVolume: number
    corticalThickness: number
    ventricularSize: number
    whiteMatterLesions: number
  }
  handwriting: {
    velocity: number
    pressure: number
    tremor: number
    fluency: number
  }
  biomarkers: {
    abeta42_40_ratio: number
    ptau181: number
    nfl: number
    apoe4_status: boolean
  }
  riskScore: number
  confidence: number
  recommendation: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedView, setSelectedView] = useState<'overview' | 'mri' | 'handwriting' | 'biomarkers'>('overview')

  useEffect(() => {
    // Simulate loading analysis results
    setTimeout(() => {
      const mockResults: AnalysisResult = {
        mri: analyzeMRIFeatures('/datasets/Image dataset/combined_images/MildDemented/sample.jpg'),
        handwriting: analyzeHandwritingFeatures('/datasets/Handwriting Dataset/offline/TASK_02/AD/sample.png'),
        biomarkers: {
          abeta42_40_ratio: getBiomarkerData('patient_001').abeta42_40_ratio,
          ptau181: getBiomarkerData('patient_001').ptau181,
          nfl: getBiomarkerData('patient_001').nfl,
          apoe4_status: getBiomarkerData('patient_001').apoe4_status
        },
        riskScore: 65,
        confidence: 87,
        recommendation: 'Moderate risk detected. Recommend follow-up with neurologist and cognitive assessment.'
      }
      setResults(mockResults)
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your data...</p>
        </div>
      </div>
    )
  }

  if (!results) return null

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600'
    if (score < 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-100'
    if (score < 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Analysis Results
        </h1>
        <p className="text-lg text-gray-600">
          AI-powered analysis of your medical data
        </p>
      </div>

      {/* Risk Score Overview */}
      <div className={`${getRiskBgColor(results.riskScore)} rounded-lg p-6 mb-8`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Overall Risk Assessment
            </h2>
            <p className="text-gray-700">{results.recommendation}</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getRiskColor(results.riskScore)} mb-2`}>
              {results.riskScore}%
            </div>
            <p className="text-sm text-gray-600">Risk Score</p>
            <p className="text-xs text-gray-500 mt-1">
              {results.confidence}% confidence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', name: 'Overview', icon: TrendingUp },
          { id: 'mri', name: 'MRI Analysis', icon: Brain },
          { id: 'handwriting', name: 'Handwriting', icon: Activity },
          { id: 'biomarkers', name: 'Biomarkers', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          )
        })}
      </div>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* MRI Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold">Brain Structure</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Hippocampal Volume</span>
                <span className={`font-medium ${results.mri.hippocampalVolume > 0.8 ? 'text-green-600' : 'text-orange-600'}`}>
                  {(results.mri.hippocampalVolume * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cortical Thickness</span>
                <span className={`font-medium ${results.mri.corticalThickness > 0.8 ? 'text-green-600' : 'text-orange-600'}`}>
                  {(results.mri.corticalThickness * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Handwriting Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold">Motor Function</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Writing Fluency</span>
                <span className={`font-medium ${results.handwriting.fluency > 0.6 ? 'text-green-600' : 'text-orange-600'}`}>
                  {(results.handwriting.fluency * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tremor Level</span>
                <span className={`font-medium ${results.handwriting.tremor < 0.4 ? 'text-green-600' : 'text-orange-600'}`}>
                  {(results.handwriting.tremor * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Biomarkers Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">Blood Markers</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amyloid Beta</span>
                <span className={`font-medium ${results.biomarkers.abeta42_40_ratio > 0.08 ? 'text-green-600' : 'text-orange-600'}`}>
                  {results.biomarkers.abeta42_40_ratio.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">APOE4 Status</span>
                <span className={`font-medium ${!results.biomarkers.apoe4_status ? 'text-green-600' : 'text-orange-600'}`}>
                  {results.biomarkers.apoe4_status ? 'Positive' : 'Negative'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'mri' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">MRI Brain Analysis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Structural Measurements</h4>
              <div className="space-y-4">
                {Object.entries(results.mri).map(([key, value]) => {
                  const percentage = value * 100
                  const isGood = key === 'hippocampalVolume' || key === 'corticalThickness' 
                    ? percentage > 80 
                    : percentage < 20
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`text-sm ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-orange-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Brain Regions</h4>
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">3D Brain Visualization</p>
                  <p className="text-sm text-gray-400">Interactive model would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'handwriting' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Handwriting Analysis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Motor Features</h4>
              <div className="space-y-4">
                {Object.entries(results.handwriting).map(([key, value]) => {
                  const percentage = value * 100
                  const isGood = key === 'velocity' || key === 'pressure' || key === 'fluency'
                    ? percentage > 60
                    : percentage < 40
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {key}
                        </span>
                        <span className={`text-sm ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-orange-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Sample Analysis</h4>
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Handwriting Sample</p>
                  <p className="text-sm text-gray-400">Analyzed writing patterns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'biomarkers' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Biomarker Analysis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Blood Test Results</h4>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Amyloid Beta (Aβ42)</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      results.biomarkers.abeta42_40_ratio > 0.08 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {results.biomarkers.abeta42_40_ratio.toFixed(3)} ratio
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.biomarkers.abeta42_40_ratio > 0.08 ? 'Normal levels' : 'Below normal range'}
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">p-Tau181</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      results.biomarkers.ptau181 < 20 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {results.biomarkers.ptau181.toFixed(1)} pg/mL
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.biomarkers.ptau181 < 20 ? 'Normal levels' : 'Elevated levels'}
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">NFL</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      results.biomarkers.nfl < 15 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {results.biomarkers.nfl.toFixed(1)} pg/mL
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.biomarkers.nfl < 15 ? 'Normal levels' : 'Elevated levels'}
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">APOE4 Genotype</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      !results.biomarkers.apoe4_status ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {results.biomarkers.apoe4_status ? 'Positive' : 'Negative'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.biomarkers.apoe4_status ? 'Increased genetic risk' : 'No genetic risk factor'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Risk Interpretation</h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">What These Results Mean</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Biomarkers help assess Alzheimer's risk</li>
                    <li>• Combined with imaging and cognitive tests</li>
                    <li>• Results should be interpreted by a specialist</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-yellow-800 mb-2">Next Steps</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Discuss results with your doctor</li>
                    <li>• Consider follow-up testing</li>
                    <li>• Monitor cognitive function</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-medium">
          Download Report
        </button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 font-medium">
          Share with Doctor
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 font-medium">
          Schedule Follow-up
        </button>
      </div>
    </div>
  )
}