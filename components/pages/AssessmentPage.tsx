'use client'

import { useState } from 'react'
import { Upload, Brain, FileText, Activity, AlertCircle, CheckCircle } from 'lucide-react'

interface AssessmentData {
  mriUploaded: boolean
  handwritingUploaded: boolean
  clinicalCompleted: boolean
  riskScore?: number
  diagnosis?: string
}

export default function AssessmentPage() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    mriUploaded: false,
    handwritingUploaded: false,
    clinicalCompleted: false
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const steps = [
    { id: 1, name: 'Clinical Information', icon: FileText, completed: assessmentData.clinicalCompleted },
    { id: 2, name: 'MRI Scan Upload', icon: Brain, completed: assessmentData.mriUploaded },
    { id: 3, name: 'Handwriting Sample', icon: Activity, completed: assessmentData.handwritingUploaded },
    { id: 4, name: 'AI Analysis', icon: AlertCircle, completed: false }
  ]

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAssessmentData(prev => ({
        ...prev,
        riskScore: Math.random() * 100,
        diagnosis: Math.random() > 0.5 ? 'Low Risk' : 'Moderate Risk'
      }))
      setIsAnalyzing(false)
      setCurrentStep(4)
    }, 3000)
  }

  const canAnalyze = assessmentData.mriUploaded && assessmentData.handwritingUploaded && assessmentData.clinicalCompleted

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Alzheimer's Risk Assessment
        </h1>
        <p className="text-lg text-gray-600">
          Upload your medical data and get AI-powered risk analysis
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = step.completed
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mt-6 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Clinical Information */}
        <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${
          assessmentData.clinicalCompleted ? 'border-green-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">Clinical Info</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Provide basic medical information and cognitive test scores
          </p>
          <button
            onClick={() => {
              setAssessmentData(prev => ({ ...prev, clinicalCompleted: true }))
              setCurrentStep(2)
            }}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              assessmentData.clinicalCompleted
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {assessmentData.clinicalCompleted ? 'Completed' : 'Fill Form'}
          </button>
        </div>

        {/* MRI Upload */}
        <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${
          assessmentData.mriUploaded ? 'border-green-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold">MRI Scan</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload your brain MRI scan for structural analysis
          </p>
          <button
            onClick={() => {
              setAssessmentData(prev => ({ ...prev, mriUploaded: true }))
              setCurrentStep(3)
            }}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              assessmentData.mriUploaded
                ? 'bg-green-500 text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {assessmentData.mriUploaded ? 'Uploaded' : 'Upload MRI'}
          </button>
        </div>

        {/* Handwriting Sample */}
        <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${
          assessmentData.handwritingUploaded ? 'border-green-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <Activity className="w-8 h-8 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold">Handwriting</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload handwriting samples for motor analysis
          </p>
          <button
            onClick={() => {
              setAssessmentData(prev => ({ ...prev, handwritingUploaded: true }))
            }}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              assessmentData.handwritingUploaded
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {assessmentData.handwritingUploaded ? 'Uploaded' : 'Upload Sample'}
          </button>
        </div>
      </div>

      {/* Analysis Button */}
      {canAnalyze && (
        <div className="text-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
          </button>
        </div>
      )}

      {/* Results */}
      {assessmentData.riskScore && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Risk Score</h4>
              <div className="text-3xl font-bold text-blue-600">
                {assessmentData.riskScore?.toFixed(1)}%
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Assessment</h4>
              <div className={`text-xl font-semibold ${
                assessmentData.diagnosis === 'Low Risk' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {assessmentData.diagnosis}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}