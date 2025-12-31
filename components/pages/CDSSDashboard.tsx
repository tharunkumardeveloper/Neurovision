'use client'

import { useState } from 'react'
import { Brain, Users, Activity, TrendingUp, Clock, Shield, Zap } from 'lucide-react'
import { modelPerformanceResults } from '../../lib/modelResults'

interface SystemMetrics {
  totalPatients: number
  stage1Completed: number
  stage2Completed: number
  accuracy: number
  avgProcessingTime: number
  systemStatus: 'Online' | 'Offline' | 'Maintenance'
}

interface RecentCase {
  id: string
  age: number
  gender: string
  stage1Risk: number
  stage2Risk?: number
  diagnosis: string
  timestamp: Date
  status: 'Stage 1' | 'Stage 2' | 'Complete'
}

export default function CDSSDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalPatients: 1270,
    stage1Completed: 1270,
    stage2Completed: 635,
    accuracy: modelPerformanceResults.ensemble.accuracy,
    avgProcessingTime: 4.3,
    systemStatus: 'Online'
  })

  const [recentCases, setRecentCases] = useState<RecentCase[]>([
    {
      id: 'P001',
      age: 72,
      gender: 'F',
      stage1Risk: 65,
      stage2Risk: 78,
      diagnosis: 'Mild AD',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'Complete'
    },
    {
      id: 'P002',
      age: 68,
      gender: 'M',
      stage1Risk: 25,
      diagnosis: 'Normal',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'Stage 1'
    },
    {
      id: 'P003',
      age: 75,
      gender: 'F',
      stage1Risk: 82,
      stage2Risk: 89,
      diagnosis: 'Moderate AD',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'Complete'
    }
  ])

  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessNewCase = () => {
    if (isProcessing) {
      setIsProcessing(false)
      return
    }

    setIsProcessing(true)
    
    // Simulate processing a new case
    setTimeout(() => {
      const newCase: RecentCase = {
        id: `P${String(recentCases.length + 1).padStart(3, '0')}`,
        age: 65 + Math.floor(Math.random() * 20),
        gender: Math.random() > 0.5 ? 'F' : 'M',
        stage1Risk: Math.floor(Math.random() * 100),
        stage2Risk: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : undefined,
        diagnosis: ['Normal', 'MCI', 'Mild AD', 'Moderate AD'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        status: Math.random() > 0.5 ? 'Complete' : Math.random() > 0.5 ? 'Stage 2' : 'Stage 1'
      }
      
      setRecentCases(prev => [newCase, ...prev.slice(0, 4)]) // Keep only 5 most recent
      setIsProcessing(false)
    }, 3000)
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600'
    if (risk < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBg = (risk: number) => {
    if (risk < 30) return 'bg-green-100'
    if (risk < 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Clinical Decision Support System
        </h1>
        <p className="text-lg text-gray-600">
          AI-Powered Early Alzheimer's Detection Using Multi-Modal Biomarker Integration
        </p>
      </div>

      {/* System Status */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  metrics.systemStatus === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></div>
                <span className={`font-semibold ${
                  metrics.systemStatus === 'Online' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metrics.systemStatus}
                </span>
              </div>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.accuracy}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Processing</p>
              <p className="text-2xl font-bold text-green-600">{metrics.avgProcessingTime}min</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-purple-600">{metrics.totalPatients}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tiered Diagnostic Flow */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Tiered Diagnostic Approach</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Stage 1 */}
          <div className="border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h3 className="text-lg font-semibold">Stage 1: Primary Screening</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">Clinical Assessment (MMSE, CDR)</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">Digital Handwriting Analysis</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm">SVM-based Risk Stratification</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>{metrics.stage1Completed}</strong> patients screened
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Low-cost, rapid assessment for all patients
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h3 className="text-lg font-semibold">Stage 2: Advanced Analysis</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Brain className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-sm">Structural MRI (CNN Analysis)</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-sm">Blood Biomarkers (Random Forest)</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-sm">Ensemble Meta-learner</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 rounded-md">
              <p className="text-sm text-purple-700">
                <strong>{metrics.stage2Completed}</strong> patients analyzed
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Only moderate-to-high risk cases from Stage 1
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Insights from Research */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Multi-Modal AI Performance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 mb-2">MRI CNN Model</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Accuracy:</strong> {modelPerformanceResults.mriCNN.accuracy.toFixed(2)}%</div>
              <div><strong>Macro F1:</strong> {modelPerformanceResults.mriCNN.macroF1.toFixed(2)}%</div>
              <div><strong>Architecture:</strong> ResNet50</div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 mb-2">Genomic XGBoost</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Accuracy:</strong> {modelPerformanceResults.genomicXGB.accuracy.toFixed(2)}%</div>
              <div><strong>Macro F1:</strong> {modelPerformanceResults.genomicXGB.macroF1.toFixed(2)}%</div>
              <div><strong>Features:</strong> 1000+ variants</div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Ensemble Model</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Accuracy:</strong> {modelPerformanceResults.ensemble.accuracy.toFixed(2)}%</div>
              <div><strong>Macro F1:</strong> {modelPerformanceResults.ensemble.macroF1.toFixed(2)}%</div>
              <div className="text-green-600 font-medium">+{modelPerformanceResults.ensemble.improvement.accuracyVsMRI.toFixed(2)}% vs MRI</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Key Research Findings:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Ensemble achieves {modelPerformanceResults.ensemble.accuracy.toFixed(2)}% accuracy, outperforming MRI CNN ({modelPerformanceResults.mriCNN.accuracy.toFixed(2)}%)</li>
            <li>• Macro F1 improvement of {modelPerformanceResults.ensemble.improvement.macroF1VsMRI.toFixed(2)}% shows better class balance</li>
            <li>• Multi-modal approach successfully combines complementary information sources</li>
            <li>• Meta-learner demonstrates superior performance across all evaluated metrics</li>
          </ul>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <button 
            onClick={handleProcessNewCase}
            disabled={isProcessing}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-medium disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Process New Case'}
          </button>
        </div>

        {isProcessing && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <span className="text-blue-700 font-medium">Processing new patient case...</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Patient ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Demographics</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stage 1 Risk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stage 2 Risk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Diagnosis</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((case_) => (
                <tr key={case_.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-blue-600">{case_.id}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {case_.gender}, {case_.age}y
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage1Risk)} ${getRiskColor(case_.stage1Risk)}`}>
                      {case_.stage1Risk}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {case_.stage2Risk ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage2Risk)} ${getRiskColor(case_.stage2Risk)}`}>
                        {case_.stage2Risk}%
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      case_.diagnosis === 'Normal' ? 'bg-green-100 text-green-800' :
                      case_.diagnosis === 'MCI' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {case_.diagnosis}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      case_.status === 'Complete' ? 'bg-green-100 text-green-800' :
                      case_.status === 'Stage 2' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {case_.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {formatTimeAgo(case_.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dataset Preview */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Live Dataset Preview</h2>
        <div className="space-y-8">
          {/* MRI Dataset */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Brain className="w-5 h-5 text-purple-500 mr-2" />
              MRI Brain Scans Dataset - All Categories
            </h3>
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Normal Cognition */}
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-2">Normal Cognition</h4>
                <div className="space-y-2">
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/NonDemented/nonDem2540.jpg" 
                      alt="Normal Cognition MRI 1"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+1'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">nonDem2540.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/NonDemented/nonDem2541.jpg" 
                      alt="Normal Cognition MRI 2"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+2'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">nonDem2541.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/NonDemented/00a98422-8b63-47e6-8b8f-9119984d87ee.jpg" 
                      alt="Normal Cognition MRI 3"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+3'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">00a98422...87ee.jpg</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Healthy brain structure</p>
              </div>

              {/* Very Mild Dementia (MCI) */}
              <div>
                <h4 className="text-sm font-medium text-yellow-700 mb-2">Very Mild (MCI)</h4>
                <div className="space-y-2">
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/VeryMildDemented/verymildDem1776.jpg" 
                      alt="Very Mild Dementia MRI 1"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+1'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">verymildDem1776.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/VeryMildDemented/verymildDem1777.jpg" 
                      alt="Very Mild Dementia MRI 2"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+2'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">verymildDem1777.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/VeryMildDemented/000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg" 
                      alt="Very Mild Dementia MRI 3"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+3'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">000a074f...7018.jpg</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Early cognitive decline</p>
              </div>

              {/* Mild Dementia */}
              <div>
                <h4 className="text-sm font-medium text-orange-700 mb-2">Mild Dementia</h4>
                <div className="space-y-2">
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/MildDemented/mildDem701.jpg" 
                      alt="Mild Dementia MRI 1"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+1'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">mildDem701.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/MildDemented/mildDem702.jpg" 
                      alt="Mild Dementia MRI 2"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+2'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">mildDem702.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/MildDemented/000cdcc4-3e54-4034-a538-203c8047b564.jpg" 
                      alt="Mild Dementia MRI 3"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+3'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">000cdcc4...b564.jpg</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Moderate atrophy</p>
              </div>

              {/* Moderate Dementia */}
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-2">Moderate Dementia</h4>
                <div className="space-y-2">
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/ModerateDemented/moderateDem36.jpg" 
                      alt="Moderate Dementia MRI 1"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+1'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">moderateDem36.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/ModerateDemented/moderateDem37.jpg" 
                      alt="Moderate Dementia MRI 2"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+2'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">moderateDem37.jpg</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img 
                      src="/datasets/mri/ModerateDemented/00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg" 
                      alt="Moderate Dementia MRI 3"
                      className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+3'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <span className="text-white text-xs text-center px-2">00a4080b...b5f5.jpg</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Severe tissue loss</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Real MRI scans showing progressive structural brain changes across all dementia stages
            </p>
          </div>

          {/* Handwriting Dataset */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Activity className="w-5 h-5 text-orange-500 mr-2" />
              Handwriting Analysis Dataset - Multiple Tasks
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Task 02 - Connect Dots */}
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-3">TASK_02: Connect Dots</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_02/HC/T02_HC_001.png" 
                        alt="HC Task 02 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T02'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T02_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_02/AD/T02_AD_001.png" 
                        alt="AD Task 02 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T02'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T02_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 03 - Vertical Lines */}
              <div>
                <h4 className="text-sm font-medium text-purple-700 mb-3">TASK_03: Vertical Lines</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_03/HC/T03_HC_001.png" 
                        alt="HC Task 03 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T03'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T03_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_03/AD/T03_AD_001.png" 
                        alt="AD Task 03 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T03'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T03_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 05 - Draw Spirals */}
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-3">TASK_05: Draw Spirals</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_05/HC/T05_HC_001.png" 
                        alt="HC Task 05 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T05'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T05_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_05/AD/T05_AD_001.png" 
                        alt="AD Task 05 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T05'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T05_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Tasks Row */}
            <div className="grid lg:grid-cols-3 gap-6 mt-4">
              {/* Task 04 - Trace Circle */}
              <div>
                <h4 className="text-sm font-medium text-indigo-700 mb-3">TASK_04: Trace Circle</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_04/HC/T04_HC_001.png" 
                        alt="HC Task 04 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T04'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T04_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_04/AD/T04_AD_001.png" 
                        alt="AD Task 04 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T04'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T04_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 21 - Complex Drawings */}
              <div>
                <h4 className="text-sm font-medium text-pink-700 mb-3">TASK_21: Complex Drawings</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_21/HC/T21_HC_001.png" 
                        alt="HC Task 21 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T21'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T21_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_21/AD/T21_AD_001.png" 
                        alt="AD Task 21 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T21'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T21_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 24 - Clock Drawing */}
              <div>
                <h4 className="text-sm font-medium text-teal-700 mb-3">TASK_24: Clock Drawing</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_24/HC/T24_HC_001.png" 
                        alt="HC Task 24 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T24'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T24_HC_001</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                    <div className="relative group">
                      <img 
                        src="/datasets/handwriting/TASK_24/AD/T24_AD_001.png" 
                        alt="AD Task 24 Sample 1"
                        className="w-full h-20 object-contain rounded-md border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T24'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                        <span className="text-white text-xs text-center px-1">T24_AD_001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Real handwriting samples across 6 different tasks showing motor control and cognitive differences between healthy controls and Alzheimer's patients
            </p>
          </div>

          {/* Dataset Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Dataset Statistics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-900 mb-2">MRI Dataset</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Total Images:</strong> 6,400+ brain scans</li>
                  <li>• <strong>Normal Cognition:</strong> 3,200 cases</li>
                  <li>• <strong>Very Mild Dementia:</strong> 2,240 cases</li>
                  <li>• <strong>Mild Dementia:</strong> 896 cases</li>
                  <li>• <strong>Moderate Dementia:</strong> 64 cases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-900 mb-2">Handwriting Dataset</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Total Samples:</strong> 1,800+ handwriting tasks</li>
                  <li>• <strong>Healthy Controls (HC):</strong> 900 samples</li>
                  <li>• <strong>Alzheimer's Disease (AD):</strong> 900 samples</li>
                  <li>• <strong>Task Types:</strong> 6 different cognitive tasks</li>
                  <li>• <strong>Features:</strong> Velocity, pressure, tremor analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
          <Users className="w-6 h-6 mx-auto mb-2" />
          <span className="block font-medium">New Patient Assessment</span>
        </button>
        <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
          <Brain className="w-6 h-6 mx-auto mb-2" />
          <span className="block font-medium">View ML Pipeline</span>
        </button>
        <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
          <TrendingUp className="w-6 h-6 mx-auto mb-2" />
          <span className="block font-medium">Generate Report</span>
        </button>
      </div>
    </div>
  )
}