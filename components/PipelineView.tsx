'use client'

import { ArrowRight, CheckCircle, Clock, AlertCircle, Brain, Activity, FileText, TrendingUp, Eye, Zap } from 'lucide-react'

export default function PipelineView() {
  const stages = [
    {
      id: 1,
      title: 'Stage 1: Primary Screening',
      subtitle: 'Low-cost, rapid risk stratification',
      color: 'blue',
      components: [
        {
          name: 'Clinical Assessment',
          description: 'MMSE, CDR cognitive tests',
          model: 'Rule-based scoring',
          icon: FileText,
          status: 'active'
        },
        {
          name: 'Digital Handwriting',
          description: 'Kinematic analysis across multiple scripts',
          model: 'Support Vector Machine (SVM)',
          icon: Activity,
          status: 'active'
        }
      ],
      output: 'Risk stratification: Low/Moderate/High',
      decision: 'Proceed to Stage 2 if Moderate/High risk'
    },
    {
      id: 2,
      title: 'Stage 2: Advanced Analysis',
      subtitle: 'Biomarker & imaging augmentation',
      color: 'purple',
      components: [
        {
          name: 'Blood Biomarkers',
          description: 'Plasma Aβ42/40, p-tau181, NFL analysis',
          model: 'Random Forest',
          icon: FileText,
          status: 'processing'
        },
        {
          name: 'Structural MRI',
          description: 'Brain atrophy and volume analysis',
          model: 'Convolutional Neural Network (CNN)',
          icon: Brain,
          status: 'processing'
        }
      ],
      output: 'Multi-modal risk assessment',
      decision: 'Ensemble meta-learner fusion'
    }
  ]

  const getStageColor = (color: string, type: 'bg' | 'border' | 'text') => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600'
      }
    }
    return colors[color as keyof typeof colors][type]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ML Pipeline Architecture
        </h1>
        <p className="text-lg text-gray-600">
          Hierarchical ensemble machine learning for multi-modal Alzheimer's detection
        </p>
      </div>

      {/* Pipeline Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Tiered Diagnostic Approach</h2>
        
        <div className="space-y-8">
          {stages.map((stage, index) => (
            <div key={stage.id}>
              {/* Stage Header */}
              <div className={`border-2 rounded-lg p-6 ${getStageColor(stage.color, 'border')} ${getStageColor(stage.color, 'bg')}`}>
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-4 ${
                    stage.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {stage.id}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${getStageColor(stage.color, 'text')}`}>
                      {stage.title}
                    </h3>
                    <p className="text-gray-600">{stage.subtitle}</p>
                  </div>
                </div>

                {/* Components */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {stage.components.map((component, idx) => {
                    const Icon = component.icon
                    return (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Icon className="w-6 h-6 text-gray-600 mr-3" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{component.name}</h4>
                            <p className="text-sm text-gray-600">{component.description}</p>
                          </div>
                          {getStatusIcon(component.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {component.model}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Output */}
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Output</h4>
                      <p className="text-sm text-gray-600">{stage.output}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium text-gray-900">Decision Logic</h4>
                      <p className="text-sm text-gray-600">{stage.decision}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow between stages */}
              {index < stages.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className="flex items-center">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      Only moderate-to-high risk cases proceed
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Meta-learner Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Ensemble Meta-Learner</h2>
          </div>
          <p className="text-gray-600">
            5-fold cross-validation fusion of individual modality predictions
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            { name: 'Random Forest', color: 'bg-green-100 text-green-800', weight: '35%' },
            { name: 'CNN', color: 'bg-blue-100 text-blue-800', weight: '35%' },
            { name: 'SVM', color: 'bg-yellow-100 text-yellow-800', weight: '20%' },
            { name: 'Gradient Boosting', color: 'bg-red-100 text-red-800', weight: '10%' }
          ].map((model, index) => (
            <div key={index} className="text-center">
              <div className={`px-3 py-2 rounded-lg font-medium ${model.color} mb-2`}>
                {model.name}
              </div>
              <div className="text-sm text-gray-600">Weight: {model.weight}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
            <Eye className="w-5 h-5 text-purple-500 mr-2" />
            <span className="font-medium text-gray-900">Final Diagnosis: Normal / MCI / Mild AD / Moderate AD</span>
          </div>
        </div>
      </div>

      {/* Dataset Showcase */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Real Dataset Integration</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* MRI Dataset */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-lg font-medium">MRI Brain Scans Dataset</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Normal vs Mild Dementia</h4>
                <div className="space-y-2">
                  <img 
                    src="/datasets/mri/NonDemented/nonDem2540.jpg" 
                    alt="Normal MRI"
                    className="w-full h-24 object-contain rounded border bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Normal'
                    }}
                  />
                  <img 
                    src="/datasets/mri/MildDemented/mildDem701.jpg" 
                    alt="Mild AD MRI"
                    className="w-full h-24 object-contain rounded border bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Mild+AD'
                    }}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Very Mild vs Moderate</h4>
                <div className="space-y-2">
                  <img 
                    src="/datasets/mri/VeryMildDemented/verymildDem1776.jpg" 
                    alt="Very Mild AD MRI"
                    className="w-full h-24 object-contain rounded border bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150/FFA500/FFFFFF?text=Very+Mild'
                    }}
                  />
                  <img 
                    src="/datasets/mri/ModerateDemented/moderateDem36.jpg" 
                    alt="Moderate AD MRI"
                    className="w-full h-24 object-contain rounded border bg-gray-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150/DC143C/FFFFFF?text=Moderate'
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              4 categories: Normal, Very Mild, Mild, Moderate Dementia - showing full brain structure
            </p>
          </div>

          {/* Handwriting Dataset */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-lg font-medium">Handwriting Analysis Dataset</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-2">Healthy Control (HC)</h4>
                <div className="space-y-2">
                  <img 
                    src="/datasets/handwriting/TASK_02/HC/T02_HC_001.png" 
                    alt="Healthy Control 1"
                    className="w-full h-24 object-contain rounded border bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+1'
                    }}
                  />
                  <img 
                    src="/datasets/handwriting/TASK_02/HC/T02_HC_002.png" 
                    alt="Healthy Control 2"
                    className="w-full h-24 object-contain rounded border bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+2'
                    }}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-2">Alzheimer's Disease (AD)</h4>
                <div className="space-y-2">
                  <img 
                    src="/datasets/handwriting/TASK_02/AD/T02_AD_001.png" 
                    alt="AD Patient 1"
                    className="w-full h-24 object-contain rounded border bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+1'
                    }}
                  />
                  <img 
                    src="/datasets/handwriting/TASK_02/AD/T02_AD_002.png" 
                    alt="AD Patient 2"
                    className="w-full h-24 object-contain rounded border bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+2'
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              6 tasks: Copy text, sentences, spirals, clocks, words, shapes - full handwriting samples
            </p>
          </div>
        </div>

        {/* Additional Dataset Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-blue-500 mr-2" />
            <span className="font-medium text-blue-800">Clinical Data Integration</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>
              <span className="font-medium">OASIS Dataset:</span> Longitudinal clinical assessments with MMSE, CDR scores
            </div>
            <div>
              <span className="font-medium">Plasma Biomarkers:</span> Aβ42/40 ratio, p-tau181, NFL levels
            </div>
            <div>
              <span className="font-medium">Genetic Data:</span> APOE4 status and variant analysis
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Explainable AI (XAI) Integration</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-medium">Grad-CAM Visualization</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Highlights brain regions contributing to CNN predictions on MRI scans
            </p>
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <div className="text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-500">Grad-CAM Heatmap</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium">SHAP Feature Attribution</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Explains contribution of biomarkers, handwriting, and clinical parameters
            </p>
            <div className="space-y-2">
              {[
                { feature: 'Hippocampal Volume', value: 0.85, impact: 'High' },
                { feature: 'p-tau181 Level', value: 0.72, impact: 'High' },
                { feature: 'Writing Velocity', value: 0.45, impact: 'Medium' },
                { feature: 'MMSE Score', value: 0.38, impact: 'Medium' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.feature}</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${item.value * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      item.impact === 'High' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-blue-500 mr-2" />
            <span className="font-medium text-blue-800">Clinical Trust & Transparency</span>
          </div>
          <p className="text-sm text-blue-700">
            XAI methods ensure clinical interpretability and build trust with healthcare providers by explaining 
            model decisions and highlighting relevant biomarkers and brain regions.
          </p>
        </div>
      </div>
    </div>
  )
}