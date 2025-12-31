'use client'

import React, { useState, useEffect } from 'react'
import { Beaker, TrendingUp, AlertTriangle, CheckCircle, Info, Download, RefreshCw, Target } from 'lucide-react'
import { getBiomarkerData, loadClinicalData } from '@/lib/dataService'

interface BiomarkerResult {
  name: string
  value: number
  unit: string
  normalRange: { min: number; max: number }
  status: 'normal' | 'borderline' | 'abnormal'
  riskLevel: 'low' | 'moderate' | 'high'
  description: string
  clinicalSignificance: string
}

interface PatientProfile {
  id: string
  age: number
  gender: string
  cognitiveStatus: string
  testDate: string
}

export default function BiomarkersAnalysisPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>('patient_001')
  const [biomarkerResults, setBiomarkerResults] = useState<BiomarkerResult[]>([])
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [overallRisk, setOverallRisk] = useState<{ level: string; score: number; interpretation: string } | null>(null)

  const patientOptions = [
    { id: 'patient_001', label: 'Patient #001 - Normal Control' },
    { id: 'patient_002', label: 'Patient #002 - MCI' },
    { id: 'patient_003', label: 'Patient #003 - Mild AD' },
    { id: 'patient_004', label: 'Patient #004 - Moderate AD' }
  ]

  useEffect(() => {
    loadPatientData()
  }, [selectedPatient])

  const loadPatientData = async () => {
    setIsLoading(true)
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const biomarkerData = getBiomarkerData(selectedPatient)
      const clinicalData = await loadClinicalData()
      
      // Find patient data
      const patientData = clinicalData.find(p => p.id === selectedPatient)
      
      // Generate comprehensive biomarker results
      const results: BiomarkerResult[] = [
        {
          name: 'Aβ42/Aβ40 Ratio',
          value: biomarkerData.abeta42_40_ratio,
          unit: 'ratio',
          normalRange: { min: 0.08, max: 0.12 },
          status: biomarkerData.abeta42_40_ratio < 0.08 ? 'abnormal' : biomarkerData.abeta42_40_ratio < 0.10 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.abeta42_40_ratio < 0.08 ? 'high' : biomarkerData.abeta42_40_ratio < 0.10 ? 'moderate' : 'low',
          description: 'Ratio of amyloid-beta 42 to amyloid-beta 40 peptides in cerebrospinal fluid',
          clinicalSignificance: 'Lower ratios indicate increased amyloid pathology, a hallmark of Alzheimer\'s disease'
        },
        {
          name: 'Phosphorylated Tau (p-Tau181)',
          value: biomarkerData.ptau181,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 25 },
          status: biomarkerData.ptau181 > 25 ? 'abnormal' : biomarkerData.ptau181 > 20 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.ptau181 > 25 ? 'high' : biomarkerData.ptau181 > 20 ? 'moderate' : 'low',
          description: 'Phosphorylated tau protein at threonine 181',
          clinicalSignificance: 'Elevated p-Tau is specific to Alzheimer\'s disease pathology and tau tangle formation'
        },
        {
          name: 'Neurofilament Light (NfL)',
          value: biomarkerData.nfl,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 20 },
          status: biomarkerData.nfl > 20 ? 'abnormal' : biomarkerData.nfl > 15 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.nfl > 20 ? 'high' : biomarkerData.nfl > 15 ? 'moderate' : 'low',
          description: 'Neurofilament light chain protein, marker of axonal damage',
          clinicalSignificance: 'Elevated levels indicate ongoing neurodegeneration across various brain regions'
        },
        {
          name: 'APOE ε4 Status',
          value: biomarkerData.apoe4_status ? 1 : 0,
          unit: 'alleles',
          normalRange: { min: 0, max: 0 },
          status: biomarkerData.apoe4_status ? 'abnormal' : 'normal',
          riskLevel: biomarkerData.apoe4_status ? 'high' : 'low',
          description: 'APOE ε4 allele presence (genetic risk factor)',
          clinicalSignificance: 'APOE ε4 carriers have increased risk of developing Alzheimer\'s disease'
        },
        {
          name: 'Total Tau (t-Tau)',
          value: 200 + Math.random() * 300,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 400 },
          status: Math.random() > 0.6 ? 'normal' : Math.random() > 0.3 ? 'borderline' : 'abnormal',
          riskLevel: Math.random() > 0.7 ? 'low' : Math.random() > 0.4 ? 'moderate' : 'high',
          description: 'Total tau protein concentration in cerebrospinal fluid',
          clinicalSignificance: 'Elevated levels indicate neuronal damage and are associated with cognitive decline'
        }
      ]

      // Generate patient profile
      const profile: PatientProfile = {
        id: selectedPatient,
        age: patientData?.age || 65 + Math.floor(Math.random() * 20),
        gender: patientData?.gender || (Math.random() > 0.5 ? 'Female' : 'Male'),
        cognitiveStatus: patientData?.finalDiagnosis || 'Unknown',
        testDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }

      // Calculate overall risk
      const riskScore = calculateOverallRisk(results)
      const risk = {
        level: riskScore > 0.7 ? 'High' : riskScore > 0.4 ? 'Moderate' : 'Low',
        score: riskScore,
        interpretation: generateRiskInterpretation(riskScore, results)
      }

      setBiomarkerResults(results)
      setPatientProfile(profile)
      setOverallRisk(risk)
    } catch (error) {
      console.error('Error loading patient data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateOverallRisk = (results: BiomarkerResult[]) => {
    const riskWeights = { low: 0.1, moderate: 0.5, high: 0.9 }
    const totalWeight = results.reduce((sum, result) => sum + riskWeights[result.riskLevel], 0)
    return totalWeight / results.length
  }

  const generateRiskInterpretation = (score: number, results: BiomarkerResult[]) => {
    const abnormalCount = results.filter(r => r.status === 'abnormal').length
    const borderlineCount = results.filter(r => r.status === 'borderline').length
    
    if (score > 0.7) {
      return `High risk profile with ${abnormalCount} abnormal biomarkers. Comprehensive clinical evaluation recommended.`
    } else if (score > 0.4) {
      return `Moderate risk profile with ${abnormalCount} abnormal and ${borderlineCount} borderline biomarkers. Regular monitoring advised.`
    } else {
      return `Low risk profile with most biomarkers within normal ranges. Continue routine screening.`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600'
      case 'borderline': return 'text-yellow-600'
      case 'abnormal': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-50 border-green-200'
      case 'borderline': return 'bg-yellow-50 border-yellow-200'
      case 'abnormal': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBg = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-50 border-green-200'
      case 'moderate': return 'bg-yellow-50 border-yellow-200'
      case 'high': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'borderline':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'abnormal':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Biomarker Analysis Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive analysis of cerebrospinal fluid and blood biomarkers for Alzheimer's disease
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Panel - Patient Selection & Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Beaker className="w-5 h-5 text-blue-500 mr-2" />
              Select Patient
            </h2>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              {patientOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            
            <button
              onClick={loadPatientData}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>

          {/* Patient Profile */}
          {patientProfile && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-md font-semibold mb-4">Patient Profile</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium">{patientProfile.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{patientProfile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{patientProfile.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{patientProfile.cognitiveStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Test Date:</span>
                  <span className="font-medium">{patientProfile.testDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Overall Risk Assessment */}
          {overallRisk && (
            <div className={`rounded-lg border p-6 ${getRiskBg(overallRisk.level)}`}>
              <h3 className="text-md font-semibold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Overall Risk
              </h3>
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${getRiskColor(overallRisk.level)}`}>
                  {overallRisk.level}
                </div>
                <div className="text-sm text-gray-600">
                  Risk Score: {(overallRisk.score * 100).toFixed(1)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    overallRisk.level === 'Low' ? 'bg-green-500' :
                    overallRisk.level === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${overallRisk.score * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-700">{overallRisk.interpretation}</p>
            </div>
          )}
        </div>

        {/* Right Panel - Biomarker Results */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading biomarker data...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Biomarker Results Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {biomarkerResults.map((biomarker, index) => (
                  <div key={index} className={`bg-white rounded-lg shadow-md border p-6 ${getStatusBg(biomarker.status)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{biomarker.name}</h3>
                      {getStatusIcon(biomarker.status)}
                    </div>

                    {/* Value and Status */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {biomarker.value.toFixed(biomarker.name.includes('Ratio') ? 3 : 1)}
                        </span>
                        <span className="text-sm text-gray-600">{biomarker.unit}</span>
                      </div>
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(biomarker.status)} ${getStatusBg(biomarker.status)}`}>
                        {biomarker.status.charAt(0).toUpperCase() + biomarker.status.slice(1)}
                      </div>
                    </div>

                    {/* Normal Range */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Normal Range</span>
                        <span>{biomarker.normalRange.min} - {biomarker.normalRange.max} {biomarker.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 relative">
                        {/* Normal range indicator */}
                        <div className="absolute inset-0 bg-green-300 rounded-full"></div>
                        {/* Current value indicator */}
                        <div
                          className="absolute top-0 w-1 h-2 bg-gray-800 rounded-full"
                          style={{
                            left: `${Math.min(100, Math.max(0, 
                              ((biomarker.value - biomarker.normalRange.min) / 
                               (biomarker.normalRange.max - biomarker.normalRange.min)) * 100
                            ))}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700">{biomarker.description}</p>
                    </div>

                    {/* Clinical Significance */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Clinical Significance</h4>
                      <p className="text-xs text-blue-800">{biomarker.clinicalSignificance}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary and Recommendations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                  Clinical Summary & Recommendations
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Biomarker Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Normal biomarkers:</span>
                        <span className="font-medium text-green-600">
                          {biomarkerResults.filter(b => b.status === 'normal').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Borderline biomarkers:</span>
                        <span className="font-medium text-yellow-600">
                          {biomarkerResults.filter(b => b.status === 'borderline').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Abnormal biomarkers:</span>
                        <span className="font-medium text-red-600">
                          {biomarkerResults.filter(b => b.status === 'abnormal').length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {overallRisk?.level === 'High' && (
                        <>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Immediate comprehensive neurological evaluation</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Consider additional imaging studies (PET, MRI)</span>
                          </li>
                        </>
                      )}
                      {overallRisk?.level === 'Moderate' && (
                        <>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Regular monitoring with 6-month follow-up</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Cognitive assessment and lifestyle counseling</span>
                          </li>
                        </>
                      )}
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Continue routine biomarker screening</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Maintain healthy lifestyle and cognitive activities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">About Biomarker Analysis</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                Biomarker analysis provides objective measures of biological processes associated with Alzheimer's disease. 
                These tests analyze cerebrospinal fluid and blood samples to detect pathological changes.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h5 className="font-medium mb-1">Key Biomarkers:</h5>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Aβ42/Aβ40 Ratio:</strong> Amyloid pathology indicator</li>
                    <li>• <strong>Total Tau:</strong> Neuronal damage marker</li>
                    <li>• <strong>p-Tau:</strong> Alzheimer's-specific pathology</li>
                    <li>• <strong>NfL:</strong> Axonal damage indicator</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Clinical Applications:</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Early detection of AD pathology</li>
                    <li>• Differential diagnosis support</li>
                    <li>• Disease progression monitoring</li>
                    <li>• Treatment response assessment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}