'use client'

import { useState, useEffect } from 'react'
import { Users, Activity, FileText, Brain, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { performStage1Assessment, getRandomHandwritingImages, HANDWRITING_TASKS } from '@/lib/dataService'

interface ClinicalForm {
  age: number
  gender: string
  education: number
  mmse: number
  cdr: number
}

interface HandwritingTask {
  id: string
  name: string
  completed: boolean
  velocity: number
  pressure: number
  tremor: number
  fluency: number
  sampleImage: string
}

export default function Stage1Screening() {
  const [currentStep, setCurrentStep] = useState(1)
  const [clinicalData, setClinicalData] = useState<ClinicalForm>({
    age: 65,
    gender: 'M',
    education: 12,
    mmse: 28,
    cdr: 0
  })
  
  const [handwritingTasks, setHandwritingTasks] = useState<HandwritingTask[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    // Initialize handwriting tasks with sample images including spiral and clock
    const taskData = [
      { id: 'TASK_02', name: 'Connect Dots' },
      { id: 'TASK_03', name: 'Vertical Lines' },
      { id: 'TASK_04', name: 'Trace Circle' },
      { id: 'TASK_05', name: 'Draw Clock' }
    ]
    
    const tasks = taskData.map((taskInfo, index) => {
      const samples = getRandomHandwritingImages(taskInfo.id, undefined, 1)
      return {
        id: taskInfo.id,
        name: taskInfo.name,
        completed: false,
        velocity: 0.7 + Math.random() * 0.3,
        pressure: 0.6 + Math.random() * 0.4,
        tremor: Math.random() * 0.3,
        fluency: 0.7 + Math.random() * 0.3,
        sampleImage: samples[0]?.path || ''
      }
    })
    setHandwritingTasks(tasks)
  }, [])

  const handleClinicalSubmit = () => {
    setCurrentStep(2)
  }

  const completeHandwritingTask = (taskId: string) => {
    setHandwritingTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: true, velocity: 0.4 + Math.random() * 0.4, tremor: Math.random() * 0.6 }
          : task
      )
    )
  }

  const performAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(async () => {
      const handwritingData = handwritingTasks.map(task => ({
        taskId: task.id,
        taskName: task.name,
        velocity: task.velocity,
        pressure: task.pressure,
        tremor: task.tremor,
        fluency: task.fluency,
        pauseTime: Math.random() * 2,
        strokeWidth: 1 + Math.random() * 2,
        condition: task.tremor > 0.4 ? 'AD' as const : 'HC' as const,
        features: Array.from({length: 10}, () => Math.random())
      }))

      const stage1Results = await performStage1Assessment(clinicalData, handwritingData)
      setResults(stage1Results)
      setIsAnalyzing(false)
      setCurrentStep(3)
    }, 3000)
  }

  const allTasksCompleted = handwritingTasks.every(task => task.completed)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Stage 1: Primary Screening
        </h1>
        <p className="text-lg text-gray-600">
          Low-cost clinical assessment and digital handwriting analysis
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[
          { step: 1, name: 'Clinical Assessment', icon: Users },
          { step: 2, name: 'Handwriting Tasks', icon: Activity },
          { step: 3, name: 'Risk Analysis', icon: Brain }
        ].map((item, index) => {
          const Icon = item.icon
          const isActive = currentStep === item.step
          const isCompleted = currentStep > item.step
          
          return (
            <div key={item.step} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500 text-white' :
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
              </div>
              <span className={`ml-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.name}
              </span>
              {index < 2 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1: Clinical Assessment */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Clinical Assessment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Demographics</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={clinicalData.age}
                    onChange={(e) => setClinicalData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={clinicalData.gender}
                    onChange={(e) => setClinicalData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education (years)</label>
                  <input
                    type="number"
                    value={clinicalData.education}
                    onChange={(e) => setClinicalData(prev => ({ ...prev, education: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="25"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Cognitive Assessments</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MMSE Score (0-30)
                  </label>
                  <input
                    type="number"
                    value={clinicalData.mmse}
                    onChange={(e) => setClinicalData(prev => ({ ...prev, mmse: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="30"
                  />
                  <p className="text-xs text-gray-500 mt-1">Mini-Mental State Examination</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CDR Score (0-3)
                  </label>
                  <select
                    value={clinicalData.cdr}
                    onChange={(e) => setClinicalData(prev => ({ ...prev, cdr: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={0}>0 - Normal</option>
                    <option value={0.5}>0.5 - Very Mild</option>
                    <option value={1}>1 - Mild</option>
                    <option value={2}>2 - Moderate</option>
                    <option value={3}>3 - Severe</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Clinical Dementia Rating</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={handleClinicalSubmit}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Continue to Handwriting Tasks
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Handwriting Tasks */}
      {currentStep === 2 && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Digital Handwriting Analysis</h2>
          <p className="text-gray-600 mb-6">
            Complete the following handwriting tasks. The system will analyze motor control, tremor, and fluency patterns.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {handwritingTasks.map((task, index) => (
              <div key={task.id} className={`border-2 rounded-lg p-6 ${
                task.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{task.name}</h3>
                  {task.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                </div>
                
                {task.sampleImage && (
                  <div className="mb-4">
                    <img 
                      src={task.sampleImage} 
                      alt={`${task.name} sample`}
                      className="w-full h-32 object-contain rounded-md border bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=${task.name.replace(' ', '+')}`
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">Real handwriting sample from dataset</p>
                  </div>
                )}
                
                {task.completed ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Velocity:</span>
                      <span className={task.velocity < 0.5 ? 'text-red-600' : 'text-green-600'}>
                        {(task.velocity * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tremor:</span>
                      <span className={task.tremor > 0.4 ? 'text-red-600' : 'text-green-600'}>
                        {(task.tremor * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fluency:</span>
                      <span className={task.fluency < 0.5 ? 'text-red-600' : 'text-green-600'}>
                        {(task.fluency * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => completeHandwritingTask(task.id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  >
                    Complete Task
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {allTasksCompleted && (
            <div className="mt-8 text-center">
              <button
                onClick={performAnalysis}
                disabled={isAnalyzing}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Perform Stage 1 Analysis'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Results */}
      {currentStep === 3 && results && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Stage 1 Results</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Risk Assessment</h3>
              <div className={`p-6 rounded-lg ${
                results.riskLevel === 'Low' ? 'bg-green-100' :
                results.riskLevel === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    results.riskLevel === 'Low' ? 'text-green-600' :
                    results.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {results.riskScore.toFixed(1)}%
                  </div>
                  <div className={`text-xl font-semibold ${
                    results.riskLevel === 'Low' ? 'text-green-800' :
                    results.riskLevel === 'Moderate' ? 'text-yellow-800' : 'text-red-800'
                  }`}>
                    {results.riskLevel} Risk
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Next Steps</h3>
              {results.proceedToStage2 ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="font-medium text-blue-800">Stage 2 Analysis Recommended</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Based on the moderate-to-high risk score, proceed to biomarker testing and MRI analysis for comprehensive assessment.
                  </p>
                  <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                    Proceed to Stage 2
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-medium text-green-800">Low Risk - Routine Monitoring</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Continue with regular health monitoring and annual cognitive assessments. No immediate advanced testing required.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Data</h3>
              <p className="text-gray-600">
                SVM models are processing handwriting kinematics and clinical features...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}