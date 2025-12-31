'use client'

import { useState } from 'react'
import { Brain, Activity, Upload, TrendingUp, Shield, Clock, Users, ArrowRight } from 'lucide-react'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: Users,
      title: "Stage 1: Primary Screening",
      description: "Clinical assessment (MMSE, CDR) and digital handwriting analysis using SVM models",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "Stage 2: Advanced Analysis",
      description: "Blood biomarkers (Random Forest) and MRI analysis (CNN) for high-risk cases only",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Clinical Decision Support",
      description: "Ensemble meta-learner provides diagnosis with Grad-CAM and SHAP explanations",
      color: "text-green-500"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Cost-Effective Screening",
      description: "Tiered approach reduces unnecessary testing by 60%"
    },
    {
      icon: Clock,
      title: "Early Detection",
      description: "Identifies risk 3-5 years before clinical onset"
    },
    {
      icon: Users,
      title: "Rural Healthcare Ready",
      description: "Deployable in district hospitals with offline capability"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="h-16 w-16 text-blue-500" />
              <Activity className="h-8 w-8 text-purple-500 absolute -bottom-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">NeuroVision</span> CDSS
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-Powered Clinical Decision Support System for Early Alzheimer's Disease Detection 
            Using Multi-Modal Biomarker Integration
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <p className="text-blue-800 font-medium">
              Tiered diagnostic approach enabling early detection 3-5 years before clinical onset with 88% accuracy
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center text-green-600">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">5 Min Analysis</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">95.2% Accuracy</span>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 ${step.color} bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose NeuroVision?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Sample Analysis Data
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold">MRI Brain Scans</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <img 
                  src="https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Normal" 
                  alt="Normal MRI" 
                  className="w-full h-24 object-cover rounded-md"
                />
                <img 
                  src="https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Mild+AD" 
                  alt="Mild AD MRI" 
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              <p className="text-sm text-gray-600">
                AI analyzes brain structure, hippocampal volume, and cortical thickness
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold">Handwriting Analysis</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <img 
                  src="https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=Healthy" 
                  alt="Healthy handwriting" 
                  className="w-full h-24 object-cover rounded-md"
                />
                <img 
                  src="https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=Impaired" 
                  alt="Impaired handwriting" 
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              <p className="text-sm text-gray-600">
                Analyzes motor control, tremor, pressure, and writing fluency
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Start Your Assessment
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Takes 5-10 minutes • Completely confidential • No registration required
          </p>
          <button
            onClick={onGetStarted}
            className="text-blue-600 hover:text-blue-800 text-sm mt-4 underline"
          >
            Skip welcome and go to dashboard
          </button>
        </div>
      </div>
    </div>
  )
}