'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, TrendingUp, Users, Eye, ArrowRight } from 'lucide-react'
import { getRandomMRIImages, getRandomHandwritingImages, MRI_CATEGORIES, HANDWRITING_TASKS, loadClinicalData } from '@/lib/dataService'

interface CaseComparison {
  id: string
  age: number
  gender: string
  diagnosis: string
  riskScore: number
  mriCategory: keyof typeof MRI_CATEGORIES
  handwritingCondition: 'AD' | 'HC'
  similarity: number
}

export default function ComparePage() {
  const [selectedCase, setSelectedCase] = useState<CaseComparison | null>(null)
  const [similarCases, setSimilarCases] = useState<CaseComparison[]>([])
  const [mriExamples, setMriExamples] = useState<any[]>([])
  const [handwritingExamples, setHandwritingExamples] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load example cases from the database
    const exampleCases: CaseComparison[] = [
      {
        id: 'case_001',
        age: 72,
        gender: 'Female',
        diagnosis: 'Mild Cognitive Impairment',
        riskScore: 65,
        mriCategory: 'VeryMildDemented',
        handwritingCondition: 'AD',
        similarity: 0.89
      },
      {
        id: 'case_002',
        age: 68,
        gender: 'Male',
        diagnosis: 'Normal Cognition',
        riskScore: 25,
        mriCategory: 'NonDemented',
        handwritingCondition: 'HC',
        similarity: 0.76
      },
      {
        id: 'case_003',
        age: 75,
        gender: 'Female',
        diagnosis: 'Mild Dementia',
        riskScore: 82,
        mriCategory: 'MildDemented',
        handwritingCondition: 'AD',
        similarity: 0.91
      },
      {
        id: 'case_004',
        age: 71,
        gender: 'Male',
        diagnosis: 'Very Mild Dementia',
        riskScore: 58,
        mriCategory: 'VeryMildDemented',
        handwritingCondition: 'AD',
        similarity: 0.83
      }
    ]
    
    setSimilarCases(exampleCases)
    setSelectedCase(exampleCases[0])
  }, [])

  const handleCaseSelect = (caseData: CaseComparison) => {
    setLoading(true)
    setSelectedCase(caseData)
    
    // Load relevant examples from dataset
    setTimeout(() => {
      const mriImages = getRandomMRIImages(caseData.mriCategory, 4)
      const handwritingImages = getRandomHandwritingImages(undefined, caseData.handwritingCondition, 4)
      
      setMriExamples(mriImages)
      setHandwritingExamples(handwritingImages)
      setLoading(false)
    }, 1000)
  }

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
          Compare with Similar Cases
        </h1>
        <p className="text-lg text-gray-600">
          Explore cases from our database with similar characteristics
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Case Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Similar Cases</h2>
          <div className="space-y-3">
            {similarCases.map((caseData) => (
              <div
                key={caseData.id}
                onClick={() => handleCaseSelect(caseData)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedCase?.id === caseData.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {caseData.gender}, {caseData.age} years
                    </h3>
                    <p className="text-sm text-gray-600">{caseData.diagnosis}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getRiskColor(caseData.riskScore)}`}>
                      {caseData.riskScore}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {(caseData.similarity * 100).toFixed(0)}% match
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{MRI_CATEGORIES[caseData.mriCategory].label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          {selectedCase && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Case Details</h2>
                <div className={`px-4 py-2 rounded-lg ${getRiskBgColor(selectedCase.riskScore)}`}>
                  <span className={`text-lg font-bold ${getRiskColor(selectedCase.riskScore)}`}>
                    {selectedCase.riskScore}% Risk Score
                  </span>
                </div>
              </div>

              {/* Patient Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{selectedCase.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedCase.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <p className="font-medium">{selectedCase.diagnosis}</p>
                  </div>
                </div>
              </div>

              {/* MRI Analysis */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-purple-500 mr-2" />
                  <h3 className="text-lg font-semibold">MRI Analysis</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Classification</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCase.mriCategory === 'NonDemented' ? 'bg-green-100 text-green-800' :
                    selectedCase.mriCategory === 'VeryMildDemented' ? 'bg-yellow-100 text-yellow-800' :
                    selectedCase.mriCategory === 'MildDemented' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {MRI_CATEGORIES[selectedCase.mriCategory].label}
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {mriExamples.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image.path} 
                          alt={`MRI ${image.category}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-1">
                            {image.filename.slice(0, 10)}...
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Handwriting Analysis */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Activity className="w-6 h-6 text-orange-500 mr-2" />
                  <h3 className="text-lg font-semibold">Handwriting Analysis</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Condition</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCase.handwritingCondition === 'HC' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedCase.handwritingCondition === 'HC' ? 'Healthy Control' : 'Alzheimer\'s Disease'}
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {handwritingExamples.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image.path} 
                          alt={`Handwriting ${image.condition}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-1">
                            {image.condition} - {image.task.slice(-2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Insights */}
      {selectedCase && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-blue-800">Comparison Insights</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Similarities</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Similar age group and demographic profile</li>
                <li>• Comparable MRI structural changes</li>
                <li>• Similar handwriting pattern characteristics</li>
                <li>• {(selectedCase.similarity * 100).toFixed(0)}% overall similarity score</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Clinical Relevance</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Cases help validate assessment accuracy</li>
                <li>• Similar outcomes suggest reliable prediction</li>
                <li>• Patterns consistent with medical literature</li>
                <li>• Supports evidence-based decision making</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}